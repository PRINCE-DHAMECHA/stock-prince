import React from "react";
import {
  AiOutlineBarChart,
  AiFillHome,
  AiOutlineAreaChart,
  AiFillBank,
  AiOutlineEye,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaGratipay } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { TiNews } from "react-icons/ti";
import { VscSymbolColor } from "react-icons/vsc";

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
        icon: <VscSymbolColor />,
      },
    ],
  },
  {
    title: "Stocks",
    links: [
      {
        name: "Stocks",
        to: "stockHome",
        icon: <AiOutlineAreaChart />,
      },
      {
        name: "My Watchlist",
        to: "watchlist",
        icon: <AiOutlineEye />,
      },
      {
        name: "News",
        to: "news",
        icon: <TiNews />,
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
        name: "Loan Desk",
        to: "loanDesk",
        icon: <AiFillBank />,
      },
      {
        name: "Loans",
        to: "notes",
        icon: <GiReceiveMoney />,
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
    stockName: "Prince Cinemas",
    key: 1,
    sector: "Entertainment",
  },
  {
    stockName: "Dhruvi StudyNotes",
    key: 2,
    sector: "Education",
  },
  {
    stockName: "Kanan Ielts",
    key: 3,
    sector: "Education",
  },
  {
    stockName: "Adarsh Gaming",
    key: 4,
    sector: "Gaming",
  },
  {
    stockName: "Namra Pharma",
    key: 5,
    sector: "pharmaceutical",
  },
  {
    stockName: "Aneri Content",
    key: 6,
    sector: "Marketing",
  },
  {
    stockName: "Aditya Studio",
    key: 7,
    sector: "Photography",
  },
  {
    stockName: "Foram StudyPoint",
    key: 8,
    sector: "Talent",
  },
  {
    stockName: "Parshwa Electrics",
    key: 9,
    sector: "Energy",
  },
  {
    stockName: "Krishna Zoo",
    key: 10,
    sector: "Wildlife",
  },
];

export const InformationData = [
  {
    routeName: ["landing", "register", "", "news"],
    contents: [
      {
        title: "What is Stock?",
        content:
          "A stock, also known as equity, is a security that represents the ownership of a fraction of the issuing corporation.",
      },
      {
        title: "What is Stock Market?",
        content:
          "The term stock market refers to several exchanges in which shares of publicly held companies are bought and sold.",
      },
      {
        title: "What is Stock Exchange?",
        content:
          "A stock exchange facilitates stock brokers to trade company stocks and other securities",
      },
      {
        title: "Stock Market vs Stock Exchange?",
        content:
          "Both “stock market” and “stock exchange” are often used interchangeably. Traders in the stock market buy or sell shares on one or more of the stock exchanges that are part of the overall stock market.",
      },
      {
        title: "What is IPO?",
        content:
          "An initial public offering (IPO) refers to the process of offering shares of a private corporation to the public in a new stock issuance for the first time. An IPO allows a company to raise equity capital from public investors.",
      },
      {
        title: "Stock Exchange of India",
        content:
          "India has two main stock exchanges - the National Stock Exchange (NSE) and the older Bombay Stock Exchange (BSE).",
      },
      {
        title: "Stock Exchange of US",
        content:
          "The NYSE is the world's largest stock exchange and is known for listing stocks of well-known, established companies. The Nasdaq trails closely as the world's second-largest stock exchange but lists less-stable growth stocks and stocks of tech giants.",
      },
      {
        title: "What is Nifty?",
        content:
          "NIFTY is a market index introduced by the National Stock Exchange. It is a blended word - National Stock Exchange and Fifty coined by NSE on 21st April 1996. NIFTY 50 is a benchmark based index and also the flagship of NSE, which showcases the top 50 equity stocks traded in the stock exchange out of a total of 1600 stocks.",
      },
      {
        title: "What is Sensex?",
        content:
          "NIFTY is a market index introduced by the National Stock Exchange. It is a blended word - National Stock Exchange and Fifty coined by NSE on 21st April 1996. NIFTY 50 is a benchmark based index and also the flagship of NSE, which showcases the top 50 equity stocks traded in the stock exchange out of a total of 1600 stocks.",
      },
      {
        title: "Bull vs Bear",
        content:
          "A bullish market is a time when the demand is higher than the supply of shares and results in the rising of the share prices. A bearish market is a time when the supply is higher than the demand for the shares and results in the fall of the prices of the shares.",
      },
    ],
  },
  {
    routeName: ["ThemePicker"],
    contents: [
      {
        title: "Fun Fact",
        content:
          "The Stock Market is more than 400 years old! Many people think that the stock market is something modern. Most people would say that it started about 100 years ago. But in fact, the stock market is ancient.",
      },
      {
        title: "Fun Fact",
        content: "There are more than 60 stock exchanges in the world!",
      },
      {
        title: "Fun Fact",
        content: "The stock market is 70% likely to go up on any year",
      },
      {
        title: "Fun Fact",
        content: "The United States makes 40% of the world stock market",
      },
      {
        title: "Fun Fact",
        content: "The most expensive share is Berkshire Hataway",
      },
    ],
  },
  {
    routeName: ["tips"],
    contents: [
      {
        title: "Percentage Gain",
        content:
          "It's not how much rupees the stock price increase, It's how much percentage the stock price increase. If 100rs stock went 150rs then it's better than 1000rs stock went for 1300rs.",
      },
    ],
  },
  {
    routeName: ["accounts"],
    contents: [
      {
        title: "Pay With Cash, Not Credit",
        content:
          "Exercise patience and self-control with your finances. If you wait and save money for what you need, you will pay with cash or a debit card to deduct money directly from your checking account and avoid using a credit card. A credit card is a loan that accumulates interest unless you can afford to pay off the balance in full every month. Credit cards can help you build a good credit score but use them for emergencies only.",
      },
      {
        title: "Educate Yourself",
        content:
          "Take charge of your financial future and read a few basic books on personal finance. Once armed with knowledge, don't let anyone take you off track, whether a significant other who encourages you to waste money or friends who plan expensive trips and events you can't afford. Research professionals like financial planners, mortgage lenders, or accountants before utilizing their services.",
      },
      {
        title: "Learn to Budget",
        content:
          "Never let your expenses exceed your income, and watch where your money goes. The best way to do this is by budgeting and creating a personal spending plan to track the money coming in and going out.",
      },
      {
        title: "Start an Emergency Fund",
        content:
          "A mantra in personal finance is “pay yourself first,” which means saving money for emergencies and your future. This simple practice keeps you out of trouble financially and helps you sleep better at night. The tightest budget should put some money into an emergency fund every month.",
      },
      {
        title: "Save for Retirement Now",
        content:
          "No matter how young you are, plan for your retirement now. With the power of compound interest, when you start saving in your 20s, you will earn interest not only on the principal you deposit but also on the interest you earn over time, and you will have what you need to retire someday.",
      },
      {
        title: "Monitor Your Taxes",
        content:
          "When a company offers you a starting salary, calculate whether that salary after taxes meets your financial needs and savings goals. Many online calculators help you see your after-tax salary.",
      },
      {
        title: "Guard Your Health",
        content:
          "When a company offers you a starting salary, calculate whether that salary after taxes meets your financial needs and savings goals. Many online calculators help you see your after-tax salary.",
      },
      {
        title: "Know Where You're Spending Your Money",
        content:
          "Taking small manageable steps can help you to develop a new behaviour or habit. Try tracking everything you spend for a short period of time, like over the next month. Why? It can give you insights into how you spend money now and may highlight how spending even small amounts adds up over time.",
      },
      {
        title: "Establish a Plan",
        content:
          "Having established that you'd like to invest your money you need to formulate a plan, taking into consideration a few questions: How much can I invest? What can I afford to lose?  What is the goal of my investments? How long am investing for to reach that goal? Do I know all the relevant investment definitions and terminology?",
      },
      {
        title: "Understand the Risk",
        content:
          "Understand your risk tolerance and how you would feel if you lost some or all of the money invested. A common mistake for first time investors is to believe they are more tolerant of loss than they actually are, so when riskier investments start to decline, they often panic and sell. Taking a considered approach to risk and reward will insure you invest in line with your capacity for loss. Remember, anything you do involves risk – this also includes holding cash as its buying power can be gradually eroded by inflation.",
      },
      {
        title: "Stick To Your Plan",
        content:
          "Once you start investing for the first time you'll realise it's very hard to ignore the chatter about market movements, commodities, share tips, inflation, interest rates, dividends, gold price, oil price…it's endless and is near enough constant with globalized markets.  A true investor should be looking at long term trends and macroeconomic factors that originally shaped their plan and always keep these as their focus (you can view these in our DIY investor magazine).",
      },
    ],
  },
  {
    routeName: ["MarketView"],
    contents: [
      {
        title: "Ever Wonder How Price of Stocks Change?",
        content:
          "The most crucial factor that causes share prices to fluctuate is the demand and supply. If an increased number of people start investing in a particular share, its demand is high, so its prices start to soar. Conversely, if many people want to sell a particular stock simultaneously, its supply will increase, so its prices will fall.",
      },
      {
        title: "Factor Affecting Price of Stocks",
        content:
          "A share or stock is nothing but the security that denotes equity ownership in a company. So, any positive or negative development in a company will directly impact its share price. It can be good or bad news about a company, any public announcement regarding a company's financials, the launch of a new product or brand, a tie-up or merger, or the resignation of senior personnel such as the CEO or Vice President of the company.",
      },
      {
        title: "Factor Affecting Price of Stocks",
        content:
          "Any positive or negative news about the industry to which a company belongs can also influence its share price. For example, suppose the Government announced the ease in compliance for the distribution of telecom licenses, and the companies who operate in the telecom industry will witness a hike in their share prices.",
      },
      {
        title: "Factor Affecting Price of Stocks",
        content:
          "The current market trend also impacts the prices of shares. You must have heard these two terms repeatedly - a bull market and a bear market. A bull market is when the indices go up, and a bear market is when the indices go down. That usually happens when the investors feel optimistic or pessimistic about the market's future.",
      },
    ],
  },
  {
    routeName: ["buyStock"],
    contents: [
      {
        title: "Long Term Trading",
        content:
          "Long-term investing in stock markets involves buying stocks with an intention to remain invested in them for a long period. This could generally be five years or more. It's often used by investors to fetch meaningful returns from the stock markets.",
      },
      {
        title: "Intra Day Trading",
        content:
          "Intra day trading is buying and selling securities, such as stocks, daily without taking overnight ownership of these. Since both buying and selling of security happens within the trading hours of a stock exchange, there is no delivery of stocks required in the investor or trader's Demat account. Intra day orders in India are generally placed between 9:30 am and 3:30 pm.",
      },
      {
        title: "Swing Trading",
        content:
          "Swing trading is a type of trading strategy in which security, such as a stock, is held for a time period that could range from a few days to a few weeks. This strategy involves an investment period that is longer as compared to intra day trading but shorter as compared to long term investing. The objective of swing trading is to make the most of a potentially large stock price move.",
      },
      {
        title: "What is Depository Participate?",
        content:
          "A depository is an entity holding securities of an investor through stockbrokers or agents. These stockbrokers are called Depository Participants. As an investor, your securities, i.e., shares, debentures, government securities, bonds, Mutual Fund units, etc., are held by the respective depositories in an electronic format.",
      },
      {
        title: "What is DP Charges?",
        content:
          "The DP levies charges upon all sale of share transactions in your Demat Account. DP Charges mean flat transaction fees regardless of the quantity sold. For example, if your stockbroker sets DP charge as INR 10, you pay INR 10 on the sale of 100 shares and INR 10 on 1000 shares. However, you are unable to view these charges as they are not present in the contract notes.",
      },
      {
        title: "Market Order",
        content:
          "A market order is the most basic type of trade. It is an order to buy or sell immediately at the current price.",
      },
      {
        title: "Limit Order",
        content:
          "A limit order, sometimes referred to as a pending order, allows investors to buy and sell securities at a certain price in the future. This type of order is used to execute a trade if the price reaches the pre-defined level; the order will not be filled if the price does not reach this level. In effect, a limit order sets the maximum or minimum price at which you are willing to buy or sell.",
      },
      {
        title: "Good Till Triggered(GTT) in Zerodha",
        content:
          "The Good Till Triggered (GTT) feature is an order that stays active until the trigger condition is met. The validity of the trigger is one year. A limit order is placed and executed if there are sufficient funds in the Zerodha account. A notification is sent to the registered email ID and mobile device every time a GTT is triggered, and an order is placed on the exchange.",
      },
      {
        title: "Cash and Carry (CNC)",
        content:
          "Cash and Carry (CNC) is used for delivery based trading in equity. In delivery based trade, you intend to hold the stocks overnight for however long you wish.",
      },
      {
        title: "Margin Intraday Square-off (MIS)",
        content:
          "These order types are used in intra day trades when you don't seek the delivery of shares. Shares bought in MIS order have to be squared off the same day. Entry and Exit have to happen on the same day.",
      },
      {
        title: "Auto Square Off",
        content:
          "If you have not squared off your Intra day positions in any segment then broker will automatically square off your position at certain time before market close and charges will be applicable.",
      },
      {
        title: "Benefits of MIS order in Zerodha",
        content:
          "In MIS orders, Brokers will pay some margin, So you can buy/sell more stocks with same amount of money than CNC and you'll will bear profit/loss for all stocks.",
      },
    ],
  },

  {
    routeName: ["stockHome", "watchlist", "stockDetails"],
    contents: [
      {
        title: "Tip: Understand the Stock Markets",
        content:
          "The first step to becoming a successful investor is to know the basics of the trade. It is important to know the process of stock trading. Apart from this, you should also learn the art of choosing the right stocks. What are the basic ratios and financial statements published by the companies? What are the brokerages charged and the tax implications?",
      },
      {
        title: "Trading or Investing",
        content:
          "The answer is simple. Trading requires regular attention and expertise. If you are a market expert and want to make trading in stock markets your primary profession, you can give it a try. Otherwise, it is better to start as an investor. As you gain experience and understand the market, you can also start trying your luck in trading with limited capital first.",
      },
      {
        title: "Tip: Start Analyzing Yourself",
        content:
          "It is never advisable to rely entirely on the suggestions of market experts and that would be one of the best share market tips to follow if you really want to grow. Instead, it is a good idea to analyze the market yourself and study the market movements regularly. This will help you make informed decisions and reduce the risk of losses. Once you start analyzing regularly, you can get a hold of the market and identify the movements correctly.",
      },
      {
        title: "Tip: Identify Potential Sectors",
        content:
          "Some sectors are more likely to grow than others. For example, during the early days of the pandemic, while most other sectors were affected, the pharma industry was working at its full capacity. Even though the markets moved south, the pharma industry grew.",
      },
    ],
  },
  {
    routeName: ["Portfolio"],
    contents: [
      {
        title: "Transaction Date (T)",
        content:
          "The date when trade executed. Note that stocks will not be delievered in your account on T",
      },
      {
        title: "T+1",
        content:
          "Any trade-related settlements must be completed within one day from the day of the transaction. At this day stocks will be credit into your account.",
      },
      {
        title: "T+2",
        content:
          "when you buy a security, your payment must be received by your brokerage firm no later than two business days after the trade is executed.",
      },
      {
        title: "Holdings",
        content:
          "Holdings are the contents of an investment portfolio held by an individual or an entity, such as a mutual fund or a pension fund. Portfolio holdings may encompass a wide range of investment products, including stocks, bonds, mutual funds, options, futures, and exchange traded funds (ETFs).",
      },
      {
        title: "Position",
        content:
          "A position is the expression of a market commitment, or exposure, held by a trader. It is the financial term for a trade that is either currently able to incur a profit or a loss - known as an open position - or a trade that has recently been cancelled, known as a closed position. Profit or loss on a position can only be realized once it has been closed.",
      },
      {
        title: "Holdings vs Position",
        content:
          "When you buy stocks at that day it'll be shown as position and not actually credit to your account and you can exit that position at that day but after that day stocks will be credited to your demat account and will be shown in holdings",
      },
      {
        title: "Tip: Build a Diversified Portfolio",
        content:
          "You should build a diversified portfolio for investing. When you invest in stocks from different sectors, you can reduce your risk. All the sectors of an economy never suffer at the same time. If one sector doesn't perform well, other sectors can cover your losses. This is the benefit of diversification.",
      },
      {
        title: "Tip: Investing in Low-Priced Stocks is Not Always Profitable",
        content:
          "Low-priced stocks, often known as penny stocks, are tempting to a large number of investors. The primary reason for this is the fact that these stocks offer a huge potential to earn large profits. However, the risks associated with penny stock investing are extremely high. Investors are advised to remember that the company shares are priced low because of its poor performance and it is prudent to avoid investing in them.",
      },
    ],
  },

  {
    routeName: ["loanDesk", "notes", "applyLoan", "repayLoan", "createNote"],
    contents: [
      {
        title: "What is a Loan?",
        content:
          "Loans provide individuals and businesses with access to funds that they can use for various purposes, such as purchasing a home, financing education, starting a business, or covering unexpected expenses.",
      },
      {
        title: "Interest Rate of a Loan",
        content:
          "Loans involve the payment of interest, which is the cost of borrowing money. The interest rate on a loan can vary based on factors such as the type of loan, the borrower's creditworthiness, prevailing market rates, and the duration of the loan.",
      },
      {
        title: "Repayment Terms",
        content:
          "Loans come with specific repayment terms, including the duration of the loan and the installment amount. Repayment terms can vary depending on the type of loan and the lender's policies. It's important to understand the repayment schedule and obligations before taking out a loan.",
      },
      {
        title: "Types of a Loan?",
        content:
          "There are various types of loans available to cater to different needs, including personal loans, home loans, auto loans, student loans, business loans, and more. Each type of loan is designed to serve a specific purpose and comes with its own terms and conditions.",
      },
      {
        title: "Be Aware!!",
        content:
          "Taking out a loan comes with the responsibility of repaying the borrowed amount along with interest within the agreed-upon terms. Borrowers need to manage their finances effectively to ensure timely repayments and maintain a good credit record.",
      },
      {
        title: "Collaterals",
        content:
          "Some loans require collateral, such as a property or asset, which acts as security for the lender. These are secured loans. On the other hand, unsecured loans do not require collateral but may have stricter credit requirements and higher interest rates.",
      },
      {
        title: "Affects on Credit Score",
        content:
          "Loan repayment behavior, including making timely payments, affects the borrower's credit score. Responsible loan management can help improve the credit score over time, opening doors to better loan options and favorable interest rates in the future.",
      },
      {
        title: "Assess Financial Situation",
        content:
          "Before taking out a loan, it's important to assess one's financial situation and determine the affordability of the loan. Borrowers should consider their income, expenses, and existing financial commitments to ensure they can comfortably repay the loan without straining their finances.",
      },
      {
        title: "What is a Loan Calculator?",
        content:
          "A loan calculator is a useful financial planning tool that helps individuals estimate and analyze the financial aspects of a loan. It allows users to calculate monthly payments, interest costs, and other important loan details.",
      },
      {
        title: "Amortization Schedule",
        content:
          "Loan calculators generate an amortization schedule, which is a table that shows the repayment schedule of the loan over its duration. It breaks down each payment into principal and interest components, allowing borrowers to track their loan repayment progress.",
      },
      {
        title: "Benefits of a Loan Calculator",
        content:
          "Loan calculators are flexible tools that allow users to adjust various loan parameters, such as the loan amount, interest rate, loan term, and repayment frequency. This flexibility enables borrowers to customize the calculations based on their specific needs.",
      },
      {
        title: "Advantages of a Loan Calculator",
        content:
          "Loan calculators can serve as educational tools, helping individuals learn about loan mechanics, interest calculations, and the impact of different loan parameters. They promote financial literacy and help borrowers make responsible borrowing decisions.",
      },
      {
        title: "Fun Fact!!",
        content:
          "As you notice in above graph of Principal vs Interest repayment that in first few years you'll pay large part of EMI toward interest which is not a good thing about how loan works.",
      },
    ],
  },
];
