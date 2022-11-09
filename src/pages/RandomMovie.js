import axios from "axios";
import React, { useState } from "react";
import Header from "../components/Header";

const RandomMovie = () => {
  const [movieData, setmovieData] = useState();
  const ApiKey = process.env.REACT_APP_API_KEY;
  const budgetFormater = (price) => {
    const newPrice = new Intl.NumberFormat().format(price);
    return newPrice;
  };
  const getRandomMovie = () => {
    let randomNumb = () => {
      let numb = Math.random() * 100000 + 1;
      return Math.floor(numb);
    };
    const body = document.querySelector(".container-randomMovie");
    console.log(body);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${randomNumb()}?api_key=${ApiKey}&language=fr-FR&adult=false`
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
  const formaterDate = (date) => {
    const [yyyy, mm, dd] = date.split("-");
    return [dd, mm, yyyy].join("/");
  };
  return (
    <div>
      <Header />
      <div className="btn-getMovie">
        <button onClick={() => getRandomMovie()}>Afficher un film !</button>
      </div>

      {movieData && (
        <div className="container-randomMovie">
          <div className="img-container">
            <img
              src={
                movieData.poster_path
                  ? "https://image.tmdb.org/t/p/original/" +
                    movieData.poster_path
                  : "/img/poster.jpg"
              }
              alt={`Affiche du film ${movieData.title}`}
            />
          </div>
          <div className="info-container">
            <h2>{movieData.title}</h2>
            <p>
              <span className="bold">Titre original : </span>
              {movieData.original_title}{" "}
            </p>
            <p>
              <span className="bold">Sortie le :</span>{" "}
              {formaterDate(movieData.release_date)}{" "}
            </p>
            <h4>Note: {movieData.vote_average.toFixed(1)}/10 </h4>
            {movieData.budget !== 0 ? (
              <p>
                <span className="bold">Budget :</span>{" "}
                {budgetFormater(movieData.budget)}$
              </p>
            ) : (
              <p>
                <span className="bold">Budget : NC</span>
              </p>
            )}
            <ul>
              {movieData.genres.map((genre, index) => (
                <li key={index}>{genre.name} </li>
              ))}
            </ul>
            {movieData.overview ? (
              <p className="synopsis">
                <span className="bold">Synopsis :</span> <br></br>{" "}
                {movieData.overview}{" "}
              </p>
            ) : (
              "Aucune description disponible"
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomMovie;
