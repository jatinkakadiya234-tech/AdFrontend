import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import LandingPage from "./pages/Common/LandingPage";
import AdminLogin from "./pages/auth/AdminLogin";
import PublisherAuth from "./pages/auth/PublisherAuth";
import ViewerAuth from "./pages/auth/ViewerAuth";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { appRoutes } from "./Routes/Routes";
import { isAuthenticated, getCurrentUser, getUserRole } from "./utils/authUtils";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Small delay to check authentication status
    setTimeout(() => setLoading(false), 300);
  }, []);

  // Component to redirect authenticated users from auth pages
  const RedirectIfAuthenticated = ({ children }) => {
    if (isAuthenticated()) {
      const role = getUserRole();
      const redirectMap = {
        admin: '/app/admin-dashboard',
        publisher: '/app/publisher-dashboard',
        viewer: '/app/dashboard'
      };
      return <Navigate to={redirectMap[role] || '/app/dashboard'} replace />;
    }
    return children;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* ===== Public Landing Page ===== */}
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <LandingPage />
            </RedirectIfAuthenticated>
          }
        />

        {/* ===== Authentication Routes ===== */}
        <Route
          path="/auth/admin"
          element={
            <RedirectIfAuthenticated>
              <AdminLogin />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/auth/publisher"
          element={
            <RedirectIfAuthenticated>
              <PublisherAuth />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/auth/viewer"
          element={
            <RedirectIfAuthenticated>
              <ViewerAuth />
            </RedirectIfAuthenticated>
          }
        />

        {/* ===== Legacy Auth Routes (Redirect to Landing) ===== */}
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />

        {/* ===== Protected App Routes ===== */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          
          {appRoutes.map(({ path, element, protected: isProtected, role }) => {
            // All routes inside /app are protected by Layout's ProtectedRoute
            // Only add role-specific protection if specified
            const routeElement = role ? (
              <ProtectedRoute requiredRole={role}>{element}</ProtectedRoute>
            ) : (
              element
            );

            return <Route key={path} path={path} element={routeElement} />;
          })}
        </Route>

        {/* ===== Fallback Route ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
