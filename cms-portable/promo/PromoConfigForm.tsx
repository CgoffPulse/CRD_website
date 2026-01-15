'use client';

import { useState, useEffect, useRef, useOptimistic } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updatePromoPopupConfigAction } from '../actions/promoPopup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PromoPopupConfig } from '../actions/promoPopup';

interface PromoConfigFormProps {
  config: PromoPopupConfig;
}

type PromoConfigState = {
  success?: boolean;
  error?: string;
};

type OptimisticConfig = {
  enabled: boolean;
  linkUrl: string;
  linkText: string;
  popupBgColor: string;
  buttonColor: string;
};

// React 19 pattern: useFormStatus in child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full cursor-pointer">
      {pending ? 'Saving...' : 'Save Configuration'}
    </Button>
  );
}

export function PromoConfigForm({ config }: PromoConfigFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState<PromoConfigState, FormData>(
    updatePromoPopupConfigAction,
    {}
  );
  const [optimisticConfig, updateOptimisticConfig] = useOptimistic<
    OptimisticConfig | null,
    { type: 'set'; config: OptimisticConfig } | { type: 'clear' }
  >(null, (current, action) => {
    if (action.type === 'clear') {
      return null;
    }
    return action.config;
  });
  const [enabled, setEnabled] = useState(config.enabled);
  const [linkUrl, setLinkUrl] = useState(config.linkUrl || '');
  const [linkText, setLinkText] = useState(config.linkText || '');
  const [popupBgColor, setPopupBgColor] = useState(config.popupBgColor || '#FFFFFF');
  const [buttonColor, setButtonColor] = useState(config.buttonColor || '#000000');

  useEffect(() => {
    if (state?.success) {
      updateOptimisticConfig({ type: 'clear' });
      router.refresh();
    }
  }, [state, router, updateOptimisticConfig]);

  const handleSubmit = async (formData: FormData) => {
    updateOptimisticConfig({
      type: 'set',
      config: {
        enabled,
        linkUrl,
        linkText,
        popupBgColor,
        buttonColor,
      },
    });
    formData.set('enabled', enabled.toString());
    if (linkUrl) {
      formData.set('linkUrl', linkUrl);
    }
    if (linkText) {
      formData.set('linkText', linkText);
    }
    formData.set('popupBgColor', popupBgColor);
    formData.set('buttonColor', buttonColor);
    await formAction(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Promo Popup Configuration</CardTitle>
        <CardDescription>
          Configure when and how the promo popup appears on the homepage
        </CardDescription>
      </CardHeader>
      <CardContent>
        {optimisticConfig && (
          <div className="mb-6 rounded border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-semibold text-black mb-2">Pending configuration update</p>
            <div className="text-sm text-gray-700 space-y-1">
              <div>
                <span className="font-medium text-black">Enabled:</span> {optimisticConfig.enabled ? 'Yes' : 'No'}
              </div>
              <div>
                <span className="font-medium text-black">Link text:</span> {optimisticConfig.linkText || 'Not set'}
              </div>
              <div>
                <span className="font-medium text-black">Link URL:</span> {optimisticConfig.linkUrl || 'Not set'}
              </div>
            </div>
          </div>
        )}
        <form ref={formRef} action={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enabled"
              checked={enabled}
              onChange={(e) => {
                setEnabled(e.target.checked);
              }}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="enabled" className="text-sm font-medium cursor-pointer">
              Enable Promo Popup
            </Label>
          </div>
          <p className="text-xs text-muted-foreground">
            The promo popup will only show when there are no event flyers within their go-live period.
            When enabled, it will display when no events are active.
          </p>

          <div className="space-y-2">
            <Label htmlFor="linkUrl">Link URL (Optional)</Label>
            <Input
              id="linkUrl"
              type="url"
              value={linkUrl}
              onChange={(e) => {
                setLinkUrl(e.target.value);
              }}
              placeholder="/menu"
              className="bg-background text-foreground"
            />
            <p className="text-xs text-muted-foreground">
              URL to navigate to when user clicks the button (e.g., /menu, /products)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkText">Link Button Text (Optional)</Label>
            <Input
              id="linkText"
              type="text"
              value={linkText}
              onChange={(e) => {
                setLinkText(e.target.value);
              }}
              placeholder="Learn More"
              className="bg-background text-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Text to display on the button (default: "Learn More")
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="popupBgColor">Popup Background Color</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="popupBgColor"
                type="color"
                value={popupBgColor}
                onChange={(e) => {
                  setPopupBgColor(e.target.value);
                }}
                className="h-10 w-20 cursor-pointer"
              />
              <Input
                type="text"
                value={popupBgColor}
                onChange={(e) => {
                  setPopupBgColor(e.target.value);
                }}
                placeholder="#FFFFFF"
                className="flex-1 bg-background text-foreground"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Background color for the popup dialog (hex format)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="buttonColor">Button Color</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="buttonColor"
                type="color"
                value={buttonColor}
                onChange={(e) => {
                  setButtonColor(e.target.value);
                }}
                className="h-10 w-20 cursor-pointer"
              />
              <Input
                type="text"
                value={buttonColor}
                onChange={(e) => {
                  setButtonColor(e.target.value);
                }}
                placeholder="#000000"
                className="flex-1 bg-background text-foreground"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Color for the button (hex format)
            </p>
          </div>

          {state?.error && (
            <p className="text-sm font-medium text-destructive">
              {state.error}
            </p>
          )}
          {state?.success && (
            <p className="text-sm font-medium text-green-600">
              Promo popup configuration updated successfully!
            </p>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
