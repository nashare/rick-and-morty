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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Episode</th>
          </tr>
        </thead>
        <tbody>
          <tr key={episode.id}>
            <td>{episode.name}</td>
            <td>{episode.air_date}</td>
            <td>{episode.episode}</td>
          </tr>
        </tbody>
      </table>
      <p>Number of characters: {episode.characters.length}</p>
      <button onClick={toggleVisibility}>See full list of characters</button>
      <div className={isListVisible ? '' : 'hidden'}>
        {episode.characters.map((character) => {
          return (
            <Link to={`/characters/${character.split("/").pop()}`} key={character.split("/").pop()}>
              {character.split("/").pop()}
              <br />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default EpisodeDetailPage;

