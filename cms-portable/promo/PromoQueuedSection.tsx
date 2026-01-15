'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { togglePromoForceGoLive } from '../actions/promoPopup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PromoPopupConfig } from '../actions/promoPopup';

interface PromoQueuedSectionProps {
  promoPopup: PromoPopupConfig;
  hasActiveEvents: boolean;
}

export function PromoQueuedSection({ promoPopup, hasActiveEvents }: PromoQueuedSectionProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const isForceGoLive = promoPopup.forceGoLive || false;

  const handleForceGoLive = async () => {
    setIsPending(true);
    try {
      const result = await togglePromoForceGoLive(!isForceGoLive);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || 'Failed to toggle force go live');
      }
    } catch (error) {
      alert('An error occurred while toggling force go live');
    } finally {
      setIsPending(false);
    }
  };

  let reason = '';
  if (!promoPopup.enabled) {
    reason = 'Promo popup is disabled';
  } else if (promoPopup.images.length === 0) {
    reason = 'No promo images uploaded';
  } else if (hasActiveEvents && !isForceGoLive) {
    reason = 'Active events are currently showing (events take priority)';
  }

  return (
    <Card className="border-yellow-500/50 bg-yellow-500/5">
      <CardHeader>
        <CardTitle>Queued Promo Popup</CardTitle>
        <CardDescription>
          {reason}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {isForceGoLive
                ? 'Force Go Live is active - promo will show even if events are active'
                : 'Promo popup is queued and will show when no events are active'}
            </p>
          </div>
          {promoPopup.enabled && promoPopup.images.length > 0 && (
            <Button
              variant={isForceGoLive ? 'default' : 'secondary'}
              onClick={handleForceGoLive}
              disabled={isPending}
              className="cursor-pointer"
            >
              {isPending
                ? 'Updating...'
                : isForceGoLive
                  ? 'Disable Force Go Live'
                  : 'Force Go Live Now'}
            </Button>
          )}
        </div>
        {isForceGoLive && (
          <p className="text-xs text-green-600 dark:text-green-400">
            ✓ Force Go Live Active - Promo popup will override event flyers
          </p>
        )}
      </CardContent>
    </Card>
  );
}
