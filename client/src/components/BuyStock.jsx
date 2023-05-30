import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Legend,
  Tooltip,
  ColumnSeries,
  Category,
  DataLabel,
  Zoom,
  Export,
} from "@syncfusion/ej2-react-charts";
import { TiExportOutline } from "react-icons/ti";
import RingLoader from "react-spinners/RingLoader";
import Header from "./Header";
let lineChartData = [];
const BuyStock = ({ activeStockName, activeStockId }) => {
  const { currentColor, currentMode, authFetch } = useAppContext();
  const [msg, setmsg] = useState("");
  const [myShare, setMyShare] = useState({});
  const [showMyShare, setShowMyShare] = useState(false);
  const [isActive, setisActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAction, setisAction] = useState("Buy");
  const [Quantity, setQuantity] = useState(1);
  const [msg1, setMsg1] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [isDisplay, setIsDisplay] = useState(false);
  const [loading1, setloading1] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [buyDate, setbuyDate] = useState("");
  let d1 = new Date();
  const data = require(`../data/stockPrices/${activeStockId}`);
  let prices = data["price"];
  const [ltp, setltp] = useState(0);
  const [TotalchangeInPrice, setTotalchangeInPrice] = useState(0);
  const [PerChangeInPrice, setPerChangeInPrice] = useState(0);

  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
  const handleSubmit = async () => {
    setloading1(true);
    setShowMyShare(false);
    let price = ltp;
    let quantity = Quantity;
    let ownerName = localStorage.getItem("name");
    try {
      await authFetch.post(`/share/${isAction}`, {
        ownerName,
        stockName: activeStockName,
        price,
        quantity,
      });
      setMsg1(`${isAction} Success`);
      setIsSuccess(true);
    } catch (error) {
      setMsg1(error.response.data.msg);
      setIsSuccess(false);
    }
    const data1 = await authFetch("share/getUser");
    setCurrentBalance(data1.data[0].balance);
    const { data } = await authFetch.post("share/getOneShare", {
      stockName: activeStockName,
    });
    if (data?.msg) {
      setmsg(data.msg);
    } else {
      setMyShare({ ...data });
      let temp = new Date(data.buyTime);
      let day = temp.getDate();
      let month = temp.getMonth() + 1;
      let year = temp.getFullYear();
      setbuyDate(`${zeroPad(day, 2)}/${zeroPad(month, 2)}/${year}`);
      setShowMyShare(true);
    }
    setIsDisplay(true);
    setloading1(false);
    setTimeout(() => {
      setIsDisplay(false);
    }, 2000);
  };

  useState(async () => {
    setShowMyShare(false);
    try {
      const data1 = await authFetch("share/getUser");
      setCurrentBalance(data1.data[0].balance);
      const { data } = await authFetch.post("share/getOneShare", {
        stockName: activeStockName,
      });
      if (data?.msg) {
        setmsg(data.msg);
      } else {
        setMyShare({ ...data });
        setShowMyShare(true);
        let temp = new Date(data.buyTime);
        let day = temp.getDate();
        let month = temp.getMonth() + 1;
        let year = temp.getFullYear();
        setbuyDate(`${zeroPad(day, 2)}/${zeroPad(month, 2)}/${year}`);
      }
    } catch (e) {
      setmsg(e);
    }
  }, []);

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
    lineChartData = [];
    let tempHour = 0;
    for (let i = 0; i <= hour; i++) {
      lineChartData.push({
        x: `${("0" + tempHour).slice(-2)}:00`,
        y: prices[(i * 60 * 60) / 3],
      });
      tempHour++;
    }
    setisActive(true);
    setLoading(false);
    return () => {
      clearInterval(timeInt);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const primaryxAxis = {
    valueType: "Category",
    labelPlacement: "OnTicks",
    majorGridLines: {
      color: currentColor,
      width: 0,
    },
    labelStyle: {
      color: currentMode === "Dark" ? "white" : "black",
      fontWeight: "light",
    },
  };
  const primaryyAxis = {
    majorGridLines: {
      color: currentColor,
      width: 0.1,
    },
    labelStyle: {
      color: currentMode === "Dark" ? "white" : "black",
      fontWeight: "light",
    },
  };

  let chartInstance;
  function clickHandler() {
    chartInstance.exportModule.export(
      "PNG",
      `${activeStockName} (${("0" + d1.getDate()).slice(-2)}/${(
        "0" +
        (d1.getMonth() + 1)
      ).slice(-2)})`
    );
  }

  return (
    <div>
      <div>
        {loading ? (
          <div className="w-full p-20">
            <div className="m-auto w-7">
              <RingLoader color={currentColor} className="-ml-5" />
            </div>
          </div>
        ) : (
          <div>
            <Header title={activeStockName} />
            <div className="flex flex-col md:flex-row justify-between xl:px-10 dark:text-white md:text-lg text-sm xl:p-10 p-2 gap-8">
              <div
                style={{
                  borderLeft: `3px solid ${currentColor}`,
                  borderRadius: "10px",
                }}
                className="xl:w-7/12 w-full text-left flex flex-col justify-center xl:p-10 p-2 gap-4 dark:text-white tracking-wide shadow-md dark:shadow-gray-600"
              >
                <div className="flex flex-col gap-2 justify-start items-left text-left xl:text-xl text-lg">
                  <p
                    style={{
                      color: TotalchangeInPrice >= 0 ? "#7ced65" : "#fc4e41",
                    }}
                  >
                    LTP:{" "}
                    {ltp.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    &#8377;
                  </p>
                  <p className="text-sm my-auto">
                    {TotalchangeInPrice >= 0 ? "+" : ""}
                    {TotalchangeInPrice.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    ( {TotalchangeInPrice >= 0 ? "+" : ""}
                    {PerChangeInPrice}% )
                  </p>
                </div>
                <div className="flex flex-row justify-start items-left text-center">
                  <p className="w-2/3 m-auto block dark:text-white text-black text-left">
                    Enter Quantity
                  </p>
                  <input
                    value={Quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    className="w-1/3 xl:h-12 h-10 mx-auto  text-center border-1 border-solid border-black rounded-md text-black"
                    min={"0"}
                  ></input>
                </div>

                <div className="flex flex-row justify-start">
                  <div className="my-auto text-left w-2/3">
                    {isAction === "Buy" ? (
                      <p className="m-auto block">
                        Brokerage :{" "}
                        {Quantity * ltp < 100000
                          ? Math.max(
                              Math.min(
                                (ltp * Quantity * 0.0003).toLocaleString(
                                  "en-IN",
                                  {
                                    maximumFractionDigits: 2,
                                  }
                                ),
                                20
                              ),
                              0
                            )
                          : 20}
                        &#8377;
                      </p>
                    ) : (
                      <p className="m-auto block">DP Charges : 15.93&#8377;</p>
                    )}
                  </div>
                  <div className="flex justify-center w-1/3 font-normal text-center m-auto">
                    <div className="flex gap-4 justify-around dark:text-white text-left m-auto">
                      <div className="flex flex-col h-12 items-center justify-center overflow-hidden">
                        <div className="flex">
                          <label className="inline-flex relative items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={isAction === "Buy" ? true : false}
                              readOnly
                            />
                            <div
                              onClick={() =>
                                setisAction(isAction === "Buy" ? "Sell" : "Buy")
                              }
                              className="flex justify-around m-auto w-[102px] h-10 bg-red-500 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-12 after:transition-all peer-checked:bg-green-600 text-white"
                            >
                              <p className="m-auto">Buy</p>
                              <p className="m-auto">Sell</p>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-900"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-around font-medium">
                  {isAction === "Buy" ? (
                    <p className="text-left w-2/3 m-auto block">
                      Total:{" "}
                      {Math.max(
                        ltp * Quantity * 0.0003 + ltp * Quantity,
                        0
                      ).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                      &#8377;
                    </p>
                  ) : (
                    <p className="text-left w-2/3 m-auto block">
                      Total:{" "}
                      {Math.max(-15.93 + ltp * Quantity, 0).toLocaleString(
                        "en-IN",
                        {
                          maximumFractionDigits: 2,
                        }
                      )}
                      &#8377;
                    </p>
                  )}
                  <button
                    onClick={handleSubmit}
                    style={{ background: currentColor }}
                    className="items-center w-1/3 md:h-12 h-10 text-sm text-md text-center rounded-lg focus:outline-none font-bold text-white tracking-widest hover:border-2"
                  >
                    {isAction}
                  </button>
                </div>
              </div>
              <div
                style={{
                  borderLeft: `3px solid ${currentColor}`,
                  borderRadius: "10px",
                }}
                className="xl:w-5/12 w-full xl:text-right text-left flex flex-col justify-center xl:p-10 p-2 dark:text-white tracking-wide m-auto shadow-md dark:shadow-gray-600"
              >
                <div className="flex flex-col">
                  {loading1 && (
                    <div className="w-full">
                      <div className="m-auto w-2">
                        <RingLoader
                          size={"40px"}
                          color={currentColor}
                          className="-ml-5"
                        />
                      </div>
                    </div>
                  )}
                  {isDisplay && !loading1 && (
                    <div className="my-9">
                      <p
                        style={
                          !isSuccess
                            ? { color: "#ff0d00" }
                            : { color: "#00ff11" }
                        }
                        className="block font-medium tracking-tight"
                      >
                        {msg1}
                      </p>
                    </div>
                  )}
                </div>
                {!loading1 && showMyShare && !isDisplay && (
                  <div className="flex flex-col gap-6">
                    <p className="flex flex-col gap-6">
                      Current Balance:{" "}
                      {currentBalance.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}{" "}
                      &#8377;
                    </p>
                    <p>
                      Quantity:{" "}
                      {myShare.quantity.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p>
                      Avg:{" "}
                      {myShare?.price?.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p>Buy Date: {buyDate}</p>
                  </div>
                )}

                {!loading1 && !showMyShare && !isDisplay && (
                  <div className="flex flex-col gap-6">
                    {!isDisplay && !loading1 && (
                      <p className="flex flex-col gap-6">
                        Current Balance:{" "}
                        {currentBalance.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        &#8377;
                      </p>
                    )}
                    <p>Quantity: 0</p>
                    <p>Avg: NA</p>
                    <p>Last Buy: NA</p>
                  </div>
                )}
              </div>
            </div>
            {isActive && (
              <div
                style={{
                  borderLeft: `3px solid ${currentColor}`,
                  borderRadius: "10px",
                }}
                className="text-center w-full mt-2 flex flex-wrap flex-col xl:flex-row justify-center gap-2 shadow-md dark:shadow-gray-600 p-2 pb-10 xl:p-10"
              >
                <div className="w-11/12 dark:text-white mt-5 block  rounded-xl text-left m-auto">
                  <p className="m-auto md:text-2xl text-lg text-center">
                    {`  ${activeStockName} (${("0" + d1.getDate()).slice(
                      -2
                    )}/${("0" + (d1.getMonth() + 1)).slice(-2)})`}
                    <button
                      className="pl-2"
                      value="print"
                      onClick={clickHandler.bind(this)}
                    >
                      <TiExportOutline
                        fontSize={"22px"}
                        color={`${currentColor}`}
                      />
                    </button>
                  </p>
                  <ChartComponent
                    border={{ width: 0 }}
                    chartArea={{ border: { width: 0 } }}
                    tooltip={{ enable: true }}
                    background="none"
                    className="h-60 lg:h-96"
                    id="charts"
                    primaryXAxis={primaryxAxis}
                    primaryYAxis={primaryyAxis}
                    legendSettings={{ visible: true }}
                    margin={{ top: 30, bottom: 0 }}
                    ref={(chart) => (chartInstance = chart)}
                  >
                    <Inject
                      services={[
                        ColumnSeries,
                        Legend,
                        DataLabel,
                        Tooltip,
                        LineSeries,
                        Category,
                        Zoom,
                        Export,
                      ]}
                    />
                    <SeriesCollectionDirective>
                      <SeriesDirective
                        dataSource={lineChartData}
                        xName="x"
                        yName="y"
                        width={2}
                        marker={{
                          visible: true,
                          height: 5,
                          width: 5,
                          shape: "Diamond",
                          fill: currentColor,
                        }}
                        // fill={currentMode === "Dark" ? "white" : "black"}
                      />
                    </SeriesCollectionDirective>
                  </ChartComponent>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyStock;
