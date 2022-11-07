import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = () => {
  const [MoviesData, setMoviesData] = useState([]);
  const [searchData, setSearchData] = useState("bob");
  console.log(MoviesData[0]);
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
    <div className="container-form">
      <form>
        <label htmlFor="searchMovie"></label>
        <input
          id="searchMovie"
          type="text"
          placeholder="Rechercher un film..."
          onChange={(e) => setSearchData(e.target.value)}
        />
        <div className="container-btn">
          <button className="top">Top</button>
          <button className="flop">Flop</button>
        </div>
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
