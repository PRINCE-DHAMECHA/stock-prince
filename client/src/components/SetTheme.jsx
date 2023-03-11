import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import React from "react";
import { FiSettings } from "react-icons/fi";
import { useAppContext } from "../context/appContext";
import ThemeSettings from "./ThemeSettings";

const SetTheme = () => {
  const { themeSettings, setThemeSettings, currentColor } = useAppContext();
  return (
    <>
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        <TooltipComponent content="Settings" position="Top">
          <button
            type="button"
            className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
            onClick={() => setThemeSettings(true)}
            style={{ background: currentColor, borderRadius: "50%" }}
          >
            <FiSettings></FiSettings>
          </button>
        </TooltipComponent>
      </div>
      {themeSettings && <ThemeSettings />}
    </>
  );
};

export default SetTheme;
