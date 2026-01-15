import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
	title: 'CMS Portal | Admin',
	description: 'Content Management System portal',
	robots: {
		index: false,
		follow: false,
	},
};

export default function CMSPortalPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Content Management System</h1>
          <p className="text-muted-foreground text-lg">
            Manage your website content and promotional materials
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Events Management</CardTitle>
              <CardDescription>
                Upload and manage event flyers, set go-live dates, and control when events appear on your website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full cursor-pointer">
                <a href="/cms-portable/events">Go to Events CMS</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Promotional Content</CardTitle>
              <CardDescription>
                Manage promotional popups, configure display settings, and control when promotional content appears.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full cursor-pointer">
                <a href="/cms-portable/promo">Go to Promo CMS</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Upload single or multi-page event flyers</li>
              <li>• Set automatic go-live dates for events</li>
              <li>• Force push events or promos to display immediately</li>
              <li>• Manage promotional popups with carousel support</li>
              <li>• Archive and reinstate promotional content</li>
              <li>• Customize colors and link configurations</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
