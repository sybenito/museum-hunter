import { APIProvider, Map } from "@vis.gl/react-google-maps";
import MapController from "./MapController";

type GoogleMapProps = {
  location: string;
};

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "";
const DEFAULT_ZOOM = 3;

const GoogleMap = ({ location }: GoogleMapProps) => {
  return (
    location && (
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={DEFAULT_ZOOM}
          gestureHandling='greedy'
          disableDefaultUI
        ></Map>
        <MapController location={location} />
      </APIProvider>
    )
  );
};

export default GoogleMap;
