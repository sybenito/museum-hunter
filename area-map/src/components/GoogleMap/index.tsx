import { APIProvider, Map } from "@vis.gl/react-google-maps";
import MapController from "./MapController";
import LocationMarkers from "./LocationMarkers";

type GoogleMapProps = {
  location: string;
};

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "";
const GOOGLE_MAPS_ID = process.env.GOOGLE_MAPS_ID || "";
const DEFAULT_ZOOM = 10;

const GoogleMap = ({ location }: GoogleMapProps) => {
  if (!GOOGLE_MAPS_API_KEY || !GOOGLE_MAPS_ID) {
    return <h1>Google Maps Key or ID are missing</h1>;
  }

  return (
    location && (
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={DEFAULT_ZOOM}
          gestureHandling='greedy'
          disableDefaultUI
          mapId={GOOGLE_MAPS_ID}
        >
          <MapController location={location} />
          <LocationMarkers />
        </Map>
      </APIProvider>
    )
  );
};

export default GoogleMap;
