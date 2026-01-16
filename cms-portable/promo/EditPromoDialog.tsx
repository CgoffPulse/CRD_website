"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
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
import { updatePromoImage } from "../actions/promoPopup";

interface UpdateState {
  success?: boolean;
  error?: string;
}

// React 19 pattern: useFormStatus in child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="cursor-pointer" disabled={pending} type="submit">
      {pending ? "Updating..." : "Update Promo"}
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
  const [alt, setAlt] = useState<string>("");
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [linkText, setLinkText] = useState<string>("");

  // Load current values when dialog opens
  useEffect(() => {
    if (open && image) {
      setAlt(image.alt);
      setLinkUrl(initialLinkUrl || "");
      setLinkText(initialLinkText || "");
    }
  }, [open, image, initialLinkUrl, initialLinkText]);

  const updateAction = async (
    _prevState: UpdateState
  ): Promise<UpdateState> => {
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

  const [state, formAction] = useActionState<UpdateState, void>(
    updateAction,
    {}
  );

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
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Promo</DialogTitle>
          <DialogDescription>
            Update the alt text and link configuration for this promo image.
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
              <Label htmlFor="alt">Alt Text</Label>
              <Input
                id="alt"
                onChange={(e) => {
                  setAlt(e.target.value);
                }}
                required
                value={alt}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkUrl">Link URL (optional)</Label>
              <Input
                id="linkUrl"
                onChange={(e) => {
                  setLinkUrl(e.target.value);
                }}
                placeholder="https://example.com"
                type="url"
                value={linkUrl}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkText">Link Text (optional)</Label>
              <Input
                id="linkText"
                onChange={(e) => {
                  setLinkText(e.target.value);
                }}
                placeholder="Click here"
                value={linkText}
              />
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
