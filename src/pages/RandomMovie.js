import axios from "axios";
import React, { useState } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
const RandomMovie = () => {
  const [isOpen, setIsOpen] = useState(true);
  const ApiKey = process.env.REACT_APP_API_KEY;
  const variants = {
    open: { opacity: 1, x: 0, transition: { duration: 1 } },
    closed: { opacity: 0, x: "-100%", transition: { duration: 1 } },
  };
  const [movieData, setmovieData] = useState();
  const budgetFormater = (price) => {
    const newPrice = new Intl.NumberFormat().format(price);
    return newPrice;
  };
  const getRandomMovie = () => {
    setIsOpen(false);
    let randomNumb = () => {
      let numb = Math.random() * 100000 + 1;
      return Math.floor(numb);
    };
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${randomNumb()}?api_key=${ApiKey}&language=fr-FR&adult=false`
      )
      .then((res) => {
        setTimeout(() => {
          setmovieData(res.data);
        }, 1000);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          getRandomMovie();
        }
      });
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };
  const formaterDate = (date) => {
    const [yyyy, mm, dd] = date.split("-");
    return [dd, mm, yyyy].join("/");
  };
  return (
    <div className="RandomMoviePage">
      <Header />
      <div className="btn-getMovie">
        <button onClick={() => getRandomMovie()}>Afficher un film !</button>
      </div>

      {movieData && (
        <motion.div
          className="container-randomMovie"
          animate={isOpen ? "open" : "closed"}
          variants={variants}
        >
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
        </motion.div>
      )}
    </div>
  );
};

export default RandomMovie;
