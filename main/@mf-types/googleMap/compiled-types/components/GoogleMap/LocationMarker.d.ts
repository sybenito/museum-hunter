import React from "react";
import type { PlaceData } from "../../models/place.d.ts";
type LocationMarkerProps = {
    museum: PlaceData;
    handleMarkerClick?: (museum: PlaceData) => void;
};
declare const LocationMarker: React.FC<LocationMarkerProps>;
export default LocationMarker;
