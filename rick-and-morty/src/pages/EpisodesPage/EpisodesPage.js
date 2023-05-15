import React, { useState, useEffect } from 'react';
import './EpisodesPage.css';
import { Link } from 'react-router-dom';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';

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
    <section className="episodes-container">
      {episodes.map((episode) => {
        return (
          <Link to={`/episodes/${episode.id}`} key={episode.id} className="link">
            <EpisodeCard episode={episode} />
          </Link>
        );
      })}
    </section>
  );
};

export default EpisodesPage;
