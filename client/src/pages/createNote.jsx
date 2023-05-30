import React, { useState } from "react";
import { Header } from "../components";
import { useAppContext } from "../context/appContext";
import RingLoader from "react-spinners/RingLoader";
import { Link, useNavigate } from "react-router-dom";

const CreateNote = () => {
  const { currentColor, authFetch, user } = useAppContext();
  const navigate = useNavigate();
  const [principal, setPrincipal] = useState(1000);
  const [interest, setInterest] = useState(6);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authFetch.post("loan/createNote", {
        lender: user.name,
        principal: principal,
        interest: interest,
      });
      setErr(false);
      setLoading(false);
      navigate("/notes");
    } catch (error) {
      setErr(true);
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between text-center flex-wrap flex-col">
        <Header title="Create Note" />
        {loading && (
          <div className="w-full mb-5">
            <div className="m-auto w-7">
              <RingLoader color={currentColor} className="-ml-5" />
            </div>
          </div>
        )}
        <div
          style={{
            borderLeft: `2px solid ${currentColor}`,
            borderRadius: "10px",
          }}
          className="max-w-sm w-full space-y-8 m-auto shadow-lg dark:shadow-gray-600s px-8 mt-4"
        >
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
            method="post"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md dark:text-white text-left">
              <div className="mb-10 mt-10">
                <p className="pb-5 text-lg">Enter Principal</p>
                <input
                  type="number"
                  value={principal}
                  name="principal"
                  onChange={(e) => setPrincipal(e.target.value)}
                  className={`appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md dark:bg-[#3d4249] dark:text-white dark:border-slate-500 dark:focus:border-gray-300 dark:placeholder-white`}
                  placeholder="Principal"
                  min={"1"}
                  required
                />
              </div>
              <div>
                <p className="pb-5 text-lg">Enter Interest</p>
                <input
                  name="interest"
                  type="number"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-slate-500 dark:focus:border-gray-300 placeholder-gray-500 dark:placeholder-white text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-md dark:bg-[#3d4249] dark:text-white"
                  placeholder="Interest"
                  max={"100"}
                  min={"1"}
                  required
                />
              </div>
              <div className="text-center mt-5 text-xl">
                <p className="block m-auto">
                  Platform Fees:{" "}
                  {principal < 100000
                    ? Math.max(
                        (principal * 0.005).toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        }),
                        0
                      )
                    : 500}
                  &#8377;
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="flex justify-center gap-5 mt-5 mb-5">
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  style={{
                    backgroundColor: currentColor,
                    borderRadius: "10px",
                  }}
                  className={`text-md text-white p-3 hover:drop-shadow-xl `}
                >
                  Create
                </button>
              </div>
              {err && <p className="text-red-500">{"Something Went Wrong"}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
