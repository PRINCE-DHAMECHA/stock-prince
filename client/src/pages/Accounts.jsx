import React, { useEffect, useState } from "react";
import { Header } from "../components";
import {
  Category,
  ChartComponent,
  ColumnSeries,
  Export,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
} from "@syncfusion/ej2-react-charts";
import { useAppContext } from "../context/appContext";
import RingLoader from "react-spinners/RingLoader";
import TransactionCard from "../components/TransactionCard";
import { TiExportOutline } from "react-icons/ti";
const Accounts = () => {
  const [myTransactios, setMyTransactios] = useState([]);
  const [myData1, setmyData1] = useState([]);
  const [myData2, setmyData2] = useState([]);
  const { currentColor, authFetch, currentMode } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [noLoanTransaction, setNoLoanTransaction] = useState(true);
  const [noStockTransaction, setNoStockTransaction] = useState(true);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [allDebit, setAllDebit] = useState(0);
  const [allCredit, setAllCredit] = useState(0);
  const [loanDebit, setLoanDebit] = useState(0);
  const [loanCredit, setLoanCredit] = useState(0);
  const [stockDebit, setStockDebit] = useState(0);
  const [stockCredit, setStockCredit] = useState(0);
  const [tipCount, setTipCount] = useState(0);
  const [taxes, setTaxes] = useState(0);
  let userName = localStorage.getItem("name");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authFetch("share/getUser");
        setCurrentBalance(data.data[0].balance);
      } catch (error) {
        console.log(error);
      }
      const { data } = await authFetch.get("account/getTransaction");
      setMyTransactios(data);
      let allCredits = { action: "all", color: "#47D773" };
      let allDebits = { action: "all", color: "#F87171" };
      let loanCredits = { action: "loan", color: "#47D773" };
      let loanDebits = { action: "loan", color: "#F87171" };
      let shareCredits = { action: "share", color: "#47D773" };
      let shareDebits = { action: "share", color: "#F87171" };
      let allCreditAmount = 0,
        allDebitAmount = 0,
        shareCreditsAmount = 0,
        shareDebitsAmount = 0,
        loanCreditsAmount = 0,
        loanDebitsAmount = 0;
      data.reverse();
      let tips = 0,
        tempTaxes = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].isStockTransaction) {
          setNoStockTransaction(false);
        }
        if (!data[i].isStockTransaction) {
          setNoLoanTransaction(false);
        }
        if (data[i].giver === userName) {
          allDebitAmount += Number(data[i].amount);
          if (data[i].isStockTransaction) {
            shareDebitsAmount += Number(data[i].amount);
          } else if (data[i].receiver !== "Tip Account") {
            loanDebitsAmount += Number(data[i].amount);
            if (!data[i].isRepay) {
              loanDebitsAmount += data[i].tax;
              allDebitAmount += data[i].tax;
            }
          }
        } else if (data[i].receiver === userName) {
          allCreditAmount += Number(data[i].amount);
          if (data[i].isStockTransaction) {
            shareCreditsAmount += Number(data[i].amount);
          } else if (data[i].receiver !== "Tip Account") {
            loanCreditsAmount += Number(data[i].amount);
            if (!data[i].isRepay) {
              loanCreditsAmount -= data[i].tax;
              allCreditAmount -= data[i].tax;
            }
          }
        }
        if (data[i].receiver === "Tip Account") {
          tips++;
        }
        if (data[i].receiver !== "Tip Account" && !data[i].isRepay) {
          tempTaxes += Number(data[i].tax);
        }
      }
      setTaxes(tempTaxes.toFixed(2));
      allCredits.amount = allCreditAmount;
      allDebits.amount = allDebitAmount;
      loanCredits.amount = loanCreditsAmount;
      loanDebits.amount = loanDebitsAmount;
      shareCredits.amount = shareCreditsAmount;
      shareDebits.amount = shareDebitsAmount;
      setAllCredit(allCreditAmount.toFixed(2));
      setAllDebit(allDebitAmount.toFixed(2));
      setLoanCredit(loanCreditsAmount.toFixed(2));
      setLoanDebit(loanDebitsAmount.toFixed(2));
      setStockCredit(shareCreditsAmount.toFixed(2));
      setStockDebit(shareDebitsAmount.toFixed(2));
      setTipCount(tips);
      setmyData1([allCredits, loanCredits, shareCredits]);
      setmyData2([loanDebits, allDebits, shareDebits]);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const primaryXAxis = {
    valueType: "Category",
    majorGridLines: {
      color: currentColor,
      width: 0,
    },
    labelStyle: {
      color: currentMode === "Dark" ? "white" : "black",
      fontWeight: "light",
    },
  };
  const primaryYAxis = {
    valueType: "Double",
    majorGridLines: {
      color: currentColor,
      width: 0.5,
    },
    labelStyle: {
      color: currentMode === "Dark" ? "white" : "black",
      fontWeight: "light",
    },
  };
  let chartInstance;
  function clickHandler(e) {
    chartInstance.exportModule.export("PNG", "Transaction Summary");
  }
  return (
    <div className="flex justify-between flex-wrap text-center">
      <Header title="Accounts" />
      {loading ? (
        <div className="w-full p-20">
          <div className="m-auto w-7">
            <RingLoader color={currentColor} className="-ml-5" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full justify-center text-center gap-14">
          <div className="flex flex-col w-full justify-center">
            <div>
              <p
                style={{
                  borderLeft: `2px solid ${currentColor}`,
                  borderRadius: "10px",
                }}
                className="md:text-xl text-lg mb-2 font-medium dark:text-white m-auto inline p-3 shadow-lg dark:shadow-gray-600"
              >
                Current Balance:{" "}
                {Number(currentBalance).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}{" "}
                &#8377;
              </p>
            </div>
          </div>
          <div
            style={{
              borderBottom: `2px solid ${currentColor}`,
              borderTop: `2px solid ${currentColor}`,
              borderRadius: "10px",
            }}
            className="flex flex-col w-full justify-center shadow-lg dark:shadow-gray-600 p-4 py-8"
          >
            <div className="flex justify-center flex-col">
              <p
                style={{ borderBottom: `2px solid ${currentColor}` }}
                className="inline text-xl md:text-2xl p-2 mb-5 font-medium dark:text-white m-auto"
              >
                Stock Transactions
              </p>
              <div className="flex lg:flex-row flex-col gap-3 justify-around m-3 my-6 dark:text-white text-lg md:text-xl font-medium">
                <p
                  style={{
                    borderBottom: `2px solid #7ced65`,
                    borderLeft: `2px solid #7ced65`,
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                  className="shadow-md"
                >
                  Credits:{" "}
                  {Number(stockCredit).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  &#8377;
                </p>
                <p
                  style={{
                    borderBottom: `2px solid #fc4e41`,
                    borderLeft: `2px solid #fc4e41`,
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                  className="shadow-md"
                >
                  Debits:{" "}
                  {Number(stockDebit).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  &#8377;
                </p>
              </div>
            </div>
            <div className="">
              {noStockTransaction ? (
                <div>
                  <p className="text-xl mt-6 dark:text-white m-auto">
                    You Don't Have Any Stock Transaction
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap justify-around mt-5 max-h-96 myScroll">
                  {myTransactios
                    .filter((item) => item.isStockTransaction)
                    .map((item) => {
                      return (
                        <TransactionCard
                          key={item._id}
                          item={item}
                          userName={userName}
                          isStockTransaction={true}
                        />
                      );
                    })}
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              borderBottom: `2px solid ${currentColor}`,
              borderTop: `2px solid ${currentColor}`,
              borderRadius: "10px",
            }}
            className="flex flex-col w-full justify-center shadow-lg dark:shadow-gray-600 p-4 py-8"
          >
            <div className="flex justify-center flex-col">
              <p
                style={{ borderBottom: `2px solid ${currentColor}` }}
                className="inline p-2 text-xl md:text-2xl mb-5 font-medium dark:text-white m-auto"
              >
                Loan Transactions
              </p>
              <div className="flex lg:flex-row flex-col gap-3 justify-around m-3 my-6 dark:text-white text-lg md:text-xl font-medium">
                <p
                  style={{
                    borderBottom: `2px solid #7ced65`,
                    borderLeft: `2px solid #7ced65`,
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                  className="shadow-md"
                >
                  Credits:{" "}
                  {Number(loanCredit).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  &#8377;
                </p>
                <p
                  style={{
                    borderBottom: `2px solid #fc4e41`,
                    borderLeft: `2px solid #fc4e41`,
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                  className="shadow-md"
                >
                  Debits:{" "}
                  {Number(loanDebit).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  &#8377;
                </p>
              </div>
            </div>
            {noLoanTransaction ? (
              <div>
                <p className="text-xl mt-6 dark:text-white m-auto">
                  You Don't Have Any Loan Transaction
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap justify-around mt-10 max-h-96 myScroll">
                {myTransactios

                  .filter(
                    (item) =>
                      !item.isStockTransaction &&
                      item.receiver !== "Tip Account"
                  )
                  .map((item) => {
                    return (
                      <TransactionCard
                        key={item._id}
                        item={item}
                        userName={userName}
                        isStockTransaction={false}
                      />
                    );
                  })}
              </div>
            )}
          </div>
          <div
            style={{
              borderBottom: `2px solid ${currentColor}`,
              borderTop: `2px solid ${currentColor}`,
              borderRadius: "10px",
            }}
            className="flex flex-col w-full justify-center shadow-lg dark:shadow-gray-600 p-4 py-8"
          >
            <div className="flex justify-center flex-col">
              <p
                style={{ borderBottom: `2px solid ${currentColor}` }}
                className="inline p-2 text-xl md:text-2xl mb-5 font-medium dark:text-white m-auto"
              >
                Tips Transactions
              </p>
              <div className="flex lg:flex-row flex-col gap-3 justify-around m-3 my-6 dark:text-white text-lg md:text-xl font-medium">
                <p
                  style={{
                    borderBottom: `2px solid #fc4e41`,
                    borderLeft: `2px solid #fc4e41`,
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                  className="shadow-md"
                >
                  Total:{" "}
                  {Number(100 * tipCount).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  &#8377;
                </p>
              </div>
            </div>
            {tipCount === 0 ? (
              <div>
                <p className="text-xl mt-3 dark:text-white m-auto">
                  WooHoo You Never Buy A Tip!!
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap justify-around mt-10 max-h-96 myScroll">
                {myTransactios
                  .filter((item) => item.receiver === "Tip Account")
                  .map((item) => {
                    return (
                      <TransactionCard
                        key={item._id}
                        item={item}
                        userName={userName}
                        isStockTransaction={false}
                      />
                    );
                  })}
              </div>
            )}
          </div>
          <div
            style={{
              borderBottom: `2px solid ${currentColor}`,
              borderTop: `2px solid ${currentColor}`,
              borderRadius: "10px",
            }}
            className="flex flex-col w-full justify-center shadow-lg dark:shadow-gray-600 p-4 py-8"
          >
            <div className="flex justify-center flex-col">
              <p
                style={{ borderBottom: `2px solid ${currentColor}` }}
                className="inline p-2 text-xl md:text-2xl mb-5 font-medium dark:text-white m-auto"
              >
                Tax Paid
              </p>
              <div className="flex lg:flex-row flex-col gap-3 justify-around m-3 my-6 dark:text-white text-lg md:text-xl font-medium">
                {taxes === 0 ? (
                  <p className="text-xl mt-3 dark:text-white m-auto">
                    You Didn't Pay Any Taxes !!
                  </p>
                ) : (
                  <p
                    style={{
                      borderBottom: `2px solid #fc4e41`,
                      borderLeft: `2px solid #fc4e41`,
                      padding: "8px",
                      borderRadius: "10px",
                    }}
                    className="shadow-md"
                  >
                    Total:{" "}
                    {Number(taxes).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    &#8377;
                  </p>
                )}
              </div>
            </div>
          </div>
          <div
            className="w-full shadow-lg dark:shadow-gray-600 p-4 py-12"
            style={{
              borderBottom: `2px solid ${currentColor}`,
              borderTop: `2px solid ${currentColor}`,
              borderRadius: "10px",
            }}
          >
            <div className="text-center w-full">
              <p
                style={{ borderBottom: `2px solid ${currentColor}` }}
                className="inline p-2 text-xl md:text-2xl mb-5 font-medium dark:text-white m-auto"
              >
                Summary
                <button
                  className="pl-2"
                  value="print"
                  onClick={clickHandler.bind(this)}
                >
                  <TiExportOutline
                    fontSize={"20px"}
                    color={`${currentColor}`}
                  />
                </button>
              </p>
              <div className="flex lg:flex-row flex-col gap-3 justify-around m-3  mt-10 dark:text-white text-lg md:text-xl font-medium">
                <p
                  style={{
                    borderBottom: `2px solid #7ced65`,
                    borderLeft: `2px solid #7ced65`,
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                  className="shadow-md"
                >
                  Credits:{" "}
                  {Number(allCredit).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  &#8377;
                </p>
                <p
                  style={{
                    borderBottom: `2px solid #fc4e41`,
                    borderLeft: `2px solid #fc4e41`,
                    padding: "8px",
                    borderRadius: "10px",
                  }}
                  className="shadow-md"
                >
                  Debits:{" "}
                  {Number(allDebit).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  &#8377;
                </p>
              </div>
            </div>
            {(allCredit > 0 || allDebit > 0) && (
              <div className="dark:text-white mt-10 block w-11/12 rounded-xl text-center m-auto">
                <ChartComponent
                  height="400px"
                  background="none"
                  chartArea={{ border: { width: 0 } }}
                  id="charts"
                  primaryXAxis={primaryXAxis}
                  primaryYAxis={primaryYAxis}
                  ref={(chart) => (chartInstance = chart)}
                  margin={"auto"}
                >
                  <Inject
                    services={[ColumnSeries, LineSeries, Category, Export]}
                  />
                  <SeriesCollectionDirective>
                    <SeriesDirective
                      dataSource={myData1}
                      xName="action"
                      type="Column"
                      yName="amount"
                      pointColorMapping="color"
                    />
                    <SeriesDirective
                      dataSource={myData2}
                      xName="action"
                      type="Column"
                      yName="amount"
                      pointColorMapping="color"
                    />
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
