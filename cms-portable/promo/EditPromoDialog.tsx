'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { updatePromoImage } from '../actions/promoPopup';
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

type UpdateState = {
  success?: boolean;
  error?: string;
};

// React 19 pattern: useFormStatus in child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="cursor-pointer">
      {pending ? 'Updating...' : 'Update Promo'}
    </Button>
  );
}

interface EditPromoDialogProps {
  imageId: string;
  image: PromoImage | undefined;
  linkUrl?: string | null;
  linkText?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditPromoDialog({
  imageId,
  image,
  linkUrl: initialLinkUrl,
  linkText: initialLinkText,
  open,
  onOpenChange,
}: EditPromoDialogProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [alt, setAlt] = useState<string>('');
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [linkText, setLinkText] = useState<string>('');

  // Load current values when dialog opens
  useEffect(() => {
    if (open && image) {
      setAlt(image.alt);
      setLinkUrl(initialLinkUrl || '');
      setLinkText(initialLinkText || '');
    }
  }, [open, image, initialLinkUrl, initialLinkText]);

  const updateAction = async (prevState: UpdateState): Promise<UpdateState> => {
    const result = await updatePromoImage(
      imageId,
      alt,
      linkUrl || null,
      linkText || null
    );
    if (result.success) {
      formRef.current?.reset();
      router.refresh();
      onOpenChange(false);
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const [state, formAction] = useActionState<UpdateState, void>(updateAction, {});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!alt.trim()) {
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
          <DialogTitle>Edit Promo</DialogTitle>
          <DialogDescription>
            Update the alt text and link configuration for this promo image.
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
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                value={alt}
                onChange={(e) => {
                  setAlt(e.target.value);
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkUrl">Link URL (optional)</Label>
              <Input
                id="linkUrl"
                type="url"
                value={linkUrl}
                onChange={(e) => {
                  setLinkUrl(e.target.value);
                }}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkText">Link Text (optional)</Label>
              <Input
                id="linkText"
                value={linkText}
                onChange={(e) => {
                  setLinkText(e.target.value);
                }}
                placeholder="Click here"
              />
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
