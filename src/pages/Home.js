import React from "react";
import Form from "../components/Form";
import Header from "../components/Header";
const Home = () => {
  return (
    <div className="home">
      <Header title={"Cine Check"} />
      <main>
        <Form />
      </main>
    </div>
  );
};

export default Home;
