import type { Country } from '../model/Country';

type CountryResultsProps = {
  countries: Country[];
  onSelectCountry: (country: Country) => void;
};

const CountryResults = ({ countries, onSelectCountry }: CountryResultsProps) => {
  const countriesSorted = [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));

  return (
    <div className="border border-gray-300 rounded mt-2 max-h-60 overflow-y-auto">
      {countriesSorted.map((country) => (
        <div
          key={country.name.common}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelectCountry(country)}
        >
          {country.name.common}
        </div>
      ))}
    </div>
  );
};

export default CountryResults;
