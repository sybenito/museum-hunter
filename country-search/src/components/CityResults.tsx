import { useState, useEffect } from 'react';

type CityResultsProps = {
  cities: string[];
  onSelectCity: (city: string) => void;
};

const CityResults = ({ cities, onSelectCity }: CityResultsProps) => {
  const [filteredCities, setFilteredCities] = useState<string[]>(cities);
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    const filtered = cities.filter((city) => city.toLowerCase().includes(filterText.toLowerCase()));
    setFilteredCities(filtered);
  }, [filterText, cities]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  return (
    <div className="border border-gray-300 rounded mt-2 max-h-120 overflow-y-auto">
      <div className="p-2 border-b border-gray-300">
        <input
          name="filterCities"
          className="rounded w-full p-2 border border-gray-300 text-gray-400"
          onChange={handleFilterChange}
          placeholder="City Search..."
        />
      </div>
      {filteredCities.sort().map((city) => (
        <div
          key={city}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelectCity(city)}
        >
          {city}
        </div>
      ))}
    </div>
  );
};

export default CityResults;
