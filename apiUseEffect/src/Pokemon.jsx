import { useState, useEffect } from "react";

export default function Pokemon() {

  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("ditto");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    setLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)

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

  }, [search]);

  return (
    <main>

      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

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

        ))}
    </main>
  );
}