import React, { useEffect, useState } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

type MapControllerProps = {
  location: string;
};

const MapController = ({ location }: MapControllerProps) => {
  const map = useMap();
  const geocodingLibrary = useMapsLibrary("geocoding");
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  useEffect(() => {
    if (geocodingLibrary) {
      setGeocoder(new geocodingLibrary.Geocoder());
    }
  }, [geocodingLibrary]);

  useEffect(() => {
    if (!map || !geocoder || !location) return;

    geocoder.geocode({ address: location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const locationViewport = results[0].geometry.viewport;
        map.fitBounds(locationViewport);
        /*
        const listener = google.maps.event.addListenerOnce(
          map,
          "idle",
          function () {
            let currentZoom = map.getZoom();

            if (currentZoom && currentZoom < 15) {
              map.setZoom(currentZoom + 1);
            }

            google.maps.event.removeListener(listener);
          }
        );
*/
      } else {
        console.error(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  }, [map, geocoder, location]);

  return null;
};

export default MapController;
