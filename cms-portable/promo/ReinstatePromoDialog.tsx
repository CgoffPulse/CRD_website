'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { reinstatePromoImage } from '../actions/promoPopup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { PromoImage } from '../actions/promoPopup';

type ReinstateState = {
  success?: boolean;
  error?: string;
};

// React 19 pattern: useFormStatus in child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="cursor-pointer">
      {pending ? 'Reinstating...' : 'Reinstate Promo'}
    </Button>
  );
}

interface ReinstatePromoDialogProps {
  imageId: string;
  image: PromoImage | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReinstatePromoDialog({
  imageId,
  image,
  open,
  onOpenChange,
}: ReinstatePromoDialogProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [durationDays, setDurationDays] = useState<number>(7);

  const reinstateAction = async (prevState: ReinstateState): Promise<ReinstateState> => {
    const result = await reinstatePromoImage(imageId, durationDays);
    if (result.success) {
      formRef.current?.reset();
      router.refresh();
      onOpenChange(false);
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const [state, formAction] = useActionState<ReinstateState, void>(reinstateAction, {});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (durationDays < 1) {
      return;
    }
    formAction();
  };

  if (!image) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reinstate Promo</DialogTitle>
          <DialogDescription>
            Set how many days this promo should be active. It will automatically expire after this duration.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full max-w-xs mx-auto overflow-hidden rounded-lg border">
              {image.src.startsWith('https://') ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 500px) 100vw, 500px"
                />
              ) : (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                value={durationDays}
                onChange={(e) => {
                  setDurationDays(Number.parseInt(e.target.value, 10) || 1);
                }}
                required
              />
              <p className="text-xs text-muted-foreground">
                This promo will be active for {durationDays} day{durationDays !== 1 ? 's' : ''} and will automatically expire.
              </p>
            </div>
            {state.error && (
              <p className="text-sm text-destructive">{state.error}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
              }}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
