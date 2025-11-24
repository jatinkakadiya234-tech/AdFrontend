// src/routes/routes.js
import DashboardPage from "../pages/Common/DashboardPage";
import AnalyticsPage from "../pages/Viewer/Reports/ReportsOverview";
import UsersPage from "../pages/Admin/UsersPage";
import SettingsPage from "../pages/Common/SettingsPage";
import ProfilePage from "../pages/Common/ProfilePage";
import CreateAdPage from "../pages/Publisher/CreateAdPage";
import MyAdsPage from "../pages/Publisher/MyAdsPage";
import CategoriesPage from "../pages/Publisher/CategoriesPage";
import AdvertisersPage from "../pages/Admin/AdvertisersPage";
import AdViewerPage from "../pages/Admin/AdViewerPage";
import JoinRequestPage from "../pages/JoinRequestPage";
import CreateCategoryPage from "../pages/Publisher/CreateCategoryPage";
import WalletPage from "../pages/Publisher/WalletPage";
import ImpressionDashboard from "../pages/Publisher/ImpressionDashboard";
import EmbedCodePage from "../pages/EmbedCodePage";
import TestPage from "../pages/TestPage";
import PublisherDashboard from "../pages/Publisher/PublisherDashboard";
import GettingStartedPage from "../pages/Viewer/Support/GettingStartedPage";
import AdUnitsPage from "../pages/Viewer/AdUnit/AdUnitPage";
import AdminCampaignPage from "../pages/Admin/AdminCampaignPage";
import ComparisonReports from "../pages/Viewer/Reports/ComparisonReports";
import PerformanceReports from "../pages/Viewer/Reports/PerformanceReports";
import CustomReports from "../pages/Viewer/Reports/CustomReports";
import PropertyManagement from "../pages/Viewer/ManagePlatforms/PropertyManagement";

export const appRoutes = [
  // ===== Dashboard =====
  {
    path: "dashboard",
    element: <DashboardPage />,
    protected: true,
  },

  // ===== Analytics =====
  {
    path: "analytics",
    element: <AnalyticsPage />,
    protected: true,
  },

  // ===== Viewer Routes =====
  {
    path: "unit",
    element: <AdUnitsPage />,
    protected: true,
  },
  {
    path: "getting-started",
    element: <GettingStartedPage />,
    protected: true,
  },
  {
    path: "comparison-reports",
    element: <ComparisonReports />,
    protected: true,
  },{
    path: "performance-reports",
    element: <PerformanceReports />,
    protected: true,
  },{
    path: "custom-reports",
    element: <CustomReports />,
    protected: true,
  },
  {
    path: "property-management",
    element: <PropertyManagement />,
    protected: true,
  },


  // ===== Publisher Routes =====
  {
    path: "create-ad",
    element: <CreateAdPage />,
    protected: true,
  },
  {
    path: "my-ads",
    element: <MyAdsPage />,
    protected: true,
  },
  {
    path: "categories",
    element: <CategoriesPage />,
    protected: true,
  },
  {
    path: "create-category",
    element: <CreateCategoryPage />,
    protected: true,
  },
  {
    path: "wallet",
    element: <WalletPage />,
    protected: true,
  },
  {
    path: "impressions",
    element: <ImpressionDashboard />,
    protected: true,
  },
  {
    path: "publisher",
    element: <PublisherDashboard />,
    protected: true,
  },

  // ===== Common Routes =====
  {
    path: "settings",
    element: <SettingsPage />,
    protected: true,
  },
  {
    path: "profile",
    element: <ProfilePage />,
    protected: true,
  },

  // ===== Admin Routes =====
  {
    path: "users",
    element: <UsersPage />,
    protected: true,
    role: "admin",
  },
  {
    path: "advertisers",
    element: <AdvertisersPage />,
    protected: true,
    role: "admin",
  },
  {
    path: "admin-campaigns",
    element: <AdminCampaignPage />,
    protected: true,
    role: "admin",
  },

  // ===== Public Utility Routes =====
  {
    path: "ad-viewer",
    element: <AdViewerPage />,
  },
  {
    path: "join-request",
    element: <JoinRequestPage />,
  },
  {
    path: "embed-code/:id",
    element: <EmbedCodePage />,
  },
  {
    path: "test",
    element: <TestPage />,
  },
];
