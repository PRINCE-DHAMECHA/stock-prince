import logoLight from "../utils/img/logolight.jpg";
import logoDark from "../utils/img/logodark.jpg";
import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {
    user,
    alertType,
    showAlert,
    displayAlert,
    displayPassAlert,
    setupUser,
    alertText,
    currentMode,
    currentColor,
    isLoading,
  } = useAppContext();
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (user) {
      navigate("/stockHome");
    }
    return () => {
      clearTimeout(t);
    };
  }, [user, navigate]);
  const [state, setstate] = useState(initialState);
  const toggle = () => {
    setstate({ ...state, isMember: !state.isMember });
  };
  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = state;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    if (password.length <= 5) {
      displayPassAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };
  return (
    <div>
      {loading ? (
        <div className="w-full p-20">
          <div className="m-auto w-7">
            <RingLoader color={currentColor} className="-ml-5" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center flex-wrap text-center">
          <Link className="w-full" to="/landing">
            <img
              src={currentMode === "Dark" ? logoDark : logoLight}
              alt="Logo"
              className="m-auto mt-3 w-2/5 md:w-2/12 h-auto"
            ></img>
          </Link>
          <div className="max-w-sm w-full space-y-6">
            <div>
              <h2
                style={{
                  color: currentColor,
                  borderBottom: `2px solid ${currentColor}`,
                  borderRadius: "10px",
                }}
                className="mt-3 p-1 py-2 text-center text-2xl font-medium dark:text-white text-gray-900"
              >
                {state.isMember
                  ? " Sign In To Your Account  "
                  : " Create New Account "}
              </h2>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit} method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm">
                {!state.isMember && (
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={state.value}
                      onChange={handleChange}
                      className={
                        "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#3d4249] dark:text-white focus:z-10 sm:text-md dark:placeholder-white dark:border-slate-500 dark:focus:border-gray-300"
                      }
                      placeholder="Username"
                    />
                  </div>
                )}
                <div className="mb-10 mt-10">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={state.email}
                    name="email"
                    onChange={handleChange}
                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md dark:bg-[#3d4249] dark:text-white dark:border-slate-500 dark:focus:border-gray-300 dark:placeholder-white
                  ${state.isMember ? "rounded-t-md" : ""}`}
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-500 dark:focus:border-gray-300 placeholder-gray-500 dark:placeholder-white text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md dark:bg-[#3d4249] dark:text-white"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="text-center">
                {isLoading ? (
                  <div className="w-full p-2">
                    <div className="m-auto w-7">
                      <RingLoader color={currentColor} className="-ml-5" />
                    </div>
                  </div>
                ) : (
                  <div className="m-5">
                    <button
                      type="submit"
                      onSubmit={handleSubmit}
                      style={{
                        backgroundColor: currentColor,
                        borderRadius: "10px",
                      }}
                      className={`text-md text-white p-3 hover:drop-shadow-xl `}
                    >
                      {state.isMember ? "Sign in" : "Register"}
                    </button>
                  </div>
                )}
              </div>

              <h2 className="mt-10 text-center text-xl  dark:text-white text-gray-900">
                {showAlert && (
                  <div className={`text-${alertType}-400`}>{alertText}</div>
                )}
              </h2>
              <div className="flex gap-1 justify-center text-center font-medium text-black dark:text-white">
                {state.isMember ? " New User?  " : "Already Member? "}
                <button
                  type="button"
                  onClick={toggle}
                  className="mb-6"
                  style={{ color: currentColor }}
                >
                  {state.isMember ? "Register" : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
