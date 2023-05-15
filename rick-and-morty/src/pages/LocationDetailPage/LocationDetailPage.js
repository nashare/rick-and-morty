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
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Dimension</th>
        </tr>
      </thead>
      <tbody>
        <tr key={location.id}>
          <td>{location.name}</td>
          <td>{location.type}</td>
          <td>{location.dimension}</td>
        </tr>
      </tbody>
    </table>
      <p>Number of residents: {location.residents.length}</p>
      <button onClick={toggleVisibility}>See full list of residents</button>
      <div className={isListVisible ? '' : 'hidden'}>
      {location.residents.map((resident) => {
      return (
        <Link to={`/characters/${resident.split("/").pop()}`} key={resident.split("/").pop()}>
          {resident.split("/").pop()}
          <br />
        </Link>
      );
    })}
      </div>
    </>
  );
}

export default LocationDetailPage;

