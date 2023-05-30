import React, { useState } from "react";
import list1 from "../data/indian.json";
import list2 from "../data/usa.json";
import { Header } from "../components";
import { useAppContext } from "../context/appContext.js";
import { Link } from "react-router-dom";

const Stocks = () => {
  const [inp, setinp] = useState("");
  const [isIndian, setIsIndian] = useState(true);
  const { currentColor } = useAppContext();
  return (
    <div>
      <div className="text-center w-full relative">
        <Header title="Search" />
        <div className="md:hidden justify-between text-center font-normal mb-5">
          <div className="flex gap-4 justify-around dark:text-white text-left m-auto">
            <div className="flex flex-col h-12 items-center justify-center overflow-hidden">
              <div className="flex justify-center text-center">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isIndian ? true : false}
                    readOnly
                  />
                  <div
                    onClick={() => setIsIndian((prev) => !prev)}
                    style={{ backgroundColor: currentColor }}
                    className="flex justify-around m-auto w-[102px] h-10 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-12 after:transition-all text-white"
                  >
                    <p className="m-auto">India</p>
                    <p className="m-auto">USA</p>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <input
          className="text-14 md:text-lg h-16 shadow-md appearance-none border-none border-gray-200 rounded-2xl w-full md:w-2/3 md:p-4 p-2 dark:text-white z-10 leading-tight focus:outline-none dark:placeholder-white  focus:border-none dark:bg-[#3d4249]  focus:bg-white mb-5"
          value={inp}
          placeholder={`Search ${isIndian ? "Indian" : "USA"} Stocks Here...`}
          onChange={(e) => {
            setinp(e.target.value);
          }}
        />
        <div className="hidden justify-between text-center font-normal absolute -top-3 -right-3 md:flex">
          <div className="flex gap-4 justify-around dark:text-white text-left m-auto">
            <div className="flex flex-col h-12 items-center justify-center overflow-hidden">
              <div className="flex justify-center text-center">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isIndian ? true : false}
                    readOnly
                  />
                  <div
                    onClick={() => {
                      setIsIndian((prev) => !prev);
                    }}
                    style={{ background: currentColor }}
                    className="flex justify-around m-auto w-[102px] h-10 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-12 after:transition-all text-white"
                  >
                    <p className="m-auto">India</p>
                    <p className="m-auto">USA</p>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-900"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        {inp.length >= 3 && (
          <div className="mt-2 z-0 rounded-b-3xl scrollClass max-h-80 m-auto w-full md:w-2/3 overflow-scroll flex flex-col gap-9 py-3 justify-start  dark:text-white font-medium">
            {isIndian === true
              ? list1
                  .filter((e) =>
                    e["name"].toLowerCase().includes(inp.toLowerCase())
                  )
                  .map((l) => {
                    return (
                      <Link
                        className="h-8 md:h-12"
                        to={`/stockDetails/NSE/${l["name"]}/${l["symbol"]}`}
                        key={l["symbol"]}
                      >
                        <div
                          style={{ borderLeft: `1px solid ${currentColor}` }}
                          className="m-auto rounded-lg flex justify-between z-0 shadow-sm  w-full  md:p-5 p-4 text-14 md:text-lg dark:text-white"
                        >
                          <h1 className="text-left">
                            {l["name"].length < 25
                              ? l["name"]
                              : `${l["name"].substring(0, 25)}...`}
                          </h1>
                          <h1 className="hidden lg:block font-light">
                            NSE:{l["symbol"]}
                          </h1>
                        </div>
                      </Link>
                    );
                  })
              : list2
                  .filter((e) =>
                    e["name"].toLowerCase().includes(inp.toLowerCase())
                  )
                  .map((l) => {
                    return (
                      <Link
                        className="h-8 md:h-12"
                        to={`/stockDetails/NYSE/${l["name"]}/${l["symbol"]}`}
                        key={l["symbol"]}
                      >
                        <div
                          style={{ borderLeft: `1px solid ${currentColor}` }}
                          className="m-auto rounded-lg flex justify-between z-0 shadow-sm  w-full  md:p-4 p-2 text-14 md:text-lg dark:text-white"
                        >
                          <h1 className="text-left">
                            {l["name"].length < 25
                              ? l["name"]
                              : `${l["name"].substring(0, 25)}...`}
                          </h1>
                          <h1 className="hidden lg:block font-light">
                            NYSE:{l["symbol"]}
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
