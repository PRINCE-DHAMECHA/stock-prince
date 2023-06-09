import React from "react";

const TransactionCard = ({ item, userName, isStockTransaction }) => {
  let time = new Date(item.transactionTime).toLocaleString(undefined, {
    timeZone: "Asia/Kolkata",
  });
  let timeData = time.split("/");
  let buyDay = timeData[1];
  let BuyMonth = timeData[0];
  let BuyYear = timeData[2].slice(0, 4);
  let newTransactionTime = `${buyDay}/${BuyMonth}/${BuyYear}`;
  return (
    <div
      className="lg:w-2/5 w-full my-2 mx-1 py-3 px-4 text-xs dark:text-white lg:text-lg shadow-md hover:shadow-lg dark:bg-[#3d4249]"
      style={{
        borderLeft:
          item.receiver === userName
            ? "3px solid #7ced65"
            : "3px solid #e44f52",
        borderRadius: "10px",
      }}
    >
      {isStockTransaction && (
        <div className="flex flex-row justify-between m-auto">
          <div className="flex flex-col justify-center text-left">
            <p>Stock: {item.stockName}</p>
            <p>
              Price:{" "}
              {Number(item.price).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}{" "}
              &#8377;
            </p>
            <p>Quantity: {item.quantity}</p>
            <p>
              Tax:{" "}
              {Number(item.tax).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}{" "}
              &#8377;
            </p>
          </div>
          <div className="flex flex-col justify-center text-right">
            <p>
              {item.receiver === userName ? "+" : "-"}{" "}
              {Number(item.amount).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}{" "}
              &#8377;
            </p>
            <p>Date: {newTransactionTime}</p>
          </div>
        </div>
      )}
      {!isStockTransaction && item.receiver !== "Tip Account" && (
        <div>
          <div className="flex flex-row justify-between my-auto">
            <div className="flex flex-col justify-center text-left my-auto">
              {item.isRepay && item.receiver === userName && (
                <p>Repayment Received</p>
              )}
              {item.isRepay && item.receiver !== userName && (
                <p>Repayment Given</p>
              )}
              {!item.isRepay && item.receiver === userName && (
                <p>Loan Received</p>
              )}
              {!item.isRepay && item.receiver !== userName && <p>Loan Given</p>}

              <p>
                Pricipal:{" "}
                {Number(item.principal).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}{" "}
                &#8377;
              </p>
              <p>
                Interest:{" "}
                {item.interest.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
                %
              </p>
              <p>
                Tax:{" "}
                {item.isRepay
                  ? "0"
                  : Number(item.tax).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}{" "}
                &#8377;
              </p>
            </div>
            <div className="flex flex-col justify-center text-right">
              {item.receiver === userName ? (
                <p>From: {item.giver}</p>
              ) : (
                <p>To: {item.receiver}</p>
              )}
              {item.isRepay ? (
                <p>
                  {item.receiver === userName ? "+" : "-"}{" "}
                  {Number(item.amount).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  &#8377;
                </p>
              ) : (
                <p>
                  {item.receiver === userName ? "+" : "-"}{" "}
                  {item.receiver === userName
                    ? (Number(item.amount) - Number(item.tax)).toLocaleString(
                        "en-IN",
                        { maximumFractionDigits: 2 }
                      )
                    : (Number(item.amount) + Number(item.tax)).toLocaleString(
                        "en-IN",
                        { maximumFractionDigits: 2 }
                      )}{" "}
                  &#8377;
                </p>
              )}
              <p>Date: {newTransactionTime}</p>
            </div>
          </div>
        </div>
      )}
      {!isStockTransaction && item.receiver === "Tip Account" && (
        <div>
          <div className="flex flex-row justify-between my-auto">
            <div className="flex flex-col justify-center text-left my-auto">
              {item.receiver === userName ? (
                <p>From: {item.giver}</p>
              ) : (
                <p>To: {item.receiver}</p>
              )}
              <p>Date: {newTransactionTime}</p>
            </div>
            <div className="flex flex-col justify-center text-right">
              <p>
                {item.receiver === userName ? "+" : "-"}{" "}
                {Number(item.amount).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}{" "}
                &#8377;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;
