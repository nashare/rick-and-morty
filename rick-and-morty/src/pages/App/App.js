import './App.css';
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import NavBar from '../../components/NavBar/NavBar';
import CharactersPage from '../CharactersPage/CharactersPage';
import LocationsPage from '../LocationsPage/LocationsPage';
import EpisodesPage from '../EpisodesPage/EpisodesPage';
import CharacterDetailPage from '../CharacterDetailPage/CharacterDetailPage';
import LocationDetailPage from '../LocationDetailPage/LocationDetailPage';
import EpisodeDetailPage from '../EpisodeDetailPage/EpisodeDetailPage';

function App() {
  const [characters, setCharacters] = useState(null);
  const [searchCharacters, setSearchCharacters] = useState("");
  const [info, setInfo] = useState(null);
  const [searchInfo, setSearchInfo] = useState(null);
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const data = await response.json();
        setInfo(data.info)
        setCharacters(data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCharacters();
  }, [page]);

  return (
    <main className="App">
      <NavBar setSearchCharacters={setSearchCharacters} setSearchInfo={setSearchInfo}/>
      <Routes>
        <Route path="/" element={<CharactersPage characters={characters} info={info} setPage={setPage}/>} />
        <Route path="/characters/:id" element={<CharacterDetailPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/locations/:id" element={<LocationDetailPage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
        <Route path="/episodes/:id" element={<EpisodeDetailPage />} />
        <Route path="/search" element={<CharactersPage characters={searchCharacters} info={searchInfo} setPage={setSearchPage} />} />
      </Routes>
    </main>
  );
}

export default App;
