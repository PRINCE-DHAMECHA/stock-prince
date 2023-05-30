import React, { useState } from "react";
import { MarketViewData } from "../data/dummy";
import { MarketViewCard, Header } from "../components";
const MarketView = () => {
  const [inp, setinp] = useState("");
  return (
    <div>
      <div className="flex justify-between flex-wrap pb-16">
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
    </div>
  );
};

export default MarketView;
