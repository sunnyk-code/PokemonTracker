import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => {
        setPokemonList(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <ul>
      {pokemonList.map(pokemon => (
        <li key={pokemon.name}>{pokemon.name}</li>
      ))}
    </ul>
  );
}

export default PokemonList;