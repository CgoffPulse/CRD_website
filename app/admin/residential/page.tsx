import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { verifyAuth, logout } from '../actions/residentialListings';
import { getResidentialListings } from '../actions/residentialListings';
import { LoginForm } from './LoginForm';
import { ResidentialListingUploadForm } from './ResidentialListingUploadForm';
import { ResidentialListingsList } from './ResidentialListingsList';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Residential Listings CMS | Admin',
  description: 'Admin panel for managing residential property listings',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ResidentialListingsPage() {
  const isAuthenticated = await verifyAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <LoginForm />
      </div>
    );
  }

  const listings = await getResidentialListings();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Residential Listings CMS</h1>
            <p className="text-muted-foreground mt-2">
              Manage residential property listings
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild className="cursor-pointer">
              <a href="/admin/commercial">Commercial Listings CMS</a>
            </Button>
            <form
              action={async () => {
                'use server';
                await logout();
                redirect('/admin/residential');
              }}
            >
              <Button type="submit" variant="outline" className="cursor-pointer">
                Logout
              </Button>
            </form>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <ResidentialListingUploadForm />
          </div>
          <div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Existing Listings</h2>
              <ResidentialListingsList listings={listings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
