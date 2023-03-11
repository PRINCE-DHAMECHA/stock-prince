import React from "react";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { Navbar, Sidebar } from "../components";
import SetTheme from "../components/SetTheme";

const Demo = () => {
  const { activeMenu } = useAppContext();
  return (
    <>
      <div>
        <div className="flex relative dark:bg-main-dark-bg">
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="hidden dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg  navbar w-full">
              <Navbar />
            </div>
            <Outlet />
          </div>
        </div>
        <SetTheme />
      </div>
    </>
  );
};

export default Demo;
