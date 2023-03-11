import React from "react";
import { useAppContext } from "../context/appContext";

const Header = ({ title }) => {
  const { currentColor } = useAppContext();
  return (
    <div className="mb-10 mt-5 w-full text-center">
      <p
        style={{ borderColor: currentColor }}
        className="lg:text-3xl text-2xl m-auto pb-2 font-extrabold tarcking-tight dark:text-white text-black border-solid border-b-2 lg:w-1/2 w-5/6"
      >
        {title}
      </p>
    </div>
  );
};

export default Header;
