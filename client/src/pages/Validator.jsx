import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BuyStock } from "../components";
import { MarketViewData } from "../data/dummy";

const Validator = () => {
  const { stockName: activeStockName, id: activeStockId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      (Number(activeStockId) > 10 && Number(activeStockId) < 1) ||
      MarketViewData[activeStockId - 1]?.stockName !== activeStockName
    ) {
      navigate("/marketView");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BuyStock activeStockName={activeStockName} activeStockId={activeStockId} />
  );
};

export default Validator;
