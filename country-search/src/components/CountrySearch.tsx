import { useReducer, useEffect } from 'react';
import { useCountries } from '../hooks/useCountries';
import type { SelectedLocation, Country } from '../model/country';
import CountryResults from './CountryResults';
import StateResults from './StateResults';
import CityResults from './CityResults';

type LocationAction = {
  type: 'SET_COUNTRY' | 'SET_STATE' | 'SET_CITY' | 'RESET';
  payload: Country | string | null;
};

const initLocation: SelectedLocation = {
  country: null,
  state: null,
  city: null,
};

const CountrySearch = () => {
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
  }, [location, setSelectedLocation]);

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Country Search</div>
      {selectedLocation.country === null && (
        <div>
          <input name="countryName" onChange={handleCountryNameChange} />
          <CountryResults
            countries={countries}
            onSelectCountry={(c) => dispatchLocation({ type: 'SET_COUNTRY', payload: c })}
          />
        </div>
      )}
      {selectedLocation.country && (
        <div>
          Selected Country: {selectedLocation.country.name.common}
          <button onClick={() => dispatchLocation({ type: 'RESET', payload: '' })}>x</button>
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
              Selected State: {selectedLocation.state}
              <button onClick={() => dispatchLocation({ type: 'SET_STATE', payload: null })}>
                x
              </button>
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
            <div>
              Selected City: {selectedLocation.city}
              <button onClick={() => dispatchLocation({ type: 'SET_CITY', payload: null })}>
                x
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
