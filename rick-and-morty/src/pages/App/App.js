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

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character`);
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <main className="App">
      <NavBar setSearchCharacters={setSearchCharacters}/>
      <Routes>
        <Route path="/" element={<CharactersPage characters={characters} />} />
        <Route path="/characters/:id" element={<CharacterDetailPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/locations/:id" element={<LocationDetailPage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
        <Route path="/episodes/:id" element={<EpisodeDetailPage />} />
        <Route path="/search" element={<CharactersPage characters={searchCharacters} />} />
      </Routes>
    </main>
  );
}

export default App;
