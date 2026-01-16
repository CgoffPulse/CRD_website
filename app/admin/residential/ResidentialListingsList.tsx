"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  deleteResidentialListing,
  unarchiveResidentialListing,
} from "../actions/residentialListings";
import type { ResidentialListing } from "../types/listings";
import { ResidentialListingEditForm } from "./ResidentialListingEditForm";

interface ResidentialListingsListProps {
  listings: ResidentialListing[];
}

export function ResidentialListingsList({
  listings,
}: ResidentialListingsListProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState<string | null>(null);
  const [editingListing, setEditingListing] =
    useState<ResidentialListing | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [, startTransition] = useTransition();

  const [optimisticListings, updateOptimisticListings] = useOptimistic<
    ResidentialListing[],
    | { type: "archive"; id: string }
    | { type: "unarchive"; id: string }
    | { type: "delete"; id: string }
    | { type: "reset"; listings: ResidentialListing[] }
  >(listings, (current, action) => {
    if (action.type === "reset") {
      return action.listings;
    }
    if (action.type === "archive") {
      return current.map((listing) => {
        if (listing.id === action.id) {
          return { ...listing, archived: true };
        }
        return listing;
      });
    }
    if (action.type === "unarchive") {
      return current.map((listing) => {
        if (listing.id === action.id) {
          return { ...listing, archived: false };
        }
        return listing;
      });
    }
    if (action.type === "delete") {
      return current.filter((listing) => listing.id !== action.id);
    }
    return current;
  });

  const handleDelete = async (listingId: string) => {
    const isTestListing = listingId.startsWith("residential-test");
    const confirmMessage = isTestListing
      ? "Are you sure you want to delete this test listing? This action cannot be undone."
      : "Are you sure you want to archive this listing? You can show archived listings later.";
    if (!confirm(confirmMessage)) {
      return;
    }

    setIsPending(listingId);
    startTransition(() => {
      updateOptimisticListings({
        type: isTestListing ? "delete" : "archive",
        id: listingId,
      });
    });

    try {
      const result = await deleteResidentialListing(listingId);
      if (result.success) {
        setIsPending(null);
        router.refresh();
      } else {
        alert(result.error || "Failed to delete listing");
        setIsPending(null);
        startTransition(() => {
          updateOptimisticListings({ type: "reset", listings });
        });
      }
    } catch (_error) {
      alert("An error occurred while deleting the listing");
      setIsPending(null);
      startTransition(() => {
        updateOptimisticListings({ type: "reset", listings });
      });
    }
  };

  const handleUnarchive = async (listingId: string) => {
    if (!confirm("Are you sure you want to unarchive this listing?")) {
      return;
    }

    setIsPending(listingId);
    startTransition(() => {
      updateOptimisticListings({
        type: "unarchive",
        id: listingId,
      });
    });

    try {
      const result = await unarchiveResidentialListing(listingId);
      if (result.success) {
        setIsPending(null);
        router.refresh();
      } else {
        alert(result.error || "Failed to unarchive listing");
        setIsPending(null);
        startTransition(() => {
          updateOptimisticListings({ type: "reset", listings });
        });
      }
    } catch (_error) {
      alert("An error occurred while unarchiving the listing");
      setIsPending(null);
      startTransition(() => {
        updateOptimisticListings({ type: "reset", listings });
      });
    }
  };

  // Update optimistic state when listings prop changes (from server refresh)
  useEffect(() => {
    startTransition(() => {
      updateOptimisticListings({ type: "reset", listings });
    });
  }, [listings, updateOptimisticListings]);

  const visibleListings = showArchived
    ? optimisticListings
    : optimisticListings.filter((listing) => !listing.archived);

  return (
    <>
      <div className="mb-4 flex items-center justify-end">
        <label className="flex items-center gap-2 text-black text-sm">
          <input
            checked={showArchived}
            className="peer sr-only"
            onChange={(event) => {
              setShowArchived(event.target.checked);
            }}
            type="checkbox"
          />
          <span className="relative h-5 w-9 rounded-full bg-gray-200 transition-colors peer-checked:bg-black">
            <span className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
          </span>
          Show archived
        </label>
      </div>

      {visibleListings.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No listings found.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleListings.map((listing) => (
            <Card key={listing.id}>
              <CardHeader>
                {listing.archived && (
                  <div className="flex justify-center mb-2">
                    <span className="rounded bg-purple-100 px-2 py-1 text-purple-800 text-xs">
                      Archived
                    </span>
                  </div>
                )}
                <CardTitle className="text-base">{listing.title}</CardTitle>
              <CardDescription>
                {listing.location}
                {listing.mlsNumber && (
                  <span className="ml-2 text-xs">
                    MLS#: {listing.mlsNumber}
                  </span>
                )}
              </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                  {listing.imageSrc ? (
                    listing.imageSrc.startsWith("https://") ? (
                      <Image
                        alt={listing.title}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={listing.imageSrc}
                      />
                    ) : (
                      <img
                        alt={listing.title}
                        className="h-full w-full object-cover"
                        src={listing.imageSrc}
                      />
                    )
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <p className="text-muted-foreground text-sm">No image</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-lg">{listing.price}</p>
                  {listing.galleryImages && listing.galleryImages.length > 0 && (
                    <p className="text-muted-foreground text-xs">
                      {listing.galleryImages.length} gallery image
                      {listing.galleryImages.length !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    className="w-full cursor-pointer bg-gray-100 text-black transition-colors hover:bg-gray-200"
                    onClick={() => {
                      const href = `/residential#listing-${listing.id}`;
                      window.open(href, "_blank");
                    }}
                    size="sm"
                  >
                    Preview Listing
                  </Button>
                  <Button
                    className="w-full cursor-pointer bg-black text-white transition-colors hover:bg-gray-900"
                    onClick={() => {
                      setEditingListing(listing);
                    }}
                    size="sm"
                  >
                    Edit Listing
                  </Button>
                {listing.archived && showArchived ? (
                  <>
                    <Button
                      className="w-full cursor-pointer bg-green-600 text-white hover:bg-green-700"
                      disabled={isPending === listing.id}
                      onClick={() => {
                        handleUnarchive(listing.id);
                      }}
                      size="sm"
                    >
                      {isPending === listing.id ? "Unarchiving..." : "Unarchive"}
                    </Button>
                    {listing.id.startsWith("residential-test") && (
                      <Button
                        className="w-full cursor-pointer bg-red-600 text-white hover:bg-red-700"
                        disabled={isPending === listing.id}
                        onClick={() => {
                          handleDelete(listing.id);
                        }}
                        size="sm"
                        variant="destructive"
                      >
                        {isPending === listing.id ? "Deleting..." : "Delete"}
                      </Button>
                    )}
                  </>
                ) : listing.id.startsWith("residential-test") ? (
                  <Button
                    className="w-full cursor-pointer bg-red-600 text-white hover:bg-red-700"
                    disabled={isPending === listing.id}
                    onClick={() => {
                      handleDelete(listing.id);
                    }}
                    size="sm"
                    variant="destructive"
                  >
                    {isPending === listing.id ? "Deleting..." : "Delete"}
                  </Button>
                ) : (
                  <Button
                    className="w-full cursor-pointer bg-purple-600 text-white hover:bg-purple-700"
                    disabled={isPending === listing.id || listing.archived}
                    onClick={() => {
                      handleDelete(listing.id);
                    }}
                    size="sm"
                  >
                    {isPending === listing.id
                      ? "Archiving..."
                      : listing.archived
                        ? "Archived"
                        : "Archive"}
                  </Button>
                )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {editingListing && (
        <ResidentialListingEditForm
          listing={editingListing}
          onOpenChange={(open) => {
            if (!open) {
              setEditingListing(null);
            }
          }}
          open={!!editingListing}
        />
      )}
    </>
  );
}
