import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import ErrorBoundary from "./ErrorBoundary";
const CountrySearch = React.lazy(() => import("countrySearch/CountrySearch"));
const GoogleMap = React.lazy(() => import("googleMap/GoogleMap"));

import "./index.css";

const App = () => (
  <div className='mt-10 text-3xl mx-auto max-w-6xl'>
    <div>Museum Hunter</div>
    <ErrorBoundary fallback={<div>Failed to load Country Search.</div>}>
      <Suspense fallback={<div>Loading Country Search...</div>}>
        <CountrySearch />
      </Suspense>
    </ErrorBoundary>
    <ErrorBoundary fallback={<div>Failed to load Map.</div>}>
      <Suspense fallback={<div>Loading Map...</div>}>
        <div className='mt-10 h-screen max-h-[500px]'>
          <GoogleMap />
        </div>
      </Suspense>
    </ErrorBoundary>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
