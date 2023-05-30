import React, { useState } from "react";
import InfoCard from "./InfoCard";
import { useAppContext } from "../context/appContext";
import { IoCloseSharp } from "react-icons/io5";
import { BsInfoLg } from "react-icons/bs";
const Info = () => {
  const { currentColor } = useAppContext();
  const [dis, setDis] = useState(false);

  return (
    <>
      <div className="fixed right-4 bottom-[4px]" style={{ zIndex: "1000000" }}>
        <button
          type="button"
          className="text-base p-3 hover:drop-shadow-xl hover:bg-light-gray text-white bg-white"
          onClick={() => setDis((prev) => !prev)}
          style={{
            background: "white",
            borderRadius: "50%",
          }}
        >
          {dis ? (
            <IoCloseSharp color={currentColor} />
          ) : (
            <BsInfoLg color={currentColor} />
          )}
        </button>
      </div>
      {dis && <InfoCard />}
    </>
  );
};

export default Info;
