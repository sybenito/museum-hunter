import type { Country } from '../model/country';
type CountryResultsProps = {
    countries: Country[];
    onSelectCountry: (country: Country) => void;
};
declare const CountryResults: ({ countries, onSelectCountry }: CountryResultsProps) => import("react/jsx-runtime").JSX.Element;
export default CountryResults;
