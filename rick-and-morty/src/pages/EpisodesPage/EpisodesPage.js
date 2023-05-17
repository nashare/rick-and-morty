import React, { useState, useEffect } from 'react';
import './EpisodesPage.css';
import { Link } from 'react-router-dom';
import EpisodeCard from '../../components/EpisodeCard/EpisodeCard';
import Pagination from '../../components/Pagination/Pagination';

const EpisodesPage = () => {
  const [episodes, setEpisodes] = useState(null);
  const [info, setInfo] = useState(null);
  const [page, setPage] = useState(1); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
        const data = await response.json();
        setInfo(data.info);
        setEpisodes(data.results);
      } catch (error) {
        setError("An error occurred while fetching episodes. Please try again later.");
      }
    };

    fetchEpisodes();
  }, [page]);

  if (error) {
    return <div className="episodes-page"><p className="p-waiting">{error}</p></div>;
  }

  if (!episodes) {
    return <div className="episodes-page"><p className="p-waiting">Please wait...</p></div>;
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
      <Pagination info={info} page={page} setPage={setPage} />
    </>
  );
};

export default EpisodesPage;
