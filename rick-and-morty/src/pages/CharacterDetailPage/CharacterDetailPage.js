import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [isListVisible, setListVisible] = useState(false);

  const toggleVisibility = () => {
    setListVisible(!isListVisible);
  };

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
    <>
    <img src={character.image} alt={character.name}/>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Species</th>
          <th>Type</th>
          <th>Gender</th>
          <th>Origin</th>
          <th>Location</th>
          <th>Episodes</th>
        </tr>
      </thead>
      <tbody>
        <tr key={character.id}>
          <td>{character.name}</td>
          <td>{character.status}</td>
          <td>{character.species}</td>
          <td>{character.type}</td>
          <td>{character.gender}</td>
          <td>
            <Link to={`/locations/${character.origin.url.split("/").pop()}`} key={character.origin.name} className="link">
              {character.origin.name}
            </Link>
          </td>
          <td>
            <Link to={`/locations/${character.location.url.split("/").pop()}`} key={character.location.name} className="link">
              {character.location.name}
            </Link>
          </td>
          <td>{character.episode.length}</td>
        </tr>
      </tbody>
    </table>
      <button onClick={toggleVisibility}>See full list of episodes</button>
      <div className={isListVisible ? '' : 'hidden'}>
        {character.episode.map((episode) => {
          return (
            <Link to={`/episodes/${episode.split("/").pop()}`} key={episode.split("/").pop()}>
              {episode.split("/").pop()}
              <br />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default CharacterDetailPage;
