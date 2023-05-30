import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { useAppContext } from "../context/appContext.js";
import RingLoader from "react-spinners/RingLoader";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  const { currentColor, authFetch } = useAppContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await authFetch.get("stockWatch/get");
        setWatchlist(data.watches);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="text-center w-full">
      <Header title="My Watchlist" />
      {loading ? (
        <div className="w-full p-20">
          <div className="m-auto w-7">
            <RingLoader color={currentColor} className="-ml-5" />
          </div>
        </div>
      ) : (
        <div className="m-auto mb-3 w-full flex flex-col gap-10">
          <div className="flex flex-col text-center justify-center gap-5">
            <p
              style={{
                borderBottom: `2px solid ${currentColor}`,
                borderLeft: `2px solid ${currentColor}`,
                padding: "8px",
                borderRadius: "10px",
              }}
              className="shadow-md w-32 m-auto block font-semibold text-xl"
            >
              NSE
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 dark:text-white w-full">
              {watchlist
                .filter((watch) => watch.exc === "NSE")
                .map((watch) => {
                  return (
                    <div style={{ width: "32rem" }} key={watch.symbol}>
                      <div
                        style={{
                          borderLeft: `4px solid ${currentColor}`,
                        }}
                        className="rounded-lg border border-gray-100 cursor-pointer dark:shadow-md shadow-sm dark:bg-[#3d4249] dark:border-gray-700 dark:hover:shadow-xl hover:shadow-md"
                      >
                        <div className="flex md:p-5 p-3 justify-around">
                          <div className="w-2/3 flex flex-col gap-1 justify-between text-left md:px-1 m-auto">
                            <span className="md:text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                              {watch.name}
                            </span>
                            <span className="pr-1 md:text-lg text-base  text-gray-900 dark:text-white">
                              LTP: {watch.currentPrice} &#8377;
                            </span>
                          </div>
                          <div className="w-1/3 text-right flex justify-end md:px-1 m-auto">
                            <Link
                              to={`/stockDetails/${watch.exc}/${watch.name}/${watch.symbol}`}
                              style={{ background: currentColor }}
                              className="flex items-center md:py-2 px-4 py-2 md:px-4 text-sm text-md text-center rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-80 text-white font-light hover:skew-x-2 mr-0"
                            >
                              Explore
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {!watchlist.filter((watch) => watch.exc === "NSE").length && (
              <div>
                <p>No Stock Added</p>
              </div>
            )}
          </div>
          <div className="flex flex-col text-center justify-center gap-5">
            <p
              style={{
                borderBottom: `2px solid ${currentColor}`,
                borderLeft: `2px solid ${currentColor}`,
                padding: "8px",
                borderRadius: "10px",
              }}
              className="shadow-md w-32 m-auto block font-semibold text-xl"
            >
              NYSE
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 dark:text-white">
              {watchlist
                .filter((watch) => watch.exc === "NYSE")
                .map((watch) => {
                  return (
                    <div style={{ width: "32rem" }} key={watch.symbol}>
                      <div
                        style={{
                          borderLeft: `4px solid ${currentColor}`,
                        }}
                        className="rounded-lg border border-gray-100 cursor-pointer dark:shadow-md shadow-sm dark:bg-[#3d4249] dark:border-gray-700 dark:hover:shadow-xl hover:shadow-md"
                      >
                        <div className="flex md:p-5 p-3 justify-around">
                          <div className="w-2/3 flex flex-col gap-1 justify-between text-left md:px-1 m-auto">
                            <span className="md:text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                              {watch.name}
                            </span>
                            <span className="pr-1 md:text-lg text-base  text-gray-900 dark:text-white">
                              LTP: {watch.currentPrice} &#36;
                            </span>
                          </div>
                          <div className="w-1/3 text-right flex justify-end md:px-1 m-auto">
                            <Link
                              to={`/stockDetails/${watch.exc}/${watch.name}/${watch.symbol}`}
                              style={{ background: currentColor }}
                              className="flex items-center md:py-2 px-4 py-2 md:px-4 text-sm text-md text-center rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-80 text-white font-light hover:skew-x-2 mr-0"
                            >
                              Explore
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {!watchlist.filter((watch) => watch.exc === "NYSE").length && (
              <div>
                <p>No Stock Added</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
