import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getEvents, logout, verifyAuth } from "../actions/events";
import { LoginForm } from "../components/LoginForm";
import { EventsList } from "./EventsList";
import { EventUploadForm } from "./EventUploadForm";
import { ForcePushEventSection } from "./ForcePushEventSection";

export const metadata: Metadata = {
  title: "Events CMS | Admin",
  description: "Admin panel for managing event flyers and promotions",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminEventsPage() {
  const isAuthenticated = await verifyAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <LoginForm />
      </div>
    );
  }

  const events = await getEvents();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl">Content Management System</h1>
            <p className="mt-2 text-muted-foreground">
              Manage event flyers and promotional content
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild className="cursor-pointer" variant="outline">
              <a href="/promo">Promo CMS</a>
            </Button>
            <form
              action={async () => {
                "use server";
                await logout();
                redirect("/cms-portable/events");
              }}
            >
              <Button
                className="cursor-pointer"
                type="submit"
                variant="outline"
              >
                Logout
              </Button>
            </form>
          </div>
        </div>

        <ForcePushEventSection events={events} />

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <EventUploadForm />
          </div>
          <div>
            <div className="space-y-4">
              <h2 className="font-semibold text-2xl">Existing Events</h2>
              <EventsList events={events} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
