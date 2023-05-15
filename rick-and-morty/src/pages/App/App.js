import './App.css';
import { Routes, Route } from "react-router-dom";

import NavBar from '../../components/NavBar/NavBar';
import CharactersPage from '../CharactersPage/CharactersPage';
import LocationsPage from '../LocationsPage/LocationsPage';
import EpisodesPage from '../EpisodesPage/EpisodesPage';
import CharacterDetailPage from '../CharacterDetailPage/CharacterDetailPage';

function App() {
  return (
    <main className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterDetailPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
      </Routes>
    </main>
  );
}

export default App;
