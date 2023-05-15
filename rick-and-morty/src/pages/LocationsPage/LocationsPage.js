import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LocationsPage.css';
import LocationCard from '../../components/LocationCard/LocationCard';

const LocationsPage = () => {
  const [locations, setLocations] = useState(null);

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

  if (!locations) {
    return <p className="p-waiting">Please wait...</p>;
  }
  return (
    <div className="locations-page">
      <section className="locations-container">
        {locations.map((location) => {
          return (
          <Link to={`/locations/${location.id}`} key={location.id} className="link">
            <LocationCard location={location} />
          </Link>
          );
        })}
      </section>
    </div>
  );
};

export default LocationsPage;
