/* eslint-disable array-callback-return */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = () => {
  const [MoviesData, setMoviesData] = useState([]);
  const [searchData, setSearchData] = useState("Star Wars");
  const [sortGoodBad, setSortGoodBad] = useState(null);
  const [rangeValue, setRangeValue] = useState(12);

  let StorageData = window.localStorage.movies
    ? window.localStorage.movies.split(",")
    : [];
  const [moviesInLs, setMoviesInLs] = useState(StorageData);
  const ApiKey = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&query=${searchData}&language=fr-FR`
      )
      .then((res) => res.data.results && setMoviesData(res.data.results))
      .catch((err) => console.log(err));
  }, [searchData, ApiKey]);

  return (
    <div className="container-form">
      <form>
        <label htmlFor="searchMovie">Rechercher un film</label>
        <input
          id="searchMovie"
          type="text"
          placeholder="Star wars"
          onChange={(e) => setSearchData(e.target.value)}
        />
        <div className="container-btn">
          <div className="top" onClick={() => setSortGoodBad("goodToBad")}>
            Top
          </div>
          <div className="flop" onClick={() => setSortGoodBad("badToGood")}>
            Flop
          </div>
        </div>
      </form>
      <div className="range-container">
        <label htmlFor="range">Nombre de film à afficher : {rangeValue} </label>
        <input
          type="range"
          min={1}
          max={20}
          id="range"
          defaultValue={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
      </div>

      <div className="cards-container">
        {MoviesData.length === 0 ? (
          <p>Aucun film ne correspond à votre recherche</p>
        ) : (
          MoviesData.slice(0, rangeValue)
            .sort((a, b) => {
              if (sortGoodBad === "goodToBad") {
                return b.popularity - a.popularity;
              }
              if (sortGoodBad === "badToGood") {
                return a.popularity - b.popularity;
              }
            })
            .map((movie) => (
              <Card
                key={movie.id}
                movie={movie}
                moviesInLs={moviesInLs}
                setMoviesInLs={setMoviesInLs}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default Form;
