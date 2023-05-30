import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const DeskCard = ({ data, isBorrow }) => {
  const { currentColor, setLoan } = useAppContext();
  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }
  let monthDiff = (d1, d2) => {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };
  const date1 = new Date(data.issuedDate);
  let day = date1.getDate();
  let month = date1.getMonth() + 1;
  let year = date1.getFullYear();
  let date2 = new Date();
  let months = monthDiff(date1, date2);
  let outstanding = (
    data.principal * Math.pow(1 + data.interest / 100, months / 12)
  ).toFixed(2);
  return (
    <div className="rounded-lg m-2">
      <div
        className="rounded-lg border dark:bg-[#3d4249] border-gray-100 cursor-pointer shadow-md dark:border-gray-700 h-auto p-5"
        style={{
          borderLeft: `3px solid ${currentColor}`,
        }}
      >
        <div className="flex flex-row text-center justify-start gap-6 dark:text-white font-medium md:text-lg text-sm tracking-wide">
          <div className="text-left sm:w-4/5">
            <p>
              Outstanding:{" "}
              {Number(outstanding).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
              &#8377;
            </p>
            <p>
              {!isBorrow ? "Borrower" : "Lender"}:{" "}
              {isBorrow ? data.lender : data.borrower}
            </p>
            <div>
              Principal:{" "}
              {Number(data.principal).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
              &#8377;
            </div>
            <div>
              Interest:{" "}
              {Number(data.interest).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
              %
            </div>
            <div>
              Date: {zeroPad(day, 2)}/{zeroPad(month, 2)}/{year}
            </div>
          </div>
          <div className="my-auto text-left">
            {isBorrow && (
              <div className="text-left">
                <Link
                  to="/repayLoan"
                  onClick={() => {
                    setLoan(data, outstanding, date1);
                  }}
                  style={{
                    background: currentColor,
                  }}
                  className="p-2 px-5 rounded-md text-white"
                >
                  Repay
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeskCard;
