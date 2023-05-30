import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import { BiLinkExternal } from "react-icons/bi";

const NewsCard = ({ news }) => {
  const { currentColor } = useAppContext();
  const [isHover, setisHover] = useState(false);
  return (
    <div
      style={{
        borderLeft: `2px solid ${currentColor}`,
        borderRadius: "10px",
      }}
      className="flex flex-col gap-4 dark:text-white m-5 my-10 p-3 py-5 shadow-md dark:shadow-gray-600 text-left relative"
      onMouseEnter={() => setisHover(true)}
      onMouseLeave={() => setisHover(false)}
    >
      {isHover && (
        <a
          className="md:absolute md:block hidden  top-3 right-3"
          href={news.link}
          target="_blank"
          rel="noreferrer"
        >
          <BiLinkExternal color={currentColor} />
        </a>
      )}
      <a
        className="md:hidden block absolute top-2 right-2"
        href={news.link}
        target="_blank"
        rel="noreferrer"
      >
        <BiLinkExternal color={currentColor} />
      </a>
      <p
        style={{
          borderBottom: isHover ? `1px solid ${currentColor}` : "0px",
          borderRadius: "5px",
        }}
        className="text-base p-2"
      >
        {news.title}
      </p>
      <p className={`text-sm ${isHover ? "" : "hidden"} p-2`}>
        {news.description}
      </p>
    </div>
  );
};

export default NewsCard;
