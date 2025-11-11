import type { Country, SelectedLocation } from '../model/Country';
declare const useCountries: () => {
    setCountryNameSearch: import("react").Dispatch<import("react").SetStateAction<string>>;
    setSelectedLocation: import("react").Dispatch<import("react").SetStateAction<SelectedLocation>>;
    selectedLocation: SelectedLocation;
    countries: Country[];
    states: string[];
    cities: string[];
};
export { useCountries };
export type { SelectedLocation, Country };
