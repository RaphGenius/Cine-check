/* eslint-disable array-callback-return */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
const Form = () => {
  //Accueil les infos des films de l'api
  const [MoviesData, setMoviesData] = useState([]);
  // Le nom du film recherché (Si l'utilisateur a déjà fait une recherche, elle est enregistré dans le SS)
  const [searchData, setSearchData] = useState(
    !window.sessionStorage.search ? "" : window.sessionStorage.search
  );
  const [sortGoodBad, setSortGoodBad] = useState(null);
  const [rangeValue, setRangeValue] = useState(12);
  //Vérifie si l'utilisateur a déjà fait une recherche
  const [sessionStorageData, setSessionStorageDate] = useState(
    window.sessionStorage.search ? window.sessionStorage.search : null
  );
  const ApiKey = process.env.REACT_APP_API_KEY;
  //Données pour framer motion, permettant de creer l'animation
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

  //Permet de faire la recherche pour le film + inscrit ce que l'utilisateur écrit dans le ss
  const handleSearch = (search) => {
    console.log(search);
    setSearchData(search);
    sessionStorage.setItem("search", search);
    setSessionStorageDate(search);
  };
  let StorageData = window.localStorage.movies
    ? window.localStorage.movies.split(",")
    : [];
  const [moviesInLs, setMoviesInLs] = useState(StorageData);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&query=${searchData}&language=fr-FR`
      )
      .then((res) => res.data.results && setMoviesData(res.data.results))
      .catch((err) => console.log(err));

    //Animation au montage du composant
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
            placeholder="Exemple : Star wars"
            autoComplete="off"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={sessionStorageData}
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
          <p className="noMovie">Aucun film ne correspond à votre recherche</p>
        ) : (
          MoviesData.slice(0, rangeValue)
            .sort((a, b) => {
              if (sortGoodBad === "goodToBad") {
                return b.vote_average - a.vote_average;
              }
              if (sortGoodBad === "badToGood") {
                return a.vote_average - b.vote_average;
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
