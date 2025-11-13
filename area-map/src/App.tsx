import ReactDOM from "react-dom/client";
import GoogleMap from "./components/GoogleMap";

import "./index.css";

const DEFAULT_CITY = "San Francisco, CA, USA";

const App = () => (
  <div className='mt-10 h-screen max-h-[500px]'>
    <h1>Area Map</h1>
    <GoogleMap location={DEFAULT_CITY}></GoogleMap>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
