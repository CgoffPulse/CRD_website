import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { verifyAuth, getEvents } from '../actions/events';
import { LoginForm } from '../components/LoginForm';
import { EventUploadForm } from './EventUploadForm';
import { EventsList } from './EventsList';
import { ForcePushEventSection } from './ForcePushEventSection';
import { Button } from '@/components/ui/button';
import { logout } from '../actions/events';

export const metadata: Metadata = {
	title: 'Events CMS | Admin',
	description: 'Admin panel for managing event flyers and promotions',
	robots: {
		index: false,
		follow: false,
	},
};

export default async function AdminEventsPage() {
  const isAuthenticated = await verifyAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <LoginForm />
      </div>
    );
  }

  const events = await getEvents();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Content Management System</h1>
            <p className="text-muted-foreground mt-2">
              Manage event flyers and promotional content
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild className="cursor-pointer">
              <a href="/cms-portable/promo">Promo CMS</a>
            </Button>
            <form
              action={async () => {
                'use server';
                await logout();
                redirect('/cms-portable/events');
              }}
            >
              <Button type="submit" variant="outline" className="cursor-pointer">
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
              <h2 className="text-2xl font-semibold">Existing Events</h2>
              <EventsList events={events} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
