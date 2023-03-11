import React, { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";
import { Header } from "../components";
import { useAppContext } from "../context/appContext";

const BuyCar = () => {
  const { currentColor } = useAppContext();
  const [price, setPrice] = useState(700000);
  const [interest, setInterest] = useState(8.5);
  const [emi, setEmi] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    let tempInt = interest / 12;
    tempInt = tempInt / 100;
    let payments = 48;
    let x = Math.pow(1 + tempInt, payments);
    let monthly = (((price * 4) / 5) * x * tempInt) / (x - 1);
    setEmi(monthly);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // P x R x (1+R)^N / [(1+R)^N-1]
  const handleChange = () => {
    setLoading(true);
    let tempInt = interest / 12;
    tempInt = tempInt / 100;
    let payments = 48;
    let x = Math.pow(1 + tempInt, payments);
    let monthly = (((price * 4) / 5) * x * tempInt) / (x - 1);
    setEmi(monthly);
    setLoading(false);
  };
  return (
    <div className="m-2 md:m-10 mb-10 mt-24 md:mx-9 mx-2 p-2 md:p-6 dark:bg-secondary-dark-bg bg-white rounded-3xl text-center">
      <div className="text-center w-full">
        <Header title={"Buy A Car ( 20-10-4 : Rule )"} />
        {loading ? (
          <div className="w-full p-20">
            <div className="m-auto w-7">
              <RingLoader color={currentColor} className="-ml-5" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row justify-center gap-5">
            <div
              style={{
                borderLeft: `2px solid ${currentColor}`,
                borderRadius: "10px",
              }}
              className="flex flex-col justify-center lg:w-1/2 text-left text-base lg:text-lg dark:text-white gap-6 p-6"
            >
              <div className="flex flex-row">
                <p className="lg:w-1/2 w-full m-auto dark:text-white">
                  Price Of Car:{" "}
                </p>
                <div className="w-full">
                  <input
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    type="number"
                    className="lg:w-2/3 m-auto xl:h-9 h-7 mx-auto  text-center border-1 border-solid border-black rounded-md text-black"
                    min={"0"}
                  ></input>
                </div>
              </div>
              <div className="flex flex-row">
                <p className="lg:w-1/2 w-full m-auto">Interest: </p>
                <div className="w-full">
                  <input
                    value={interest}
                    onChange={(e) => {
                      setInterest(e.target.value);
                    }}
                    type="number"
                    className="lg:w-2/3 m-auto xl:h-9 h-7 mx-auto  text-center border-1 border-solid border-black rounded-md text-black"
                    min={"0"}
                  ></input>
                </div>
              </div>
              <p>
                You Need to pay <b>20%</b> down payment
              </p>
              <p>
                Monthly EMI should be less <b>10%</b> of your salary
              </p>
              <p>
                EMI tenure should be maximum <b>4</b> years
              </p>
              <button
                onClick={handleChange}
                style={{
                  backgroundColor: currentColor,
                  borderRadius: "10px",
                }}
                className={`text-md text-white p-3 hover:drop-shadow-xl `}
              >
                Calculate
              </button>
            </div>
            <div
              style={{
                borderLeft: `2px solid ${currentColor}`,
                borderRadius: "10px",
              }}
              className="flex flex-col justify-center text-center lg:w-1/2 lg:text-left text-base lg:text-lg dark:text-white gap-6 p-6 "
            >
              <p>
                Your salary need to be minimum <b>{(emi * 10).toFixed(2)}</b>{" "}
                &#8377;
              </p>
              <p>Down Payment: {(Number(price) / 5).toFixed(2)}</p>
              <p>EMI will be: {Number(emi).toFixed(2)}&#8377;</p>
              <p>Loan tenure: {4} Years</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyCar;
