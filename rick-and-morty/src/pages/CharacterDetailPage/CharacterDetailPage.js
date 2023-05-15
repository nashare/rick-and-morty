import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return <p>Please wait...</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Species</th>
          <th>Gender</th>
          <th>Origin</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr key={character.id}>
          <td>{character.name}</td>
          <td>{character.status}</td>
          <td>{character.species}</td>
          <td>{character.gender}</td>
          <td>{character.origin.name}</td>
          <td>{character.location.name}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default CharacterDetailPage;
