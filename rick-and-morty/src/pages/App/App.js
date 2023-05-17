import './App.css';
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';

import NavBar from '../../components/NavBar/NavBar';
import CharactersPage from '../CharactersPage/CharactersPage';
import LocationsPage from '../LocationsPage/LocationsPage';
import EpisodesPage from '../EpisodesPage/EpisodesPage';
import CharacterDetailPage from '../CharacterDetailPage/CharacterDetailPage';
import LocationDetailPage from '../LocationDetailPage/LocationDetailPage';
import LocationsTypePage from '../LocationsTypePage/LocationsTypePage';
import LocationsDimensionPage from '../LocationsDimensionPage/LocationsDimensionPage';
import EpisodeDetailPage from '../EpisodeDetailPage/EpisodeDetailPage';
import CharactersSearchPage from '../CharactersSearchPage/CharactersSearchPage';

function App() {
  const [searchInput, setSearchInput] = useState(null);
  const [locationType, setLocationType] = useState(null);
  const [locationDimension, setLocationDimension] = useState(null);
  console.log(locationDimension);

  return (
    <main className="App">
      <NavBar setSearchInput={setSearchInput}/>
      <Routes>
        <Route path="/" element={<CharactersPage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterDetailPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/locations/:id" element={<LocationDetailPage setLocationType={setLocationType} setLocationDimension={setLocationDimension}/>} />
        <Route path="/locations/type" element={<LocationsTypePage locationType={locationType}/>} />
        <Route path="/locations/dimension" element={<LocationsDimensionPage locationDimension={locationDimension} />} />
        <Route path="/episodes" element={<EpisodesPage />} />
        <Route path="/episodes/:id" element={<EpisodeDetailPage />} />
        <Route path="/search" element={<CharactersSearchPage searchInput={searchInput} />} />
      </Routes>
    </main>
  );
}

export default App;
