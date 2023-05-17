import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './CharacterDetailPage.css';

function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [isListVisible, setListVisible] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  const toggleVisibility = () => {
    setListVisible(!isListVisible);
  };
  const fetchEpisodes = async (episodesUrls) => {
    const episodesNames = await Promise.all(
      episodesUrls.map(async (url) => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          return data.episode;
        } catch (error) {
          console.error('Error:', error);
          return '';
        }
      })
    );
    setEpisodes(episodesNames);
  };

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await response.json();
        await fetchEpisodes(data.episode)
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
    <img src={character.image} alt={character.name} className="character-image"/>
        <table className="character-table">
          <tbody>
          <tr>
            <td>Name:</td>
            <td>{character.name}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>
                <Link
                  to={`/characters/status/${character.status}`}
                  key={character.status}
                  className="link"
                >
                  {character.status}
                </Link>
              </td>
          </tr>
          <tr>
            <td>Species:</td>
            <td>
                <Link
                  to={`/characters/species/${character.species}`}
                  key={character.species}
                  className="link"
                >
                  {character.species}
                </Link>
              </td>
          </tr>
          <tr>
            <td>Type:</td>
              <td>{character.type !== "" ? 
              <Link
                to={`/characters/type/${character.type}`}
                  key={character.type}
                className="link"
              >
                {character.type}
              </Link> : "n/a"}</td>
          </tr>
          <tr>
            <td>Gender:</td>
              <td>                
                <Link
                  to={`/characters/gender/${character.gender}`}
                  key={character.gender}
                className="link"
              >
                  {character.gender}
              </Link>
              </td>
          </tr>
          <tr>
            <td>Origin:</td>
            {character.origin.name !== 'unknown' ? (
                <td><Link to={`/locations/${character.origin.url.split('/').pop()}`} key={character.origin.name} className="link">{character.origin.name}</Link></td>
              ) : <td>{character.origin.name}</td>}
          </tr>
          <tr>
            <td>Location:</td>
                {character.location.name !== 'unknown' ? (
                  <td><Link to={`/locations/${character.location.url.split("/").pop()}`} key={character.location.name} className="link">
                {character.location.name}</Link></td>
                ) : <td>{character.origin.name}</td>}
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
        {episodes.map((episodeName, index) => (
          <Link
            to={`/episodes/${character.episode[index].split('/').pop()}`}
            key={character.episode[index].split('/').pop()}
            className="link"
          >{episodeName}
          </Link>
        ))}
      </div>
    </>
  );
}

export default CharacterDetailPage;
