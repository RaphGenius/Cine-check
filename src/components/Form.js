import React from "react";
import Card from "./Card";

const Form = () => {
  return (
    <div>
      <h2>Formulaire</h2>
      <form>
        <input type="text" placeholder="Rechercher un film" />
        <input type="submit" value={"Rechercher"} />
      </form>
      <div className="cards-container">
        <Card />
      </div>
    </div>
  );
};

export default Form;
