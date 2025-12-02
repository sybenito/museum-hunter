import React, { useEffect, useState } from "react";
import {
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

import type { PlaceData } from "../../models/place.d.ts";

const LocationMarker: React.FC<{ museum: PlaceData }> = ({ museum }) => {
  const [isInfoWindowVisible, setInfoWindowVisible] = useState(false);
  const [isInfoWindowSelected, setInfoWindowSelected] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      ref={markerRef}
      key={museum.id}
      position={museum.location}
      title={museum.displayName}
      className='cursor-pointer'
      onMouseEnter={() => setInfoWindowVisible(true)}
      onMouseLeave={() => {
        setInfoWindowVisible(false);
      }}
      onClick={() => setInfoWindowSelected(true)}
    >
      {(isInfoWindowVisible || isInfoWindowSelected) && (
        <InfoWindow
          anchor={marker}
          position={museum.location}
          pixelOffset={[0, 0]}
          disableAutoPan={true}
          headerContent={museum.displayName}
          onCloseClick={() => setInfoWindowSelected(false)}
        >
          <h2>{museum.displayName}</h2>
        </InfoWindow>
      )}
      <Pin
        background={"#0abab5"}
        glyphColor={"#FFFFFF"}
        borderColor={"#000000"}
      />
    </AdvancedMarker>
  );
};

export default LocationMarker;
