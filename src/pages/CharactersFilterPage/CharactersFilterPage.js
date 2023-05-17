import Pagination from '../../components/Pagination/Pagination';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CharacterCard from '../../components/CharacterCard/CharacterCard';

const CharactersPage = () => {
    const [characters, setCharacters] = useState(null);
    const [info, setInfo] = useState(null);
    const [page, setPage] = useState(1);
    const { paramId, paramKeyword } = useParams();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&${paramId}=${paramKeyword}`);
                const data = await response.json();
                setInfo(data.info)
                setCharacters(data.results);
            } catch (error) {
                setError("An error occurred while filtering characters. Please try again later.");
            }
        };

        fetchCharacters();
    }, [page, paramId, paramKeyword]);

    if (error) {
        return <div className="locations-page"><p className="p-waiting">{error}</p></div>;
    }

    if (!characters) {
        return <p className="p-waiting">Please wait...</p>;
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
            <Pagination info={info} page={page} setPage={setPage} />
        </>
    );
};

export default CharactersPage;
