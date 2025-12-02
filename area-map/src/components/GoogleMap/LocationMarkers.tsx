import React, { useEffect, useState } from "react";
import { useMap, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
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

const LocationMarkers: React.FC = () => {
  const map = useMap();
  let debounceTimeout: NodeJS.Timeout;
  const [museums, setMuseums] = useState<Map<string, PlaceData>>(new Map());
  const [searchTrigger, setSearchTrigger] = useState(0);

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
        <LocationMarker key={museum.id} museum={museum} />
      ))}
    </>
  );
};

export default LocationMarkers;
