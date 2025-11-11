import ReactDOM from "react-dom/client";
import GoogleMap from "./components/GoogleMap";

import "./index.css";

const App = () => (
  <div className='mt-10 h-screen max-h-[500px]'>
    <GoogleMap></GoogleMap>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
