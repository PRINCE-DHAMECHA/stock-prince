import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import MarketView from "./pages/MarketView";
import Utilities from "./pages/Utilities";
import ProtectedRoute from "./pages/ProtectedRoute";
import ColorPicker from "./pages/ColorPicker";
import Portfolio from "./pages/Portfolio";
import CreateNote from "./pages/createNote";
import { useAppContext } from "./context/appContext";
import Notes from "./pages/Notes";
import LoanDesk from "./pages/LoanDesk";
import ApplyLoan from "./pages/AppyLoan";
import Stocks from "./pages/Stocks";
import StockDetails from "./pages/StockDetails";
import Accounts from "./pages/Accounts";
import Tips from "./pages/Tips";
import Validator from "./pages/Validator";
import BuyCar from "./pages/BuyCar";

function App() {
  const { currentMode } = useAppContext();
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Utilities />}>
            <Route index path="" element={<Landing />} />
            <Route index path="/landing" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ThemePicker" element={<ColorPicker />}></Route>
            <Route path="/stockHome" element={<Stocks />}></Route>
            <Route path="/buyCar" element={<BuyCar />}></Route>
            <Route
              path="/stockDetails/:name/:sym"
              element={<StockDetails />}
            ></Route>
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Utilities />
              </ProtectedRoute>
            }
          >
            <Route element={<Portfolio />}></Route>
            <Route path="marketView" element={<MarketView />}></Route>
            <Route
              path="buyStock/:stockName/:id"
              element={<Validator />}
            ></Route>
            <Route path="Portfolio" element={<Portfolio />}></Route>
            <Route path="createNote" element={<CreateNote />}></Route>
            <Route path="/notes" element={<Notes />}></Route>
            <Route path="/loanDesk" element={<LoanDesk />}></Route>
            <Route path="/accounts" element={<Accounts />}></Route>
            <Route path="/tips" element={<Tips />}></Route>
            <Route
              path="/applyLoan"
              element={<ApplyLoan isRepay={false} />}
            ></Route>
            <Route
              path="/repayLoan"
              element={<ApplyLoan isRepay={true} />}
            ></Route>
          </Route>
          <Route path="/" element={<Utilities />}>
            <Route path="*" element={<Landing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
