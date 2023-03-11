import React, { useState } from "react";
import { list } from "../data/list.js";
import { Header } from "../components";
import { useAppContext } from "../context/appContext.js";
import { Link } from "react-router-dom";

const Stocks = () => {
  const [inp, setinp] = useState("");
  const { currentColor } = useAppContext();
  return (
    <div className="m-2 md:m-10 mb-10 mt-24 md:mx-9 mx-2 p-2 md:p-6 dark:bg-secondary-dark-bg bg-white rounded-3xl text-center">
      <div className="text-center w-full">
        <Header title="Search" />
        <input
          className="text-14 md:text-lg h-16 shadow-md appearance-none border-none border-gray-200 rounded-2xl w-full md:w-2/3 md:p-4 p-2 dark:text-white z-10 leading-tight focus:outline-none dark:placeholder-white  focus:border-none dark:bg-[#3d4249]  focus:bg-white"
          value={inp}
          placeholder="Search Stocks Here..."
          onChange={(e) => {
            setinp(e.target.value);
          }}
        />
        {inp.length >= 2 && (
          <div className="mt-2 z-0 rounded-b-3xl scrollClass max-h-80 m-auto w-full md:w-2/3 overflow-scroll flex flex-col gap-9 py-3 justify-start  dark:text-white font-medium">
            {list
              .filter((e) =>
                e["NAME OF COMPANY"].toLowerCase().includes(inp.toLowerCase())
              )
              .map((l) => {
                return (
                  <Link
                    className="h-8 md:h-12"
                    to={`/stockDetails/${l["NAME OF COMPANY"]}/${l["SYMBOL"]}`}
                    key={l["SYMBOL"]}
                  >
                    <div
                      style={{ borderLeft: `1px solid ${currentColor}` }}
                      className="m-auto rounded-lg flex justify-between z-0 shadow-sm  w-full  md:p-4 p-2 text-14 md:text-lg dark:text-white"
                    >
                      <h1 className="text-left">
                        {l["NAME OF COMPANY"].length < 25
                          ? l["NAME OF COMPANY"]
                          : `${l["NAME OF COMPANY"].substring(0, 25)}...`}
                      </h1>
                      <h1 className="hidden lg:block font-light">
                        NSE:{l["SYMBOL"]}
                      </h1>
                    </div>
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stocks;
