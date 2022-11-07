import axios from "axios";
import React, { useEffect, useState } from "react";
import CardFavorite from "../components/CardFavorite";
import Header from "../components/Header";
const ApiKey = process.env.REACT_APP_API_KEY;

const Favorite = () => {
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
          setFavoriteMovies((movieData) => [...movieData, res.data])
        );
    }
  }, []);
  console.log(favoriteMovies[0]);
  return (
    <div className="home">
      <Header title={"Mes films favoris"} />
      <div className="favorite-container">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <CardFavorite movie={movie} key={movie.id} />
          ))
        ) : (
          <h2 className="no-coupdecoeur">
            Aucun coup de coeur pour le moment !
          </h2>
        )}
      </div>
    </div>
  );
};

export default Favorite;
