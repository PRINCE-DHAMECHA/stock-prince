import React from "react";
import {
  AiOutlineBarChart,
  AiFillHome,
  AiOutlineAreaChart,
  AiFillBank,
} from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { TbNotes } from "react-icons/tb";
import { FaCar, FaGratipay } from "react-icons/fa";

export const links = [
  {
    title: "General",
    links: [
      {
        name: "Home",
        to: "landing",
        icon: <AiFillHome />,
      },
      {
        name: "Theme Picker",
        to: "ThemePicker",
        icon: <FiEdit />,
      },
      {
        name: "Stocks",
        to: "stockHome",
        icon: <AiOutlineAreaChart />,
      },
      {
        name: "Buy A Car",
        to: "buyCar",
        icon: <FaCar />,
      },
    ],
  },
  {
    title: "Account",
    links: [
      {
        name: "Accounts",
        to: "accounts",
        icon: <CgProfile />,
      },
      {
        name: "Tips",
        to: "tips",
        icon: <FaGratipay />,
      },
    ],
  },
  {
    title: "Virtual Stocks",
    links: [
      {
        name: "Desk",
        to: "Portfolio",
        icon: <CgProfile />,
      },
      {
        name: "MarketView",
        to: "MarketView",
        icon: <AiOutlineBarChart />,
      },
    ],
  },
  {
    title: "Loans",
    links: [
      {
        name: "Desk",
        to: "loanDesk",
        icon: <TbNotes />,
      },
      {
        name: "Loans",
        to: "notes",
        icon: <AiFillBank />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const quotes = [
  '"The biggest risk of all is not taking one."',
  '"Returns matter a lot. It\'s our capital."',
  '"It\'s not how much money you make, but how much money you keep, how hard it works for you, and how many generations you keep it for."',
  '"Know what you own, and know why you own it." ',
  "\"Financial peace isn't the acquisition of stuff. It's learning to live on less than you make, so you can give money back and have money to invest. You can't win until you do this.\"",
  '"Investing should be more like watching paint dry or watching grass grow. If you want excitement, take $800 and go to Las Vegas."',
  '"A fat purse quickly empties if there be no golden stream to refill it."',
  '"A part of all you earn is yours to keep."',
  '"Good luck waits to come to that man who accepts opportunity."',
  '"Better a little caution than a great regret."',
  '"We cannot afford to be without adequate protection."',
  '"We cannot afford to be without adequate protection."',
  '"Money is everywhere, It affects all of us, And confuses most of us."',
  '"History never repeats itself, Man always does."',
  '"What seems crazy to you might make sense to me."',
  '"Everyone talks about retirement, But apparently very few do anything about it."',
  '"Nothing is as good or as bad as it seems."',
  '"Leave room for understanding when judging failures."',
  '"The hardest financial skills is getting the goalpost to stop moving."',
  '"There are many things never worth risking, No matter the potential gain."',
  '"$81.5B of Buffet\'s $84.5B net worth came after his 65th birthday. Our minds  are not built to handle such absurdities."',
  '"You don\'t need tremendous force to create tremendous results."',
  "\"Buffet's fortune isn't due to just being good investor, But being good investor since he was a child.\"",
  '"Buffet\'s skill is investing, But his secret is time."',
  '"You can be wrong half the time and still make a fortune."',
  '"There are 100B planets in our galaxy and only one, As far as we know, With intelligent life."',
  '"Controlling your time is the highest dividend money pays."',
  '"Spending money to show people how much money you have is the fastest way to have less money."',
  '"The only factor you can control generates one of the only things that matters.  How wonderful."',
  '"Building wealth has little to do with your income or investment returns, And lots to do with your savings rate."',
  '"The value of wealth is relative to what you need"',
  '"Past a certain level of income, What you need is just what sits below your ego."',
  '"You don\'t need a specific reason to save."',
  '"The flexibility and control over your time is unseen return oon wealth."',
  "\"You're not a spreadsheet, You're a person, A screwed up emotional one.\"",
  '"History is the study of change, Ironically used as a map of future."',
  '"You\'ll likely miss the outlier events that move the needle the most."',
  "\"History can be a misleading guide to the future of the economy and stock market because it doesn't account for structural changes that are relevant to today's world.\"",
  '"The most important part of every plan is planning on your plan not going according to plan."',
  '"Long-Term planning is harder than it seems because people\'s goals and desires change over time"',
  '"Avoid the extreme ends of financial planning."',
  '"Everything has a price, But not all prices appear on labels"',
  '"Beware taking financial cues from people playing a different game than you are."',
  '"Progress happens too slowly to notice, But setbacks happen too quickly to ignore."',
  '"The more you want something to be true, The more likely you are to believe a story that overestimates the odds of it being true."',
  '"Manage your money in a way that helps you sleep at night."',
  '"If you want to do better as an investor, The single most powerful thing you can do is increase your time horizon."',
  '"Just save, You don\'t need a specific reason to save."',
  '"Knowing what to measure and how to measure it makes a complicated world much less so."',
  '"Expert depends on the fact that you don\'t have the information they do."',
];

export const MarketViewData = [
  {
    stockName: "Prince Airlines",
    key: 1,
    sector: "transport",
  },
  {
    stockName: "Krishna Zoo",
    key: 2,
    sector: "Entertainment",
  },
  {
    stockName: "Kanan Ielts",
    key: 3,
    sector: "Education",
  },
  {
    stockName: "Adarsh Gaming",
    key: 4,
    sector: "Entertainment",
  },
  {
    stockName: "Namra Pharma",
    key: 5,
    sector: "pharmaceutical",
  },
  {
    stockName: "Aditya Studio",
    key: 6,
    sector: "Art",
  },
  {
    stockName: "Parshwa Electrics",
    key: 7,
    sector: "Energy",
  },
  {
    stockName: "Darshana Music",
    key: 8,
    sector: "Entertainment",
  },
  {
    stockName: "Khushali Ice-Cream",
    key: 9,
    sector: "FMCG",
  },
  {
    stockName: "Honey Dresses",
    key: 10,
    sector: "Art",
  },
];
