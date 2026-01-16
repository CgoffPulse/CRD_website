import { NextResponse } from "next/server";

export async function GET() {
  // Temporary debug endpoint - remove after fixing
  const passwordExists = !!process.env.CMS_PASSWORD;
  const passwordLength = process.env.CMS_PASSWORD?.length || 0;
  const passwordValue = process.env.CMS_PASSWORD || "NOT_SET";

  // Check for common variations
  const allEnvKeys = Object.keys(process.env).filter(
    (key) =>
      key.includes("CMS") ||
      key.includes("PASSWORD") ||
      key.includes("cms") ||
      key.includes("password")
  );

  return NextResponse.json({
    passwordExists,
    passwordLength,
    passwordFirstChar: passwordValue !== "NOT_SET" ? passwordValue[0] : null,
    passwordLastChar:
      passwordValue !== "NOT_SET" && passwordLength > 0
        ? passwordValue[passwordLength - 1]
        : null,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    relatedEnvKeys: allEnvKeys,
    // Check if BLOB_READ_WRITE_TOKEN exists (to verify env vars work at all)
    blobTokenExists: !!process.env.BLOB_READ_WRITE_TOKEN,
  });
}
