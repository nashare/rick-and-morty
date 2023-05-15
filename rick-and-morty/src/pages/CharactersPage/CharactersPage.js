import React, { useState, useEffect } from 'react';
import './CharactersPage.css';
import { Link } from 'react-router-dom';

import CharacterCard from '../../components/CharacterCard/CharacterCard';

const CharactersPage = () => {
  const [characters, setCharacters] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCharacters();
  }, []);

  if (!characters) {
    return <p className="p-waiting">Please wait...</p>;
  }
  
  return (
    <div className="characters-page">
      <section className="characters-container">
        {characters.map((character) => {
          return (
            <Link to={`/characters/${character.id}`} key={character.id} className="link">
              <CharacterCard character={character} />
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default CharactersPage;
