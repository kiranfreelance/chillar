import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CourseDetail from "./components/Details";
import MobileLogin from "./pages";
import TransactionForm from "./components/AddTransaction";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MobileLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/course-detail/:id" element={<CourseDetail />} />
        <Route path="/transaction/:id" element={<TransactionForm />} />
      </Routes>
    </Router>
  );
};

export default App;
