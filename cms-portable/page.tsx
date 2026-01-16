import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "CMS Portal | Admin",
  description: "Content Management System portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CMSPortalPage() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-4xl">Content Management System</h1>
          <p className="text-lg text-muted-foreground">
            Manage your website content and promotional materials
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Events Management</CardTitle>
              <CardDescription>
                Upload and manage event flyers, set go-live dates, and control
                when events appear on your website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full cursor-pointer">
                <a href="/events">Go to Events CMS</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Promotional Content</CardTitle>
              <CardDescription>
                Manage promotional popups, configure display settings, and
                control when promotional content appears.
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
            <ul className="space-y-2 text-muted-foreground text-sm">
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
