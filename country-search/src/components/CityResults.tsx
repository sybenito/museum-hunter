type CityResultsProps = {
  cities: string[];
  onSelectCity: (city: string) => void;
};

const CityResults = ({ cities, onSelectCity }: CityResultsProps) => {
  return (
    <div className="border border-gray-300 rounded mt-2 max-h-60 overflow-y-auto">
      {cities.map((city) => (
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
