import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './EpisodeDetailPage.css';

function EpisodeDetailPage() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [isListVisible, setListVisible] = useState(false);

  const toggleVisibility = () => {
    setListVisible(!isListVisible);
  };

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        const data = await response.json();
        setEpisode(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEpisode();
  }, [id]);

  if (!episode) {
    return <p>Please wait...</p>;
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
      <div className={isListVisible ? 'list-grid' : 'hidden'}>
        {episode.characters.map((character) => {
          return (
            <Link to={`/characters/${character.split("/").pop()}`} className="episode-list-item" key={character.split("/").pop()}>
              <p className="episode-list-item-text">{character.split("/").pop()}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default EpisodeDetailPage;

