"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PromoImage } from "../actions/promoPopup";
import { reinstatePromoImage } from "../actions/promoPopup";

interface ReinstateState {
  success?: boolean;
  error?: string;
}

// React 19 pattern: useFormStatus in child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="cursor-pointer" disabled={pending} type="submit">
      {pending ? "Reinstating..." : "Reinstate Promo"}
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

  const reinstateAction = async (
    _prevState: ReinstateState
  ): Promise<ReinstateState> => {
    const result = await reinstatePromoImage(imageId, durationDays);
    if (result.success) {
      formRef.current?.reset();
      router.refresh();
      onOpenChange(false);
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const [state, formAction] = useActionState<ReinstateState, void>(
    reinstateAction,
    {}
  );

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
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reinstate Promo</DialogTitle>
          <DialogDescription>
            Set how many days this promo should be active. It will automatically
            expire after this duration.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
          <div className="space-y-4">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-lg border">
              {image.src.startsWith("https://") ? (
                <Image
                  alt={image.alt}
                  className="object-cover"
                  fill
                  sizes="(max-width: 500px) 100vw, 500px"
                  src={image.src}
                />
              ) : (
                <img
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  src={image.src}
                />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (days)</Label>
              <Input
                id="duration"
                min="1"
                onChange={(e) => {
                  setDurationDays(Number.parseInt(e.target.value, 10) || 1);
                }}
                required
                type="number"
                value={durationDays}
              />
              <p className="text-muted-foreground text-xs">
                This promo will be active for {durationDays} day
                {durationDays !== 1 ? "s" : ""} and will automatically expire.
              </p>
            </div>
            {state.error && (
              <p className="text-destructive text-sm">{state.error}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              onClick={() => {
                onOpenChange(false);
              }}
              type="button"
              variant="outline"
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
