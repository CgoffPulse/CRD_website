"use client";

import { useRouter } from "next/navigation";
import {
  useActionState,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PromoPopupConfig } from "../actions/promoPopup";
import { updatePromoPopupConfigAction } from "../actions/promoPopup";

interface PromoConfigFormProps {
  config: PromoPopupConfig;
}

interface PromoConfigState {
  success?: boolean;
  error?: string;
}

interface OptimisticConfig {
  enabled: boolean;
  linkUrl: string;
  linkText: string;
  popupBgColor: string;
  buttonColor: string;
}

// React 19 pattern: useFormStatus in child component
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full cursor-pointer" disabled={pending} type="submit">
      {pending ? "Saving..." : "Save Configuration"}
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
    { type: "set"; config: OptimisticConfig } | { type: "clear" }
  >(null, (_current, action) => {
    if (action.type === "clear") {
      return null;
    }
    return action.config;
  });
  const [enabled, setEnabled] = useState(config.enabled);
  const [linkUrl, setLinkUrl] = useState(config.linkUrl || "");
  const [linkText, setLinkText] = useState(config.linkText || "");
  const [popupBgColor, setPopupBgColor] = useState(
    config.popupBgColor || "#FFFFFF"
  );
  const [buttonColor, setButtonColor] = useState(
    config.buttonColor || "#000000"
  );

  useEffect(() => {
    if (state?.success) {
      updateOptimisticConfig({ type: "clear" });
      router.refresh();
    }
  }, [state, router, updateOptimisticConfig]);

  const handleSubmit = async (formData: FormData) => {
    updateOptimisticConfig({
      type: "set",
      config: {
        enabled,
        linkUrl,
        linkText,
        popupBgColor,
        buttonColor,
      },
    });
    formData.set("enabled", enabled.toString());
    if (linkUrl) {
      formData.set("linkUrl", linkUrl);
    }
    if (linkText) {
      formData.set("linkText", linkText);
    }
    formData.set("popupBgColor", popupBgColor);
    formData.set("buttonColor", buttonColor);
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
            <p className="mb-2 font-semibold text-black text-sm">
              Pending configuration update
            </p>
            <div className="space-y-1 text-gray-700 text-sm">
              <div>
                <span className="font-medium text-black">Enabled:</span>{" "}
                {optimisticConfig.enabled ? "Yes" : "No"}
              </div>
              <div>
                <span className="font-medium text-black">Link text:</span>{" "}
                {optimisticConfig.linkText || "Not set"}
              </div>
              <div>
                <span className="font-medium text-black">Link URL:</span>{" "}
                {optimisticConfig.linkUrl || "Not set"}
              </div>
            </div>
          </div>
        )}
        <form action={handleSubmit} className="space-y-4" ref={formRef}>
          <div className="flex items-center space-x-2">
            <input
              checked={enabled}
              className="h-4 w-4 rounded border-gray-300"
              id="enabled"
              onChange={(e) => {
                setEnabled(e.target.checked);
              }}
              type="checkbox"
            />
            <Label
              className="cursor-pointer font-medium text-sm"
              htmlFor="enabled"
            >
              Enable Promo Popup
            </Label>
          </div>
          <p className="text-muted-foreground text-xs">
            The promo popup will only show when there are no event flyers within
            their go-live period. When enabled, it will display when no events
            are active.
          </p>

          <div className="space-y-2">
            <Label htmlFor="linkUrl">Link URL (Optional)</Label>
            <Input
              className="bg-background text-foreground"
              id="linkUrl"
              onChange={(e) => {
                setLinkUrl(e.target.value);
              }}
              placeholder="/menu"
              type="url"
              value={linkUrl}
            />
            <p className="text-muted-foreground text-xs">
              URL to navigate to when user clicks the button (e.g., /menu,
              /products)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkText">Link Button Text (Optional)</Label>
            <Input
              className="bg-background text-foreground"
              id="linkText"
              onChange={(e) => {
                setLinkText(e.target.value);
              }}
              placeholder="Learn More"
              type="text"
              value={linkText}
            />
            <p className="text-muted-foreground text-xs">
              Text to display on the button (default: "Learn More")
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="popupBgColor">Popup Background Color</Label>
            <div className="flex items-center gap-2">
              <Input
                className="h-10 w-20 cursor-pointer"
                id="popupBgColor"
                onChange={(e) => {
                  setPopupBgColor(e.target.value);
                }}
                type="color"
                value={popupBgColor}
              />
              <Input
                className="flex-1 bg-background text-foreground"
                onChange={(e) => {
                  setPopupBgColor(e.target.value);
                }}
                placeholder="#FFFFFF"
                type="text"
                value={popupBgColor}
              />
            </div>
            <p className="text-muted-foreground text-xs">
              Background color for the popup dialog (hex format)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="buttonColor">Button Color</Label>
            <div className="flex items-center gap-2">
              <Input
                className="h-10 w-20 cursor-pointer"
                id="buttonColor"
                onChange={(e) => {
                  setButtonColor(e.target.value);
                }}
                type="color"
                value={buttonColor}
              />
              <Input
                className="flex-1 bg-background text-foreground"
                onChange={(e) => {
                  setButtonColor(e.target.value);
                }}
                placeholder="#000000"
                type="text"
                value={buttonColor}
              />
            </div>
            <p className="text-muted-foreground text-xs">
              Color for the button (hex format)
            </p>
          </div>

          {state?.error && (
            <p className="font-medium text-destructive text-sm">
              {state.error}
            </p>
          )}
          {state?.success && (
            <p className="font-medium text-green-600 text-sm">
              Promo popup configuration updated successfully!
            </p>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
