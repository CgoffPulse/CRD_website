# Portable CMS System

A complete, portable Content Management System for managing events and promotional content. This CMS can be easily copied and integrated into any Next.js project.

## Overview

This CMS provides two main modules:
1. **Events Management** - Upload and manage event flyers with automatic scheduling
2. **Promotional Content Manager** - Manage promotional popups with carousel support

## Features

- **Event Management**
  - Upload single or multi-page event flyers
  - Automatic go-live scheduling based on event dates
  - Force push events to display immediately
  - Edit and delete events
  - Support for multi-page flyers (carousel)

- **Promotional Content**
  - Upload promotional images
  - Single image or carousel mode
  - Customizable colors (background and button)
  - Link configuration
  - Archive and reinstate promotional content
  - Automatic expiration dates

- **Authentication**
  - Simple password-based authentication
  - Session management via cookies

- **Storage**
  - File system storage (development)
  - Vercel Blob Storage (production)
  - Automatic migration between storage types

## Installation

### 1. Copy Files

Copy the entire `app/cms-portable/` directory to your Next.js project:

```bash
cp -r app/cms-portable /path/to/your/project/app/
```

### 2. Install Dependencies

Ensure you have the following dependencies installed:

```bash
pnpm add @vercel/blob sharp zod react-dropzone
```

Required dependencies:
- `@vercel/blob` - For blob storage (or use your own storage solution)
- `sharp` - For image processing
- `zod` - For form validation (v4)
- `react-dropzone` - For drag-and-drop file uploads

### 3. UI Components

This CMS uses shadcn/ui components. Ensure you have these components installed:

- `components/ui/button`
- `components/ui/card`
- `components/ui/dialog`
- `components/ui/input`
- `components/ui/label`
- `components/ui/dropdown-menu` (if needed)

If you don't have shadcn/ui, you can install it:
```bash
npx shadcn@latest init
npx shadcn@latest add button card dialog input label
```

### 4. Environment Variables

Add the following environment variables to your `.env.local`:

```env
# Required: CMS authentication password
CMS_PASSWORD=your-secure-password-here

# Required for production: Vercel Blob Storage token
BLOB_READ_WRITE_TOKEN=your-blob-token-here

# Optional: Customize storage paths
CMS_EVENTS_FILE_PATH=app/data/events.json
CMS_EVENTS_BLOB_PATH=data/events.json
CMS_PROMO_FILE_PATH=app/data/promoPopup.json
CMS_PROMO_BLOB_PATH=data/promoPopup.json
CMS_BLOB_PREFIX=events  # Prefix for blob storage paths
```

### 5. Create Data Directory

Create the data directory for local file storage:

```bash
mkdir -p app/data
touch app/data/events.json
touch app/data/promoPopup.json
```

Initialize the JSON files:

**app/data/events.json:**
```json
[]
```

**app/data/promoPopup.json:**
```json
{
  "enabled": false,
  "type": "single",
  "images": [],
  "pastPromos": [],
  "linkUrl": null,
  "linkText": null,
  "popupBgColor": "#FFFFFF",
  "buttonColor": "#000000",
  "forceGoLive": false
}
```

## Usage

### Accessing the CMS

Navigate to `/cms-portable` in your application. You'll be prompted to log in with the password set in `CMS_PASSWORD`.

### Routes

- `/cms-portable` - Landing page with links to both CMS modules
- `/cms-portable/events` - Events Management CMS
- `/cms-portable/promo` - Promotional Content Manager

### Customization

#### Colors

Default colors are generic (white/black). To customize:

1. **Promo Popup Colors**: Edit `app/cms-portable/actions/promoPopup.ts`
   - Default `popupBgColor`: `#FFFFFF` (line 66)
   - Default `buttonColor`: `#000000` (line 67)

2. **Component Colors**: Colors are configurable through the Promo Config Form in the UI

#### Text Customization

All user-facing text can be customized by editing the component files:
- Page titles: Edit `page.tsx` files
- Form labels: Edit component files
- Descriptions: Edit component files

#### Storage Paths

Customize storage paths via environment variables (see Environment Variables section above).

## File Structure

