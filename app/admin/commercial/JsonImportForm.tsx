'use client';

import { useState, useRef, useEffect } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { importCommercialListingsFromJson } from '../actions/commercialListings';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

type ImportState = {
  success?: boolean;
  error?: string;
  importedCount?: number;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full cursor-pointer" variant="outline">
      {pending ? 'Importing...' : 'Import Listings from JSON'}
    </Button>
  );
}

export function JsonImportForm() {
  const [state, formAction] = useActionState<ImportState, FormData>(
    importCommercialListingsFromJson,
    {}
  );
  const [jsonText, setJsonText] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleLoadExample = async () => {
    try {
      const response = await fetch('/data/hardcoded-commercial-listings.json');
      if (response.ok) {
        const data = await response.json();
        setJsonText(JSON.stringify(data, null, 2));
      } else {
        alert('Could not load example JSON file');
      }
    } catch (error) {
      alert('Error loading example JSON: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleClear = () => {
    setJsonText('');
    formRef.current?.reset();
  };

  useEffect(() => {
    if (state?.success) {
      setJsonText('');
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <Card className="w-full border-orange-500 border-2">
      <CardHeader>
        <CardTitle className="text-orange-600">🔧 Dev Tool: Import from JSON</CardTitle>
        <CardDescription>
          Import one or more commercial listings from JSON format. Useful for bulk imports or restoring hardcoded listings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          action={async (formData: FormData) => {
            formData.set('jsonData', jsonText);
            await formAction(formData);
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="jsonData">JSON Data</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleLoadExample}
                  className="cursor-pointer"
                >
                  Load Example
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClear}
                  className="cursor-pointer"
                >
                  Clear
                </Button>
              </div>
            </div>
            <Textarea
              id="jsonData"
              name="jsonData"
              rows={15}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder='[{"id": "123", "title": "Example Listing", "price": "$100,000", "location": "123 Main St", "bullets": [], "href": "/commercial/buy/123", "isLease": false, ...}]'
              className="bg-background text-foreground font-mono text-sm"
              required
            />
            <p className="text-xs text-muted-foreground">
              Paste JSON array of commercial listings. Each listing should match the CommercialListing type structure.
              Use "Load Example" to see the format of the hardcoded listings. Remember to set "isLease": true for lease listings.
            </p>
          </div>

          {state?.error && (
            <div className="p-3 bg-destructive/10 border border-destructive rounded-md">
              <p className="text-sm text-destructive font-medium">{state.error}</p>
            </div>
          )}
          {state?.success && (
            <div className="p-3 bg-green-100 border border-green-500 rounded-md">
              <p className="text-sm text-green-700 font-medium">
                Successfully imported {state.importedCount || 0} listing(s)!
              </p>
            </div>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
