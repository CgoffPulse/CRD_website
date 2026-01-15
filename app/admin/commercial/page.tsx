import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { verifyAuth, logout } from '../actions/commercialListings';
import { getCommercialListings } from '../actions/commercialListings';
import { LoginForm } from './LoginForm';
import { CommercialListingUploadForm } from './CommercialListingUploadForm';
import { CommercialListingsList } from './CommercialListingsList';
import { JsonImportForm } from './JsonImportForm';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Commercial Listings CMS | Admin',
  description: 'Admin panel for managing commercial property listings',
  robots: {
    index: false,
    follow: false,
  },
};

// Prevent static generation - this route must be dynamic
export function generateStaticParams() {
  return [];
}

async function AuthenticatedContent() {
  const listings = await getCommercialListings();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Commercial Listings CMS</h1>
            <p className="text-muted-foreground mt-2">
              Manage commercial property listings (buy and lease)
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild className="cursor-pointer">
              <a href="/admin/residential">Residential Listings CMS</a>
            </Button>
            <form
              action={async () => {
                'use server';
                await logout();
                redirect('/admin/commercial');
              }}
            >
              <Button type="submit" variant="outline" className="cursor-pointer">
                Logout
              </Button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <CommercialListingUploadForm />
            </div>
            <div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Existing Listings</h2>
                <CommercialListingsList listings={listings} />
              </div>
            </div>
          </div>
          
          <div>
            <JsonImportForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function CommercialListingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <AuthWrapper />
    </Suspense>
  );
}

async function AuthWrapper() {
  const isAuthenticated = await verifyAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <LoginForm />
      </div>
    );
  }

  return <AuthenticatedContent />;
}
