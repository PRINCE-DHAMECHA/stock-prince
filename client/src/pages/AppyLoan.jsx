import React, { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";
import { Header } from "../components";
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

const ApplyLoan = ({ isRepay }) => {
  const { currentColor, authFetch, user, currentMode } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [lineChartData, setlineChartData] = useState([]);
  let lender = localStorage.getItem("lender");
  let principal = localStorage.getItem("principal");
  let interest = localStorage.getItem("interest");
  let id = localStorage.getItem("id");
  let outstanding = localStorage.getItem("outstanding");
  let date = localStorage.getItem("date");
  let tempDate = new Date();
  useEffect(() => {
    let tempOut = Number(outstanding);
    let temp = [];
    setLoading(true);
    for (let i = 0; i < 200; i += 12) {
      tempOut = Number(outstanding) * Math.pow(1 + interest / 100, i / 12);
      tempDate.setMonth(tempDate.getMonth() + (i > 0 ? 12 : 0));
      temp.push({
        x: `${zeroPad(tempDate.getMonth(tempDate.getMonth() + i) + 1, 2)}/${
          tempDate.getFullYear() % 100
        }`,
        y: Number(tempOut),
      });
      tempDate.setDate(tempDate.getDate() + 31);
    }
    setlineChartData(temp);
    setLoading(false);
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
      width: 0.5,
    },
    labelStyle: {
      color: currentMode === "Dark" ? "white" : "black",
      fontWeight: "light",
    },
  };
  const date1 = new Date(date);
  let day = date1.getDate();
  let month = date1.getMonth() + 1;
  let year = date1.getFullYear();
  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await authFetch.post("loan/grantLoan", {
        _id: id,
      });
      setMessage("Congrats!! You Successfully Got A Loan");
      setIsSuccess(true);
      setLoading(false);
    } catch (error) {
      setMessage(error.response.data.msg);
      setIsSuccess(false);
      setLoading(false);
    }
  };
  const handleRepay = async () => {
    setLoading(true);
    try {
      await authFetch.post("loan/repayLoan", {
        _id: id,
        outstanding,
        principal,
        interest,
      });
      setMessage("Congrats!! You Successfully Repay Your Loan");
      setIsSuccess(true);
      setLoading(false);
    } catch (error) {
      setMessage(error.response.data.msg);
      setIsSuccess(false);
      setLoading(false);
    }
  };
  let chartInstance;
  function clickHandler() {
    chartInstance.exportModule.export("PNG", `Future Outstandings`);
  }
  return (
    <div className="m-2 my-16 md:mt-2 mx-2 md:mx-9 p-2 pb-10 md:p-10 dark:bg-secondary-dark-bg bg-white rounded-3xl">
      <Header
        category="App"
        title={isRepay ? "Repay Loan" : "Apply For A Loan"}
      />
      {loading ? (
        <div className="w-full mb-5">
          <div className="m-auto w-7">
            <RingLoader color={currentColor} className="-ml-5" />
          </div>
        </div>
      ) : (
        <div className="text-center flex justify-center flex-col gap-4 text-md md:text-lg dark:text-white">
          {!loading && (
            <p
              className="font-semibold"
              style={{ color: isSuccess ? "green" : "red" }}
            >
              {message}
            </p>
          )}
          <div
            style={{
              borderLeft: `2px solid ${currentColor}`,
              borderRadius: "10px",
            }}
            className="flex flex-row gap-10 justify-center text-left lg:w-2/3 w-full m-auto p-6 shadow-md dark:shadow-gray-600"
          >
            <div className="w-9/12">
              <p>Lender : {lender?.toUpperCase()}</p>
              <p>
                Amount :{" "}
                {Number(principal).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
                &#8377;
              </p>
              <p>
                Interest :{" "}
                {Number(interest).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
                %
              </p>
              {isRepay ? (
                <p>
                  Outstanding:{" "}
                  {Number(outstanding).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </p>
              ) : (
                <p>
                  Platform Fees:{" "}
                  {(principal * 0.005).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </p>
              )}
              {isRepay && (
                <p>
                  Issued Date: {zeroPad(day, 2)}/{zeroPad(month, 2)}/{year}
                </p>
              )}
            </div>
            <div className="text-right m-auto w-3/12">
              {lender !== user.name && (
                <button
                  style={{
                    background: currentColor,
                  }}
                  onClick={isRepay ? handleRepay : handleSubmit}
                  className="p-[6px] px-5 rounded-md text-white"
                >
                  {isRepay ? "Repay" : "Apply"}
                </button>
              )}
            </div>
          </div>
          {isRepay && (
            <div className="flex flex-col m-4 mt-10 p-2">
              <div className="flex flex-row justify-center w-1/2 m-auto text-2xl font-medium">
                <p
                  className="p-2"
                  style={{ borderBottom: `2px solid ${currentColor}` }}
                >
                  Future Outstandings
                </p>
                <button
                  className="p-2 inline"
                  value="print"
                  style={{ borderBottom: `2px solid ${currentColor}` }}
                  onClick={clickHandler.bind(this)}
                >
                  <TiExportOutline
                    fontSize={"20px"}
                    color={`${currentColor}`}
                  />
                </button>
              </div>
              <div className="w-full m-auto md:w-10/12 mt-10 block rounded-xl ">
                <ChartComponent
                  border={{ width: 0 }}
                  chartArea={{ border: { width: 0 } }}
                  background="none"
                  className="h-60 lg:h-96"
                  id="charts"
                  primaryXAxis={primaryxAxis}
                  primaryYAxis={primaryyAxis}
                  legendSettings={{
                    visible: true,
                    textStyle: {
                      color: currentMode === "Dark" ? "white" : "black",
                    },
                  }}
                  tooltip={{ enable: true }}
                  margin={{ left: 10, right: 40, top: 30, bottom: 0 }}
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
                      name={`Current: ${outstanding}`}
                      width={2}
                      marker={{
                        visible: true,
                        height: 5,
                        width: 5,
                        shape: "Diamond",
                        fill: currentColor,
                      }}
                    />
                  </SeriesCollectionDirective>
                </ChartComponent>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplyLoan;
