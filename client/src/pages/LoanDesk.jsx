import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Header } from "../components";
import RingLoader from "react-spinners/RingLoader";
import { DeskCard } from "../components";
const LoanDesk = () => {
  const [user, setUser] = useState({});
  const [myBorrowings, setMyBorrowings] = useState([]);
  const [myGivings, setMyGivings] = useState([]);
  const [isBorrow, setIsBorrow] = useState(false);
  const [loading, setLoading] = useState(true);
  const { authFetch, currentColor } = useAppContext();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await authFetch("share/getUser")
        .then((data) => {
          const array = data.data;
          const obj = array[0];
          setUser(obj);
        })
        .catch((e) => {
          console.log(e);
        });
      await authFetch("loan/getMyBorrowings")
        .then((data) => {
          setMyBorrowings(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
      await authFetch("loan/getMyGivings")
        .then((data) => {
          setMyGivings(data.data);
        })
        .catch((e) => {
          console.log(e);
        });
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="m-2 md:m-10 mb-10 mt-24 md:mx-9 mx-2 p-2 md:p-6 dark:bg-secondary-dark-bg bg-white rounded-3xl text-center">
      <div className="text-center w-full">
        <Header title="Loan Desk" />
        {loading && (
          <div className="w-full mb-5">
            <div className="m-auto w-7">
              <RingLoader color={currentColor} className="-ml-5" />
            </div>
          </div>
        )}
        {!loading && (
          <div>
            <div className="flex dark:text-white flex-col justify-around flex-wrap xl:flex-row font-semibold md:text-2xl text-lg">
              <p className="w-64 block m-auto py-0.5">
                Balance: {user.balance} &#8377;
              </p>
              <p className="w-60 block m-auto py-0.5">
                Givings:{" "}
                <span style={{ color: "#00ff11" }}>{user.givings} &#8377;</span>
              </p>
              <p className="w-60 block m-auto py-0.5">
                Debt:{" "}
                <span style={{ color: "#ff0d00" }}>
                  {user.borrowings} &#8377;
                </span>
              </p>
            </div>
            <div>
              <div className="flex justify-center gap-5 mt-10 mb-5">
                <button
                  onClick={() => setIsBorrow(false)}
                  style={{
                    borderLeft: `2px solid ${currentColor}`,
                    background: !isBorrow ? currentColor : "",
                    color: !isBorrow ? "white" : "",
                  }}
                  className="p-2 px-7 lg:text-xl mb-5 rounded-md dark:text-white"
                >
                  My Givings
                </button>
                <button
                  onClick={() => setIsBorrow(true)}
                  style={{
                    borderLeft: `2px solid ${currentColor}`,
                    background: isBorrow ? currentColor : "",
                    color: isBorrow ? "white" : "",
                  }}
                  className="p-2 px-7 lg:text-xl mb-5 rounded-md dark:text-white"
                >
                  My Borrowings
                </button>
              </div>
            </div>
            {isBorrow && (
              <div className="flex flex-wrap justify-center items-center gap-3 mx-1">
                {myBorrowings.length ? (
                  myBorrowings.map((data) => {
                    return (
                      <div style={{ width: "28rem" }} key={data._id}>
                        <DeskCard data={data} isBorrow={true} />
                      </div>
                    );
                  })
                ) : (
                  <h1
                    style={{
                      borderLeft: "2px solid",
                      borderColor: currentColor,
                      borderRadius: "10px",
                    }}
                    className="p-2 dark:text-white text-xl"
                  >
                    You Don't Have Any Loan Due
                  </h1>
                )}
              </div>
            )}
            {!isBorrow && (
              <div className="flex flex-wrap justify-center items-center gap-3 mx-1">
                {myGivings.length ? (
                  myGivings.map((data) => {
                    return (
                      <div style={{ width: "28rem" }} key={data._id}>
                        <DeskCard data={data} isBorrow={false} />
                      </div>
                    );
                  })
                ) : (
                  <h1
                    style={{
                      borderLeft: "2px solid",
                      borderColor: currentColor,
                      borderRadius: "10px",
                    }}
                    className="p-2 dark:text-white text-xl"
                  >
                    No One Owe You A Loan
                  </h1>
                )}
              </div>
            )}
            {/* <div className="flex m-2 flex-col gap-2 mt-5">
              <p className="text-xl font-bold">Tip For Repay Loan Quickly</p>
              <p>Buy: {MarketViewData[currentBuy.stockIndex].stockName} </p>
              <p>current price: {currentBuy["currentPrice"]}</p>
              <p>Target high: {currentBuy["maxPrice"]}</p>
              <p>
                Possible Gain: {(currentBuy["possibleGain"] * 100).toFixed(2)}%
              </p>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanDesk;
