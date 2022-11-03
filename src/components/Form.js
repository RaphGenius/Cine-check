import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = () => {
  const [MoviesData, setMoviesData] = useState([]);
  const [searchData, setSearchData] = useState("bob");
  const ApiKey = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&query=${searchData}&language=fr-FR`
      )
      .then((res) => res.data.results && setMoviesData(res.data.results))
      .catch((err) => console.log(err));
  }, [searchData]);

  return (
    <div>
      <h2>Formulaire</h2>
      <form>
        <input
          type="text"
          placeholder="Rechercher un film"
          onChange={(e) => setSearchData(e.target.value)}
        />
        <button>Top</button>
        <button>Flop</button>
      </form>
      <div className="cards-container">
        {MoviesData.length === 0 ? (
          <p>Aucun film ne correspond à votre recherche</p>
        ) : (
          MoviesData.slice(0, 12).map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default Form;
