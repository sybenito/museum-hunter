import React, { useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import LocationMarker from "./LocationMarker.tsx";

import type { PlaceData } from "../../models/place.d.ts";

const MAX_RESULT_COUNT = 100;
const SEARCH_DEBOUNCE_MS = 500;
const DEFAULT_TEXT_QUERY = "museum";
const DEFAULT_LOCATION_TYPE = "museum";
const SEARCH_BY_TEXT_RETURN_FIELDS = [
  "displayName",
  "location",
  "id",
  "addressComponents",
  "businessStatus",
  "photos",
  "priceLevel",
  "rating",
];
const SEARCH_DETAILS_RETURN_FIELDS = [
  "displayName",
  "location",
  "id",
  "addressComponents",
  "businessStatus",
  "photos",
  "priceLevel",
  "rating",
  "formattedAddress",
  "googleMapsURI",
  "internationalPhoneNumber",
  "openingHours",
  "websiteURI",
];

const LocationMarkers: React.FC = () => {
  const map = useMap();
  let debounceTimeout: NodeJS.Timeout;
  const [museums, setMuseums] = useState<Map<string, PlaceData>>(new Map());
  const [searchTrigger, setSearchTrigger] = useState(0);

  const getPlaceDetails = async (museum: PlaceData): Promise<void> => {
    if (!map) return;

    try {
      const place = new google.maps.places.Place({
        id: museum.id,
      });
      await place.fetchFields({ fields: SEARCH_DETAILS_RETURN_FIELDS });

      if (place && place.location) {
        const updatedPlace: PlaceData = {
          id: place.id || "",
          displayName: place.displayName || "Unnamed Museum",
          location: place.location.toJSON(),
          addressComponents: place.addressComponents as any,
          businessStatus: (place.businessStatus || undefined) as any,
          photos: place.photos as any,
          rating: (place.rating || undefined) as any,
          formattedAddress: place.formattedAddress || undefined,
          googleMapsUri: place.googleMapsURI || undefined,
          internationalPhoneNumber: place.internationalPhoneNumber || undefined,
          openingHours: place.regularOpeningHours || undefined,
          websiteUri: place.websiteURI || undefined,
          detailsFetched: true,
        };

        console.log("Fetched place details:", updatedPlace);
        setMuseums((prevMuseums) =>
          new Map(prevMuseums).set(museum.id, updatedPlace)
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to fetch place details:", error.message);
      } else {
        console.error("Failed to fetch place details:", error);
      }
    }
  };

  const performPlacesSearch = () => {
    if (!map) return;

    const bounds = map.getBounds();
    if (!bounds) return;

    google.maps.places.Place.searchByText({
      textQuery: DEFAULT_TEXT_QUERY,
      includedType: DEFAULT_LOCATION_TYPE,
      maxResultCount: MAX_RESULT_COUNT,
      locationRestriction: bounds,
      fields: SEARCH_BY_TEXT_RETURN_FIELDS,
    })
      .then(({ places }) => {
        const newPlaces = new Map<string, PlaceData>();

        places.forEach((place) => {
          if (!museums.has(place.id) && place.location) {
            const newPlace = {
              id: place.id,
              displayName: place.displayName || "Unnamed Museum",
              location: place.location!.toJSON(),
              addressComponents: place.addressComponents,
              businessStatus: place.businessStatus,
              photos: place.photos,
              priceLevel: place.priceLevel,
              rating: place.rating,
              detailsFetched: false,
            } as PlaceData;

            newPlaces.set(place.id, newPlace);
          }
        });

        if (newPlaces.size > 0) {
          setMuseums(new Map([...museums, ...newPlaces]));
        }
      })
      .catch((error) => {
        console.error("Places Search error:", error);
      });
  };

  useEffect(() => {
    if (!map) return;

    // re-run the search when the map stops moving
    const idleListener = map.addListener("idle", () =>
      setSearchTrigger((c) => c + 1)
    );

    return () => {
      idleListener.remove();
    };
  }, [map]);

  useEffect(() => {
    if (!google.maps.places || searchTrigger === 0) return;

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      performPlacesSearch();
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTrigger]);

  return (
    <>
      {Array.from(museums.values()).map((museum) => (
        <LocationMarker
          key={museum.id}
          museum={museum}
          handleMarkerClick={getPlaceDetails}
        />
      ))}
    </>
  );
};

export default LocationMarkers;
