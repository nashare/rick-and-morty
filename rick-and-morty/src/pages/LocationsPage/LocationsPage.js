import React, { useState, useEffect } from 'react';
import './LocationsPage.css';

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/location');
        const data = await response.json();
        setLocations(data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div>
      {locations.map((location) => (
        <div key={location.id}>
          <h2>{location.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default LocationsPage;
