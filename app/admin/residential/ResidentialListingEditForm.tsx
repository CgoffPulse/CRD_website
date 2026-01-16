"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useDropzone } from "react-dropzone";
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
import { Textarea } from "@/components/ui/textarea";
import { updateResidentialListing } from "../actions/residentialListings";
import { PropertyDetailsForm } from "../components/PropertyDetailsForm";
import type { ResidentialListing } from "../types/listings";

interface ResidentialListingEditFormProps {
  listing: ResidentialListing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UpdateState {
  success?: boolean;
  error?: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className="cursor-pointer bg-black text-white transition-colors hover:bg-gray-900"
      disabled={pending}
      type="submit"
    >
      {pending ? "Updating..." : "Update Listing"}
    </Button>
  );
}

export function ResidentialListingEditForm({
  listing,
  open,
  onOpenChange,
}: ResidentialListingEditFormProps) {
  const router = useRouter();
  const [state, formAction] = useActionState<UpdateState, FormData>(
    updateResidentialListing,
    {}
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    listing.imageSrc
  );
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(
    listing.galleryImages || []
  );

  // Parse existing bullets into template fields and additional bullets
  const parseBullets = (bullets: string[], _mls: string) => {
    const template = {
      squareFootage: "",
      propertyType: "",
      yearBuilt: "",
      lotSize: "",
      communityFeatures: "",
      specialFeatures: "",
      pricePerSqft: "",
    };
    const additional: string[] = [];
    let templateIndex = 0;

    bullets.forEach((bullet) => {
      const trimmed = bullet.trim();
      if (trimmed.startsWith("MLS#:")) {
        // Skip MLS# - handled separately
        return;
      }

      // Try to match to template positions (rough heuristic)
      if (
        templateIndex === 0 &&
        (trimmed.includes("sq ft") || trimmed.includes("sqft"))
      ) {
        template.squareFootage = trimmed;
        templateIndex++;
      } else if (
        templateIndex === 1 &&
        (trimmed.includes("Residence") ||
          trimmed.includes("Home") ||
          trimmed.includes("Condo") ||
          trimmed.includes("Townhouse"))
      ) {
        template.propertyType = trimmed;
        templateIndex++;
      } else if (
        templateIndex === 2 &&
        (trimmed.includes("Built in") || /^\d{4}$/.test(trimmed))
      ) {
        template.yearBuilt = trimmed.includes("Built in")
          ? trimmed
          : `Built in ${trimmed}`;
        templateIndex++;
      } else if (
        templateIndex === 3 &&
        (trimmed.includes("lot") ||
          trimmed.includes("acres") ||
          trimmed.includes("Square Feet"))
      ) {
        template.lotSize = trimmed;
        templateIndex++;
      } else if (
        templateIndex === 4 &&
        (trimmed.includes("community") || trimmed.includes("subdivision"))
      ) {
        template.communityFeatures = trimmed;
        templateIndex++;
      } else if (templateIndex === 5 && templateIndex < 7) {
        template.specialFeatures = trimmed;
        templateIndex++;
      } else if (trimmed.includes("/sqft") || trimmed.includes("$/sqft")) {
        template.pricePerSqft = trimmed;
      } else {
        additional.push(trimmed);
      }
    });

    return { template, additional: additional.filter((b) => b.length > 0) };
  };

  const parsed = parseBullets(listing.bullets, listing.mlsNumber || "");
  const [templateFields, setTemplateFields] = useState(parsed.template);
  const [additionalBullets, setAdditionalBullets] = useState(
    parsed.additional.length > 0 ? parsed.additional : [""]
  );

  const [agents, setAgents] = useState<
    Array<{ name: string; email?: string; phone?: string }>
  >(
    listing.agents && listing.agents.length > 0
      ? listing.agents
      : [{ name: "" }]
  );
  const [mlsNumber, setMlsNumber] = useState<string>(listing.mlsNumber || "");
  const [propertyDetailsJson, setPropertyDetailsJson] = useState<string>(
    JSON.stringify(listing.propertyDetails || {})
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      router.refresh();
      onOpenChange(false);
    }
  }, [state, router, onOpenChange]);

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

  const addAgent = () => {
    setAgents([...agents, { name: "" }]);
  };

  const removeAgent = (index: number) => {
    setAgents(agents.filter((_, i) => i !== index));
  };

  const updateAgent = (
    index: number,
    field: "name" | "email" | "phone",
    value: string
  ) => {
    const newAgents = [...agents];
    newAgents[index] = { ...newAgents[index], [field]: value };
    setAgents(newAgents);
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
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Residential Listing</DialogTitle>
          <DialogDescription>
            Update the listing details below
          </DialogDescription>
        </DialogHeader>
        <form
          action={async (formData: FormData) => {
            try {
              formData.set("id", listing.id);
              formData.set("bullets", JSON.stringify(buildBulletsArray()));
              formData.set(
                "agents",
                JSON.stringify(agents.filter((a) => a.name.trim()))
              );
              formData.set("propertyDetails", propertyDetailsJson);
              await formAction(formData);
            } catch (error) {
              console.error("Error submitting form:", error);
            }
          }}
          className="space-y-6"
          ref={formRef}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                className="bg-background text-foreground"
                defaultValue={listing.title}
                id="edit-title"
                name="title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price *</Label>
              <Input
                className="bg-background text-foreground"
                defaultValue={listing.price}
                id="edit-price"
                name="price"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-location">Location *</Label>
            <Input
              className="bg-background text-foreground"
              defaultValue={listing.location}
              id="edit-location"
              name="location"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              className="bg-background text-foreground"
              defaultValue={listing.description || ""}
              id="edit-description"
              name="description"
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-mlsNumber">MLS Number</Label>
            <Input
              className="bg-background text-foreground"
              id="edit-mlsNumber"
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
              <Label htmlFor="edit-squareFootage">Square Footage</Label>
              <Input
                className="bg-background text-foreground"
                id="edit-squareFootage"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    squareFootage: e.target.value,
                  })
                }
                placeholder="850 sq ft"
                value={templateFields.squareFootage}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-propertyType">Property Type</Label>
              <Input
                className="bg-background text-foreground"
                id="edit-propertyType"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    propertyType: e.target.value,
                  })
                }
                placeholder="Manufactured Home, Single Family Residence"
                value={templateFields.propertyType}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-yearBuilt">Year Built</Label>
              <Input
                className="bg-background text-foreground"
                id="edit-yearBuilt"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    yearBuilt: e.target.value,
                  })
                }
                placeholder="Built in 1970"
                value={templateFields.yearBuilt}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-lotSize">Lot Size</Label>
              <Input
                className="bg-background text-foreground"
                id="edit-lotSize"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    lotSize: e.target.value,
                  })
                }
                placeholder="5,662.8 sq ft lot"
                value={templateFields.lotSize}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-communityFeatures">Community/Features</Label>
              <Input
                className="bg-background text-foreground"
                id="edit-communityFeatures"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    communityFeatures: e.target.value,
                  })
                }
                placeholder="Lost Bridge Village community"
                value={templateFields.communityFeatures}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-specialFeatures">Special Features</Label>
              <Input
                className="bg-background text-foreground"
                id="edit-specialFeatures"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    specialFeatures: e.target.value,
                  })
                }
                placeholder="Fully furnished, Screened-in porch"
                value={templateFields.specialFeatures}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-pricePerSqft">Price per sqft</Label>
              <Input
                className="bg-background text-foreground"
                id="edit-pricePerSqft"
                onChange={(e) =>
                  setTemplateFields({
                    ...templateFields,
                    pricePerSqft: e.target.value,
                  })
                }
                placeholder="$188/sqft"
                value={templateFields.pricePerSqft}
              />
            </div>

            <div className="space-y-2 border-t pt-4">
              <Label>Additional Features</Label>
              <p className="text-muted-foreground text-xs">
                Add any additional bullet point features below.{" "}
              </p>
              {additionalBullets.map((bullet, index) => (
                <div className="flex gap-2" key={index}>
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
            <Label>Agents</Label>
            {agents.map((agent, index) => (
              <div
                className="grid gap-2 rounded border p-2 md:grid-cols-3"
                key={index}
              >
                <Input
                  className="bg-background text-foreground"
                  onChange={(e) => updateAgent(index, "name", e.target.value)}
                  placeholder="Name"
                  value={agent.name}
                />
                <Input
                  className="bg-background text-foreground"
                  onChange={(e) => updateAgent(index, "email", e.target.value)}
                  placeholder="Email"
                  value={agent.email || ""}
                />
                <div className="flex gap-2">
                  <Input
                    className="bg-background text-foreground"
                    onChange={(e) =>
                      updateAgent(index, "phone", e.target.value)
                    }
                    placeholder="Phone"
                    value={agent.phone || ""}
                  />
                  {agents.length > 1 && (
                    <Button
                      onClick={() => removeAgent(index)}
                      type="button"
                      variant="outline"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button onClick={addAgent} type="button" variant="outline">
              Add Agent
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-coverImage">Cover Image</Label>
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
                  id: "edit-coverImage",
                  name: "coverImage",
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
            <Label htmlFor="edit-galleryImages">Gallery Images</Label>
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
                  id: "edit-galleryImages",
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
                  <div className="relative aspect-square w-full" key={index}>
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
            defaultValue={listing.propertyDetails}
            onChange={(json) => {
              setPropertyDetailsJson(json);
            }}
            type="residential"
          />

          {state?.error && (
            <p className="font-medium text-destructive text-sm">
              {state.error}
            </p>
          )}

          <DialogFooter>
            <Button
              onClick={() => onOpenChange(false)}
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
