import axios from "axios";
import React, { useState } from "react";
import Header from "../components/Header";

const RandomMovie = () => {
  const [movieData, setmovieData] = useState();
  const ApiKey = process.env.REACT_APP_API_KEY;

  const getRandomMovie = () => {
    let randomNumb = () => {
      let numb = Math.random() * 100000 + 1;
      return Math.floor(numb);
    };
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${randomNumb()}?api_key=${ApiKey}&language=fr-FR`
      )
      .then((res) => {
        console.log(res.data);
        setmovieData(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          getRandomMovie();
        }
      });
  };

  return (
    <div>
      <Header />
      <div className="btn-getMovie">
        <button onClick={() => getRandomMovie()}>Afficher un film !</button>
      </div>

      <div className="container-randomMovie">
        {movieData && (
          <div className="card">
            <h1>{movieData.original_title}</h1>
            <img
              src={
                movieData.poster_path
                  ? "https://image.tmdb.org/t/p/original/" +
                    movieData.poster_path
                  : "/img/poster.jpg"
              }
              alt={`Affiche du film ${movieData.title}`}
            />
            <h4>
              {movieData.vote_average}/10 <span>⭐</span>{" "}
            </h4>
            <ul>
              {movieData.genres.map((genre, index) => (
                <li key={index}>{genre.name} </li>
              ))}
            </ul>
            {movieData.budget !== 0 ? (
              <p>Budget : {movieData.budget}$ </p>
            ) : (
              <p>Budget : non communiqué</p>
            )}
            {movieData.overview && <p>{movieData.overview} </p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomMovie;
