import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  createTestResidentialListing,
  getResidentialListings,
  logout,
  verifyAuth,
} from "../actions/residentialListings";
import { JsonImportForm } from "./JsonImportForm";
import { LoginForm } from "./LoginForm";
import { ResidentialListingsList } from "./ResidentialListingsList";
import { ResidentialListingUploadForm } from "./ResidentialListingUploadForm";

export const metadata: Metadata = {
  title: "Residential Listings CMS | Admin",
  description: "Admin panel for managing residential property listings",
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
  const listings = await getResidentialListings(true);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl">Residential Listings CMS</h1>
            <p className="mt-2 text-muted-foreground">
              Manage residential property listings
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              className="cursor-pointer transition-colors hover:bg-black hover:text-white"
              variant="outline"
            >
              <a href="/admin/commercial">Commercial Listings CMS</a>
            </Button>
            <form
              action={async () => {
                "use server";
                await logout();
                redirect("/admin/residential");
              }}
            >
              <Button
                className="cursor-pointer transition-colors hover:bg-black hover:text-white"
                type="submit"
                variant="outline"
              >
                Logout
              </Button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <ResidentialListingUploadForm />
            </div>
            <div>
              <div className="space-y-4">
                <h2 className="font-semibold text-2xl">Existing Listings</h2>
                <ResidentialListingsList listings={listings} />
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div className="rounded border border-orange-300 bg-orange-50 p-4">
              <h3 className="mb-2 font-semibold text-sm text-orange-900">
                Dev Tools
              </h3>
              <form
                action={async () => {
                  "use server";
                  try {
                    const result = await createTestResidentialListing();
                    if (!result.success) {
                      throw new Error(result.error || "Failed to create test listing");
                    }
                    redirect("/admin/residential");
                  } catch (error) {
                    console.error("Failed to create test listing:", error);
                    throw error;
                  }
                }}
              >
                <Button
                  className="bg-orange-500 text-white hover:bg-orange-600"
                  size="sm"
                  type="submit"
                >
                  Create Test Listing
                </Button>
              </form>
            </div>
            <JsonImportForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ResidentialListingsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }
    >
      <AuthWrapper />
    </Suspense>
  );
}

async function AuthWrapper() {
  const isAuthenticated = await verifyAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <LoginForm />
      </div>
    );
  }

  return <AuthenticatedContent />;
}
