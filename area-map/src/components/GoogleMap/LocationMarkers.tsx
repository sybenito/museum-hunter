import React, { useEffect, useState } from "react";
import { useMap, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

// Define the type for the data we store about a museum place
interface PlaceData {
  id: string;
  displayName: string;
  location: google.maps.LatLngLiteral;
}

const MAX_RESULT_COUNT = 100;
const DEFAULT_TEXT_QUERY = "museum";
const DEFAULT_LOCATION_TYPE = "museum";

const LocationMarkers: React.FC = () => {
  const map = useMap();
  const [museums, setMuseums] = useState<PlaceData[]>([]);
  const [searchTrigger, setSearchTrigger] = useState(0);

  useEffect(() => {
    if (!map) return;

    // Add a listener to re-run the search when the map stops moving
    const idleListener = map.addListener("idle", () =>
      setSearchTrigger((c) => c + 1)
    );

    return () => {
      idleListener.remove();
    };
  }, [map]);

  useEffect(() => {
    if (!map || !google.maps.places || searchTrigger === 0) return;

    const bounds = map.getBounds();
    if (!bounds) return;

    google.maps.places.Place.searchByText({
      textQuery: DEFAULT_TEXT_QUERY,
      includedType: DEFAULT_LOCATION_TYPE,
      maxResultCount: MAX_RESULT_COUNT,
      locationRestriction: bounds,
      fields: ["displayName", "location", "id"],
    })
      .then(({ places }) => {
        const museumResults: PlaceData[] = places.map((place) => ({
          id: place.id,
          displayName: place.displayName || "Unnamed Museum",
          location: place.location!.toJSON(),
        }));
        setMuseums(museumResults);
      })
      .catch((error) => {
        console.error("Places Search error:", error);
      });
  }, [map, searchTrigger]);

  return (
    <>
      {museums.map((museum) => (
        <AdvancedMarker
          key={museum.id}
          position={museum.location}
          title={museum.displayName}
        >
          <Pin
            background={"#FF0000"}
            glyphColor={"#FFFFFF"}
            borderColor={"#000000"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default LocationMarkers;
