import React, { useState, useEffect } from 'react';
import './EpisodesPage.css';
import { Link } from 'react-router-dom';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
import Pagination from '../../components/Pagination/Pagination';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState(null);
  const [info, setInfo] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
        const data = await response.json();
        setInfo(data.info);
        setEpisodes(data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEpisodes();
  }, [page]);

  if (!episodes) {
    return <p className="p-waiting">Please wait...</p>;
  }

  return (
    <>
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
      <Pagination info={info} setPage={setPage} />
    </>
  );
};

export default EpisodesPage;
