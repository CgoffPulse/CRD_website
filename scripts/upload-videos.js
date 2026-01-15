#!/usr/bin/env node
/**
 * Script to upload large video files to Vercel Blob Storage
 * Run with: node scripts/upload-videos.js
 * 
 * Automatically loads BLOB_READ_WRITE_TOKEN from .env.local
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const { put } = require('@vercel/blob');
const { readFile } = require('fs/promises');
const { join } = require('path');

const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!BLOB_READ_WRITE_TOKEN) {
  console.error('Error: BLOB_READ_WRITE_TOKEN environment variable is not set');
  console.error('Set it in your .env.local file or export it before running this script');
  process.exit(1);
}

const videos = [
  {
    localPath: 'public/images/Water Towers to Concert Roof.MP4',
    blobPath: 'videos/water-towers-to-concert-roof.mp4',
    name: 'Water Towers to Concert Roof',
    envKey: 'NEXT_PUBLIC_WATER_TOWERS_VIDEO_URL',
  },
  {
    localPath: 'public/images/South edge of building to east edge of building drone is facing downtown.MP4',
    blobPath: 'videos/south-edge-building-drone-downtown.mp4',
    name: 'South edge of building drone facing downtown',
    envKey: 'NEXT_PUBLIC_DRONE_DOWNTOWN_VIDEO_URL',
  },
];

async function uploadVideo(video) {
  try {
    console.log(`\n📤 Uploading: ${video.name}...`);
    
    const filePath = join(process.cwd(), video.localPath);
    const fileBuffer = await readFile(filePath);
    
    const blob = await put(video.blobPath, fileBuffer, {
      access: 'public',
      token: BLOB_READ_WRITE_TOKEN,
      contentType: 'video/mp4',
    });
    
    console.log(`✅ Uploaded successfully!`);
    console.log(`   URL: ${blob.url}`);
    
    return { envKey: video.envKey, url: blob.url };
  } catch (error) {
    console.error(`❌ Error uploading ${video.name}:`, error);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting video uploads to Vercel Blob Storage...\n');
  
  const results = [];
  
  for (const video of videos) {
    try {
      const result = await uploadVideo(video);
      results.push(result);
    } catch (error) {
      console.error(`Failed to upload ${video.name}`);
    }
  }
  
  if (results.length > 0) {
    console.log('\n📝 Add these to your .env.local file:');
    console.log('\n# Video URLs (uploaded to Vercel Blob Storage)');
    results.forEach(({ envKey, url }) => {
      console.log(`${envKey}=${url}`);
    });
    console.log('\n💡 Then add these same variables to your Vercel project settings:');
    console.log('   https://vercel.com/your-project/settings/environment-variables');
  }
  
  console.log('\n✨ Done!');
}

main().catch(console.error);
