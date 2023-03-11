import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { useAppContext } from "../context/appContext";
import { NavLink } from "react-router-dom";

const NavButton = ({ cunstomFunc, icon, color }) => (
  <button
    type="button"
    onClick={cunstomFunc}
    style={{ color }}
    className="relative text-xl rounded-full p-3 "
  >
    {icon}
  </button>
);

const Navbar = () => {
  const [myText, setmyText] = useState("Logout");
  const {
    logoutUser,
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    currentColor,
  } = useAppContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenSize]);
  let localStorage = window.localStorage.getItem("user");
  localStorage = localStorage?.slice(1, localStorage.length - 1);
  const user = localStorage?.split(",")[1]?.split(":")[1];
  const name = window.localStorage.getItem("name");
  return (
    <div className="dark:bg-main-dark-bg">
      <div className="flex justify-between p-3 md:mx-6 relative">
        <NavButton
          cunstomFunc={() => {
            setActiveMenu((prev) => !prev);
          }}
          color={currentColor}
          icon={activeMenu ? "" : <AiOutlineMenu />}
        ></NavButton>
        {user ? (
          <div className="flex">
            <div className="flex items-center flex-row gap-2 p-1  rounded-lg">
              <NavLink to="/portfolio" className="flex flex-row text-lg mr-1">
                <span className="text-black dark:text-white ">
                  <AiOutlineUser size={"30px"} />
                </span>{" "}
                <span className="dark:text-white font-bold ml-1 ">{name}</span>
              </NavLink>
              <button
                style={{
                  backgroundColor: currentColor,
                  borderRadius: "10px",
                }}
                className={`text-lg text-white px-4 py-1 hover:drop-shadow-xl `}
                onClick={() => {
                  setmyText("Logging Out...");
                  setTimeout(() => {
                    logoutUser();
                    window.location.reload();
                  }, 1000);
                }}
              >
                {myText}
              </button>
            </div>
          </div>
        ) : (
          <NavLink to="/portfolio" className="flex text-lg mr-1 gap-3">
            <button
              type="button"
              style={{ backgroundColor: currentColor, borderRadius: "10px" }}
              className={
                "py-1 mt-2 px-5 hover:drop-shadow-xl text-white flex justify-center gap-2"
              }
            >
              <span>Login</span>
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
