import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './EpisodeDetailPage.css';

function EpisodeDetailPage() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [isListVisible, setListVisible] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState(null);

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
          setError("An error occurred while fetching this episode. Please try again later.");
        }
      })
    );
    setImageUrls(urls);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        const data = await response.json();
        setEpisode(data);
        await fetchImageUrls(data.characters);
      } catch (error) {
        setError("An error occurred while fetching this episode. Please try again later.");
      }
    };
    fetchLocation();
  }, [id]);

  if (error) {
    return <div className="locations-page"><p className="p-waiting">{error}</p></div>;
  }

  if (!episode) {
    return <div className="locations-page"><p className="p-waiting">Please wait...</p></div>;
  }

  return (
    <>
      <div className="episode-detail-page-container">
        <table>
          <tbody>
          <tr>
            <td>Episode:</td>
            <td>{episode.episode}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{episode.name}</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>{episode.air_date}</td>
          </tr>
          <tr>
            <td>Number of Characters:</td>
            <td>{episode.characters.length}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <p onClick={toggleVisibility} className="episode-list">See full list of characters</p>
      <div className={isListVisible ? 'location-grid' : 'hidden'}>
        {imageUrls.map((imageUrl, index) => (
          <Link
            to={`/characters/${episode.characters[index].split('/').pop()}`}
            key={episode.characters[index].split('/').pop()}
          >
            <img className="episode-image" src={imageUrl} alt="character" />
          </Link>
        ))}
      </div>
    </>
  );
}

export default EpisodeDetailPage;

