'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ResidentialPropertyDetails, CommercialPropertyDetails } from '../types/listings';

interface PropertyDetailsFormProps {
  type: 'residential' | 'commercial';
  defaultValue?: ResidentialPropertyDetails | CommercialPropertyDetails;
  onChange?: (json: string) => void;
  name?: string;
}

export function PropertyDetailsForm({
  type,
  defaultValue,
  onChange,
  name = 'propertyDetails',
}: PropertyDetailsFormProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  // Residential state
  const [interior, setInterior] = useState({
    heating: '',
    cooling: '',
    appliances: '',
    flooring: '',
    hasBasement: '',
    totalStructureArea: '',
    totalInteriorLivableArea: '',
  });

  const [property, setProperty] = useState({
    parkingTotalSpaces: '',
    parkingFeatures: '',
    parkingCoveredSpaces: '',
    levels: '',
    stories: '',
    exteriorFeatures: '',
    fencing: '',
  });

  const [lot, setLot] = useState({
    size: '',
    features: '',
  });

  const [details, setDetails] = useState({
    parcelNumber: '',
    specialConditions: '',
    specialConditionsOther: '',
  });

  const [construction, setConstruction] = useState({
    homeType: '',
    propertySubtype: '',
    materials: '',
    foundation: '',
    roof: '',
    newConstruction: '',
    yearBuilt: '',
  });

  const [community, setCommunity] = useState({
    features: '',
    security: '',
    subdivision: '',
  });

  const [location, setLocation] = useState({
    region: '',
  });

  const [financial, setFinancial] = useState({
    pricePerSquareFoot: '',
    annualTaxAmount: '',
    dateOnMarket: '',
  });

  // Commercial state (simpler)
  const [commercialProperty, setCommercialProperty] = useState({
    fencing: '',
    exteriorFeatures: '',
  });

  const [commercialDetails, setCommercialDetails] = useState({
    parcelNumber: '',
    specialConditions: '',
    specialConditionsOther: '',
    subdivision: '',
  });

  const [commercialConstruction, setCommercialConstruction] = useState({
    homeType: '',
    propertySubtype: '',
  });

  const [commercialLocation, setCommercialLocation] = useState({
    region: '',
  });

  const [commercialFinancial, setCommercialFinancial] = useState({
    annualTaxAmount: '',
    dateOnMarket: '',
  });

  // Collapsible sections state - open sections that have data
  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    const sections = new Set<string>();
    if (defaultValue) {
      if (type === 'residential') {
        const res = defaultValue as ResidentialPropertyDetails;
        if (res.interior && Object.keys(res.interior).length > 0) sections.add('interior');
        if (res.property && Object.keys(res.property).length > 0) sections.add('property');
        if (res.lot && Object.keys(res.lot).length > 0) sections.add('lot');
        if (res.details && Object.keys(res.details).length > 0) sections.add('details');
        if (res.construction && Object.keys(res.construction).length > 0) sections.add('construction');
        if (res.community && Object.keys(res.community).length > 0) sections.add('community');
        if (res.location && Object.keys(res.location).length > 0) sections.add('location');
        if (res.financial && Object.keys(res.financial).length > 0) sections.add('financial');
      } else {
        const com = defaultValue as CommercialPropertyDetails;
        if (com.lot && Object.keys(com.lot).length > 0) sections.add('lot');
        if (com.property && Object.keys(com.property).length > 0) sections.add('property');
        if (com.details && Object.keys(com.details).length > 0) sections.add('details');
        if (com.construction && Object.keys(com.construction).length > 0) sections.add('construction');
        if (com.location && Object.keys(com.location).length > 0) sections.add('location');
        if (com.financial && Object.keys(com.financial).length > 0) sections.add('financial');
      }
    }
    return sections;
  });

  const toggleSection = (section: string) => {
    const newOpen = new Set(openSections);
    if (newOpen.has(section)) {
      newOpen.delete(section);
    } else {
      newOpen.add(section);
    }
    setOpenSections(newOpen);
  };

  // Initialize from defaultValue
  useEffect(() => {
    if (defaultValue) {
      if (type === 'residential') {
        const res = defaultValue as ResidentialPropertyDetails;
        if (res.interior) {
          setInterior({
            heating: res.interior.heating || '',
            cooling: res.interior.cooling || '',
            appliances: res.interior.appliances || '',
            flooring: res.interior.flooring || '',
            hasBasement: res.interior.hasBasement || '',
            totalStructureArea: res.interior.totalStructureArea || '',
            totalInteriorLivableArea: res.interior.totalInteriorLivableArea || '',
          });
        }
        if (res.property) {
          setProperty({
            parkingTotalSpaces: res.property.parking?.totalSpaces || '',
            parkingFeatures: res.property.parking?.parkingFeatures || '',
            parkingCoveredSpaces: res.property.parking?.coveredSpaces || '',
            levels: res.property.levels || '',
            stories: res.property.stories || '',
            exteriorFeatures: res.property.exteriorFeatures || '',
            fencing: res.property.fencing || '',
          });
        }
        if (res.lot) {
          setLot({
            size: res.lot.size || '',
            features: res.lot.features || '',
          });
        }
        if (res.details) {
          const specialConditions = res.details.specialConditions || '';
          const isOther = specialConditions && specialConditions !== 'None' && specialConditions !== 'Other';
          setDetails({
            parcelNumber: res.details.parcelNumber || '',
            specialConditions: isOther ? 'Other' : specialConditions,
            specialConditionsOther: isOther ? specialConditions : '',
          });
        }
        if (res.construction) {
          setConstruction({
            homeType: res.construction.homeType || '',
            propertySubtype: res.construction.propertySubtype || '',
            materials: res.construction.materials || '',
            foundation: res.construction.foundation || '',
            roof: res.construction.roof || '',
            newConstruction: res.construction.newConstruction || '',
            yearBuilt: res.construction.yearBuilt || '',
          });
        }
        if (res.community) {
          setCommunity({
            features: res.community.features || '',
            security: res.community.security || '',
            subdivision: res.community.subdivision || '',
          });
        }
        if (res.location) {
          setLocation({
            region: res.location.region || '',
          });
        }
        if (res.financial) {
          setFinancial({
            pricePerSquareFoot: res.financial.pricePerSquareFoot || '',
            annualTaxAmount: res.financial.annualTaxAmount || '',
            dateOnMarket: res.financial.dateOnMarket || '',
          });
        }
      } else {
        const com = defaultValue as CommercialPropertyDetails;
        if (com.property) {
          setCommercialProperty({
            fencing: com.property.fencing || '',
            exteriorFeatures: com.property.exteriorFeatures || '',
          });
        }
        if (com.details) {
          const specialConditions = com.details.specialConditions || '';
          const isOther = specialConditions && specialConditions !== 'None' && specialConditions !== 'Other';
          setCommercialDetails({
            parcelNumber: com.details.parcelNumber || '',
            specialConditions: isOther ? 'Other' : specialConditions,
            specialConditionsOther: isOther ? specialConditions : '',
            subdivision: com.details.subdivision || '',
          });
        }
        if (com.construction) {
          setCommercialConstruction({
            homeType: com.construction.homeType || '',
            propertySubtype: com.construction.propertySubtype || '',
          });
        }
        if (com.location) {
          setCommercialLocation({
            region: com.location.region || '',
          });
        }
        if (com.financial) {
          setCommercialFinancial({
            annualTaxAmount: com.financial.annualTaxAmount || '',
            dateOnMarket: com.financial.dateOnMarket || '',
          });
        }
        if (com.lot) {
          setLot({
            size: com.lot.size || '',
            features: com.lot.features || '',
          });
        }
      }
    }
  }, [defaultValue, type]);

  // Convert state to JSON and call onChange
  useEffect(() => {
    let json: ResidentialPropertyDetails | CommercialPropertyDetails | Record<string, never> = {};

    if (type === 'residential') {
      const res: ResidentialPropertyDetails = {};

      // Interior
      if (
        interior.heating ||
        interior.cooling ||
        interior.appliances ||
        interior.flooring ||
        interior.hasBasement ||
        interior.totalStructureArea ||
        interior.totalInteriorLivableArea
      ) {
        res.interior = {};
        if (interior.heating) res.interior.heating = interior.heating;
        if (interior.cooling) res.interior.cooling = interior.cooling;
        if (interior.appliances) res.interior.appliances = interior.appliances;
        if (interior.flooring) res.interior.flooring = interior.flooring;
        if (interior.hasBasement) res.interior.hasBasement = interior.hasBasement;
        if (interior.totalStructureArea) res.interior.totalStructureArea = interior.totalStructureArea;
        if (interior.totalInteriorLivableArea) res.interior.totalInteriorLivableArea = interior.totalInteriorLivableArea;
      }

      // Property
      if (
        property.parkingTotalSpaces ||
        property.parkingFeatures ||
        property.parkingCoveredSpaces ||
        property.levels ||
        property.stories ||
        property.exteriorFeatures ||
        property.fencing
      ) {
        res.property = {};
        if (property.parkingTotalSpaces || property.parkingFeatures || property.parkingCoveredSpaces) {
          res.property.parking = {};
          if (property.parkingTotalSpaces) res.property.parking.totalSpaces = property.parkingTotalSpaces;
          if (property.parkingFeatures) res.property.parking.parkingFeatures = property.parkingFeatures;
          if (property.parkingCoveredSpaces) res.property.parking.coveredSpaces = property.parkingCoveredSpaces;
        }
        if (property.levels) res.property.levels = property.levels;
        if (property.stories) res.property.stories = property.stories;
        if (property.exteriorFeatures) res.property.exteriorFeatures = property.exteriorFeatures;
        if (property.fencing) res.property.fencing = property.fencing;
      }

      // Lot
      if (lot.size || lot.features) {
        res.lot = {};
        if (lot.size) res.lot.size = lot.size;
        if (lot.features) res.lot.features = lot.features;
      }

      // Details
      if (details.parcelNumber || details.specialConditions) {
        res.details = {};
        if (details.parcelNumber) {
          res.details.parcelNumber = details.parcelNumber;
        }
        if (details.specialConditions) {
          if (details.specialConditions === 'Other' && details.specialConditionsOther) {
            res.details.specialConditions = details.specialConditionsOther;
          } else if (details.specialConditions !== 'None') {
            res.details.specialConditions = details.specialConditions;
          }
        }
      }

      // Construction
      if (
        construction.homeType ||
        construction.propertySubtype ||
        construction.materials ||
        construction.foundation ||
        construction.roof ||
        construction.newConstruction ||
        construction.yearBuilt
      ) {
        res.construction = {};
        if (construction.homeType) res.construction.homeType = construction.homeType;
        if (construction.propertySubtype) res.construction.propertySubtype = construction.propertySubtype;
        if (construction.materials) res.construction.materials = construction.materials;
        if (construction.foundation) res.construction.foundation = construction.foundation;
        if (construction.roof) res.construction.roof = construction.roof;
        if (construction.newConstruction) res.construction.newConstruction = construction.newConstruction;
        if (construction.yearBuilt) res.construction.yearBuilt = construction.yearBuilt;
      }

      // Community
      if (community.features || community.security || community.subdivision) {
        res.community = {};
        if (community.features) res.community.features = community.features;
        if (community.security) res.community.security = community.security;
        if (community.subdivision) res.community.subdivision = community.subdivision;
      }

      // Location
      if (location.region) {
        res.location = {};
        res.location.region = location.region;
      }

      // Financial
      if (financial.pricePerSquareFoot || financial.annualTaxAmount || financial.dateOnMarket) {
        res.financial = {};
        if (financial.pricePerSquareFoot) res.financial.pricePerSquareFoot = financial.pricePerSquareFoot;
        if (financial.annualTaxAmount) res.financial.annualTaxAmount = financial.annualTaxAmount;
        if (financial.dateOnMarket) res.financial.dateOnMarket = financial.dateOnMarket;
      }

      json = res;
    } else {
      const com: CommercialPropertyDetails = {};

      // Lot
      if (lot.size || lot.features) {
        com.lot = {};
        if (lot.size) com.lot.size = lot.size;
        if (lot.features) com.lot.features = lot.features;
      }

      // Property
      if (commercialProperty.fencing || commercialProperty.exteriorFeatures) {
        com.property = {};
        if (commercialProperty.fencing) com.property.fencing = commercialProperty.fencing;
        if (commercialProperty.exteriorFeatures) com.property.exteriorFeatures = commercialProperty.exteriorFeatures;
      }

      // Details
      if (commercialDetails.parcelNumber || commercialDetails.specialConditions || commercialDetails.subdivision) {
        com.details = {};
        if (commercialDetails.parcelNumber) {
          com.details.parcelNumber = commercialDetails.parcelNumber;
        }
        if (commercialDetails.specialConditions) {
          if (commercialDetails.specialConditions === 'Other' && commercialDetails.specialConditionsOther) {
            com.details.specialConditions = commercialDetails.specialConditionsOther;
          } else if (commercialDetails.specialConditions !== 'None') {
            com.details.specialConditions = commercialDetails.specialConditions;
          }
        }
        if (commercialDetails.subdivision) {
          com.details.subdivision = commercialDetails.subdivision;
        }
      }

      // Construction
      if (commercialConstruction.homeType || commercialConstruction.propertySubtype) {
        com.construction = {};
        if (commercialConstruction.homeType) com.construction.homeType = commercialConstruction.homeType;
        if (commercialConstruction.propertySubtype) com.construction.propertySubtype = commercialConstruction.propertySubtype;
      }

      // Location
      if (commercialLocation.region) {
        com.location = {};
        com.location.region = commercialLocation.region;
      }

      // Financial
      if (commercialFinancial.annualTaxAmount || commercialFinancial.dateOnMarket) {
        com.financial = {};
        if (commercialFinancial.annualTaxAmount) com.financial.annualTaxAmount = commercialFinancial.annualTaxAmount;
        if (commercialFinancial.dateOnMarket) com.financial.dateOnMarket = commercialFinancial.dateOnMarket;
      }

      json = com;
    }

    const jsonString = JSON.stringify(json);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = jsonString;
    }
    onChange?.(jsonString);
  }, [
    type,
    interior,
    property,
    lot,
    details,
    construction,
    community,
    location,
    financial,
    commercialProperty,
    commercialDetails,
    commercialConstruction,
    commercialLocation,
    commercialFinancial,
    onChange,
  ]);

  const SectionHeader = ({ id, title }: { id: string; title: string }) => (
    <button
      type="button"
      onClick={() => {
        toggleSection(id);
      }}
      className="flex items-center justify-between w-full p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
    >
      <span className="font-semibold text-sm">{title}</span>
      <span className="text-lg">{openSections.has(id) ? '−' : '+'}</span>
    </button>
  );

  const Select = ({
    id,
    value,
    onChange,
    options,
    placeholder = 'Select...',
  }: {
    id: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder?: string;
  }) => (
    <select
      id={id}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );

  return (
    <div className="space-y-4">
      <input type="hidden" ref={hiddenInputRef} name={name} id={name} />
      <Label>Facts & Features</Label>
      <p className="text-xs text-muted-foreground mb-4">
        Fill in the property details below. All fields are optional.
      </p>

      {type === 'residential' ? (
        <>
          {/* Interior Section */}
          <div className="space-y-2">
            <SectionHeader id="interior" title="Interior" />
            {openSections.has('interior') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="heating">Heating</Label>
                    <Select
                      id="heating"
                      value={interior.heating}
                      onChange={(value) => {
                        setInterior({ ...interior, heating: value });
                      }}
                      options={['Central', 'Ductless', 'Electric', 'Gas', 'Heat Pump', 'Radiant', 'Other']}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cooling">Cooling</Label>
                    <Select
                      id="cooling"
                      value={interior.cooling}
                      onChange={(value) => {
                        setInterior({ ...interior, cooling: value });
                      }}
                      options={['Central Air', 'Ductless', 'Window Units', 'Other']}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appliances">Appliances</Label>
                  <Input
                    id="appliances"
                    value={interior.appliances}
                    onChange={(e) => {
                      setInterior({ ...interior, appliances: e.target.value });
                    }}
                    placeholder="e.g., Included: Dryer, Electric Range, Refrigerator"
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flooring">Flooring</Label>
                  <Input
                    id="flooring"
                    value={interior.flooring}
                    onChange={(e) => {
                      setInterior({ ...interior, flooring: e.target.value });
                    }}
                    placeholder="e.g., Laminate, Hardwood, Carpet"
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="hasBasement">Has Basement</Label>
                    <Select
                      id="hasBasement"
                      value={interior.hasBasement}
                      onChange={(value) => {
                        setInterior({ ...interior, hasBasement: value });
                      }}
                      options={['Yes', 'No', 'Crawl Space']}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalStructureArea">Total Structure Area</Label>
                    <Input
                      id="totalStructureArea"
                      value={interior.totalStructureArea}
                      onChange={(e) => {
                        setInterior({ ...interior, totalStructureArea: e.target.value });
                      }}
                      placeholder="e.g., 850"
                      className="bg-background text-foreground"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalInteriorLivableArea">Total Interior Livable Area</Label>
                  <Input
                    id="totalInteriorLivableArea"
                    value={interior.totalInteriorLivableArea}
                    onChange={(e) => {
                      setInterior({ ...interior, totalInteriorLivableArea: e.target.value });
                    }}
                    placeholder="e.g., 850 sqft"
                    className="bg-background text-foreground"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Property Section */}
          <div className="space-y-2">
            <SectionHeader id="property" title="Property" />
            {openSections.has('property') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label>Parking</Label>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="parkingTotalSpaces">Total Spaces</Label>
                      <Input
                        id="parkingTotalSpaces"
                        value={property.parkingTotalSpaces}
                        onChange={(e) => {
                          setProperty({ ...property, parkingTotalSpaces: e.target.value });
                        }}
                        placeholder="e.g., 1"
                        className="bg-background text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parkingFeatures">Parking Features</Label>
                      <Input
                        id="parkingFeatures"
                        value={property.parkingFeatures}
                        onChange={(e) => {
                          setProperty({ ...property, parkingFeatures: e.target.value });
                        }}
                        placeholder="e.g., Attached Carport"
                        className="bg-background text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parkingCoveredSpaces">Covered Spaces</Label>
                      <Input
                        id="parkingCoveredSpaces"
                        value={property.parkingCoveredSpaces}
                        onChange={(e) => {
                          setProperty({ ...property, parkingCoveredSpaces: e.target.value });
                        }}
                        placeholder="e.g., 1"
                        className="bg-background text-foreground"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="levels">Levels</Label>
                    <Select
                      id="levels"
                      value={property.levels}
                      onChange={(value) => {
                        setProperty({ ...property, levels: value });
                      }}
                      options={['One', 'Two', 'Three', 'Multi-Level']}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stories">Stories</Label>
                    <Input
                      id="stories"
                      value={property.stories}
                      onChange={(e) => {
                        setProperty({ ...property, stories: e.target.value });
                      }}
                      placeholder="e.g., 1"
                      className="bg-background text-foreground"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exteriorFeatures">Exterior Features</Label>
                  <Input
                    id="exteriorFeatures"
                    value={property.exteriorFeatures}
                    onChange={(e) => {
                      setProperty({ ...property, exteriorFeatures: e.target.value });
                    }}
                    placeholder="e.g., Gravel Driveway, Covered, Patio"
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fencing">Fencing</Label>
                  <Select
                    id="fencing"
                    value={property.fencing}
                    onChange={(value) => {
                      setProperty({ ...property, fencing: value });
                    }}
                    options={['None', 'Partial', 'Full', 'Other']}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Lot Section */}
          <div className="space-y-2">
            <SectionHeader id="lot" title="Lot" />
            {openSections.has('lot') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="lotSize">Size</Label>
                  <Input
                    id="lotSize"
                    value={lot.size}
                    onChange={(e) => {
                      setLot({ ...lot, size: e.target.value });
                    }}
                    placeholder="e.g., 5,662.8 Square Feet"
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lotFeatures">Features</Label>
                  <Input
                    id="lotFeatures"
                    value={lot.features}
                    onChange={(e) => {
                      setLot({ ...lot, features: e.target.value });
                    }}
                    placeholder="e.g., Near Park, Sloped"
                    className="bg-background text-foreground"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-2">
            <SectionHeader id="details" title="Details" />
            {openSections.has('details') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="parcelNumber">Parcel Number</Label>
                  <Input
                    id="parcelNumber"
                    value={details.parcelNumber}
                    onChange={(e) => {
                      setDetails({ ...details, parcelNumber: e.target.value });
                    }}
                    placeholder="e.g., 1505163000"
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialConditions">Special Conditions</Label>
                  <Select
                    id="specialConditions"
                    value={details.specialConditions}
                    onChange={(value) => {
                      setDetails({ 
                        ...details, 
                        specialConditions: value,
                        specialConditionsOther: value !== 'Other' ? '' : details.specialConditionsOther
                      });
                    }}
                    options={['None', 'Other']}
                  />
                  <AnimatePresence>
                    {details.specialConditions === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <Input
                          id="specialConditionsOther"
                          value={details.specialConditionsOther}
                          onChange={(e) => {
                            setDetails({ ...details, specialConditionsOther: e.target.value });
                          }}
                          placeholder="Enter special condition"
                          className="bg-background text-foreground"
                          required
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Construction Section */}
          <div className="space-y-2">
            <SectionHeader id="construction" title="Construction" />
            {openSections.has('construction') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="homeType">Home Type</Label>
                    <Select
                      id="homeType"
                      value={construction.homeType}
                      onChange={(value) => {
                        setConstruction({ ...construction, homeType: value });
                      }}
                      options={[
                        'Single Family',
                        'MultiFamily',
                        'Condo',
                        'Townhouse',
                        'MobileManufactured',
                        'Unimproved Land',
                        'Mixed Use Office',
                        'Other',
                      ]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertySubtype">Property Subtype</Label>
                    <Input
                      id="propertySubtype"
                      value={construction.propertySubtype}
                      onChange={(e) => {
                        setConstruction({ ...construction, propertySubtype: e.target.value });
                      }}
                      placeholder="e.g., Manufactured Home, Single Family Residence"
                      className="bg-background text-foreground"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="materials">Materials</Label>
                  <Input
                    id="materials"
                    value={construction.materials}
                    onChange={(e) => {
                      setConstruction({ ...construction, materials: e.target.value });
                    }}
                    placeholder="e.g., Wood Siding"
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="foundation">Foundation</Label>
                    <Select
                      id="foundation"
                      value={construction.foundation}
                      onChange={(value) => {
                        setConstruction({ ...construction, foundation: value });
                      }}
                      options={['Crawlspace', 'Slab', 'Basement', 'Block', 'Other']}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roof">Roof</Label>
                    <Input
                      id="roof"
                      value={construction.roof}
                      onChange={(e) => {
                        setConstruction({ ...construction, roof: e.target.value });
                      }}
                      placeholder="e.g., Architectural, Shingle"
                      className="bg-background text-foreground"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="newConstruction">New Construction</Label>
                    <Select
                      id="newConstruction"
                      value={construction.newConstruction}
                      onChange={(value) => {
                        setConstruction({ ...construction, newConstruction: value });
                      }}
                      options={['Yes', 'No']}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearBuilt">Year Built</Label>
                    <Input
                      id="yearBuilt"
                      value={construction.yearBuilt}
                      onChange={(e) => {
                        setConstruction({ ...construction, yearBuilt: e.target.value });
                      }}
                      placeholder="e.g., 1970"
                      className="bg-background text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Community Section */}
          <div className="space-y-2">
            <SectionHeader id="community" title="Community & HOA" />
            {openSections.has('community') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="communityFeatures">Features</Label>
                  <Input
                    id="communityFeatures"
                    value={community.features}
                    onChange={(e) => {
                      setCommunity({ ...community, features: e.target.value });
                    }}
                    placeholder="e.g., Clubhouse, Fitness, Playground, Pool"
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="security">Security</Label>
                  <Input
                    id="security"
                    value={community.security}
                    onChange={(e) => {
                      setCommunity({ ...community, security: e.target.value });
                    }}
                    placeholder="e.g., Security System"
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subdivision">Subdivision</Label>
                  <Input
                    id="subdivision"
                    value={community.subdivision}
                    onChange={(e) => {
                      setCommunity({ ...community, subdivision: e.target.value });
                    }}
                    placeholder="e.g., Forest Hills Sub Lost Bridge Village"
                    className="bg-background text-foreground"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Location Section */}
          <div className="space-y-2">
            <SectionHeader id="location" title="Location" />
            {openSections.has('location') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    value={location.region}
                    onChange={(e) => {
                      setLocation({ ...location, region: e.target.value });
                    }}
                    placeholder="e.g., Garfield"
                    className="bg-background text-foreground"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Financial Section */}
          <div className="space-y-2">
            <SectionHeader id="financial" title="Financial & Listing Details" />
            {openSections.has('financial') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="pricePerSquareFoot">Price per Square Foot</Label>
                  <Input
                    id="pricePerSquareFoot"
                    value={financial.pricePerSquareFoot}
                    onChange={(e) => {
                      setFinancial({ ...financial, pricePerSquareFoot: e.target.value });
                    }}
                    placeholder="e.g., $188/sqft"
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="annualTaxAmount">Annual Tax Amount</Label>
                    <Input
                      id="annualTaxAmount"
                      value={financial.annualTaxAmount}
                      onChange={(e) => {
                        setFinancial({ ...financial, annualTaxAmount: e.target.value });
                      }}
                      placeholder="e.g., $535"
                      className="bg-background text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOnMarket">Date on Market</Label>
                    <Input
                      id="dateOnMarket"
                      value={financial.dateOnMarket}
                      onChange={(e) => {
                        setFinancial({ ...financial, dateOnMarket: e.target.value });
                      }}
                      placeholder="e.g., 7/28/2025"
                      className="bg-background text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Commercial Lot Section */}
          <div className="space-y-2">
            <SectionHeader id="lot" title="Lot" />
            {openSections.has('lot') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="lotSize">Size</Label>
                  <Input
                    id="lotSize"
                    value={lot.size}
                    onChange={(e) => {
                      setLot({ ...lot, size: e.target.value });
                    }}
                    placeholder="e.g., 6,969.6 Square Feet"
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lotFeatures">Features</Label>
                  <Input
                    id="lotFeatures"
                    value={lot.features}
                    onChange={(e) => {
                      setLot({ ...lot, features: e.target.value });
                    }}
                    placeholder="e.g., Central Business District, City Lot, Level"
                    className="bg-background text-foreground"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Commercial Property Section */}
          <div className="space-y-2">
            <SectionHeader id="property" title="Property" />
            {openSections.has('property') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="commercialFencing">Fencing</Label>
                  <Select
                    id="commercialFencing"
                    value={commercialProperty.fencing}
                    onChange={(value) => {
                      setCommercialProperty({ ...commercialProperty, fencing: value });
                    }}
                    options={['None', 'Partial', 'Full', 'Other']}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commercialExteriorFeatures">Exterior Features</Label>
                  <Input
                    id="commercialExteriorFeatures"
                    value={commercialProperty.exteriorFeatures}
                    onChange={(e) => {
                      setCommercialProperty({ ...commercialProperty, exteriorFeatures: e.target.value });
                    }}
                    placeholder="e.g., Cleared"
                    className="bg-background text-foreground"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Commercial Details Section */}
          <div className="space-y-2">
            <SectionHeader id="details" title="Details" />
            {openSections.has('details') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="commercialParcelNumber">Parcel Number</Label>
                  <Input
                    id="commercialParcelNumber"
                    value={commercialDetails.parcelNumber}
                    onChange={(e) => {
                      setCommercialDetails({ ...commercialDetails, parcelNumber: e.target.value });
                    }}
                    placeholder="e.g., 0202198000"
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commercialSpecialConditions">Special Conditions</Label>
                  <Select
                    id="commercialSpecialConditions"
                    value={commercialDetails.specialConditions}
                    onChange={(value) => {
                      setCommercialDetails({ 
                        ...commercialDetails, 
                        specialConditions: value,
                        specialConditionsOther: value !== 'Other' ? '' : commercialDetails.specialConditionsOther
                      });
                    }}
                    options={['None', 'Other']}
                  />
                  <AnimatePresence>
                    {commercialDetails.specialConditions === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <Input
                          id="commercialSpecialConditionsOther"
                          value={commercialDetails.specialConditionsOther}
                          onChange={(e) => {
                            setCommercialDetails({ ...commercialDetails, specialConditionsOther: e.target.value });
                          }}
                          placeholder="Enter special condition"
                          className="bg-background text-foreground"
                          required
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commercialSubdivision">Subdivision</Label>
                  <Input
                    id="commercialSubdivision"
                    value={commercialDetails.subdivision}
                    onChange={(e) => {
                      setCommercialDetails({ ...commercialDetails, subdivision: e.target.value });
                    }}
                    placeholder="e.g., Wood Stroud Add Rogers"
                    className="bg-background text-foreground"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Commercial Construction Section */}
          <div className="space-y-2">
            <SectionHeader id="construction" title="Construction" />
            {openSections.has('construction') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="commercialHomeType">Home Type</Label>
                    <Select
                      id="commercialHomeType"
                      value={commercialConstruction.homeType}
                      onChange={(value) => {
                        setCommercialConstruction({ ...commercialConstruction, homeType: value });
                      }}
                      options={[
                        'Single Family',
                        'MultiFamily',
                        'Condo',
                        'Townhouse',
                        'MobileManufactured',
                        'Unimproved Land',
                        'Mixed Use Office',
                        'Other',
                      ]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commercialPropertySubtype">Property Subtype</Label>
                    <Input
                      id="commercialPropertySubtype"
                      value={commercialConstruction.propertySubtype}
                      onChange={(e) => {
                        setCommercialConstruction({ ...commercialConstruction, propertySubtype: e.target.value });
                      }}
                      placeholder="e.g., Retail"
                      className="bg-background text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Commercial Location Section */}
          <div className="space-y-2">
            <SectionHeader id="location" title="Location" />
            {openSections.has('location') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="space-y-2">
                  <Label htmlFor="commercialRegion">Region</Label>
                  <Input
                    id="commercialRegion"
                    value={commercialLocation.region}
                    onChange={(e) => {
                      setCommercialLocation({ ...commercialLocation, region: e.target.value });
                    }}
                    placeholder="e.g., Rogers"
                    className="bg-background text-foreground"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Commercial Financial Section */}
          <div className="space-y-2">
            <SectionHeader id="financial" title="Financial & Listing Details" />
            {openSections.has('financial') && (
              <div className="pl-4 space-y-3 border-l-2 border-gray-200">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="commercialAnnualTaxAmount">Annual Tax Amount</Label>
                    <Input
                      id="commercialAnnualTaxAmount"
                      value={commercialFinancial.annualTaxAmount}
                      onChange={(e) => {
                        setCommercialFinancial({ ...commercialFinancial, annualTaxAmount: e.target.value });
                      }}
                      placeholder="e.g., $693"
                      className="bg-background text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commercialDateOnMarket">Date on Market</Label>
                    <Input
                      id="commercialDateOnMarket"
                      value={commercialFinancial.dateOnMarket}
                      onChange={(e) => {
                        setCommercialFinancial({ ...commercialFinancial, dateOnMarket: e.target.value });
                      }}
                      placeholder="e.g., 3/17/2025"
                      className="bg-background text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
