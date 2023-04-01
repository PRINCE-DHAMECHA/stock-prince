import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header, Note } from "../components";
import { useAppContext } from "../context/appContext";
import RingLoader from "react-spinners/RingLoader";

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
    <div className="m-2 md:m-10 mb-10 mt-24 md:mx-9 mx-2 p-2 md:p-6 dark:bg-secondary-dark-bg bg-white rounded-3xl text-center">
      <div className="text-center w-full">
        <Header title={isMyNotes ? "My Notes" : "All Notes"} />
        {loading ? (
          <div className="w-full p-20">
            <div className="m-auto w-7">
              <RingLoader color={currentColor} className="-ml-5" />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-center gap-5 mt-10 mb-5">
              <Link to="/createNote">
                <button
                  style={{ background: currentColor }}
                  className="p-2 px-7 text-xl mb-5 rounded-md text-white"
                >
                  Create
                </button>
              </Link>
              <button
                onClick={() => {
                  setisMyNotes(!isMyNotes);
                }}
                style={{ background: currentColor }}
                className="flex gap-2 p-2 px-7 text-xl mb-5 rounded-md text-white"
              >
                {isMyNotes ? "All Notes" : "My Notes"}
              </button>
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
                  No Notes Available !!
                </p>
              )}
              {isMyNotes &&
                !notes.filter((note) => {
                  return note.lender === user.name;
                }).length && (
                  <p className="text-xl font-medium dark:text-white">
                    You Don't Have Any Notes !!
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
