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
import AdViewerPage from './pages/AdViewerPage'
import JoinRequestPage from './pages/JoinRequestPage'
import CreateCategoryPage from './pages/CreateCategoryPage'
import WalletPage from './pages/WalletPage'
import ImpressionDashboard from './pages/ImpressionDashboard'
import EmbedCodePage from './pages/EmbedCodePage'
import TestPage from './pages/TestPage'
import AdGalleryPage from './pages/AdGalleryPage'
import PublisherDashboard from './pages/PublisherDashboard'
import AuthContainer from './auth/AuthContainer'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './components/LandingPage'
import AuthTest from './components/AuthTest'
import AdminCampaignPage from './pages/AdminCampaignPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
      setUser(null);
      // Clear corrupted data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    checkAuthStatus();
  };

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
          {/* Public Routes */}
          <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/app/dashboard" replace />} />
          <Route path="/login" element={!isAuthenticated ? <AuthContainer onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/app/dashboard" replace />} />
          <Route path="/register" element={!isAuthenticated ? <AuthContainer onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/app/dashboard" replace />} />
          <Route path="/join-request" element={<JoinRequestPage />} />
          <Route path="/ads" element={<AdViewerPage />} />
          <Route path="/gallery" element={<AdGalleryPage />} />
          <Route path="/embed-code/:id" element={<EmbedCodePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/auth-test" element={<AuthTest />} />
          <Route path="/create-category" element={<Navigate to="/app/create-category" replace />} />
          
          <Route path="/app" element={<Layout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
            <Route path="users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            
            {/* Public/Viewer Routes */}
            <Route path="ad-list" element={<ProtectedRoute><AdListPage /></ProtectedRoute>} />
            <Route path="active-ads" element={<ProtectedRoute><ActiveAdsPage /></ProtectedRoute>} />
            <Route path="ad-viewer" element={<AdViewerPage />} />
            
            {/* Advertiser Routes */}
            <Route path="create-ad" element={<CreateAdPage />} />
            <Route path="my-ads" element={<ProtectedRoute><MyAdsPage /></ProtectedRoute>} />
            <Route path="create-category" element={<ProtectedRoute><CreateCategoryPage /></ProtectedRoute>} />
            <Route path="categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
            <Route path="wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
            <Route path="impressions" element={<ProtectedRoute><ImpressionDashboard /></ProtectedRoute>} />
            
            {/* Publisher Routes */}
            <Route path="publisher" element={<ProtectedRoute><PublisherDashboard /></ProtectedRoute>} />
            
            {/* Shared Routes */}
            <Route path="analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
            
            {/* Admin Routes */}
            <Route path="advertisers" element={<ProtectedRoute><AdvertisersPage /></ProtectedRoute>} />
            <Route path="admin-campaigns" element={<ProtectedRoute requiredRole="admin"><AdminCampaignPage /></ProtectedRoute>} />
          </Route>
        </Routes>
    </Router>
  )
}

export default App
