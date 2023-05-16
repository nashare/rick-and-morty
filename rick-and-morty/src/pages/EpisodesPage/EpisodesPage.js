import React, { useState, useEffect } from 'react';
import './EpisodesPage.css';
import { Link } from 'react-router-dom';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/episode');
        const data = await response.json();
        console.log(data);
        setEpisodes(data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEpisodes();
  }, []);

  if (!episodes) {
    return <p className="p-waiting">Please wait...</p>;
  }

  return (
    <div className="episodes-page">
      <section className="episodes-container">
        {episodes.map((episode) => {
          return (
            <Link to={`/episodes/${episode.id}`} key={episode.id} className="link">
              <EpisodeCard episode={episode} />
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default EpisodesPage;
