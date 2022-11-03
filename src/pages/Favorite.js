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
    <div>
      <Header title={"Mes films favoris"} />
      <div>
        {favoriteMovies.map((movie) => (
          <CardFavorite movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
