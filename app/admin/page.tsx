import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { verifyAuth } from "./actions/residentialListings";
import { LoginForm } from "./residential/LoginForm";

export const metadata: Metadata = {
  title: "Admin CMS | Login",
  description: "Admin panel login",
  robots: {
    index: false,
    follow: false,
  },
};

// Prevent static generation - this route must be dynamic
export function generateStaticParams() {
  return [];
}

async function AdminContent() {
  const isAuthenticated = await verifyAuth();

  if (isAuthenticated) {
    redirect("/admin/residential");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <LoginForm />
    </div>
  );
}

export default async function AdminPage() {
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
      <AdminContent />
    </Suspense>
  );
}
