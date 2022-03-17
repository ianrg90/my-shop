import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ServicesPage from "./pages/ServicesPage";
import UserOptionsPage from "./pages/UserOptionsPage";
import NewQuotePage from "./pages/NewQuotePage";
import QuoteListPage from "./pages/QuoteListPage";
import QuoteDetailsPage from "./pages/QuoteDetailsPage";
import LoadingSpinner from "./components/UI/LoadingSpinner"

function App() {
  const authState = useSelector((state) => state.auth);
  const uiState = useSelector((state) => state.ui);
  const { loading} = uiState;
  const { token } = authState;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      {loading && <Route path="/user" element = {<LoadingSpinner/>}/>}
      {token && (
        <Fragment>
          <Route path="/user" element={<UserOptionsPage />} />
          <Route path="/user/services" element={<ServicesPage />} />
          <Route path="/user/new-quote" element={<NewQuotePage />} />
          <Route path="/user/quote-list" element={<QuoteListPage />} />
          <Route path="/user/quote-list/:quoteID" element={<QuoteDetailsPage />}/>
        </Fragment>
      )}
      {!token && <Route path="*" element = {<Navigate to="/login"/>}/>}
    </Routes>
  );
}

export default App;
