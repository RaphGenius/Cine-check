import React from "react";
const Card = ({ movie, moviesInLs, setMoviesInLs }) => {
  const handleFav = () => {
    let StorageData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];
    if (!StorageData.includes(movie.id.toString())) {
      StorageData.push(movie.id);
      setMoviesInLs(StorageData);
      window.localStorage.movies = StorageData;
    } else {
      let newLs = StorageData.filter((id) => String(movie.id) !== id);
      console.log(newLs);
      setMoviesInLs(newLs);
      window.localStorage.movies = newLs;
    }
  };

  const dateFormater = (date) => {
    let [yyyy, mm, dd] = date.split("-");
    return [dd, mm, yyyy].join(".");
  };
  const genreFinder = () => {
    let genreArray = [];
    for (let i = 0; i < movie.genre_ids.length; i++) {
      switch (movie.genre_ids[i]) {
        case 28:
          genreArray.push(`Action`);
          break;
        case 12:
          genreArray.push(`Aventure`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 35:
          genreArray.push(`Comédie`);
          break;
        case 80:
          genreArray.push(`Policier`);
          break;
        case 99:
          genreArray.push(`Documentaire`);
          break;
        case 18:
          genreArray.push(`Drame`);
          break;
        case 10751:
          genreArray.push(`Famille`);
          break;
        case 14:
          genreArray.push(`Fantasy`);
          break;
        case 36:
          genreArray.push(`Histoire`);
          break;
        case 27:
          genreArray.push(`Horreur`);
          break;
        case 10402:
          genreArray.push(`Musique`);
          break;
        case 9648:
          genreArray.push(`Mystère`);
          break;
        case 10749:
          genreArray.push(`Romance`);
          break;
        case 878:
          genreArray.push(`Science-fiction`);
          break;
        case 10770:
          genreArray.push(`Téléfilm`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`Guerre`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
      }
    }
    return genreArray.slice(0, 2).map((genre) => <li key={genre}>{genre}</li>);
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
        {movie.release_date ? (
          <h5>Sortie le : {dateFormater(movie.release_date)} </h5>
        ) : null}
        <h4>
          {movie.vote_average.toFixed(1)}/10 <span>⭐</span>{" "}
        </h4>

        <ul>
          {movie.genre_ids
            ? genreFinder()
            : movie.genres.map((genre, index) => (
                <li key={index}>{genre.name} </li>
              ))}
        </ul>

        {/*  {movie.overview ? <h3>Synopsis :</h3> : ""}
        <p className="synopsis">{movie.overview} </p> */}
        <button onClick={() => handleFav()}>
          {moviesInLs.includes(String(movie.id))
            ? "Retirer des favories"
            : "Ajouter aux favories"}
        </button>
      </div>
    </div>
  );
};

export default Card;
