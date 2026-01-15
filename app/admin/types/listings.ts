export interface ResidentialPropertyDetails {
  interior?: {
    heating?: string;
    cooling?: string;
    appliances?: string;
    flooring?: string;
    hasBasement?: string;
    totalStructureArea?: string;
    totalInteriorLivableArea?: string;
  };
  property?: {
    parking?: {
      totalSpaces?: string;
      parkingFeatures?: string;
      coveredSpaces?: string;
    };
    levels?: string;
    stories?: string;
    exteriorFeatures?: string;
    fencing?: string;
  };
  lot?: {
    size?: string;
    features?: string;
  };
  details?: {
    parcelNumber?: string;
    specialConditions?: string;
  };
  construction?: {
    homeType?: string;
    propertySubtype?: string;
    materials?: string;
    foundation?: string;
    roof?: string;
    newConstruction?: string;
    yearBuilt?: string;
  };
  community?: {
    features?: string;
    security?: string;
    subdivision?: string;
  };
  location?: {
    region?: string;
  };
  financial?: {
    pricePerSquareFoot?: string;
    annualTaxAmount?: string;
    dateOnMarket?: string;
  };
}

export interface CommercialPropertyDetails {
  lot?: {
    size?: string;
    features?: string;
  };
  property?: {
    fencing?: string;
    exteriorFeatures?: string;
  };
  details?: {
    parcelNumber?: string;
    specialConditions?: string;
  };
  construction?: {
    homeType?: string;
    propertySubtype?: string;
  };
  location?: {
    region?: string;
  };
  financial?: {
    annualTaxAmount?: string;
    dateOnMarket?: string;
  };
}

export interface ResidentialListing {
  id: string;
  title: string;
  price: string;
  location: string;
  imageSrc: string | null;
  summary?: string;
  description?: string;
  bullets: string[];
  href: string;
  mlsNumber?: string;
  agents?: Array<{ name: string; email?: string; phone?: string }>;
  office?: string;
  officePhone?: string;
  galleryImages?: string[];
  propertyDetails?: ResidentialPropertyDetails;
}

export interface CommercialListing {
  id: string;
  title: string;
  price?: string;
  leaseRate?: string;
  location: string;
  imageSrc: string | null;
  summary?: string;
  description?: string;
  bullets: string[];
  href: string;
  mlsNumber?: string;
  galleryImages?: string[];
  propertyDetails?: CommercialPropertyDetails;
  isLease?: boolean;
}
