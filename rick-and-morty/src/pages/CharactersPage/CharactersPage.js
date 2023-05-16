import Pagination from '../../components/Pagination/Pagination';
import './CharactersPage.css';
import { Link } from 'react-router-dom';

import CharacterCard from '../../components/CharacterCard/CharacterCard';

const CharactersPage = ({characters, info, setPage}) => {

  if (!characters) {
    return <p className="p-waiting">No results found...</p>;
  }

  
  return (
    <>
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
    <Pagination info={info} setPage={setPage} />
    </>
  );
};

export default CharactersPage;
