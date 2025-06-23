import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CourseDetail from "./components/Details";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/course-detail/:id" element={<CourseDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
