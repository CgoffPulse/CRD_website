# CRM User Guide

Welcome to your Content Management System (CRM)! This guide will help you access and manage all aspects of your website content.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Accessing the CRM](#accessing-the-crm)
3. [Content Management Modules](#content-management-modules)
   - [Events Management](#events-management)
   - [Promotional Content Manager](#promotional-content-manager)
   - [Commercial Listings](#commercial-listings)
   - [Residential Listings](#residential-listings)
4. [Common Tasks](#common-tasks)
5. [Troubleshooting](#troubleshooting)

---

## Getting Started

### What You'll Need

- Your CRM password (provided separately)
- Access to your website URL
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Security

**Important:** Your CRM password is confidential. Never share it or use it on unsecured networks. Always log out when you're finished managing content.

---

## Accessing the CRM

### Main Entry Points

Your CRM has multiple entry points depending on what you want to manage:


1. **Commercial Listings**
   - URL: `https://yourwebsite.com/admin/commercial`
   - Use this for: Commercial property listings (buy and lease)

2. **Residential Listings**
   - URL: `https://yourwebsite.com/admin/residential`
   - Use this for: Residential property listings

### Login Process

1. Navigate to any of the URLs above
2. You'll see a login screen asking for your password
3. Enter your CRM password
4. Click "Login"
5. Once authenticated, you'll have access to the management dashboard

**Note:** Your login session will remain active until you log out or close your browser. You can navigate between different CMS sections without logging in again.

---

## Content Management Modules

### Events Management

**Location:** Events Management section

The Events Management system allows you to upload and manage event flyers that appear on your website.

#### Key Features

- **Upload Event Flyers**: Upload single or multi-page event flyers (PDF or images)
- **Automatic Scheduling**: Events automatically go live based on their event date (default: 15 days before)
- **Force Push**: Make events appear immediately, even if they're scheduled for later
- **Edit & Delete**: Update event details or remove events that are no longer needed

#### How to Upload an Event

1. Navigate to the Events CMS page
2. Fill out the upload form:
   - **Event Date**: Select the date of your event
   - **Go Live Days**: How many days before the event it should appear (default: 15 days)
   - **Files**: Upload one or more images/PDFs for your event flyer
3. Click "Upload Event"
4. Your event will automatically appear on the website based on the go-live schedule

#### Managing Existing Events

- **View All Events**: Scroll down to see all uploaded events
- **Edit Event**: Click "Edit" on any event to modify its details or images
- **Delete Event**: Click "Delete" to permanently remove an event
- **Force Push**: Use the "Force Push Event" section at the top to make an event appear immediately

#### Force Push Feature

If you need an event to appear immediately (bypassing the automatic schedule):

1. Find the "Force Push Event" section at the top of the page
2. Select the event you want to push
3. Click "Force Push Event"
4. The event will appear on your website immediately

---

### Promotional Content Manager

**Location:** Promotional Content Manager section

The Promotional Content Manager controls promotional popups that appear on your homepage.

#### Key Features

- **Upload Promo Images**: Add promotional images for popups
- **Single or Carousel Mode**: Display one image or multiple images in a carousel
- **Customizable Colors**: Set background and button colors
- **Link Configuration**: Add clickable links to your promotions
- **Archive & Reinstate**: Temporarily hide promos without deleting them
- **Force Push**: Override automatic scheduling to show promos immediately

#### How to Create a Promotional Popup

1. Navigate to the Promo CMS page
2. **Upload Images**:
   - Click "Choose Files" or drag and drop images
   - Upload one image for single mode, or multiple for carousel mode
   - Images should be optimized for web (recommended: under 2MB each)
3. **Configure Settings**:
   - **Enable Popup**: Toggle to enable/disable the popup
   - **Display Type**: Choose "Single Image" or "Carousel"
   - **Link URL**: Enter a URL where users should be directed when clicking
   - **Link Text**: Text for the call-to-action button
   - **Background Color**: Set the popup background color (hex code)
   - **Button Color**: Set the button color (hex code)
4. Click "Update Configuration" to save your settings

#### Understanding Promo Display Priority

Your promotional popups follow a priority system:

1. **Force-Pushed Promos** (highest priority): Promos you've manually force-pushed
2. **Active Events**: If there are active events, they may take priority
3. **Normal Promos**: Regular promotional popups

#### Force Push Promo

To make a promo appear immediately:

1. Find the "Force Push Promo" section
2. Toggle "Force Go Live" to ON
3. Click "Force Push Promo"
4. Your promo will appear immediately on the homepage

#### Managing Promo Images

- **View Current Images**: See all active promo images in the "Promo Images" section
- **Edit Image**: Click "Edit" to modify image details or order
- **Delete Image**: Click "Delete" to archive an image (moves to "Past Promos")
- **Past Promos**: View archived promos that can be reinstated or permanently deleted

---

### Commercial Listings

**Location:** `/admin/commercial`

Manage commercial property listings for both "Buy" and "Lease" categories.

#### Key Features

- **Create Listings**: Add new commercial properties
- **Edit Listings**: Update existing property information
- **Delete Listings**: Remove properties that are no longer available
- **Bulk Import**: Import multiple listings from a JSON file
- **Image Management**: Upload and manage property images

#### How to Create a Commercial Listing

1. Navigate to the Commercial Listings CMS page
2. Fill out the property form:
   - **Title**: Property name or address
   - **Mode**: Select "Buy" or "Lease"
   - **Price**: Property price
   - **Location**: Property address or area
   - **Description**: Detailed property description
   - **Property Details**: Additional fields (bedrooms, bathrooms, square footage, etc.)
   - **Images**: Upload property photos
3. Click "Create Listing"
4. Your listing will appear on the commercial listings page

#### Managing Existing Listings

- **View All Listings**: Scroll down to see all commercial listings
- **Edit Listing**: Click "Edit" on any listing to modify its details
- **Delete Listing**: Click "Delete" to remove a listing permanently

#### Bulk Import (JSON Import)

To import multiple listings at once:

1. Prepare a JSON file with your listings data
2. Click "Choose File" in the JSON Import section
3. Select your JSON file
4. Click "Import Listings"
5. Your listings will be added to the system

**Note:** Contact your developer for the exact JSON format required for imports.

---

### Residential Listings

**Location:** `/admin/residential`

Manage residential property listings.

#### Key Features

- **Create Listings**: Add new residential properties
- **Edit Listings**: Update existing property information
- **Delete Listings**: Remove properties that are no longer available
- **Bulk Import**: Import multiple listings from a JSON file
- **Image Management**: Upload and manage property images

#### How to Create a Residential Listing

1. Navigate to the Residential Listings CMS page
2. Fill out the property form:
   - **Title**: Property name or address
   - **Price**: Property price
   - **Location**: Property address or area
   - **Description**: Detailed property description
   - **Property Details**: Additional fields (bedrooms, bathrooms, square footage, etc.)
   - **Images**: Upload property photos
3. Click "Create Listing"
4. Your listing will appear on the residential listings page

#### Managing Existing Listings

- **View All Listings**: Scroll down to see all residential listings
- **Edit Listing**: Click "Edit" on any listing to modify its details
- **Delete Listing**: Click "Delete" to remove a listing permanently

#### Bulk Import (JSON Import)

To import multiple listings at once:

1. Prepare a JSON file with your listings data
2. Click "Choose File" in the JSON Import section
3. Select your JSON file
4. Click "Import Listings"
5. Your listings will be added to the system

**Note:** Contact your developer for the exact JSON format required for imports.

---

## Common Tasks

### Task: Upload a New Event Flyer

1. Navigate to the Events Management section
2. Enter your password if prompted
3. Fill out the event upload form
4. Select your event date
5. Upload your flyer image(s)
6. Click "Upload Event"
7. The event will automatically appear on your website 15 days before the event date (or adjust the "Go Live Days" setting)

### Task: Create a Promotional Popup

1. Navigate to the Promotional Content Manager section
2. Enter your password if prompted
3. Upload one or more promotional images
4. Configure the popup settings (colors, links, etc.)
5. Enable the popup toggle
6. Click "Update Configuration"
7. Your promo will appear on the homepage (unless there are active events)

### Task: Add a New Property Listing

1. Go to `/admin/commercial` or `/admin/residential` (depending on property type)
2. Enter your password if prompted
3. Fill out the property form with all details
4. Upload property images
5. Click "Create Listing"
6. Your listing will appear on the appropriate listings page

### Task: Make Content Appear Immediately

**For Events:**
1. Navigate to the Events Management section
2. Find the "Force Push Event" section at the top
3. Select the event you want to push
4. Click "Force Push Event"

**For Promos:**
1. Navigate to the Promotional Content Manager section
2. Find the "Force Push Promo" section
3. Toggle "Force Go Live" to ON
4. Click "Force Push Promo"

### Task: Log Out

1. Click the "Logout" button in the top-right corner of any CMS page
2. You'll be logged out and redirected to the login page

---

## Troubleshooting

### I Can't Log In

- **Double-check your password**: Make sure you're entering it correctly (passwords are case-sensitive)
- **Clear your browser cache**: Sometimes cached data can cause login issues
- **Try a different browser**: If one browser doesn't work, try another
- **Contact support**: If you continue to have issues, contact your developer

### Images Won't Upload

- **Check file size**: Images should be under 10MB each
- **Check file format**: Supported formats include JPG, PNG, PDF, and WebP
- **Check your internet connection**: Large files require a stable connection
- **Try a different image**: The file might be corrupted

### Changes Aren't Appearing on the Website

- **Wait a few moments**: Changes may take 30-60 seconds to appear
- **Clear your browser cache**: Press Ctrl+F5 (Windows) or Cmd+Shift+R (Mac) to hard refresh
- **Check if content is scheduled**: Events and promos may be scheduled for later dates
- **Verify the content is enabled**: For promos, make sure "Enable Popup" is toggled ON

### I Accidentally Deleted Something

- **Check "Past Promos"**: Deleted promo images are moved to "Past Promos" and can be reinstated
- **Contact support**: For events and listings, contact your developer as they may be recoverable from backups

### The Page Looks Broken or Styled Incorrectly

- **Clear your browser cache**: Old cached styles might be causing issues
- **Try a different browser**: This helps determine if it's a browser-specific issue
- **Check your internet connection**: Slow connections can cause styling issues
- **Contact support**: If the issue persists, there may be a technical problem

---

## Best Practices

### Image Optimization

- **Compress images before uploading**: Use tools like TinyPNG or ImageOptim to reduce file size
- **Use appropriate dimensions**: 
  - Event flyers: 1200-2000px wide
  - Promo images: 800-1200px wide
  - Property photos: 1200-1600px wide
- **Use WebP format when possible**: This format provides better compression

### Content Organization

- **Use descriptive titles**: Make it easy to identify content later
- **Keep event dates accurate**: This ensures proper automatic scheduling
- **Archive old content**: Move outdated promos to "Past Promos" instead of deleting them immediately

### Security

- **Never share your password**: Keep your CRM password confidential
- **Log out when finished**: Especially on shared or public computers
- **Use secure networks**: Avoid accessing the CRM on public Wi-Fi

---

## Quick Reference: URLs

| Module | URL |
|--------|-----|
| Events Management | Events Management section |
| Promotional Content | Promotional Content Manager section |
| Commercial Listings | `/admin/commercial` |
| Residential Listings | `/admin/residential` |

---

## Support

If you need assistance or have questions about using the CRM:

1. **Check this guide first**: Most common questions are answered here
2. **Contact your developer**: For technical issues or feature requests
3. **Report bugs**: If something isn't working as expected, document the issue and contact support

---

**Last Updated:** [Current Date]  
**Version:** 1.0
