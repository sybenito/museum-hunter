import { useReducer, useEffect } from 'react';
import { useCountries } from '../hooks/useCountries';
import type { SelectedLocation, Country } from '../model/Country';
import CountryResults from './CountryResults';
import StateResults from './StateResults';
import CityResults from './CityResults';
import Tag from './Tag';

import '../index.css';

type CountrySearchProps = {
  setLocation?: (location: string) => void;
};

type LocationAction = {
  type: 'SET_COUNTRY' | 'SET_STATE' | 'SET_CITY' | 'RESET';
  payload: Country | string | null;
};

const initLocation: SelectedLocation = {
  country: null,
  state: null,
  city: null,
};

const CountrySearch = ({ setLocation }: CountrySearchProps) => {
  const { setCountryNameSearch, setSelectedLocation, selectedLocation, countries, states, cities } =
    useCountries();

  const reduceLocation = (state: SelectedLocation, action: LocationAction) => {
    switch (action.type) {
      case 'SET_COUNTRY':
        return { country: action.payload as Country | null, state: null, city: null };
      case 'SET_STATE':
        return { ...state, state: action.payload as string, city: null };
      case 'SET_CITY':
        return { ...state, city: action.payload as string };
      case 'RESET':
        return initLocation;
      default:
        return state;
    }
  };

  const [location, dispatchLocation] = useReducer(reduceLocation, initLocation);

  const handleCountryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryNameSearch(e.target.value);
  };

  useEffect(() => {
    setSelectedLocation(location);

    if (setLocation && location.country) {
      const locationString = [
        location.country.name.common,
        location.state && location.state !== 'All States and Provinces' ? location.state : null,
        location.city,
      ]
        .filter((v) => v !== null)
        .join(', ');

      console.log('Setting location string:', locationString);
      setLocation(locationString);
    } else if (setLocation) {
      setLocation('');
    }
  }, [location, setSelectedLocation]);

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      {selectedLocation.country === null && (
        <div>
          <input
            name="countryName"
            onChange={handleCountryNameChange}
            className="shadow appearance-none border-gray-400 rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Country Search..."
          />
          {countries.length > 0 && (
            <CountryResults
              countries={countries}
              onSelectCountry={(c) => dispatchLocation({ type: 'SET_COUNTRY', payload: c })}
            />
          )}
        </div>
      )}
      {selectedLocation.country && (
        <div>
          <Tag
            name={selectedLocation.country.name.common}
            onClose={() => dispatchLocation({ type: 'RESET', payload: '' })}
            color="blue"
          />
          {selectedLocation.state === null && states.length > 0 && (
            <div>
              <StateResults
                states={states}
                onSelectState={(s) => dispatchLocation({ type: 'SET_STATE', payload: s })}
              />
            </div>
          )}
          {selectedLocation.state && (
            <div>
              <Tag
                name={selectedLocation.state}
                onClose={() => dispatchLocation({ type: 'SET_STATE', payload: null })}
                color="green"
              />
              {selectedLocation.city === null && cities.length > 0 && (
                <CityResults
                  cities={cities}
                  onSelectCity={(c) => dispatchLocation({ type: 'SET_CITY', payload: c })}
                />
              )}
            </div>
          )}
          {selectedLocation.state === null &&
            selectedLocation.city === null &&
            states.length === 0 &&
            cities.length > 0 && (
              <CityResults
                cities={cities}
                onSelectCity={(c) => dispatchLocation({ type: 'SET_CITY', payload: c })}
              />
            )}
          {selectedLocation.city && (
            <Tag
              name={selectedLocation.city}
              onClose={() => dispatchLocation({ type: 'SET_CITY', payload: null })}
              color="orange"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
