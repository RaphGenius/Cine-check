import axios from "axios";
import React, { useEffect, useState } from "react";
import CardFavorite from "../components/CardFavorite";
import Header from "../components/Header";
import { motion } from "framer-motion";
const ApiKey = process.env.REACT_APP_API_KEY;

const Favorite = () => {
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

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  useEffect(() => {
    let movieId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    for (let i = 0; i < movieId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId[i]}?api_key=${ApiKey}`
        )
        .then((res) =>
          //Pour chaque id dans le LS, fait une recherche et le concatène
          setFavoriteMovies((movieData) => [...movieData, res.data])
        );
    }
  }, []);
  console.log(favoriteMovies[0]);
  return (
    <div
      className="home"
      initial="initial"
      animate="visible"
      exit="exit"
      variants={variants}
    >
      <Header title={"Mes films favoris"} />
      <h2 className="second-title">Mes coups de coeurs</h2>
      <motion.div
        className="favorite-container"
        initial="initial"
        animate="visible"
        exit="exit"
        variants={variants}
      >
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <CardFavorite movie={movie} key={movie.id} />
          ))
        ) : (
          <h2 className="no-coupdecoeur">
            Aucun coup de coeur pour le moment !
          </h2>
        )}
      </motion.div>
    </div>
  );
};

export default Favorite;
