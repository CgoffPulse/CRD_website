import type {
  CommercialPropertyDetails,
  ResidentialPropertyDetails,
} from "../types/listings";

/**
 * Generate bullet points automatically from property details
 * Follows the standard template order:
 * 1. Square footage
 * 2. Property type
 * 3. Year built
 * 4. Lot size
 * 5. Community/features
 * 6. Special features
 * 7. MLS# (if provided)
 * 8. Price per sqft (if available)
 */
export function generateBulletsFromPropertyDetails(
  type: "residential" | "commercial",
  propertyDetails?: ResidentialPropertyDetails | CommercialPropertyDetails,
  _mlsNumber?: string
): string[] {
  const bullets: string[] = [];

  if (type === "residential") {
    const details = propertyDetails as ResidentialPropertyDetails | undefined;

    // 1. Square footage
    if (details?.interior?.totalInteriorLivableArea) {
      const sqft = details.interior.totalInteriorLivableArea
        .replace(/\s*sqft\s*/i, "")
        .trim();
      bullets.push(`${sqft} sq ft`);
    } else if (details?.interior?.totalStructureArea) {
      bullets.push(`${details.interior.totalStructureArea} sq ft`);
    }

    // 2. Property type
    if (details?.construction?.propertySubtype) {
      bullets.push(details.construction.propertySubtype);
    } else if (details?.construction?.homeType) {
      bullets.push(details.construction.homeType);
    }

    // 3. Year built
    if (details?.construction?.yearBuilt) {
      bullets.push(`Built in ${details.construction.yearBuilt}`);
    }

    // 4. Lot size
    if (details?.lot?.size) {
      const lotSize = details.lot.size.replace(/\s*Square Feet\s*/i, "").trim();
      bullets.push(`${lotSize} lot`);
    }

    // 5. Community/features
    if (details?.community?.subdivision) {
      bullets.push(`${details.community.subdivision} community`);
    }
    if (details?.community?.features) {
      const amenities = details.community.features
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);
      if (amenities.length > 0) {
        bullets.push(amenities.join(", "));
      }
    }

    // 6. Special features (exterior features)
    if (details?.property?.exteriorFeatures) {
      bullets.push(details.property.exteriorFeatures);
    }

    // 7. MLS# (added separately via auto-append)
    // 8. Price per sqft
    if (details?.financial?.pricePerSquareFoot) {
      bullets.push(details.financial.pricePerSquareFoot);
    }
  } else {
    // Commercial
    const details = propertyDetails as CommercialPropertyDetails | undefined;

    // 1. Square footage - not in commercial schema, would be manual

    // 2. Property type
    if (details?.construction?.propertySubtype) {
      bullets.push(details.construction.propertySubtype);
    } else if (details?.construction?.homeType) {
      bullets.push(details.construction.homeType);
    }

    // 3. Year built - not in commercial schema

    // 4. Lot size
    if (details?.lot?.size) {
      bullets.push(`${details.lot.size} lot`);
    }

    // 5. Community/features (location)
    if (details?.location?.region) {
      bullets.push(`Located in ${details.location.region}`);
    }

    // 6. Special features
    if (details?.property?.exteriorFeatures) {
      bullets.push(details.property.exteriorFeatures);
    }
    if (details?.lot?.features) {
      bullets.push(details.lot.features);
    }

    // 7. MLS# (added separately via auto-append)
    // 8. Price per sqft - not in commercial schema
  }

  return bullets.filter((bullet) => bullet.trim().length > 0);
}
