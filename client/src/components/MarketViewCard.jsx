import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const MarketViewCard = ({ stockname, k }) => {
  const [ltp, setltp] = useState(0);
  const [TotalchangeInPrice, setTotalchangeInPrice] = useState(0);
  const [PerChangeInPrice, setPerChangeInPrice] = useState(0);
  const id = k;
  let prices;
  const data = require(`../data/stockPrices/${k}`);
  prices = data["price"];
  useEffect(() => {
    let val = 0;
    const d = new Date();
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    val += hour * 60 * 60;
    val += min * 60;
    val += sec;
    setltp(prices[Math.floor(val / 3)]);
    setTotalchangeInPrice((prices[Math.floor(val / 3)] - prices[0]).toFixed(2));
    setPerChangeInPrice(
      (((prices[Math.floor(val / 3)] - prices[0]) / prices[0]) * 100).toFixed(2)
    );
    const timeInt = setInterval(() => {
      let val = 0;
      const d = new Date();
      let hour = d.getHours();
      let min = d.getMinutes();
      let sec = d.getSeconds();
      val += hour * 60 * 60;
      val += min * 60;
      val += sec;
      setltp(prices[Math.floor(val / 3)]);
      setTotalchangeInPrice(
        (prices[Math.floor(val / 3)] - prices[0]).toFixed(2)
      );
      setPerChangeInPrice(
        (((prices[Math.floor(val / 3)] - prices[0]) / prices[0]) * 100).toFixed(
          2
        )
      );
    }, 3000);
    return () => {
      clearInterval(timeInt);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { currentColor } = useAppContext();
  return (
    <div
      style={{
        borderLeft: `4px solid ${currentColor}`,
      }}
      className="rounded-lg border border-gray-100 cursor-pointer dark:shadow-md shadow-sm dark:bg-[#3d4249] dark:border-gray-700 dark:hover:shadow-xl hover:shadow-md"
    >
      <div className="md:p-5 p-3">
        <div className="flex justify-between md:px-1 m-auto">
          <span className="md:text-xl md:font font-semibold tracking-tight text-gray-900 dark:text-white">
            {stockname}
          </span>
          <p
            style={
              TotalchangeInPrice >= 0
                ? { color: "#00b700" }
                : { color: "#fc4e41" }
            }
            className="md:text-2xl  text-xl font-normal tracking-wide "
          >
            {ltp.toLocaleString("en-IN")} &#8377;
          </p>
        </div>
        <div className="flex justify-between text-center">
          <Link
            to={`/buyStock/${stockname}/${id}`}
            style={
              TotalchangeInPrice >= 0
                ? { background: currentColor }
                : { background: currentColor }
            }
            className="flex items-center md:mt-4 mt-4 md:py-2 px-4 py-2 md:px-4 text-sm text-md text-center rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-80 text-white font-light tracking-widest hover:skew-x-2"
          >
            Buy / Sell
          </Link>
          <span className="mb-5 pr-1 md:text-base text-sm  text-gray-900 dark:text-white">
            {TotalchangeInPrice >= 0 ? "+" : ""}
            {TotalchangeInPrice.toLocaleString("en")} ({" "}
            {TotalchangeInPrice >= 0 ? "+" : ""}
            {PerChangeInPrice.toLocaleString("en-IN")}% )
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarketViewCard;
