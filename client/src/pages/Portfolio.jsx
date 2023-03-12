import React, { useEffect, useState } from "react";
import { Header, PortfolioCard } from "../components";
import { useAppContext } from "../context/appContext";
import RingLoader from "react-spinners/RingLoader";
import { MarketViewData } from "../data/dummy";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { HiOutlineRefresh } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import {
  AccumulationChartComponent,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  AccumulationTooltip,
  Export,
  Inject,
} from "@syncfusion/ej2-react-charts";

const Portfolio = () => {
  const { authFetch, currentColor, currentMode } = useAppContext();
  const [invested, setInvested] = useState(0);
  const [current, setCurrent] = useState(0);
  const [share, setShare] = useState([]);
  const [Portfolioshare, setPortfolioshare] = useState([]);
  const [user, setuser] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataChart, setDataChart] = useState([{}]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const share = await authFetch("share/getShare");
        setShare(share["data"]);
        const { data } = await authFetch("share/getUser");
        setuser(data[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let inv = 0;
    let cur = 0;
    setPortfolioshare([]);
    let arr = [];
    const d = new Date();
    let val = 0;
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    val += hour * 60 * 60;
    val += min * 60;
    val += sec;
    let chartData = [];
    for (let i = 0; i < share.length; i++) {
      let check = share[i];
      MarketViewData.filter(
        (item) => item.stockName === check["stockName"]
      ).map((item) => {
        inv += (check["quantity"] + 0) * (check["price"] + 0);
        const data = require(`../data/stockPrices/${item["key"]}`);
        let prices = data["price"];
        cur += check["quantity"] * prices[Math.floor(val / 3)];
        let obj = {
          quantity: check["quantity"],
          name: check["stockName"],
          buyPrice: check["price"],
          index: item["key"],
          buyTime: check["buyTime"],
        };
        arr.push(obj);
        let obj2 = {
          x: item["sector"],
          y: Number(Number(check["price"]) * Number(check["quantity"])).toFixed(
            2
          ),
        };
        chartData.push(obj2);
        return 0;
      });
    }
    for (let i = 0; i < chartData.length; i++) {
      chartData[i].text = ((Number(chartData[i].y) / inv) * 100).toFixed(2);
      chartData[i].text += "%";
    }
    console.log(chartData);
    setDataChart(chartData);
    setPortfolioshare(arr);
    setInvested(inv.toFixed(2));
    setCurrent(cur.toFixed(2));
  }, [share, user]);
  const reloadFunc = () => {
    let cur = 0;
    const d = new Date();
    let val = 0;
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    val += hour * 60 * 60;
    val += min * 60;
    val += sec;
    for (let i = 0; i < share.length; i++) {
      let check = share[i];
      MarketViewData.filter(
        (item) => item.stockName === check["stockName"]
      ).map((item) => {
        const data = require(`../data/stockPrices/${item["key"]}`);
        let prices = data["price"];
        cur += check["quantity"] * prices[Math.floor(val / 3)];
        return 0;
      });
    }
    setCurrent(cur.toFixed(2));
  };
  let chartInstance;
  function clickHandler() {
    chartInstance.exportModule.export("PNG", "Portfolio Analysis");
  }
  const palettes = [
    "#C94D6D",
    "#7031AC",
    "#E4BF58",
    "#4174C9",
    "#3C9D4E",
    "#6FAAB0",
  ];
  return (
    <div className="m-2 md:m-10 mb-10 mt-24 md:mx-9 mx-2 p-2 md:p-6 dark:bg-secondary-dark-bg bg-white rounded-3xl text-center">
      <div className="text-center w-full">
        <Header title="Portfolio" />
        {loading ? (
          <div className="w-full p-20">
            <div className="m-auto w-7">
              <RingLoader color={currentColor} className="-ml-5" />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col mb-20">
              <div className="w-full flex xl:flex-row flex-col justify-around px-0 text-center dark:text-white font-semibold md:text-2xl text-lg  mb-10 text-black">
                <h1 className="">Wallet : {user["balance"]} &#8377;</h1>
                <h1>Invested : {invested} &#8377;</h1>
                <h1 className="flex justify-center text-center">
                  <button onClick={reloadFunc} className="px-1">
                    <HiOutlineRefresh color={currentColor} />
                  </button>
                  Current :
                  <p
                    className="ml-1 flex justify-center text-center"
                    style={
                      invested - current <= 0
                        ? { color: "#00b700" }
                        : { color: "#fc4e41" }
                    }
                  >
                    {" "}
                    {current}{" "}
                    {invested > 0 ? (
                      <span className="text-base pt-1">
                        ({((current - invested) / invested).toFixed(3)}%)
                      </span>
                    ) : (
                      ""
                    )}
                    {invested - current <= 0 ? (
                      <AiOutlineArrowUp
                        className="inline -mt-1"
                        style={{ color: "#00b700", fontSize: "20px" }}
                      />
                    ) : (
                      <AiOutlineArrowDown
                        style={{
                          color: "#ff0d00",
                          marginTop: "12px",
                          fontSize: "20px",
                        }}
                      />
                    )}
                  </p>
                </h1>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-10 mx-1">
                {Portfolioshare.map((item) => {
                  return (
                    <div style={{ width: "32rem" }} key={item.index}>
                      <PortfolioCard
                        stockname={item.name}
                        k={item.index}
                        quantity={item.quantity}
                        buyPrice={item.buyPrice}
                        buyTime={item.buyTime}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <Header title="Analysis" />
            {Portfolioshare.length !== 0 ? (
              <div className="flex flex-col justify-center text-center">
                <div className="flex flex-col justify-center text-center">
                  <AccumulationChartComponent
                    id="charts"
                    legendSettings={{
                      visible: true,
                      toggleVisibility: false,
                      textStyle: {
                        color: currentMode === "Dark" ? "white" : "black",
                      },
                      alignment: "Center",
                      position: "Bottom",
                    }}
                    tooltip={{ enable: true }}
                    ref={(chart) => (chartInstance = chart)}
                    background="none"
                  >
                    <Inject
                      services={[
                        AccumulationLegend,
                        AccumulationTooltip,
                        AccumulationDataLabel,
                        Export,
                      ]}
                    />
                    <AccumulationSeriesCollectionDirective>
                      <AccumulationSeriesDirective
                        dataSource={dataChart}
                        xName="x"
                        yName="y"
                        radius="90%"
                        palettes={palettes}
                        dataLabel={{
                          position: "Inside",
                          visible: true,
                          name: "text",
                        }}
                      />
                    </AccumulationSeriesCollectionDirective>
                  </AccumulationChartComponent>
                  <button
                    value="print"
                    style={{
                      backgroundColor: currentColor,
                      borderRadius: "10px",
                    }}
                    onClick={clickHandler.bind(this)}
                    className="w-28 m-auto text-xl text-white px-6 py-2 hover:drop-shadow-xl hover:skew-x-2"
                  >
                    Export
                  </button>
                </div>
              </div>
            ) : (
              <p className="dark:text-white text-lg font-medium">
                No Transactions To Summarize
              </p>
            )}

            <div className="m-10 mt-20 flex justify-center gap-8">
              <NavLink
                style={{
                  backgroundColor: currentColor,
                  borderRadius: "10px",
                }}
                to="/marketview"
                className={`text-xl text-white px-6 py-2 hover:drop-shadow-xl`}
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
        )}
      </div>
    </div>
  );
};

export default Portfolio;
