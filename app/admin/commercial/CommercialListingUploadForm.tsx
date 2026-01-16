"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useActionState,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";
import { useDropzone } from "react-dropzone";
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
import { Textarea } from "@/components/ui/textarea";
import { createCommercialListing } from "../actions/commercialListings";
import { PropertyDetailsForm } from "../components/PropertyDetailsForm";

interface UploadState {
  success?: boolean;
  error?: string;
  listingId?: string;
}

interface OptimisticListing {
  id: string;
  title: string;
  mode: "Buy" | "Lease";
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full cursor-pointer bg-black text-white hover:bg-gray-900"
      disabled={pending}
      type="submit"
    >
      {pending ? "Creating..." : "Create Listing"}
    </Button>
  );
}

export function CommercialListingUploadForm() {
  const router = useRouter();
  const [state, formAction] = useActionState<UploadState, FormData>(
    createCommercialListing,
    {}
  );
  const [optimisticListings, updateOptimisticListings] = useOptimistic<
    OptimisticListing[],
    { type: "add"; listing: OptimisticListing } | { type: "clear" }
  >([], (current, action) => {
    if (action.type === "clear") {
      return [];
    }
    return [...current, action.listing];
  });
  const [isLease, setIsLease] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [templateFields, setTemplateFields] = useState({
    squareFootage: "",
    propertyType: "",
    yearBuilt: "",
    lotSize: "",
    communityFeatures: "",
    specialFeatures: "",
    pricePerSqft: "",
  });
  const [additionalBullets, setAdditionalBullets] = useState<string[]>([""]);
  const [mlsNumber, setMlsNumber] = useState<string>("");
  const [propertyDetailsJson, setPropertyDetailsJson] = useState<string>("{}");
  const formRef = useRef<HTMLFormElement>(null);

  const {
    getRootProps: getCoverRootProps,
    getInputProps: getCoverInputProps,
    isDragActive: isCoverDragActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverPreview(reader.result as string);
        };
        reader.readAsDataURL(acceptedFiles[0]);
      }
    },
    multiple: false,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxSize: 10 * 1024 * 1024,
  });

  const {
    getRootProps: getGalleryRootProps,
    getInputProps: getGalleryInputProps,
    isDragActive: isGalleryDragActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      const readers = acceptedFiles.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(readers).then((results) => {
        setGalleryPreviews([...galleryPreviews, ...results]);
      });
    },
    multiple: true,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxSize: 10 * 1024 * 1024,
  });

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setCoverPreview(null);
      setGalleryPreviews([]);
      setTemplateFields({
        squareFootage: "",
        propertyType: "",
        yearBuilt: "",
        lotSize: "",
        communityFeatures: "",
        specialFeatures: "",
        pricePerSqft: "",
      });
      setAdditionalBullets([""]);
      setIsLease(false);
      setMlsNumber("");
      setPropertyDetailsJson("{}");
      updateOptimisticListings({ type: "clear" });
      router.refresh();
    }
  }, [state, router, updateOptimisticListings]);

  const addAdditionalBullet = () => {
    setAdditionalBullets([...additionalBullets, ""]);
  };

  const removeAdditionalBullet = (index: number) => {
    setAdditionalBullets(additionalBullets.filter((_, i) => i !== index));
  };

  const updateAdditionalBullet = (index: number, value: string) => {
    const newBullets = [...additionalBullets];
    newBullets[index] = value;
    setAdditionalBullets(newBullets);
  };

  const handleMlsNumberChange = (value: string) => {
    setMlsNumber(value);
  };

  // Build final bullets array from template fields + MLS# + additional bullets
  const buildBulletsArray = (): string[] => {
    const bullets: string[] = [];

    if (templateFields.squareFootage.trim()) {
      bullets.push(templateFields.squareFootage.trim());
    }
    if (templateFields.propertyType.trim()) {
      bullets.push(templateFields.propertyType.trim());
    }
    if (templateFields.yearBuilt.trim()) {
      bullets.push(templateFields.yearBuilt.trim());
    }
    if (templateFields.lotSize.trim()) {
      bullets.push(templateFields.lotSize.trim());
    }
    if (templateFields.communityFeatures.trim()) {
      bullets.push(templateFields.communityFeatures.trim());
    }
    if (templateFields.specialFeatures.trim()) {
      bullets.push(templateFields.specialFeatures.trim());
    }
    if (mlsNumber.trim()) {
      bullets.push(`MLS#: ${mlsNumber.trim()}`);
    }
    if (templateFields.pricePerSqft.trim()) {
      bullets.push(templateFields.pricePerSqft.trim());
    }

    // Add additional bullets
    additionalBullets.forEach((bullet) => {
      if (bullet.trim()) {
        bullets.push(bullet.trim());
      }
    });

    return bullets;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Commercial Listing</CardTitle>
        <CardDescription>
          Add a new commercial property listing (buy or lease)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {optimisticListings.length > 0 && (
          <div className="mb-6 rounded border border-gray-200 bg-gray-50 p-4">
            <p className="mb-2 font-semibold text-black text-sm">
              Pending uploads
            </p>
            <ul className="space-y-1 text-gray-700 text-sm">
              {optimisticListings.map((listing) => (
                <li
                  className="flex items-center justify-between"
                  key={listing.id}
                >
                  <span className="font-medium text-black">
                    {listing.title}
                  </span>
                  <span className="text-gray-600">{listing.mode}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <form
          action={async (formData: FormData) => {
            try {
              const title = (formData.get("title") as string) || "New Listing";
              updateOptimisticListings({
                type: "add",
                listing: {
                  id: String(Date.now()),
                  title,
                  mode: isLease ? "Lease" : "Buy",
                },
              });
              formData.set("isLease", isLease.toString());
              formData.set("bullets", JSON.stringify(buildBulletsArray()));
              formData.set("propertyDetails", propertyDetailsJson);
              await formAction(formData);
            } catch (error) {
              console.error("Error submitting form:", error);
              updateOptimisticListings({ type: "clear" });
            }
          }}
          className="space-y-6"
          ref={formRef}
        >
          <div className="space-y-2">
            <Label>Listing Type</Label>
            <div className="flex gap-6">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  checked={!isLease}
                  className="h-4 w-4"
                  onChange={() => setIsLease(false)}
                  type="radio"
                />
                <span className="text-sm">Buy</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  checked={isLease}
                  className="h-4 w-4"
                  onChange={() => setIsLease(true)}
                  type="radio"
                />
                <span className="text-sm">Lease</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              className="bg-background text-foreground"
              id="title"
              name="title"
              required
            />
          </div>

          {isLease ? (
            <div className="space-y-2">
              <Label htmlFor="leaseRate">Lease Rate *</Label>
              <Input
                className="bg-background text-foreground"
                id="leaseRate"
                name="leaseRate"
                placeholder="$X,XXX/month"
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                className="bg-background text-foreground"
                id="price"
                name="price"
                placeholder="$1,000,000"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              className="bg-background text-foreground"
              id="location"
              name="location"
              placeholder="201 E Walnut St #11, Rogers, AR 72756"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              className="bg-background text-foreground"
              id="description"
              name="description"
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mlsNumber">MLS Number</Label>
            <Input
              className="bg-background text-foreground"
              id="mlsNumber"
              name="mlsNumber"
              onChange={(e) => handleMlsNumberChange(e.target.value)}
              value={mlsNumber}
            />
            <p className="text-muted-foreground text-xs">
              MLS# will automatically be added to key features
            </p>
          </div>

          <div className="space-y-4 border-t pt-6">
            <Label className="text-base">Key Features (Bullets)</Label>

            <div className="space-y-2">
              <Label htmlFor="squareFootage">Square Footage</Label>
              <Input
                className="bg-background text-foreground"
                id="squareFootage"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    squareFootage: e.target.value,
                  })
                }
                placeholder="3,144 sq ft"
                value={templateFields.squareFootage}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Input
                className="bg-background text-foreground"
                id="propertyType"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    propertyType: e.target.value,
                  })
                }
                placeholder="Multi-family 4-plex investment property"
                value={templateFields.propertyType}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearBuilt">Year Built</Label>
              <Input
                className="bg-background text-foreground"
                id="yearBuilt"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    yearBuilt: e.target.value,
                  })
                }
                placeholder="Built in 1981"
                value={templateFields.yearBuilt}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lotSize">Lot Size</Label>
              <Input
                className="bg-background text-foreground"
                id="lotSize"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    lotSize: e.target.value,
                  })
                }
                placeholder="0.39 Acres lot"
                value={templateFields.lotSize}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="communityFeatures">Community/Features</Label>
              <Input
                className="bg-background text-foreground"
                id="communityFeatures"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    communityFeatures: e.target.value,
                  })
                }
                placeholder="Located in Rogers"
                value={templateFields.communityFeatures}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialFeatures">Special Features</Label>
              <Input
                className="bg-background text-foreground"
                id="specialFeatures"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    specialFeatures: e.target.value,
                  })
                }
                placeholder="Prime location, Onsite parking"
                value={templateFields.specialFeatures}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerSqft">Price per sqft</Label>
              <Input
                className="bg-background text-foreground"
                id="pricePerSqft"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    pricePerSqft: e.target.value,
                  })
                }
                placeholder="$199/sqft"
                value={templateFields.pricePerSqft}
              />
            </div>

            <div className="space-y-2 border-t pt-4">
              <Label>Additional Features</Label>
              <p className="text-muted-foreground text-xs">
                Add any additional bullet point features below.
              </p>
              {additionalBullets.map((bullet, index) => (
                <div className="flex gap-2" key={`${index}-${bullet}`}>
                  <Input
                    className="bg-background text-foreground"
                    onChange={(e) =>
                      updateAdditionalBullet(index, e.target.value)
                    }
                    placeholder={`Additional feature ${index + 1}`}
                    value={bullet}
                  />
                  {additionalBullets.length > 1 && (
                    <Button
                      onClick={() => removeAdditionalBullet(index)}
                      type="button"
                      variant="outline"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                onClick={addAdditionalBullet}
                type="button"
                variant="outline"
              >
                Add Feature
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image *</Label>
            <div
              {...getCoverRootProps()}
              className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center ${
                isCoverDragActive
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground/25"
              }`}
            >
              <input
                {...getCoverInputProps({
                  id: "coverImage",
                  name: "coverImage",
                  required: true,
                })}
              />
              {coverPreview ? (
                <img
                  alt="Preview"
                  className="mx-auto max-h-48 rounded"
                  src={coverPreview}
                />
              ) : (
                <p className="text-muted-foreground text-sm">
                  Drag and drop cover image here, or click to select
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="galleryImages">Gallery Images</Label>
            <div
              {...getGalleryRootProps()}
              className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center ${
                isGalleryDragActive
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground/25"
              }`}
            >
              <input
                {...getGalleryInputProps({
                  id: "galleryImages",
                  name: "galleryImages",
                })}
              />
              <p className="text-muted-foreground text-sm">
                Drag and drop gallery images here, or click to select (multiple)
              </p>
            </div>
            {galleryPreviews.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {galleryPreviews.map((preview, index) => (
                  <div className="relative aspect-square w-full" key={preview}>
                    <Image
                      alt={`Preview ${index + 1}`}
                      className="rounded object-cover"
                      fill
                      src={preview}
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <PropertyDetailsForm
            onChange={(json) => {
              setPropertyDetailsJson(json);
            }}
            type="commercial"
          />

          {state?.error && (
            <p className="font-medium text-destructive text-sm">
              {state.error}
            </p>
          )}
          {state?.success && (
            <p className="font-medium text-green-600 text-sm">
              Listing created successfully!
            </p>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
