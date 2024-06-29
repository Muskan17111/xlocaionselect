import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./country.css";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
  
    console.log("Fetching countries...");
    axios.get('https://crio-location-selector.onrender.com/countries')
      .then(response => {
        console.log("Countries fetched:", response.data);
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
    
      console.log(`Fetching states for country: ${selectedCountry}...`);
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => {
          console.log("States fetched:", response.data);
          setStates(response.data);
          setCities([]); 
        })
        .catch(error => {
          console.error('Error fetching states:', error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      console.log(`Fetching cities for state: ${selectedState} in country: ${selectedCountry}...`);
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => {
          console.log("Cities fetched:", response.data);
          setCities(response.data);
        })
        .catch(error => {
          console.error('Error fetching cities:', error);
        });
    }
  }, [selectedState]);

  return (
    <div className='location'>
      <h1>Select Location </h1>
      <div className='selector'>
      <div>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
        <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div> 
        <select
          id="state"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          id="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      </div>

      {selectedCity && selectedState && selectedCountry && (
        <span className='text'>You Selected <span className='city'>{selectedCity}</span>, <span className='state'>{selectedState}, {selectedCountry}</span></span>
      )}
    </div>
  );
};

export default LocationSelector;

