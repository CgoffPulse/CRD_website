CMS User Guide

Welcome to your Content Management System (CMS)! This guide will help you access and manage all aspects of your website content.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Accessing the CMS](#accessing-the-cms)
3. [Content Management Modules](#content-management-modules)
   - [Commercial Listings](#commercial-listings)
   - [Residential Listings](#residential-listings)
4. [Common Tasks](#common-tasks)
5. [Troubleshooting](#troubleshooting)

---

## Getting Started

### What You'll Need

- Your CMS password (provided separately)
- Access to your website URL
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Security

**Important:** Your CMS password is confidential. Never share it or use it on unsecured networks. Always log out when you're finished managing content.

---

## Accessing the CMS

### Main Entry Points

Your CMS has two main entry points for managing property listings:

1. **Commercial Listings**
   - URL: `https://yourwebsite.com/admin/commercial`
   - Use this for: Commercial property listings (buy and lease)

2. **Residential Listings**
   - URL: `https://yourwebsite.com/admin/residential`
   - Use this for: Residential property listings

### Login Process

1. Navigate to any of the URLs above
2. You'll see a login screen asking for your password
3. Enter your CMS password
4. Click "Login"
5. Once authenticated, you'll have access to the management dashboard

**Note:** Your login session will remain active until you log out or close your browser. You can navigate between different CMS sections without logging in again.

---

## Content Management Modules

### Commercial Listings

**Location:** `/admin/commercial`

Manage commercial property listings for both "Buy" and "Lease" categories.

#### Key Features

- **Create Listings**: Add new commercial properties
- **Edit Listings**: Update existing property information
- **Archive Listings**: Archive properties that are no longer available (soft delete - listings are preserved)
- **Delete Test Listings**: Permanently delete test listings (only test listings can be truly deleted)
- **Preview Listings**: Quickly preview how listings appear on the website
- **Show Archived**: Toggle to view archived listings
- **Bulk Import**: Import multiple listings from a JSON file
- **Test Listing Generator**: Create test listings with random data for testing purposes
- **Image Management**: Upload and manage property images
- **Facts & Features**: Comprehensive property details form

#### How to Create a Commercial Listing

1. Navigate to the Commercial Listings CMS page (`/admin/commercial`)
2. Fill out the property form:

   **Basic Information:**
   - **Listing Type**: Select "Buy" or "Lease"
   - **Title**: Property name or address (required)
   - **Price** (Buy) or **Lease Rate** (Lease): Property price or lease rate (required)
   - **Location**: Property address or area (required)
   - **Description**: Detailed property description
   - **MLS Number**: Property MLS number (optional - will automatically be added to key features)

   **Key Features (Bullets):**
   The form includes template fields that follow a standard format. Fill these out in order:
   - **Square Footage**: e.g., "3,144 sq ft"
   - **Property Type**: e.g., "Multi-family 4-plex investment property"
   - **Year Built**: e.g., "Built in 1981"
   - **Lot Size**: e.g., "0.39 Acres lot"
   - **Community/Features**: e.g., "Located in Rogers"
   - **Special Features**: e.g., "Prime location, Onsite parking"
   - **Price per sqft**: e.g., "$199/sqft"
   
   **Additional Features:**
   - Add any additional bullet point features below the template fields
   - Click "Add Feature" to add more custom bullets

   **Images:**
   - **Cover Image**: Main property image (required)
   - **Gallery Images**: Additional property photos (optional, multiple allowed)

   **Property Details:**
   - Use the comprehensive "Facts & Features" form to add detailed property information
   - Includes sections for: Lot, Property, Details, Construction, Location, Financial & Listing Details
   - This data appears in the detailed "Facts & Features" section when users view the listing

3. Click "Create Listing"
4. Your listing will appear on the commercial listings page

**Important Notes:**
- MLS# is automatically added to key features when you enter it in the MLS Number field
- Template fields are displayed in a specific order on the website
- You can add custom features beyond the template fields

#### Managing Existing Listings

- **View All Listings**: Scroll down to see all commercial listings (filtered by "For Sale"/"For Lease" or All)
- **Show Archived Toggle**: Use the toggle switch to show or hide archived listings
- **Listing Type Badge**: Each listing displays a badge above the title showing "For Sale" or "For Lease" (centered)
- **Archived Badge**: Archived listings display a purple "Archived" badge next to the listing type badge
- **Preview Listing**: Click "Preview Listing" to open the listing in a new tab and see how it appears on the website
- **Edit Listing**: Click "Edit Listing" on any listing card to modify its details
- **Archive Listing**: Click "Archive" (purple button) to archive a listing - it will be hidden from the main view but preserved in the system
- **Delete Test Listing**: Test listings (created via Dev Tools) show a red "Delete" button for permanent deletion

#### Editing a Listing

When you click "Edit Listing", you'll see the same form as creating a listing, but pre-filled with existing data:

1. Modify any fields you want to change
2. Update key features using the template fields or additional features
3. Add or replace images as needed
4. Update property details using the Facts & Features form
5. Click "Update Listing" to save changes

#### Dev Tools

The CMS includes developer tools for testing and bulk operations:

**Create Test Listing:**
1. Scroll to the "Dev Tools" section (orange-bordered box)
2. Click "Create Test Listing"
3. A new test listing will be created with random, comprehensive data including all form fields
4. Test listings can be permanently deleted using the red "Delete" button

**Bulk Import (JSON Import):**
1. Prepare a JSON file with your listings data following the CommercialListing type structure
2. Click the "🔧 Dev Tool: Import from JSON" card
3. Paste your JSON data into the text area (or click "Load Example" to see the format)
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
- **Archive Listings**: Archive properties that are no longer available (soft delete - listings are preserved)
- **Delete Test Listings**: Permanently delete test listings (only test listings can be truly deleted)
- **Preview Listings**: Quickly preview how listings appear on the website
- **Show Archived**: Toggle to view archived listings
- **Bulk Import**: Import multiple listings from a JSON file
- **Test Listing Generator**: Create test listings with random data for testing purposes
- **Image Management**: Upload and manage property images
- **Facts & Features**: Comprehensive property details form
- **Agent Management**: Add contact information for listing agents
- **Auto-Populated Office Info**: Office name and phone are automatically set to "CRD Real Estate & Development" and "479-445-4501"

#### How to Create a Residential Listing

1. Navigate to the Residential Listings CMS page (`/admin/residential`)
2. Fill out the property form:

   **Basic Information:**
   - **Title**: Property name or address (required)
   - **Price**: Property price (required)
   - **Location**: Property address or area (required)
   - **Description**: Detailed property description
   - **MLS Number**: Property MLS number (optional - will automatically be added to key features)
   
   **Note:** Office name and phone are automatically set to "CRD Real Estate & Development" and "479-445-4501" - these fields are not shown in the form.

   **Key Features:**
   The form includes template fields that follow a standard format. Fill these out in order:
   - **Square Footage**: e.g., "850 sq ft"
   - **Property Type**: e.g., "Manufactured Home, Single Family Residence"
   - **Year Built**: e.g., "Built in 1970"
   - **Lot Size**: e.g., "5,662.8 sq ft lot"
   - **Community/Features**: e.g., "Lost Bridge Village community"
   - **Special Features**: e.g., "Fully furnished, Screened-in porch"
   - **Price per sqft**: e.g., "$188/sqft"
   
   **Additional Features:**
   - Add any additional bullet point features below the template fields
   - Click "Add Feature" to add more custom bullets

   **Agents:**
   - Add one or more listing agents with their contact information
   - For each agent: Name (required), Email (optional), Phone (optional)
   - Click "Add Agent" to add more agents

   **Images:**
   - **Cover Image**: Main property image (required)
   - **Gallery Images**: Additional property photos (optional, multiple allowed)

   **Property Details:**
   - Use the comprehensive "Facts & Features" form to add detailed property information
   - Includes sections for: Interior, Property, Lot, Details, Construction, Community & HOA, Location, Financial & Listing Details
   - This data appears in the detailed "Facts & Features" section when users view the listing

3. Click "Create Listing"
4. Your listing will appear on the residential listings page

**Important Notes:**
- MLS# is automatically added to key features when you enter it in the MLS Number field
- Template fields are displayed in a specific order on the website
- You can add custom features beyond the template fields

#### Managing Existing Listings

- **View All Listings**: Scroll down to see all residential listings displayed as cards
- **Preview Listing**: Click "Preview Listing" to open the listing in a new tab and see how it appears on the website
- **Edit Listing**: Click "Edit Listing" on any listing card to modify its details
- **Delete Listing**: Click "Delete" to permanently remove a listing (this will also delete associated images)

#### Editing a Listing

When you click "Edit Listing", a dialog will open with the same form as creating a listing, but pre-filled with existing data:

1. Modify any fields you want to change
2. Update key features using the template fields or additional features
3. Update agent information as needed
4. Add or replace images as needed
5. Update property details using the Facts & Features form
6. Click "Update Listing" to save changes

#### Dev Tools

The CMS includes developer tools for testing and bulk operations:

**Create Test Listing:**
1. Scroll to the "Dev Tools" section (orange-bordered box)
2. Click "Create Test Listing"
3. A new test listing will be created with random, comprehensive data including all form fields
4. Test listings can be permanently deleted using the red "Delete" button

**Bulk Import (JSON Import):**
1. Prepare a JSON file with your listings data following the ResidentialListing type structure
2. Click the "🔧 Dev Tool: Import from JSON" card
3. Paste your JSON data into the text area (or click "Load Example" to see the format)
4. Click "Import Listings"
5. Your listings will be added to the system

**Note:** Contact your developer for the exact JSON format required for imports.

---

## Common Tasks

### Task: Add a New Property Listing

1. Go to `/admin/commercial` or `/admin/residential` (depending on property type)
2. Enter your password if prompted
3. Fill out the property form with all details:
   - Basic information (title, price, location, description)
   - MLS number (optional - will auto-add to features)
   - Key features template fields (square footage, property type, year built, lot size, community/features, special features, price/sqft)
   - Additional features if needed
   - Images (cover image required, gallery images optional)
   - Property details using the Facts & Features form
4. For residential listings: Add agent information if applicable
5. Click "Create Listing"
6. Your listing will appear on the appropriate listings page

### Task: Preview a Listing Before Publishing

1. After creating or editing a listing, find it in the listings grid
2. Click the "Preview Listing" button on the listing card
3. A new tab will open showing exactly how the listing appears on the website
4. Review the listing to ensure all information is correct
5. Make edits if needed using the "Edit Listing" button

### Task: Update Listing Information

1. Navigate to the appropriate CMS page (Commercial or Residential)
2. Find the listing you want to edit in the listings grid
3. Click "Edit Listing"
4. Make your changes in the form:
   - Update any basic information fields
   - Modify key features (template fields or additional features)
   - Update images if needed
   - Adjust property details in the Facts & Features form
5. Click "Update Listing" to save your changes

### Task: Archive a Listing

1. Navigate to the appropriate CMS page
2. Find the listing you want to archive
3. Click "Archive" (purple button) on the listing card
4. Confirm the archiving when prompted
5. The listing will be hidden from the main view but preserved in the system
6. Use the "Show archived" toggle to view archived listings

**Note:** Regular listings are archived (soft delete), not permanently deleted. Only test listings can be permanently deleted using the red "Delete" button.

### Task: View Archived Listings

1. Navigate to the appropriate CMS page
2. Find the "Show archived" toggle switch (located above the listings grid)
3. Toggle it on to display archived listings
4. Archived listings will show a purple "Archived" badge
5. Toggle it off to hide archived listings again

### Task: Create a Test Listing

1. Navigate to the appropriate CMS page (Commercial or Residential)
2. Scroll to the "Dev Tools" section (orange-bordered box)
3. Click "Create Test Listing"
4. A new test listing will be created with random, comprehensive data
5. Test listings can be permanently deleted using the red "Delete" button

**Note:** Test listings are useful for testing the CMS functionality. They can be permanently deleted, unlike regular listings which are archived.

### Task: Import Multiple Listings

1. Prepare a JSON file with your listings data
2. Navigate to the appropriate CMS page (Commercial or Residential)
3. Find the "🔧 Dev Tool: Import from JSON" card
4. Optionally click "Load Example" to see the expected format
5. Paste your JSON data into the text area
6. Click "Import Listings"
7. Review the success message to see how many listings were imported

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
- **Check file format**: Supported formats include JPG, PNG, and WebP
- **Check your internet connection**: Large files require a stable connection
- **Try a different image**: The file might be corrupted
- **Ensure cover image is selected**: Cover image is required for listings

### Changes Aren't Appearing on the Website

- **Wait a few moments**: Changes may take 30-60 seconds to appear
- **Clear your browser cache**: Press Ctrl+F5 (Windows) or Cmd+Shift+R (Mac) to hard refresh
- **Preview the listing**: Use the "Preview Listing" button to see the current state
- **Check if the listing was saved**: Review the success message after saving

### I Accidentally Archived Something

- **View archived listings**: Use the "Show archived" toggle to view archived listings
- **Contact support**: If you need to restore an archived listing, contact your developer
- **Note**: Regular listings are archived (not permanently deleted), so they can be restored if needed. Only test listings are permanently deleted.

### The Page Looks Broken or Styled Incorrectly

- **Clear your browser cache**: Old cached styles might be causing issues
- **Try a different browser**: This helps determine if it's a browser-specific issue
- **Check your internet connection**: Slow connections can cause styling issues
- **Contact support**: If the issue persists, there may be a technical problem

### Key Features Not Showing Correctly

- **Check MLS# field**: If MLS# isn't showing, make sure it's entered in the MLS Number field (it auto-appears in features)
- **Verify template fields**: Ensure template fields are filled out if you want them to appear
- **Check additional features**: Custom features added below the template should appear after the template fields

---

## Best Practices

### Image Optimization

- **Compress images before uploading**: Use tools like TinyPNG or ImageOptim to reduce file size
- **Use appropriate dimensions**: 
  - Cover images: 1200x800px recommended
  - Gallery images: 1200-1600px wide recommended
- **Use WebP format when possible**: The system automatically converts images to WebP format

### Content Organization

- **Use descriptive titles**: Make it easy to identify listings later (e.g., "Cozy Lake Cabin – Lost Bridge Village")
- **Fill out all template fields**: Complete the standard template fields for consistent listing appearance
- **Add MLS# when available**: The MLS number automatically appears in features
- **Use the Facts & Features form**: Fill out property details for comprehensive information display
- **Add multiple gallery images**: More images help showcase the property better

### Key Features (Bullets) Best Practices

Follow the template order for consistency:
1. Square footage
2. Property type
3. Year built
4. Lot size
5. Community/features
6. Special features
7. MLS# (auto-added when MLS Number is entered)
8. Price per sqft

Then add any additional custom features below.

### Security

- **Never share your password**: Keep your CMS password confidential
- **Log out when finished**: Especially on shared or public computers
- **Use secure networks**: Avoid accessing the CMS on public Wi-Fi

---

## Quick Reference: URLs

| Module | URL |
|--------|-----|
| Commercial Listings | `/admin/commercial` |
| Residential Listings | `/admin/residential` |

---

## Support

If you need assistance or have questions about using the CMS:

1. **Check this guide first**: Most common questions are answered here
2. **Use the Preview feature**: Preview listings before publishing to verify they look correct
3. **Contact your developer**: For technical issues or feature requests
4. **Report bugs**: If something isn't working as expected, document the issue and contact support

---

**Last Updated:** January 2025  
**Version:** 3.0

---

## Recent Updates (Version 3.0)

- **Archived Listings**: Listings are now archived (soft delete) instead of permanently deleted, preserving data
- **Show Archived Toggle**: New toggle switch to view archived listings with purple "Archived" badge
- **Test Listing Generator**: Dev tool to quickly create test listings with comprehensive random data
- **Commercial Listing Badges**: "For Sale" and "For Lease" badges displayed above listing titles (centered)
- **Auto-Populated Office Info**: Residential listings automatically include "CRD Real Estate & Development" and "479-445-4501"
- **Improved Button Styling**: All buttons now have proper backgrounds and hover states
- **Optimistic UI Updates**: Listings update immediately in the UI when archived or deleted
