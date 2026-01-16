import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  getEvents as getEventsData,
  logout,
  verifyAuth,
} from "../actions/events";
import { getPromoPopup } from "../actions/promoPopup";
import { LoginForm } from "../components/LoginForm";
import {
  getGroupedEventsWithinGoLivePeriod,
  getUpcomingEventsForPopup,
} from "../lib/eventUtils";
import { groupEventPosters } from "../types/eventPosters";
import { CurrentPromoSection } from "./CurrentPromoSection";
import { ForcePushPromoSection } from "./ForcePushPromoSection";
import { PastPromosList } from "./PastPromosList";
import { PromoConfigForm } from "./PromoConfigForm";
import { PromoImagesList } from "./PromoImagesList";
import { PromoImageUploadForm } from "./PromoImageUploadForm";
import { PromoQueuedSection } from "./PromoQueuedSection";

export const metadata: Metadata = {
  title: "Promo Popup CMS | Admin",
  description: "Admin panel for managing promotional popup content",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPromoPage() {
  const isAuthenticated = await verifyAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
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
  const isPromoQueued =
    !promoPopup.enabled ||
    (activeEvents.length > 0 && !promoPopup.forceGoLive) ||
    promoPopup.images.length === 0;

  // Determine what's currently showing
  // Priority: 1) Force-pushed promo, 2) Active events, 3) Promo popup
  const isShowingPromoForce =
    promoPopup.forceGoLive &&
    promoPopup.enabled &&
    promoPopup.images.length > 0;
  const isShowingEvents = activeEvents.length > 0 && !isShowingPromoForce;
  const isShowingPromoNormal =
    !(isShowingPromoForce || isShowingEvents) &&
    promoPopup.enabled &&
    promoPopup.images.length > 0;
  const isShowingPromo = isShowingPromoForce || isShowingPromoNormal;
  const isCurrentlyShowing = isShowingPromo || isShowingEvents;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl">Promotional Content Manager</h1>
            <p className="mt-2 text-muted-foreground">
              Manage promotional popup content for the homepage
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild className="cursor-pointer" variant="outline">
              <a href="/events">Events CMS</a>
            </Button>
            <form
              action={async () => {
                "use server";
                await logout();
                redirect("/cms-portable/promo");
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

        {isCurrentlyShowing && (
          <CurrentPromoSection
            activeGroupedEvents={activeGroupedEvents}
            hasActiveEvents={activeEvents.length > 0}
            isShowingEvents={isShowingEvents}
            isShowingPromo={isShowingPromo || isShowingPromoNormal}
            promoPopup={promoPopup}
          />
        )}

        <ForcePushPromoSection
          hasActiveEvents={activeEvents.length > 0}
          promoPopup={promoPopup}
        />

        {isPromoQueued && (
          <PromoQueuedSection
            hasActiveEvents={activeEvents.length > 0}
            promoPopup={promoPopup}
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
                <h2 className="mb-2 font-semibold text-2xl">Promo Images</h2>
                <p className="mb-4 text-muted-foreground text-sm">
                  {promoPopup.images.length === 0
                    ? "Upload images to create a promo popup. Single image shows as one popup, multiple images show as a carousel."
                    : promoPopup.images.length === 1
                      ? "Single image mode: One image will be displayed"
                      : `Carousel mode: ${promoPopup.images.length} images will be displayed in a carousel`}
                </p>
              </div>
              <PromoImagesList
                images={promoPopup.images}
                linkText={promoPopup.linkText}
                linkUrl={promoPopup.linkUrl}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="mb-2 font-semibold text-2xl">Past Promos</h2>
            <p className="mb-4 text-muted-foreground text-sm">
              Archived promotional images that can be reinstated or permanently
              deleted.
            </p>
          </div>
          <PastPromosList
            linkText={promoPopup.linkText}
            linkUrl={promoPopup.linkUrl}
            pastPromos={promoPopup.pastPromos || []}
          />
        </div>
      </div>
    </div>
  );
}
