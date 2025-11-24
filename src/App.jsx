import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import AuthContainer from "./auth/AuthContainer";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthTest from "./components/AuthTest";
import { appRoutes } from "./Routes/Routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      localStorage.clear();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => checkAuthStatus();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            !isAuthenticated ? <LandingPage /> : <Navigate to="/app/dashboard" replace />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <AuthContainer onAuthSuccess={handleAuthSuccess} />
            ) : (
              <Navigate to="/app/dashboard" replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <AuthContainer onAuthSuccess={handleAuthSuccess} />
            ) : (
              <Navigate to="/app/dashboard" replace />
            )
          }
        />
        <Route path="/auth-test" element={<AuthTest />} />

        {/* App Layout Routes */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          {appRoutes.map(({ path, element, protected: isProtected, role }) => {
            const routeElement = isProtected ? (
              <ProtectedRoute requiredRole={role}>{element}</ProtectedRoute>
            ) : (
              element
            );

            return <Route key={path} path={path} element={routeElement} />;
          })}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
