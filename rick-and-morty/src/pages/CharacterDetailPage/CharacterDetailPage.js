import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './CharacterDetailPage.css';

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
    return <div className="character-detail-page-container"><p className="p-waiting">Please wait...</p></div>;
  }

  return (
    <>
    <div className="character-detail-page-container">
    <img src={character.image} alt={character.name}/>
        <table className="character-table">
          <tbody>
          <tr>
            <td>Name:</td>
            <td>{character.name}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{character.status}</td>
          </tr>
          <tr>
            <td>Species:</td>
            <td>{character.species}</td>
          </tr>
          <tr>
            <td>Type:</td>
            <td>{character.type !== "" ? character.type : "n/a"}</td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>{character.gender}</td>
          </tr>
          <tr>
            <td>Origin:</td>
            {character.origin.name !== 'unknown' ? (
                <td><Link to={`/locations/${character.origin.url.split('/').pop()}`} key={character.origin.name} className="link">{character.origin.name}</Link></td>
              ) : <td>character.origin.name</td>}
          </tr>
          <tr>
            <td>Location:</td>
            <td>
              <Link to={`/locations/${character.location.url.split("/").pop()}`} key={character.location.name} className="link">
                {character.location.name}
              </Link>
            </td>
          </tr>
          <tr>
            <td>Number of Episodes:</td>
            <td>{character.episode.length}</td>
          </tr>
          </tbody>
        </table>
    </div>
    <p onClick={toggleVisibility} className="characters-list">See full list of episodes</p>
      <div className={isListVisible ? 'list-grid' : 'hidden'}>
        {character.episode.map((episode) => {
          return (
            <Link to={`/episodes/${episode.split("/").pop()}`} className="characters-list-item" key={episode.split("/").pop()}>
              <p className="characters-list-item-text">{episode.split("/").pop()}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default CharacterDetailPage;
