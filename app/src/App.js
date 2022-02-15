import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ServicesPage from "./pages/ServicesPage";
import UserOptionsPage from "./pages/UserOptionsPage";
import NewQuotePage from "./pages/NewQuotePage";
import QuoteListPage from "./pages/QuoteListPage";
import QuoteDetailsPage from "./pages/QuoteDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user" element={<UserOptionsPage />} />
      <Route path="/user/services" element={<ServicesPage />} />
      <Route path="/user/new-quote" element={<NewQuotePage />} />
      <Route path="/user/quote-list" element={<QuoteListPage />} />
      <Route path="/user/quote-list/:quoteID" element={<QuoteDetailsPage />} />
    </Routes>
  );
}

export default App;
