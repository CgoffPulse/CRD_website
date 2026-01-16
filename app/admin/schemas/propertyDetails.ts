import { z } from "zod";

// Residential Property Details Schema
export const residentialPropertyDetailsSchema = z
  .object({
    interior: z
      .object({
        heating: z.string().optional(),
        cooling: z.string().optional(),
        appliances: z.string().optional(),
        flooring: z.string().optional(),
        hasBasement: z.string().optional(),
        totalStructureArea: z.string().optional(),
        totalInteriorLivableArea: z.string().optional(),
      })
      .optional(),
    property: z
      .object({
        parking: z
          .object({
            totalSpaces: z.string().optional(),
            parkingFeatures: z.string().optional(),
            coveredSpaces: z.string().optional(),
          })
          .optional(),
        levels: z.string().optional(),
        stories: z.string().optional(),
        exteriorFeatures: z.string().optional(),
        fencing: z.string().optional(),
      })
      .optional(),
    lot: z
      .object({
        size: z.string().optional(),
        features: z.string().optional(),
      })
      .optional(),
    details: z
      .object({
        parcelNumber: z.string().optional(),
        specialConditions: z.string().optional(),
      })
      .optional(),
    construction: z
      .object({
        homeType: z.string().optional(),
        propertySubtype: z.string().optional(),
        materials: z.string().optional(),
        foundation: z.string().optional(),
        roof: z.string().optional(),
        newConstruction: z.string().optional(),
        yearBuilt: z.string().optional(),
      })
      .optional(),
    community: z
      .object({
        features: z.string().optional(),
        security: z.string().optional(),
        subdivision: z.string().optional(),
      })
      .optional(),
    location: z
      .object({
        region: z.string().optional(),
      })
      .optional(),
    financial: z
      .object({
        pricePerSquareFoot: z.string().optional(),
        annualTaxAmount: z.string().optional(),
        dateOnMarket: z.string().optional(),
      })
      .optional(),
  })
  .passthrough(); // Allow additional fields but validate known ones

// Commercial Property Details Schema
export const commercialPropertyDetailsSchema = z
  .object({
    lot: z
      .object({
        size: z.string().optional(),
        features: z.string().optional(),
      })
      .optional(),
    property: z
      .object({
        fencing: z.string().optional(),
        exteriorFeatures: z.string().optional(),
      })
      .optional(),
    details: z
      .object({
        parcelNumber: z.string().optional(),
        specialConditions: z.string().optional(),
        subdivision: z.string().optional(),
      })
      .optional(),
    construction: z
      .object({
        homeType: z.string().optional(),
        propertySubtype: z.string().optional(),
      })
      .optional(),
    location: z
      .object({
        region: z.string().optional(),
      })
      .optional(),
    financial: z
      .object({
        annualTaxAmount: z.string().optional(),
        dateOnMarket: z.string().optional(),
      })
      .optional(),
  })
  .passthrough(); // Allow additional fields but validate known ones
