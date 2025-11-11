import { APIProvider, Map } from "@vis.gl/react-google-maps";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "";
const CITY_ZOOM = 12;

const GoogleMap = () => {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={CITY_ZOOM}
        gestureHandling='greedy'
        disableDefaultUI
      ></Map>
    </APIProvider>
  );
};

export default GoogleMap;
