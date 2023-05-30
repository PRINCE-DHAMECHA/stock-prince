import React from "react";
import { Link, NavLink } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";
import { links } from "../data/dummy";
import { useAppContext } from "../context/appContext";
import logoDark from "../utils/img/logodark.jpg";
import logo from "../utils/img/logolight.jpg";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor, currentMode } =
    useAppContext();
  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 m-2 hover:shadow-lg";
  return (
    <div className="dark:bg-secondary-dark-bg p-2 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto">
      {activeMenu && (
        <>
          <div className="flex mt-1 ml-2 justify-between items-center z-50 w-36">
            <div className="h-1/6 w-auto">
              <Link to="/landing">
                <img
                  className="mx-auto h-auto w-auto "
                  src={currentMode === "Dark" ? logoDark : logo}
                  alt="Workflow"
                />
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setActiveMenu((prev) => !prev)}
              style={{ color: currentColor }}
              className={`top-0 right-0 absolute  text-xl rounded-full p-3  block `}
            >
              <RiCloseFill size={"25px"}></RiCloseFill>
            </button>
          </div>
          <div className="mt-2">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.to}`}
                    key={link.name}
                    onClick={handleCloseSidebar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) => {
                      return isActive ? activeLink : normalLink;
                    }}
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
