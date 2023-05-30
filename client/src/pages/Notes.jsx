import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Note } from "../components";
import { useAppContext } from "../context/appContext";
import RingLoader from "react-spinners/RingLoader";
import { VscAdd } from "react-icons/vsc";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isMyNotes, setisMyNotes] = useState(false);
  const [loading, setLoading] = useState(true);
  const [forRender, setforRender] = useState(false);
  const [msg, setMsg] = useState("");
  const [isDisplay, setIsDisplay] = useState(false);
  const { authFetch, currentColor, user } = useAppContext();
  useEffect(() => {
    setLoading(true);
    authFetch("loan/getNotes")
      .then((data) => {
        setNotes(data.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forRender]);
  const handleDelete = async (_id) => {
    setLoading(true);
    try {
      await authFetch.post("loan/deleteNote", {
        _id: _id,
      });
      setIsDisplay(true);
      setMsg("Note Deleted!!");
    } catch (e) {
      console.log(e);
      setIsDisplay(true);
      setMsg("Something Went Wrong!!");
    }
    setTimeout(() => {
      setIsDisplay(false);
    }, 2000);
    setLoading(false);
    setforRender((prev) => !prev);
  };
  return (
    <div>
      <div className="text-center w-full relative">
        <div className="mb-10 mt-5 w-full text-center">
          <p
            style={{ borderColor: currentColor }}
            className="lg:text-3xl text-2xl m-auto pb-1 font-bold tracking-normal dark:text-white text-black border-solid border-b-2 lg:w-1/2 w-5/6"
          >
            {isMyNotes ? "My Notes" : "All Notes"}
          </p>
        </div>
        {!loading && (
          <div className="absolute -top-6 right-0 lg:m-2 m-2">
            <Link to="/createNote">
              <VscAdd size={"30px"} color={currentColor} className="m-auto" />
            </Link>
          </div>
        )}
        {loading ? (
          <div className="w-full p-20">
            <div className="m-auto w-7">
              <RingLoader color={currentColor} className="-ml-5" />
            </div>
          </div>
        ) : (
          <div>
            <div className="justify-between text-center font-normal flex">
              <div className="flex gap-4 justify-around dark:text-white text-left m-auto mb-6">
                <div className="flex flex-col h-12 items-center justify-center overflow-hidden">
                  <div className="flex justify-center text-center">
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isMyNotes ? true : false}
                        readOnly
                      />
                      <div
                        onClick={() => {
                          setisMyNotes((prev) => !prev);
                        }}
                        style={{ background: currentColor }}
                        className="flex justify-around m-auto w-[102px] h-10 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-9 after:w-12 after:transition-all text-white"
                      >
                        <p className="m-auto">My</p>
                        <p className="m-auto">All</p>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {!loading && isDisplay && (
              <p
                style={{ color: "#fc4e41" }}
                className="m-5 p-2 text-2xl dark:text-white font-medium tracking-wide"
              >
                {msg}
              </p>
            )}
            <div className="flex flex-wrap justify-center items-center gap-3 mx-1">
              {isMyNotes &&
                notes
                  .filter((note) => {
                    return note.lender === user.name;
                  })
                  .map((note) => {
                    return (
                      <div style={{ width: "28rem" }} key={note._id}>
                        <Note note={note} handleFunc={handleDelete} />
                      </div>
                    );
                  })}
              {!isMyNotes &&
                notes.map((note) => {
                  return (
                    <div style={{ width: "28rem" }} key={note._id}>
                      <Note note={note} handleFunc={handleDelete} />
                    </div>
                  );
                })}
              {!isMyNotes && !notes.length && (
                <p className="text-xl font-medium dark:text-white">
                  No Notes Available
                </p>
              )}
              {isMyNotes &&
                !notes.filter((note) => {
                  return note.lender === user.name;
                }).length && (
                  <p className="text-xl font-medium dark:text-white">
                    You Don't Have Any Notes
                  </p>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
