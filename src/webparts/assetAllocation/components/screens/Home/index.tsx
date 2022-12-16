import * as React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="background--home">
      <div className="container--home">
        <div className="container--side">
          <div className="container--image">
            <Link to="/app/hr/landing" className="image--btn">
              <img
                className="image"
                src={require("../../assets/img/pic1.png")}
                alt="laptop"
              />
              <p className="image__text">HR</p>
            </Link>
            <Link to="/app/employee/landing" className="image--btn">
              <img
                className="image"
                src={require("../../assets/img/pic2.png")}
                alt="Mouse"
              />
              <p className="image__text">Employee</p>
            </Link>
          </div>
          <div className="container--image mt-6">
            <Link to="/app/landing" className="image--btn">
              <img
                className="image"
                src={require("../../assets/img/pic3.png")}
                alt="mouse"
              />
              <p className="image__text">Office Manager</p>
            </Link>
            <br />
            <img
              className="image"
              src={require("../../assets/img/pic4.png")}
              alt="box"
            />
          </div>
        </div>
        <div className="container--side">
          <div className="home__text p-4">
            <h3>Welcome to the</h3>
            <h1 className="home__heading">Asset Allocation Portal</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
