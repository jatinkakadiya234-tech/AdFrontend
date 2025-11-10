import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import AnalyticsPage from './pages/AnalyticsPage'
import UsersPage from './pages/UsersPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import CreateAdPage from './pages/CreateAdPage'
import MyAdsPage from './pages/MyAdsPage'
import AdListPage from './pages/AdListPage'
import ActiveAdsPage from './pages/ActiveAdsPage'
import CategoriesPage from './pages/CategoriesPage'
import AdvertisersPage from './pages/AdvertisersPage'
import AuthContainer from './auth/AuthContainer'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!(token && user));
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Router>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <AuthContainer /> : <Navigate to="/dashboard" replace />} />
          <Route path="/register" element={!isAuthenticated ? <AuthContainer /> : <Navigate to="/dashboard" replace />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
            <Route path="users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            
            {/* Viewer Routes */}
            <Route path="ad-list" element={<ProtectedRoute><AdListPage /></ProtectedRoute>} />
            <Route path="active-ads" element={<ProtectedRoute><ActiveAdsPage /></ProtectedRoute>} />
            
            {/* Advertiser Routes */}
            <Route path="create-ad" element={<ProtectedRoute><CreateAdPage /></ProtectedRoute>} />
            <Route path="my-ads" element={<ProtectedRoute><MyAdsPage /></ProtectedRoute>} />
            <Route path="create-category" element={<ProtectedRoute><div className="p-6"><h1 className="text-2xl font-bold">Create Category</h1></div></ProtectedRoute>} />
            <Route path="categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="advertisers" element={<ProtectedRoute><AdvertisersPage /></ProtectedRoute>} />
          </Route>
        </Routes>
    </Router>
  )
}

export default App
