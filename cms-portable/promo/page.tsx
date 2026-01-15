import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { verifyAuth } from '../actions/events';
import { getPromoPopup } from '../actions/promoPopup';
import { getEvents as getEventsData } from '../actions/events';
import { getUpcomingEventsForPopup, getGroupedEventsWithinGoLivePeriod } from '../lib/eventUtils';
import { groupEventPosters } from '../types/eventPosters';
import { LoginForm } from '../components/LoginForm';
import { PromoImageUploadForm } from './PromoImageUploadForm';
import { PromoImagesList } from './PromoImagesList';
import { PromoConfigForm } from './PromoConfigForm';
import { PromoQueuedSection } from './PromoQueuedSection';
import { CurrentPromoSection } from './CurrentPromoSection';
import { PastPromosList } from './PastPromosList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { logout } from '../actions/events';
import { forcePushPromo, togglePromoForceGoLive } from '../actions/promoPopup';
import { ForcePushPromoSection } from './ForcePushPromoSection';

export const metadata: Metadata = {
	title: 'Promo Popup CMS | Admin',
	description: 'Admin panel for managing promotional popup content',
	robots: {
		index: false,
		follow: false,
	},
};

export default async function AdminPromoPage() {
  const isAuthenticated = await verifyAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <LoginForm />
      </div>
    );
  }

  const promoPopup = await getPromoPopup();
  const events = await getEventsData();
  const activeEvents = getUpcomingEventsForPopup(events);
  const groupedEvents = groupEventPosters(events);
  const activeGroupedEvents = getGroupedEventsWithinGoLivePeriod(groupedEvents);
  
  // Check if promo is queued (not currently showing)
  const isPromoQueued = !promoPopup.enabled || 
    (activeEvents.length > 0 && !promoPopup.forceGoLive) ||
    promoPopup.images.length === 0;
  
  // Determine what's currently showing
  // Priority: 1) Force-pushed promo, 2) Active events, 3) Promo popup
  const isShowingPromoForce = promoPopup.forceGoLive && promoPopup.enabled && promoPopup.images.length > 0;
  const isShowingEvents = activeEvents.length > 0 && !isShowingPromoForce;
  const isShowingPromoNormal = !isShowingPromoForce && !isShowingEvents && promoPopup.enabled && promoPopup.images.length > 0;
  const isShowingPromo = isShowingPromoForce || isShowingPromoNormal;
  const isCurrentlyShowing = isShowingPromo || isShowingEvents;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Promotional Content Manager</h1>
            <p className="text-muted-foreground mt-2">
              Manage promotional popup content for the homepage
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild className="cursor-pointer">
              <a href="/events">Events CMS</a>
            </Button>
            <form
              action={async () => {
                'use server';
                await logout();
                redirect('/cms-portable/promo');
              }}
            >
              <Button type="submit" variant="outline" className="cursor-pointer">
                Logout
              </Button>
            </form>
          </div>
        </div>

        {isCurrentlyShowing && (
          <CurrentPromoSection 
            promoPopup={promoPopup} 
            hasActiveEvents={activeEvents.length > 0}
            activeGroupedEvents={activeGroupedEvents}
            isShowingPromo={isShowingPromo || isShowingPromoNormal}
            isShowingEvents={isShowingEvents}
          />
        )}

        <ForcePushPromoSection 
          promoPopup={promoPopup}
          hasActiveEvents={activeEvents.length > 0}
        />

        {isPromoQueued && (
          <PromoQueuedSection 
            promoPopup={promoPopup} 
            hasActiveEvents={activeEvents.length > 0}
          />
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <PromoConfigForm config={promoPopup} />
            <PromoImageUploadForm />
          </div>
          <div>
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Promo Images</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {promoPopup.images.length === 0
                    ? 'Upload images to create a promo popup. Single image shows as one popup, multiple images show as a carousel.'
                    : promoPopup.images.length === 1
                      ? 'Single image mode: One image will be displayed'
                      : `Carousel mode: ${promoPopup.images.length} images will be displayed in a carousel`}
                </p>
              </div>
              <PromoImagesList 
                images={promoPopup.images} 
                linkUrl={promoPopup.linkUrl}
                linkText={promoPopup.linkText}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Past Promos</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Archived promotional images that can be reinstated or permanently deleted.
            </p>
          </div>
          <PastPromosList 
            pastPromos={promoPopup.pastPromos || []}
            linkUrl={promoPopup.linkUrl}
            linkText={promoPopup.linkText}
          />
        </div>
      </div>
    </div>
  );
}
