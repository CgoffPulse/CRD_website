"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { importCommercialListingsFromJson } from "../actions/commercialListings";

interface ImportState {
  success?: boolean;
  error?: string;
  importedCount?: number;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full cursor-pointer"
      disabled={pending}
      type="submit"
      variant="outline"
    >
      {pending ? "Importing..." : "Import Listings from JSON"}
    </Button>
  );
}

export function JsonImportForm() {
  const [state, formAction] = useActionState<ImportState, FormData>(
    importCommercialListingsFromJson,
    {}
  );
  const [jsonText, setJsonText] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleLoadExample = async () => {
    try {
      const response = await fetch("/data/hardcoded-commercial-listings.json");
      if (response.ok) {
        const data = await response.json();
        setJsonText(JSON.stringify(data, null, 2));
      } else {
        console.error("Could not load example JSON file");
      }
    } catch (error) {
      console.error(
        `Error loading example JSON: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  const handleClear = () => {
    setJsonText("");
    formRef.current?.reset();
  };

  useEffect(() => {
    if (state?.success) {
      setJsonText("");
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <Card className="w-full border border-orange-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-orange-600 text-sm">
              🔧 Dev Tool: Import from JSON
            </CardTitle>
            <CardDescription className="text-xs">
              Bulk import commercial listings from JSON
            </CardDescription>
          </div>
          <Button
            className="cursor-pointer"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
            size="sm"
            type="button"
            variant="ghost"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
        <form
          action={async (formData: FormData) => {
            formData.set("jsonData", jsonText);
            await formAction(formData);
          }}
          className="space-y-4"
          ref={formRef}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="jsonData">JSON Data</Label>
              <div className="flex gap-2">
                <Button
                  className="cursor-pointer"
                  onClick={handleLoadExample}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Load Example
                </Button>
                <Button
                  className="cursor-pointer"
                  onClick={handleClear}
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  Clear
                </Button>
              </div>
            </div>
            <Textarea
              className="bg-background font-mono text-foreground text-sm"
              id="jsonData"
              name="jsonData"
              onChange={(e) => setJsonText(e.target.value)}
              placeholder='[{"id": "123", "title": "Example Listing", "price": "$100,000", "location": "123 Main St", "bullets": [], "href": "/commercial/buy/123", "isLease": false, ...}]'
              required
              rows={8}
              value={jsonText}
            />
            <p className="text-muted-foreground text-xs">
              Paste JSON array of commercial listings. Each listing should match
              the CommercialListing type structure. Use "Load Example" to see
              the format of the hardcoded listings. Remember to set "isLease":
              true for lease listings.
            </p>
          </div>

          {state?.error && (
            <div className="rounded-md border border-destructive bg-destructive/10 p-3">
              <p className="font-medium text-destructive text-sm">
                {state.error}
              </p>
            </div>
          )}
          {state?.success && (
            <div className="rounded-md border border-green-500 bg-green-100 p-3">
              <p className="font-medium text-green-700 text-sm">
                Successfully imported {state.importedCount || 0} listing(s)!
              </p>
            </div>
          )}

          <SubmitButton />
        </form>
      </CardContent>
      )}
    </Card>
  );
}
