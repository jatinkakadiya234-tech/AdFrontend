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
import PaymentMethods from "../pages/Viewer/Billing/PaymentMethod";
import PaymentHistory from "../pages/Viewer/Billing/PaymentHistory";
import Invoices from "../pages/Viewer/Billing/Invoices";
import SetupGuide from "../pages/Viewer/Integration/java/SetupGuide";
import GradleDependency from "../pages/Viewer/Integration/java/GradleDependecy";
import AndroidManifest from "../pages/Viewer/Integration/java/AndroidManifest";
import Advanced from "../pages/Viewer/Integration/java/Advanced";
import FlutterSetupGuide from "../pages/Viewer/Integration/flutter/FlutterSetupGuide";
import FlutterPubDev from "../pages/Viewer/Integration/flutter/FlutterPubDev";
import FlutterDartExamples from "../pages/Viewer/Integration/flutter/FlutterExamples";
import FlutterAdvanced from "../pages/Viewer/Integration/flutter/FlutterAdvanced";
import IOSSetupGuide from "../pages/Viewer/Integration/swift/IOSSetupGuide";
import IOSImplementationExamples from "../pages/Viewer/Integration/swift/IOSExamples";
import IOSAdvanced from "../pages/Viewer/Integration/swift/IOSAdvanced";
import IOSDelegateMethods from "../pages/Viewer/Integration/swift/IOSDelegate";
import ContactSupport from "../pages/Viewer/Support/ContactSupport";
import HelpCenter from "../pages/Viewer/Support/HelpCenter";
import Documentation from "../pages/Viewer/Support/Documentation";
import KYCForm from "../components/KYCForm/KYCForm";
import PublisherDashboardPage from "../pages/Publisher/Dashboard/PublisherDashboardPage";

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
  }, {
    path: "performance-reports",
    element: <PerformanceReports />,
    protected: true,
  }, {
    path: "custom-reports",
    element: <CustomReports />,
    protected: true,
  },
  {
    path: "property-management",
    element: <PropertyManagement />,
    protected: true,
  },
  {
    path: "payment-method",
    element: <PaymentMethods />,
    protected: true,
  },
  {
    path: "payment-history",
    element: <PaymentHistory />,
    protected: true,
  },
  {
    path: "invoices",
    element: <Invoices />,
    protected: true,
  },
  {
    path: "java-setup",
    element: <SetupGuide />,
    protected: true,
  },
  {
    path: "java-gradle",
    element: <GradleDependency />,
    protected: true,
  },
  {
    path: "java-manifest",
    element: <AndroidManifest />,
    protected: true,
  },
  {
    path: "java-advanced",
    element: <Advanced />,
    protected: true,
  },
  {
    path: "flutter-setup",
    element: <FlutterSetupGuide />,
    protected: true,
  }, {
    path: "flutter-pubdev",
    element: <FlutterPubDev />,
    protected: true,
  },
  {
    path: "flutter-advanced",
    element: <FlutterAdvanced />,
    protected: true,
  },
   {
    path: "flutter-examples",
    element: <FlutterDartExamples />,
    protected: true,
  },
  {
    path: "ios-setup",
    element: <IOSSetupGuide />,
    protected: true,
  },
   {
    path: "ios-examples",
    element: <IOSImplementationExamples />,
    protected: true,
  }, {
    path: "ios-advanced",
    element: <IOSAdvanced />,
    protected: true,
  }, {
    path: "ios-delegate",
    element: <IOSDelegateMethods />,
    protected: true,
  },


   {
    path: "help-center",
    element: <HelpCenter />,
    protected: true,
  }, {
    path: "contact",
    element: <ContactSupport />,
    protected: true,
  }, {
    path: "documentation",
    element: <Documentation />,
    protected: true,
  },



  // ===== Publisher Routes =====

  {
    path: "kyc",
    element: <KYCForm />,
    protected: true,
  },
  {
    path: "publisher-dashboard",
    element: <PublisherDashboardPage />,
    protected: true,
  },
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
