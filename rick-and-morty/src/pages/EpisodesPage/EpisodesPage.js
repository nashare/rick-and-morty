import React, { useState, useEffect } from 'react';
import './EpisodesPage.css';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/episode');
        const data = await response.json();
        setEpisodes(data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEpisodes();
  }, []);

  return (
    <div>
      {episodes.map((episode) => (
        <div key={episode.id}>
          <h2>{episode.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default EpisodesPage;
