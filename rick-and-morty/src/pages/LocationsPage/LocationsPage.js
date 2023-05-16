import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LocationsPage.css';
import LocationCard from '../../components/LocationCard/LocationCard';
import Pagination from '../../components/Pagination/Pagination';

const LocationsPage = () => {
  const [locations, setLocations] = useState(null);
  const [info, setInfo] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
        const data = await response.json();
        setInfo(data.info);
        setLocations(data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLocations();
  }, [page]);

  if (!locations) {
    return <div className="locations-page"><p className="p-waiting">Please wait...</p></div>;
  }
  return (
    <>
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
      <Pagination info={info} setPage={setPage}/>
    </>
  );
};

export default LocationsPage;
