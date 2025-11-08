type Country = {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  flag: string;
  currencies: Array<{ code: string; name: string; symbol: string }>;
  capital: string[];
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
};

type Currency = {
  name: string;
  symbol: string;
};

type CountryResponse = {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  flag: string;
  currencies: {
    [key: string]: Currency;
  };
  capital: string[];
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
};

type SelectedLocation = {
  country: Country | null;
  state: string | null;
  city: string | null;
};

export type { Country, CountryResponse, SelectedLocation };
