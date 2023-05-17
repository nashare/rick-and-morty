import './App.css';
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';

import NavBar from '../../components/NavBar/NavBar';
import CharactersPage from '../CharactersPage/CharactersPage';
import LocationsPage from '../LocationsPage/LocationsPage';
import EpisodesPage from '../EpisodesPage/EpisodesPage';
import CharacterDetailPage from '../CharacterDetailPage/CharacterDetailPage';
import LocationDetailPage from '../LocationDetailPage/LocationDetailPage';
import LocationsFilerPage from '../LocationsFilerPage/LocationsFilerPage';
import EpisodeDetailPage from '../EpisodeDetailPage/EpisodeDetailPage';
import CharactersSearchPage from '../CharactersSearchPage/CharactersSearchPage';
import CharactersFilterPage from '../CharactersFilterPage/CharactersFilterPage';

function App() {
  const [searchInput, setSearchInput] = useState(null);

  return (
    <main className="App">
      <NavBar setSearchInput={setSearchInput}/>
      <Routes>
        <Route path="/" element={<CharactersPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterDetailPage />} />
        <Route path="/characters/:paramId/:paramKeyword" element={<CharactersFilterPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/locations/:id" element={<LocationDetailPage />} />
        <Route path="/locations/:paramId/:paramKeyword" element={<LocationsFilerPage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
        <Route path="/episodes/:id" element={<EpisodeDetailPage />} />
        <Route path="/search" element={<CharactersSearchPage searchInput={searchInput} />} />
      </Routes>
    </main>
  );
}

export default App;
