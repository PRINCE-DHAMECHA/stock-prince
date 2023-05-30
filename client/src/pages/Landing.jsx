import React from "react";
import logoDark from "../utils/img/logodark.jpg";
import logo from "../utils/img/logolight.jpg";
import { useAppContext } from "../context/appContext";
import { quotes } from "../data/dummy";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { Fader } from "../components";

const Landing = () => {
  const { currentColor, currentMode } = useAppContext();
  return (
    <div>
      <div className="flex justify-between text-center flex-wrap flex-col">
        <img
          src={currentMode === "Dark" ? logoDark : logo}
          className="m-auto mt-5 mb-12 w-2/3 md:w-2/12 h-auto"
          alt={"logo"}
        ></img>
        <div className="text-center m-auto h-60 dark:text-white w-4/5 md:w-2/3 text-xl">
          <Fader text={quotes[0]}></Fader>
        </div>
        <Link to="/register" className="btn btn-hero mb-10">
          <Button
            color="white"
            bgColor={currentColor}
            text="Start Exploring"
            borderRadius="10px"
            size="md"
          ></Button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
