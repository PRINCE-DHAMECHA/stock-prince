import React from "react";
import { FiSettings } from "react-icons/fi";
import { useAppContext } from "../context/appContext";
import ThemeSettings from "./ThemeSettings";

const SetTheme = () => {
  const { themeSettings, setThemeSettings, currentColor } = useAppContext();

  return (
    <>
      <div style={{ zIndex: "1000" }}>
        <button
          type="button"
          className="text-base p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
          onClick={() => setThemeSettings(true)}
          style={{ background: currentColor, borderRadius: "50%" }}
        >
          <FiSettings></FiSettings>
        </button>
      </div>
      {themeSettings && <ThemeSettings />}
    </>
  );
};
export default SetTheme;
