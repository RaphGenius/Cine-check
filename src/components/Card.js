import React from "react";

const Card = ({ movie }) => {
  const handleFav = () => {
    let StorageData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];
    if (!StorageData.includes(movie.id.toString())) {
      StorageData.push(movie.id);
      window.localStorage.movies = StorageData;
    }
  };

  return (
    <div>
      <h3>{movie.title} </h3>
      <button onClick={() => handleFav()}> Ajouter aux favories</button>
    </div>
  );
};

export default Card;
