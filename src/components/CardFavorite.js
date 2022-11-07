import React from "react";

const CardFavorite = ({ movie }) => {
  const removeLS = () => {
    let StorageData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];
    let newLs = StorageData.filter((id) => String(movie.id) !== id);
    window.localStorage.movies = newLs;
    window.location.reload();
  };

  return (
    <div className="card">
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/original/" + movie.poster_path
            : "/img/poster.jpg"
        }
        alt={`Affiche du film ${movie.title}`}
      />
      <div className="movie-info-container">
        <h2>{movie.title} </h2>

        <h4>
          {movie.vote_average.toFixed(1)}/10 <span>⭐</span>{" "}
        </h4>

        {/*  {movie.overview ? <h3>Synopsis :</h3> : ""}
        <p className="synopsis">{movie.overview} </p> */}
        <button onClick={() => removeLS()}>Retirer des favories</button>
      </div>
    </div>
  );
};

export default CardFavorite;
