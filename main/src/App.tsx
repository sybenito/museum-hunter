import ReactDOM from "react-dom/client";
import CountrySearch from "countrySearch/CountrySearch";
import { default as CoinMarketSearch } from "coinMarketSearch/Search";

import "./index.css";

const App = () => (
  <div className='mt-10 text-3xl mx-auto max-w-6xl'>
    <div>Museum Hunter</div>
    <CountrySearch />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
