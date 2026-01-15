'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { forcePushPromo, togglePromoForceGoLive } from '../actions/promoPopup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PromoPopupConfig } from '../actions/promoPopup';

interface ForcePushPromoSectionProps {
  promoPopup: PromoPopupConfig;
  hasActiveEvents: boolean;
}

export function ForcePushPromoSection({
  promoPopup,
  hasActiveEvents,
}: ForcePushPromoSectionProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleForcePush = async () => {
    if (!promoPopup.enabled || promoPopup.images.length === 0) {
      alert('Please enable the promo popup and add at least one image first.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await forcePushPromo();
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || 'Failed to force push promo');
      }
    } catch (error) {
      alert('An error occurred while force pushing the promo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableForcePush = async () => {
    setIsLoading(true);
    try {
      const result = await togglePromoForceGoLive(false);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || 'Failed to disable force push');
      }
    } catch (error) {
      alert('An error occurred while disabling force push');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Force Push Promo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Force push the promo popup to display immediately, overriding any active events.
        </p>
        {promoPopup.forceGoLive ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-green-600 dark:text-green-400">
              ✓ Promo is currently force-pushed and will display on the homepage.
            </p>
            <Button
              variant="destructive"
              onClick={handleDisableForcePush}
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? 'Disabling...' : 'Disable Force Push'}
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {hasActiveEvents && (
              <p className="text-sm text-muted-foreground">
                Note: There are active events. Force pushing will override them.
              </p>
            )}
            <Button
              onClick={handleForcePush}
              disabled={isLoading || !promoPopup.enabled || promoPopup.images.length === 0}
              className="cursor-pointer"
            >
              {isLoading ? 'Force Pushing...' : 'Force Push Promo Now'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
