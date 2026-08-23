import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// =====================================================
// PUBLIC PAGES
// =====================================================

import Home from "../pages/Home/Home";
import Categories from "../components/Category/Categories";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import About from "../pages/About/About";
import Footer from "../components/Footer/Footer";

import Register from "../pages/Register/Register";
import Userrig from "../pages/Register/Userrig";

import Terms from "../pages/Terms/Terms";
import Privacy from "../pages/Privacy/Privacy";
import Safety from "../pages/Safety/Safety";

// =====================================================
// LOGIN
// =====================================================

import CustomerLogin from "../pages/Login/CustomerLogin";
import WorkerLogin from "../pages/Login/WorkerLogin";

// =====================================================
// DASHBOARDS
// =====================================================

import WorkerDashboard from "../pages/Dashboard/WorkerDashboard";
import CustomerDashboard from "../pages/Dashboard/CustomerDashboard";

// =====================================================
// PROFILES
// =====================================================

import WorkerProfile from "../pages/WorkerProfile";
import CustomerProfile from "../pages/CustomerProfile";

// =====================================================
// CUSTOMER
// =====================================================

import BookingCredits from "../pages/customer/BookingCredits";
import CustomerPayments from "../pages/customer/CustomerPayments";

// =====================================================
// AUTH GUARD
// =====================================================

import ProtectedRoute from "../components/ProtectedRoute";

// =====================================================
// GET LOGGED-IN USER
// =====================================================

function getStoredUser() {
  try {
    const localUser = localStorage.getItem("user");
    const sessionUser = sessionStorage.getItem("user");

    const user = localUser || sessionUser;

    if (!user) {
      return null;
    }

    return JSON.parse(user);

  } catch (error) {
    console.error(
      "Unable to read stored user:",
      error
    );

    return null;
  }
}

// =====================================================
// ROOT ROUTE
// =====================================================

function RootRoute() {

  const user = getStoredUser();

  // -----------------------------------------------
  // User is NOT logged in
  // -----------------------------------------------

  if (!user) {
    return <Home />;
  }

  // -----------------------------------------------
  // Worker is logged in
  // -----------------------------------------------

  if (user.role === "WORKER") {
    return (
      <Navigate
        to="/worker-dashboard"
        replace
      />
    );
  }

  // -----------------------------------------------
  // Customer is logged in
  // -----------------------------------------------

  if (user.role === "CUSTOMER") {
    return (
      <Navigate
        to="/customer-dashboard"
        replace
      />
    );
  }

  // -----------------------------------------------
  // Invalid stored user
  // -----------------------------------------------

  return <Home />;
}


// =====================================================
// APP ROUTES
// =====================================================

function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            ROOT
        ================================================= */}

        <Route
          path="/"
          element={<RootRoute />}
        />


        {/* =================================================
            PUBLIC ROUTES
        ================================================= */}

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/footer"
          element={<Footer />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/userrig"
          element={<Userrig />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

        <Route
          path="/safety"
          element={<Safety />}
        />


        {/* =================================================
            LOGIN ROUTES
        ================================================= */}

        <Route
          path="/customer-login"
          element={<CustomerLogin />}
        />

        <Route
          path="/worker-login"
          element={<WorkerLogin />}
        />


        {/* =================================================
            WORKER PROTECTED ROUTES
        ================================================= */}

        <Route
          path="/worker-dashboard"
          element={
            <ProtectedRoute role="WORKER">
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/worker-profile"
          element={
            <ProtectedRoute role="WORKER">
              <WorkerProfile />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            CUSTOMER PROTECTED ROUTES
        ================================================= */}

        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute role="CUSTOMER">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/booking-credits"
          element={
            <ProtectedRoute role="CUSTOMER">
              <BookingCredits />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer-profile"
          element={
            <ProtectedRoute role="CUSTOMER">
              <CustomerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment-history"
          element={
            <ProtectedRoute role="CUSTOMER">
              <CustomerPayments />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;