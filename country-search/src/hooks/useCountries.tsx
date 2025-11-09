import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Country, CountryResponse, SelectedLocation } from '../model/country';

const DEBOUNCE_DELAY = 500;
const REST_COUNTRIES_API = 'https://restcountries.com/v3.1/name';
const COUNTRIES_NOW_API = 'https://countriesnow.space/api/v0.1/countries';

const useCountries = () => {
  const [countryNameSearch, setCountryNameSearch] = useState('');
  const [countries, setCountries] = useState<Array<Country>>([]);
  const [states, setStates] = useState<Array<string>>([]);
  const [cities, setCities] = useState<Array<string>>([]);
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>({
    country: null,
    state: null,
    city: null,
  });

  const fetchCountries = (name: string) => {
    if (!name) {
      setCountries([]);
      return;
    }

    const url = `${REST_COUNTRIES_API}/${name}`;
    axios
      .get<CountryResponse[]>(url)
      .then((response) => {
        const data: Country[] = response.data.map((country: CountryResponse) => ({
          name: country.name,
          cca3: country.cca3,
          flag: country.flag,
          currencies: country.currencies
            ? Object.keys(country.currencies).map((key: string) => ({
                code: key,
                name: country.currencies[key].name,
                symbol: country.currencies[key].symbol,
              }))
            : [],
          capital: country.capital || [],
          maps: country.maps,
          population: country.population,
        }));

        setCountries(data);
      })
      .catch((error) => {
        setCountries([]);
      });
  };

  const fetchStates = (country: string) => {
    if (!country) {
      setStates([]);
      return;
    }

    const url = `${COUNTRIES_NOW_API}/states/q`;
    const params = { params: { country } };
    axios
      .get(url, params)
      .then((response) => {
        const data = response.data.data.states.map((state: { name: string }) => state.name);
        setStates(['All States', ...data]);
        if (data.length === 0) {
          fetchCities(selectedLocation);
        }
      })
      .catch((error) => {
        console.error('Error fetching states:', error);
        setStates([]);
      });

    setCities([]);
  };

  const fetchCities = (selectedLocation: SelectedLocation) => {
    if (!selectedLocation.country) {
      setCities([]);
      return;
    }

    let url = `${COUNTRIES_NOW_API}/cities/q`;
    const params = { country: selectedLocation.country.name.common };
    if (selectedLocation.state && selectedLocation.state !== 'All States') {
      url = `${COUNTRIES_NOW_API}/state/cities/q`;
      Object.assign(params, { state: selectedLocation.state });
    }

    axios
      .get(url, { params })
      .then((response) => {
        const data = response.data.data.map((city: string) => city);
        setCities(data);
      })
      .catch((error) => {
        console.error('Error fetching cities:', error);
        setCities([]);
      });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchCountries(countryNameSearch);
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [countryNameSearch]);

  useEffect(() => {
    if (selectedLocation.country) {
      fetchStates(selectedLocation.country.name.common);
      setCountries([]);
      setCities([]);
    }
  }, [selectedLocation.country]);

  useEffect(() => {
    if (selectedLocation.state) {
      fetchCities(selectedLocation);
    }
  }, [selectedLocation.state]);

  return {
    setCountryNameSearch,
    setSelectedLocation,
    selectedLocation,
    countries,
    states,
    cities,
  };
};

export { useCountries };
export type { SelectedLocation, Country };
