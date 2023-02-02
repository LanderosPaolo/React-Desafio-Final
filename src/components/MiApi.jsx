import React, { useState, useEffect } from 'react';

const PokemonList = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState(false);

    const pokeapi = async () => {
        const url = "https://pokeapi.co/api/v2/pokemon?limit=151";
        const response = await fetch(url);
        const data = await response.json();
        setPokemonData(data.results);
    };

    useEffect(() => {
        pokeapi();
    }, []);

    useEffect(() => {
        const lowercasedSearchInput = searchInput.toLowerCase();
        setFilteredPokemon(
            pokemonData.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(lowercasedSearchInput)
            )
        );
    }, [searchInput, pokemonData]);

    const sortPokemon = () => {
        setFilteredPokemon(filteredPokemon.sort((a, b) => {
            if (a.name > b.name) return sort ? 1 : -1;
            if (a.name < b.name) return sort ? -1 : 1;
            return 0;
        }));
        setSort(!sort);
    };

    const indexOfLastPokemon = currentPage * 18;
    const indexOfFirstPokemon = indexOfLastPokemon - 18;
    const currentPokemons = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="main">
            <h1>Buscador de Pokemon</h1>
            <input
                type="text"
                id="inline_field"
                className="nes-input is-success"
                placeholder="Busca tu pokemon favorito"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
                type="button"
                className="nes-btn is-error"
                onClick={sortPokemon}
            >
                Ordenar Alfabéticamente
            </button>
            <div className="grid-container">
                {currentPokemons.map((pokemon) => (
                    <div key={pokemon.name} className="card">
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.indexOf(pokemon) +
                                1}.png`}
                            alt={pokemon.name}
                        />
                        <h2>{pokemon.name}</h2>
                        <p>#{pokemonData.indexOf(pokemon) + 1}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredPokemon.length / 18) }, (_, i) => (
                    <button
                        type="button"
                        className="nes-btn is-error"
                        key={i} onClick={() => paginate(i + 1)}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PokemonList;