import React, { useEffect, useState } from "react";
import {
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

import type { PlaceData } from "../../models/place.d.ts";

type LocationMarkerProps = {
  museum: PlaceData;
  handleMarkerClick?: (museum: PlaceData) => void;
};

const LocationMarker: React.FC<LocationMarkerProps> = ({
  museum,
  handleMarkerClick = () => {},
}) => {
  const [isInfoWindowVisible, setInfoWindowVisible] = useState(false);
  const [isInfoWindowSelected, setInfoWindowSelected] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  useEffect(() => {
    if (isInfoWindowSelected && !museum.detailsFetched) {
      handleMarkerClick(museum);
    }
  }, [isInfoWindowSelected]);

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
          {!museum.detailsFetched && isInfoWindowSelected && (
            <div>Loading...</div>
          )}
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
