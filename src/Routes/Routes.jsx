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
import AllCampaignsPage from "../pages/Publisher/AdCampaigns/AllCampaignsPage";
import DraftCampaignsPage from "../pages/Publisher/AdCampaigns/DraftCampaignsPage";
import AddCampaignsPage from "../pages/Publisher/AdCampaigns/AddCampaignsPage";
import CreativesLibraryPage from "../pages/Publisher/CreativesLibrary/CreativesLibraryPage";
import { elements } from "chart.js";
import ReportsAnalyticsPage from "../pages/Publisher/Reports/ReportsAnalyticsPage";
import EarningsOverviewPage from "../pages/Publisher/Billing/EarningsOverviewPage";
import TransactionHistoryPage from "../pages/Publisher/Billing/TransactionHistoryPage";
import PaymentSettingsPage from "../pages/Publisher/Billing/PaymentSettingsPage";
import ProfileSettingsPage from "../pages/Publisher/Account/ProfileSettingsPage";
import HelpAndSupportPage from "../pages/Publisher/Support/HelpAndSupportPage";
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard";
import PublisherDetailProfile from "../pages/Admin/Publisher/PublisherDetailProfile";
import PublishersList from "../pages/Admin/Publisher/PublishersList";
import PublisherKYCReview from "../pages/Admin/Publisher/PublisherKYCReview";
import CampaignsList from "../pages/Admin/Campaigns/CampaignList";
import CampaignReviewDetail from "../pages/Admin/Campaigns/CampaignReviewDetail";
import ViewerProfile from "../pages/Admin/Viewers/ViewerProfile";
import ViewersList from "../pages/Admin/Viewers/ViewersList";
import PlatformVerificationDetail from "../pages/Admin/Viewers/PlatformVerificationDetail";
import ReportsAnalytics from "../pages/Admin/Finance/ReportsAnalytics";
import ApprovalQueueDashboard from "../pages/Admin/Approval-Queue/ApprovalQueueDashboard";
import BlockedEntities from "../pages/Admin/Settings/BlockedPublisher";
import CommunicationCenter from "../pages/Admin/Communication/CommunicationCenter";
import AnnouncementsPage from "../pages/Admin/Communication/AnnouncementPage";
import EmailCampaignsPage from "../pages/Admin/Communication/EmailCampaignsPage";
import SupportTicketsPage from "../pages/Admin/Communication/SupportTicketsPage";
import ChatMessagingPage from "../pages/Admin/Communication/ChatMessagingPage";
import PublisherPaymentsPage from "../pages/Admin/Finance/PublisherPaymentsPage";
import ViewerPayoutsPage from "../pages/Admin/Finance/ViewerPayoutPage";
import TransactionLogsPage from "../pages/Admin/Finance/TransactionLogsPage";
import RevenueOverviewPage from "../pages/Admin/Finance/RevenewOverviewPage";
import UserReportsPage from "../pages/Admin/Reports/UserReportsPage";
import CampaignReportsPage from "../pages/Admin/Reports/CampaignReports";
import FinancialReportsPage from "../pages/Admin/Reports/FinancialReports";
import LandingPage from "../pages/Common/LandingPage";


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
    path: "publisher-campaigns",
    element: <AllCampaignsPage />,
    protected: true,
  },
  {
    path: "draft-campaigns",
    element: <DraftCampaignsPage />,
    protected: true,
  },
  {
    path: "create-campaign",
    element: <AddCampaignsPage />,
    protected: true,
  },
  {
    path: "creative-library",
    element: <CreativesLibraryPage />,
    protected: true,
  },
  {
    path: "reports-analytics",
    element: <ReportsAnalyticsPage />,
    protected: true
  },
  {
    path: "transaction-history",
    element: <TransactionHistoryPage />,
    protected: true
  },
  {
    path: "earning-overview",
    element: <EarningsOverviewPage />,
    protected: true
  },
  {
    path: "payment-settings",
    element: <PaymentSettingsPage />,
    protected: true
  },
  {
    path: "profile-settings",
    element: <ProfileSettingsPage />,
    protected: true
  },
  {
    path: "help-and-support",
    element: <HelpAndSupportPage />,
    protected: true
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
    path: "",
    element: <LandingPage />
  },
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
    path: "admin-dashboard",
    element: <AdminDashboard />,
    protected: true,
    role: "admin",
  },
  {
    path: "publisher-detail",
    element: <PublisherDetailProfile />,
    protected: true,
    role: "admin",
  },
  {
    path: "publisher-list",
    element: <PublishersList />,
    protected: true,
    role: "admin",
  },
  {
    path: "publisher-kyc",
    element: <PublisherKYCReview />,
    protected: true,
    role: "admin",
  },
  {
    path: "campaign-review",
    element: <CampaignReviewDetail />,
    protected: true,
    role: "admin",
  },
  {
    path: "campaign-list",
    element: <CampaignsList />,
    protected: true,
    role: "admin"
  },
  {
    path: "viewers-profile",
    element: <ViewerProfile />,
    protected: true,
    role: "admin"
  },
  {
    path: "viewers-list",
    element: <ViewersList />,
    protected: true,
    role: "admin"
  },
  {
    path: "platform-verification",
    element: <PlatformVerificationDetail />,
    protected: true,
    role: "admin"
  },
  {
    path: "admin-reports",
    element: <ReportsAnalytics />,
    protected: true,
    role: "admin"
  },
  {
    path: "admin-approval-queue",
    element: <ApprovalQueueDashboard />,
    protected: true,
    role: "admin"
  },
  {
    path: "security/blocked-publishers",
    element: <BlockedEntities />,
    protected: true,
    role: "admin"
  },
  {
    path: "admin-communication",
    element: <CommunicationCenter />,
    protected: true,
    role: "admin"
  },
  {
    path: "communications/announcements",
    element: <AnnouncementsPage />,
    protected: true,
    role: "admin"
  }, {
    path: "communications/emails",
    element: <EmailCampaignsPage />,
    protected: true,
    role: "admin"
  }, {
    path: "communications/support",
    element: <SupportTicketsPage />,
    protected: true,
    role: "admin"
  }, {
    path: "communications/live-chat",
    element: <ChatMessagingPage />,
    protected: true,
    role: "admin"
  }, {
    path: "finance/revenue-overview",
    element: <RevenueOverviewPage />,
    protected: true,
    role: "admin"
  }, {
    path: "finance/publisher-payment",
    element: <PublisherPaymentsPage />,
    protected: true,
    role: "admin"
  }, {
    path: "finance/transaction-logs",
    element: <TransactionLogsPage />,
    protected: true,
    role: "admin"
  },
  {
    path: "finance/viewer-payout",
    element: <ViewerPayoutsPage />,
    protected: true,
    role: "admin"
  },
  {
    path: "reports/financial-reports",
    element: <FinancialReportsPage />,
    protected: true,
    role: "admin"
  },
  {
    path: "reports/campaign-reports",
    element: <CampaignReportsPage />,
    protected: true,
    role: "admin"
  },
  {
    path: "reports/user-reports",
    element: <UserReportsPage />,
    protected: true,
    role: "admin"
  },








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
