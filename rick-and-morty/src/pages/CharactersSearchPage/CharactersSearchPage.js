import Pagination from '../../components/Pagination/Pagination';
import './CharactersSearchPage.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import CharacterCard from '../../components/CharacterCard/CharacterCard';

const CharactersSearchPage = ({ searchInput }) => {
    const [characters, setCharacters] = useState(null);
    const [info, setInfo] = useState(null);
    const [page, setPage] = useState(1);
    console.log(searchInput);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${searchInput}`);
                const data = await response.json();
                setInfo(data.info)
                setCharacters(data.results);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCharacters();
    }, [searchInput, page]);

    if (!characters) {
        return <div className="characters-page"><p className="p-waiting">Sorry, no results found</p></div>;
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

export default CharactersSearchPage;
