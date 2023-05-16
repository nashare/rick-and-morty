import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LocationDetailPage.css';

function LocationDetailPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [isListVisible, setListVisible] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const toggleVisibility = () => {
    setListVisible(!isListVisible);
  };

  const fetchImageUrls = async (residentUrls) => {
    const urls = await Promise.all(
      residentUrls.map(async (url) => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          return data.image;
        } catch (error) {
          console.error('Error:', error);
          return '';
        }
      })
    );
    setImageUrls(urls);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
        const data = await response.json();
        setLocation(data);
        await fetchImageUrls(data.residents);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchLocation();
  }, [id]);

  if (!location) {
    return <div className="location-detail-page-container"><p className="p-waiting">Please wait...</p></div>;
  }

  return (
    <>
      <div className="location-detail-page-container">
        <table>
          <tbody>
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
          </tbody>
        </table>
      </div>
      {location.residents.length > 0 && (
        <div>
          <p onClick={toggleVisibility} className="location-list">
            See the full list of residents
          </p>
          <div className={isListVisible ? 'location-grid' : 'hidden'}>
            {imageUrls.map((imageUrl, index) => (
              <Link
                to={`/characters/${location.residents[index].split('/').pop()}`}
                key={location.residents[index].split('/').pop()}
              >
                <img className="episode-image" src={imageUrl} alt="character" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default LocationDetailPage;
