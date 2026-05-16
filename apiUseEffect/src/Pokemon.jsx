import { useState, useEffect } from "react";

export default function Pokemon() {

  const [pokemon, setPokemon] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("ditto");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    setLoading(true);
    setError("");

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)

      .then((res) => {

        if (!res.ok) {
          throw new Error("Pokémon not found");
        }

        return res.json();
      })

      .then((data) => {

        setPokemon([data]);
        setLoading(false);

      })

      .catch((err) => {

        setError(err.message);
        setLoading(false);

      });

  }, [query]);

  function handleSearch() {

    if (searchInput.trim() !== "") {
      setQuery(searchInput.toLowerCase());
    }

  }

  return (
    <main>

      <div className="search-bar">

        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>

      </div>

      {loading && <h2>Loading...</h2>}

      {error && <h2>{error}</h2>}

      {!loading && !error &&

        pokemon.map((poke) => (

          <div key={poke.id} className="card">

            <h2>{poke.name}</h2>

            <img
              src={poke.sprites.front_default}
              alt={poke.name}
            />

            <p>Height: {poke.height}</p>

            <p>Weight: {poke.weight}</p>

            <p>
              Type:

              {poke.types.map((type) => (

                <span key={type.type.name}>
                  {" "}{type.type.name}
                </span>

              ))}

            </p>

          </div>

        ))
      }

    </main>
  );
}