import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LocationDetailPage.css';

function LocationDetailPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [isListVisible, setListVisible] = useState(false);

  const toggleVisibility = () => {
    setListVisible(!isListVisible);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchLocation();
  }, [id]);

  if (!location) {
    return <p>Please wait...</p>;
  }

  return (
    <>
      <div className="location-detail-page-container">
        <table>
          <tr>
            <td>Name</td>
            <td>{location.name}</td>
          </tr>
          <tr>
            <td>Type:</td>
            <td>{location.type}</td>
          </tr>
          <tr>
            <td>Dimension:</td>
            <td>{location.dimension}</td>
          </tr>
          <tr>
            <td>Number of Residents:</td>
            <td>{location.residents.length}</td>
          </tr>
        </table>
      </div>
      {location.residents.length > 0 && (
        <div>
          <p onClick={toggleVisibility} className="location-list">
            See full list of residents
          </p>
          <div className={isListVisible ? 'list-grid' : 'hidden'}>
            {location.residents.map((resident) => (
              <Link
                to={`/characters/${resident.split("/").pop()}`}
                className="episode-list-item"
                key={resident.split("/").pop()}
              >
                <p className="location-list-item-text">{resident.split("/").pop()}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default LocationDetailPage;

