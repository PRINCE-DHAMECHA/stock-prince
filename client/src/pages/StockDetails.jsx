import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext.js";
import { useParams } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { TiExportOutline } from "react-icons/ti";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Legend,
  Tooltip,
  MultiColoredLineSeries,
  Category,
  DataLabel,
  Zoom,
  Export,
} from "@syncfusion/ej2-react-charts";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const StockDetails = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState({});
  const [dayPrice, setDayPrice] = useState({});
  const [weekPrice, setWeekPrice] = useState({});
  const [monthPrice, setMonthPrice] = useState({});
  const [sixMonthPrice, setSixMonthPrice] = useState({});
  const [lineChartDay, setLineChartDay] = useState([]);
  const [lineChartWeek, setLineChartWeek] = useState([]);
  const [lineChartMonth, setLineChartMonth] = useState([]);
  const [lineChartSixMonth, setLineChartSixMonth] = useState([]);
  const [lineChartCurrent, setLineChartCurrent] = useState([]);
  const [currentButton, setCurrentButton] = useState(0);
  const [myIntervalState, setmyIntervalState] = useState(0);
  const [watch, setWatch] = useState({});
  const [isWatch, setIsWatch] = useState(false);
  const [isWatchLoading, setIsWatchLoading] = useState(false);
  const { currentColor, authFetch, currentMode, user } = useAppContext();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        let data = await authFetch.post("stock/assetProfile", {
          symbol: params.sym,
          isIndian: params.exc === "NSE" ? true : false,
        });
        setAbout(data.data);
        data = await authFetch.post("stock/priceChart", {
          symbol: params.sym,
          isIndian: params.exc === "NSE" ? true : false,
        });
        setDayPrice(data.data.dayPrice);
        setWeekPrice(data.data.weekPrice);
        setMonthPrice(data.data.monthPrice);
        setSixMonthPrice(data.data.sixMonthPrice);
        setLoading(false);
        if (user !== null) {
          data = await authFetch.get(`stockWatch/getOne/${params.sym}`);
          if (data.data.success) {
            setIsWatch(true);
            setWatch(data.data.watch);
          } else {
            setIsWatch(false);
          }
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchDetails();
    let myInterval = setInterval(() => {
      setCurrentButton((prev) => (prev + 1) % 4);
    }, 8000);
    setmyIntervalState(myInterval);
    return () => {
      clearInterval(myInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (currentButton === 1) {
      setLineChartCurrent(lineChartWeek);
    } else if (currentButton === 2) {
      setLineChartCurrent(lineChartMonth);
    } else if (currentButton === 3) {
      setLineChartCurrent(lineChartSixMonth);
    } else if (currentButton === 0) {
      setLineChartCurrent(lineChartDay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentButton]);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    setLoading(true);
    let arr = [];
    for (let i = 0; i < dayPrice?.length; i++) {
      let date = new Date(dayPrice[i].date);
      let color = "#00b700";
      if (i < dayPrice?.length - 1) {
        if (Number(dayPrice[i + 1].price) < Number(dayPrice[i].price)) {
          color = "#ff4040";
        }
      }
      arr.push({
        x: `${date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })}`,
        y: dayPrice[i].price,
        color: color,
      });
    }
    setLineChartDay(arr);
    setLineChartCurrent(arr);
    arr = [];
    for (let i = 0; i < weekPrice?.length; i++) {
      let date = new Date(weekPrice[i].date);
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      let color = "#00b700";
      if (i < weekPrice?.length - 1) {
        if (Number(weekPrice[i + 1].price) < Number(weekPrice[i].price)) {
          color = "#ff4040";
        }
      }
      const formattedToday = monthNames[date.getMonth()] + " " + dd;
      arr.push({
        x: formattedToday,
        y: weekPrice[i].price,
        color,
      });
    }
    setLineChartWeek(arr);
    arr = [];
    for (let i = 0; i < monthPrice?.length; i++) {
      let date = new Date(monthPrice[i].date);
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      let color = "#00b700";
      if (i < monthPrice?.length - 1) {
        if (Number(monthPrice[i + 1].price) < Number(monthPrice[i].price)) {
          color = "#ff4040";
        }
      }
      const formattedToday = monthNames[date.getMonth()] + " " + dd;
      arr.push({
        x: formattedToday,
        y: monthPrice[i].price,
        color,
      });
    }
    setLineChartMonth(arr);
    arr = [];
    for (let i = 0; i < sixMonthPrice?.length; i++) {
      let date = new Date(sixMonthPrice[i].date);
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;
      let color = "#00b700";
      if (i < sixMonthPrice?.length - 1) {
        if (
          Number(sixMonthPrice[i + 1].price) < Number(sixMonthPrice[i].price)
        ) {
          color = "#ff4040";
        }
      }
      const formattedToday = monthNames[date.getMonth()] + " " + dd;
      arr.push({
        x: formattedToday,
        y: sixMonthPrice[i].price,
        color: color,
      });
    }
    setLineChartSixMonth(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayPrice, weekPrice, monthPrice, sixMonthPrice]);
  const primaryxAxis = {
    valueType: "Category",
    labelFormat: "n2",
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
    valueType: "Double",
    majorGridLines: {
      width: 0.1,
    },
    labelStyle: {
      color: currentMode === "Dark" ? "white" : "black",
      fontWeight: "light",
    },
    rangePadding: "Additional",
  };
  const handleWatch = async () => {
    setIsWatchLoading(true);
    try {
      if (!isWatch) {
        const { data } = await authFetch.post("stockWatch/add", {
          stockName: params.name,
          stockSymbol: params.sym,
          exc: params.exc,
        });
        if (data.success) {
          let data = await authFetch.get(`stockWatch/getOne/${params.sym}`);
          if (data.data.success) {
            setIsWatch(true);
            setWatch(data.data.watch);
          } else {
            setIsWatch(false);
            setWatch({});
          }
        }
      } else {
        const { data } = await authFetch.delete(
          `stockWatch/delete/${watch._id}`
        );
        if (data.success) {
          setIsWatch(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
    setIsWatchLoading(false);
  };
  let chartInstance;
  function clickHandler(e) {
    chartInstance.exportModule.export("PNG", `${params.name}`);
  }
  return (
    <div>
      <div className="text-center w-full relative">
        <div className="mb-10 mt-5 w-full text-center">
          <p
            style={{ borderColor: currentColor }}
            className="lg:text-3xl text-2xl m-auto pb-1 font-bold tracking-normal dark:text-white text-black border-solid border-b-2 lg:w-1/2 w-5/6"
          >
            {params.name}
          </p>
        </div>
        {!loading && (
          <div className="absolute -top-6 right-0 lg:m-2 m-2">
            {user && (
              <div>
                {isWatchLoading ? (
                  <RingLoader className="-ml-5" color={"red"} size={"30px"} />
                ) : (
                  <button onClick={handleWatch}>
                    {isWatch && (
                      <AiFillHeart
                        size={"30px"}
                        color="red"
                        className="m-auto"
                      />
                    )}
                    {!isWatch && (
                      <AiOutlineHeart
                        size={"30px"}
                        color="red"
                        className="m-auto"
                      />
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        {loading ? (
          <div className="w-full p-20">
            <div className="m-auto w-7">
              <RingLoader color={currentColor} className="-ml-5" />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap">
            <div
              style={{ borderColor: currentColor, borderRadius: "10px" }}
              className="flex flex-col gap-2 dark:text-white m-auto md:text-left p-4 font-semibold text-base md:text-xl border-l-2 shadow-md dark:shadow-gray-600"
            >
              <p>
                Current Price: {about.currentPrice ? about?.currentPrice : "NA"}{" "}
                {params.exc === "NSE" ? <>&#8377;</> : <>&#36;</>}
              </p>
              <p>
                Target High: {about.targetHigh ? about.targetHigh : "NA"}{" "}
                {params.exc === "NSE" ? <>&#8377;</> : <>&#36;</>}
              </p>
              <p>
                Target Low: {about.targetLow ? about.targetLow : "NA"}{" "}
                {params.exc === "NSE" ? <>&#8377;</> : <>&#36;</>}
              </p>
              <p>
                Recommendation:{" "}
                {about.recommendation !== "none" ? about.recommendation : "NA"}
              </p>
            </div>
            <div className="xl:w-8/12 w-10/12 m-auto">
              <div className="flex flex-col md:flex-row justify-evenly dark:text-white mt-8 text-base md:text-xl gap-4">
                <h1 className="text-2xl">Price Chart</h1>
                <div className="flex gap-3 lg:gap-5 md:mt-0 mt-4 justify-center">
                  <button
                    style={{
                      borderLeft: `2px solid ${currentColor}`,
                      background: currentButton === 0 ? currentColor : "",
                      color: currentButton === 0 ? "white" : "",
                    }}
                    className="px-4 py-1 rounded-md"
                    onClick={() => {
                      setLoading(true);
                      setLineChartCurrent(lineChartDay);
                      setCurrentButton(0);
                      clearInterval(myIntervalState);
                      setLoading(false);
                    }}
                  >
                    1d
                  </button>
                  <button
                    style={{
                      borderLeft: `2px solid ${currentColor}`,
                      background: currentButton === 1 ? currentColor : "",
                      color: currentButton === 1 ? "white" : "",
                    }}
                    className="px-4 py-1 rounded-md"
                    onClick={() => {
                      setLoading(true);
                      setLineChartCurrent(lineChartWeek);
                      setCurrentButton(1);
                      clearInterval(myIntervalState);
                      setLoading(false);
                    }}
                  >
                    1wk
                  </button>
                  <button
                    style={{
                      borderLeft: `2px solid ${currentColor}`,
                      background: currentButton === 2 ? currentColor : "",
                      color: currentButton === 2 ? "white" : "",
                    }}
                    className="px-4 py-1 rounded-md"
                    onClick={() => {
                      setLoading(true);
                      setLineChartCurrent(lineChartMonth);
                      setCurrentButton(2);
                      clearInterval(myIntervalState);
                      setLoading(false);
                    }}
                  >
                    1mo
                  </button>
                  <button
                    style={{
                      borderLeft: `2px solid ${currentColor}`,
                      background: currentButton === 3 ? currentColor : "",
                      color: currentButton === 3 ? "white" : "",
                    }}
                    className="px-4 py-1 rounded-md"
                    onClick={() => {
                      setLoading(true);
                      setLineChartCurrent(lineChartSixMonth);
                      setCurrentButton(3);
                      clearInterval(myIntervalState);
                      setLoading(false);
                    }}
                  >
                    6mo
                  </button>

                  <button value="print" onClick={clickHandler.bind(this)}>
                    <TiExportOutline color={`${currentColor}`} />
                  </button>
                </div>
              </div>
              <div className="w-full m-auto mt-5 dark:text-white block rounded-xl ">
                <ChartComponent
                  id="charts"
                  className="h-60 lg:h-96"
                  primaryXAxis={primaryxAxis}
                  primaryYAxis={primaryyAxis}
                  chartArea={{ border: { width: 0 } }}
                  tooltip={{ enable: true }}
                  background="none"
                  legendSettings={{ background: "white" }}
                  ref={(chart) => (chartInstance = chart)}
                >
                  <Inject
                    services={[
                      Legend,
                      DataLabel,
                      Tooltip,
                      LineSeries,
                      Category,
                      Zoom,
                      MultiColoredLineSeries,
                      Export,
                    ]}
                  />
                  <SeriesCollectionDirective>
                    <SeriesDirective
                      dataSource={lineChartCurrent}
                      xName="x"
                      yName="y"
                      width="3"
                      marker={{ visible: true, width: 5, height: 5 }}
                      type="MultiColoredLine"
                      pointColorMapping="color"
                    />
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockDetails;