```
app/cms-portable/
├── page.tsx                    # Landing page
├── README.md                   # This file
├── actions/                    # Server actions
│   ├── events.ts              # Events CRUD operations
│   └── promoPopup.ts          # Promo CRUD operations
├── components/                 # Shared components
│   └── LoginForm.tsx          # Authentication form
├── events/                     # Events CMS
│   ├── page.tsx
│   ├── EventUploadForm.tsx
│   ├── EventEditForm.tsx
│   ├── EventsList.tsx
│   └── ForcePushEventSection.tsx
├── promo/                      # Promo CMS
│   ├── page.tsx
│   ├── PromoConfigForm.tsx
│   ├── PromoImageUploadForm.tsx
│   ├── PromoImagesList.tsx
│   ├── PromoQueuedSection.tsx
│   ├── CurrentPromoSection.tsx
│   ├── ForcePushPromoSection.tsx
│   ├── PastPromosList.tsx
│   ├── EditPromoDialog.tsx
│   └── ReinstatePromoDialog.tsx
├── lib/                        # Utility functions
│   └── eventUtils.ts          # Event date/display logic
└── types/                      # TypeScript types
    └── eventPosters.ts         # Event and grouped event types
```

## Integration Steps

1. **Copy the directory** to your project
2. **Install dependencies** (see above)
3. **Set environment variables**
4. **Create data directory** and initialize JSON files
5. **Update imports** if your project structure differs:
   - UI components path (`@/components/ui/...`)
   - Utils path (`@/lib/utils` for `cn` function)
6. **Test the CMS** by navigating to `/cms-portable`

## Customization Guide

### Changing Default Colors

1. **Promo Popup Default Colors**:
   - Edit `app/cms-portable/actions/promoPopup.ts`
   - Change `popupBgColor` default (line 66)
   - Change `buttonColor` default (line 67)

2. **Component Styling**:
   - All components use Tailwind CSS classes
   - Colors can be customized via the Promo Config Form in the UI
   - No hardcoded brand colors remain

### Changing Text/Labels

Search and replace in component files:
- "Events CMS" → Your preferred name
- "Promo Popup CMS" → Your preferred name
- "Content Management System" → Your preferred name

### Adapting for Different Storage

The CMS uses Vercel Blob Storage by default. To use a different storage solution:

1. Edit `app/cms-portable/actions/events.ts` and `promoPopup.ts`
2. Replace `@vercel/blob` imports with your storage solution
3. Update `put()`, `del()`, and `list()` calls accordingly

## API Reference

### Events Actions

- `getEvents()` - Get all events
- `uploadEventFlyer()` - Upload new event
- `updateEvent()` - Update event details/images
- `deleteEvent()` - Delete event
- `toggleForceGoLive()` - Toggle force go live for event
- `forcePushEvent()` - Force push event to display
- `verifyAuth()` - Verify authentication
- `login()` - Login action
- `logout()` - Logout action

### Promo Actions

- `getPromoPopup()` - Get promo popup configuration
- `uploadPromoImage()` - Upload promo image
- `updatePromoImage()` - Update promo image details
- `deletePromoImage()` - Archive promo image
- `permanentlyDeletePromoImage()` - Permanently delete promo image
- `reinstatePromoImage()` - Reinstate archived promo
- `updatePromoPopupConfig()` - Update popup configuration
- `togglePromoForceGoLive()` - Toggle force go live for promo
- `forcePushPromo()` - Force push promo to display

## TypeScript Types

### EventPoster
```typescript
interface EventPoster {
  id: string;
  src: string;
  alt: string;
  height: number;
  width: number;
  eventDate: string; // ISO date format
  goLiveDays?: number; // Default: 15
  forceGoLive?: boolean;
}
```

### PromoPopupConfig
```typescript
interface PromoPopupConfig {
  enabled: boolean;
  type: 'single' | 'carousel';
  images: PromoImage[];
  pastPromos: PromoImage[];
  linkUrl: string | null;
  linkText: string | null;
  popupBgColor?: string; // Hex color
  buttonColor?: string; // Hex color
  forceGoLive?: boolean;
}
```

## Security Notes

- **Authentication**: Currently uses simple password comparison. For production, consider implementing proper password hashing (bcrypt, etc.)
- **File Uploads**: Images are validated for type and size (max 10MB)
- **Environment Variables**: Never commit `CMS_PASSWORD` or `BLOB_READ_WRITE_TOKEN` to version control

## Troubleshooting

### Images not uploading
- Check `BLOB_READ_WRITE_TOKEN` is set correctly
- Verify blob storage permissions
- Check file size limits (max 10MB)

### Authentication not working
- Verify `CMS_PASSWORD` is set in environment variables
- Clear browser cookies and try again
- Check cookie settings (httpOnly, secure, sameSite)

### Data not persisting
- Check file system permissions for `app/data/` directory
- Verify blob storage is accessible
- Check console for error messages

## License

This CMS system is provided as-is. Adapt and modify as needed for your project.

## Support

For issues or questions, refer to the component files for implementation details. All code is well-commented and follows React 19.2 and Next.js 16.1 best practices.
