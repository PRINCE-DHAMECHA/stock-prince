import React, { useState } from "react";
import { MarketViewData } from "../data/dummy";
import { MarketViewCard, Header } from "../components";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
const MarketView = () => {
  const { currentColor } = useAppContext();
  const [inp, setinp] = useState("");
  return (
    <div className="m-2 md:m-10 mb-10 mt-24 md:mx-9 mx-2  p-2 md:p-6  dark:bg-secondary-dark-bg bg-white rounded-3xl">
      <div className="flex justify-between flex-wrap">
        <Header title="Market" />
        <div className="m-auto mb-3 w-full xl:w-96">
          <div className="input-group w-full xl:w-96 relative flex flex-wrap items-stretch  mb-4 rounded">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 inline w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search"
              onChange={(e) => setinp(e.target.value)}
              aria-label="Search"
              aria-describedby="button-addon2"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-10 mx-1">
        {MarketViewData.filter((item) =>
          item.stockName.toLowerCase().includes(inp.toLowerCase())
        ).map((item) => {
          return (
            <div style={{ width: "32rem" }} key={item.key}>
              <MarketViewCard stockname={item.stockName} k={item.key} />
            </div>
          );
        })}
      </div>
      <div className="m-10 text-center flex justify-center gap-8">
        <NavLink
          style={{
            backgroundColor: currentColor,
            borderRadius: "10px",
          }}
          to="/portfolio"
          className={`text-xl text-white px-6 py-2 hover:drop-shadow-xl `}
        >
          Trade
        </NavLink>
        <NavLink
          style={{
            backgroundColor: currentColor,
            borderRadius: "10px",
          }}
          to="/themepicker"
          className={`text-xl text-white px-6 py-2 hover:drop-shadow-xl `}
        >
          Themes
        </NavLink>
      </div>
    </div>
  );
};

export default MarketView;
