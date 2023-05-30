import React, { useReducer, useContext, useState } from "react";

import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  DISPLAY_PASS_ERROR,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  shares: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setisClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState(
    localStorage.getItem("colorMode") || "#1E4DB7"
  );
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem("themeMode") || "Light"
  );
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeStockId, setactiveStockId] = useState(null);
  const [activeStockName, setactiveStockName] = useState(null);
  const [activeLoan, setActiveLoan] = useState(null);
  const setMode = () => {
    const newMode = currentMode === "Light" ? "Dark" : "Light";
    setCurrentMode(newMode);
    localStorage.setItem("themeMode", newMode);
    setThemeSettings(false);
  };
  const setLoan = (data, outstanding, date) => {
    localStorage.setItem("lender", data.lender);
    localStorage.setItem("principal", data.principal);
    localStorage.setItem("interest", data.interest);
    localStorage.setItem("id", data._id);
    localStorage.setItem("outstanding", outstanding);
    localStorage.setItem("date", date);
  };
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    setThemeSettings(false);
  };

  const authFetch = axios.create({
    baseURL: "http://localhost:5000/",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const displayPassAlert = () => {
    dispatch({ type: DISPLAY_PASS_ERROR });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("name", user.name);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("name");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await authFetch.post(`/auth/${endPoint}`, currentUser);
      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        displayPassAlert,
        setupUser,
        logoutUser,
        authFetch,
        activeMenu,
        setActiveMenu,
        isClicked,
        setisClicked,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        setColor,
        setMode,
        themeSettings,
        setThemeSettings,
        activeStockId,
        setactiveStockId,
        activeStockName,
        setactiveStockName,
        activeLoan,
        setActiveLoan,
        setLoan,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
