import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";

import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import TransactionPage from "./pages/TransactionPage";

import UserContext from "./contexts/UserContext";
import TransactionTypeContext from "./contexts/TransactionTypeContext";

function App() {
  const [user, setUser] = useState(null);
  const [transactionType, setTransactionType] = useState(null);
  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{ user, setUser }}>
        <TransactionTypeContext.Provider
          value={{ transactionType, setTransactionType }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LogInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/transaction" element={<TransactionPage />} />
            </Routes>
          </BrowserRouter>
        </TransactionTypeContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
