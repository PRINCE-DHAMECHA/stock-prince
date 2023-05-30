import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import RingLoader from "react-spinners/RingLoader";

const Note = ({ note, handleFunc }) => {
  const { currentColor, user, setLoan } = useAppContext();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    handleFunc(note._id);
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <div className="w-full p-20">
          <div className="m-auto w-7">
            <RingLoader color={currentColor} className="-ml-5" />
          </div>
        </div>
      ) : (
        <div className="rounded-lg m-2">
          <div
            className="rounded-lg border dark:bg-[#3d4249] border-gray-100 cursor-pointer shadow-md dark:border-gray-700  h-auto p-5"
            style={{
              borderLeft: `4px solid ${currentColor}`,
            }}
          >
            <div className="flex text-center justify-around  dark:text-white font-medium md:text-lg text-sm tracking-wide">
              <div className="text-left w-4/5">
                <div>
                  <p>Lender: {note.lender}</p>
                </div>
                <div>
                  Amount:{" "}
                  {Number(note.principal).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                  &#8377;
                </div>
                <div>
                  Interest:{" "}
                  {Number(note.interest).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                  %
                </div>
              </div>
              <div className="m-auto">
                <div className="m-auto">
                  {note.lender !== user.name ? (
                    <Link
                      to="/applyLoan"
                      onClick={() => {
                        setLoan(note, -2, null);
                      }}
                      style={{
                        background: currentColor,
                      }}
                      className="p-2 px-5 rounded-md text-white"
                    >
                      Apply
                    </Link>
                  ) : (
                    <button
                      onClick={handleDelete}
                      style={{
                        background: "#fb5c5c",
                      }}
                      className="p-2 py-[6px] px-5 rounded-md text-white"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
