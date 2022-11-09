/* eslint-disable array-callback-return */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
const Form = () => {
  const variants = {
    initial: {
      opacity: 0,
      transition: {
        duration: 1,
      },
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
      x: -100,
    },
  };
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

    const formRange = document.querySelector(".form-range");
    formRange.classList.add("animeIn");
  }, [searchData, ApiKey]);

  return (
    <div className="container-form">
      <div className="form-range">
        <form>
          <label htmlFor="searchMovie">Rechercher un film</label>
          <input
            id="searchMovie"
            type="text"
            placeholder="Star wars"
            autoComplete="off"
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
          <label htmlFor="range">
            Nombre de film à afficher : {rangeValue}{" "}
          </label>
          <input
            type="range"
            min={1}
            max={20}
            id="range"
            defaultValue={rangeValue}
            onChange={(e) => setRangeValue(e.target.value)}
          />
        </div>
      </div>

      <motion.div
        className="cards-container"
        initial="initial"
        animate="visible"
        exit="exit"
        variants={variants}
      >
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
                className="truc"
                key={movie.id}
                movie={movie}
                moviesInLs={moviesInLs}
                setMoviesInLs={setMoviesInLs}
              />
            ))
        )}
      </motion.div>
    </div>
  );
};

export default Form;
