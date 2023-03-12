import React, { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";
import { Header } from "../components";
import { useAppContext } from "../context/appContext";
import { MarketViewData } from "../data/dummy";
const data = require(`../data/stockPrices/preference.json`);

const Tips = () => {
  const [isTipBought, setIsTipBought] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [myText, setMyText] = useState("Buy");
  const [loading, setLoading] = useState(true);
  const { currentColor, authFetch } = useAppContext();
  const [currentBuy, setcurrentBuy] = useState({});
  const [isRefetch, setisRefetch] = useState(false);
  const handlePay = async () => {
    setLoading(true);
    try {
      await authFetch("account/pay");
      setIsTipBought(true);
      setLoading(false);
      setMyText("Buy Again");
    } catch (e) {
      setMyText("Error");
      setLoading(false);
      console.log(e);
    }
    setisRefetch((prev) => !prev);
  };
  useEffect(() => {
    setLoading(true);
    const fetchDetails = async () => {
      try {
        const data = await authFetch("share/getUser");
        setCurrentBalance(data.data[0].balance);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetch]);
  useEffect(() => {
    const d = new Date();
    let val = 0;
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    val += hour * 60 * 60;
    val += min * 60;
    val += sec;
    val = Math.floor(val / 3);
    setcurrentBuy(data[val]);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="m-2 md:m-10 mb-10 mt-24 md:mx-9 mx-2 p-2 md:p-6 dark:bg-secondary-dark-bg bg-white rounded-3xl text-center">
      <div className="text-center w-full">
        <Header title="Tips" />
        {loading ? (
          <div className="w-full mb-5">
            <div className="m-auto w-7">
              <RingLoader color={currentColor} className="-ml-5" />
            </div>
          </div>
        ) : (
          <div
            style={{
              borderLeft: `2px solid ${currentColor}`,
              borderRight: `2px solid ${currentColor}`,
              borderRadius: "10px",
            }}
            className="p-4 flex flex-col justify-center dark:text-white gap-5"
          >
            <p className="text-lg lg:text-2xl font-medium">
              Current Balance: {currentBalance} &#8377;
            </p>
            {!isTipBought ? (
              <div>
                <p className="text-lg lg:text-2xl dark:text-white font-medium m-5">
                  Buy Tip At Just 100 &#8377;
                </p>
                <button
                  style={{
                    backgroundColor: currentColor,
                    borderRadius: "10px",
                  }}
                  onClick={handlePay}
                  className="w-28 m-auto text-lg text-white mt-6 px-4 py-2 hover:drop-shadow-xl hover:skew-x-2"
                >
                  {myText}
                </button>
              </div>
            ) : (
              <div className="dark:text-white">
                <p className="text-2xl font-medium">Tip Bought!!</p>
                <div
                  style={{
                    borderLeft: `2px solid ${currentColor}`,
                    borderRight: `2px solid ${currentColor}`,
                    borderRadius: "10px",
                  }}
                  className="flex lg:w-5/12 lg:m-auto lg:mt-6 mx-5 my-4 p-3 text-lg font-normal flex-col gap-2 mt-5"
                >
                  <p style={{ color: "#7ced65" }}>
                    Buy {MarketViewData[currentBuy.stockIndex].stockName}{" "}
                  </p>
                  <p>current price: {currentBuy["currentPrice"]} &#8377;</p>
                  <p>Target high: {currentBuy["maxPrice"]} &#8377;</p>
                  <p>
                    Possible Gain:{" "}
                    {(currentBuy["possibleGain"] * 100).toFixed(2)}%
                  </p>
                  <button
                    style={{
                      backgroundColor: currentColor,
                      borderRadius: "10px",
                    }}
                    onClick={handlePay}
                    className="w-36 m-auto text-lg text-white mt-2 px-4 py-2 hover:drop-shadow-xl hover:skew-x-2"
                  >
                    {myText}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tips;
