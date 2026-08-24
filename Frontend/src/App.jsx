import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Pages/Login";

import Register from "./Pages/Register";

import Dashboard from "./Pages/Dashboard";

import Employees from "./Pages/Employees.jsx";

import DashboardLayout from "./Components/DashboardLayout.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      {/* Public */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/employees" element={<Employees />} />
      </Route>

      {/* Default */}

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
