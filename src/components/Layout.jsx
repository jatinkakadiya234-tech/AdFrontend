import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  MdDashboard,
  MdAnalytics,
  MdReport,
  MdDescription,
  MdPayments,
  MdAccountBalanceWallet,
  MdList,
  MdManageAccounts,
  MdSettings,
  MdSupport,
  MdCheckCircle,
  MdGroup,
  MdAccountCircle,
  MdLogout,
  MdCode,
  MdWeb,
  MdDownload,
  MdIntegrationInstructions,
  MdExpandMore,
  MdChevronRight,
  MdApps,
  MdLanguage,
  MdSmartphone,
  MdAdd,
  MdVisibility,
  MdPerson,
  MdOutlineDrafts
} from 'react-icons/md';
import { SiOpenjdk, SiFlutter } from 'react-icons/si';
import { FaApple, FaReact, FaBullhorn } from 'react-icons/fa';
import {
  PiBracketsCurlyLight,
  PiPuzzlePieceLight,
} from 'react-icons/pi';
import {
  Smartphone as LucideSmartphone,
  Wrench as LucideWrench,
  FileText,
  BarChart3,
  CreditCard,
  Users,
  HelpCircle,
  BookOpen,
  List,
  Plus,
  Wallet,
  TrendingUp,
  Settings,
  Settings2,
  User2,
  Layers,
  Layers2,
  Lock,
  Image,
  LayoutDashboard,
  LayoutDashboardIcon,
  Users2,
  FileCheck,
  UserCircle,
  Megaphone,
  FileSearch,
  Eye,
  CheckSquare,
  UserCheck,
  ClipboardCheck,
  DollarSign,
  Receipt,
  PieChart,
  FileBarChart,
  LineChart,
  Bell,
  Mail,
  Headphones,
  MessageSquare,
  Shield,
  Ban,
} from 'lucide-react';
import Apihelper from '../service/Apihelper';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      console.log('Checking user auth:', { userData: !!userData, token: !!token });

      if (!userData || !token) {
        console.log('No auth data, redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        console.log('Parsed user:', parsedUser);
        if (!parsedUser.id || !parsedUser.role) {
          console.log('Invalid user data');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          return;
        }
        setUser(parsedUser);
      } catch (error) {
        console.log('JSON parse error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await Apihelper.Logout();
    } catch (error) {
      console.log('Logout API error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setProfileOpen(false);
      setSidebarOpen(false);
      window.location.href = '/';
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const toggleExpanded = (itemName, level = 0) => {
    const newExpanded = new Set(expandedItems);

    if (!newExpanded.has(itemName)) {
      if (level === 0) {
        const mainLevelItems = new Set();
        navItems.forEach(item => {
          if (newExpanded.has(item.name) && item.name !== itemName) {
            mainLevelItems.add(item.name);
          }
        });
        mainLevelItems.forEach(item => newExpanded.delete(item));
      }
    }

    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const isItemActive = (item) => {
    if (item.path && location.pathname === item.path) return true;
    if (item.subOptions) {
      return item.subOptions.some(subItem =>
        subItem.path === location.pathname ||
        (subItem.subOptions && subItem.subOptions.some(subSubItem =>
          subSubItem.path === location.pathname ||
          (subSubItem.subOptions && subSubItem.subOptions.some(subSubSubItem =>
            subSubSubItem.path === location.pathname
          ))
        ))
      );
    }
    return false;
  };

  const getNavItemsForRole = (role) => {
    const baseItems = {
      viewer: [
        {
          name: 'Dashboard',
          path: '/app/dashboard',
          icon: MdDashboard,
        },
        {
          name: 'Analytics & Reports',
          icon: BarChart3,
          subOptions: [
            { name: 'Overview', path: '/app/analytics', icon: MdDashboard },
            { name: 'Performance Reports', path: '/app/performance-reports', icon: MdReport },
            { name: 'Comparison Reports', path: '/app/comparison-reports', icon: MdAnalytics },
            { name: 'Custom Reports', path: '/app/custom-reports', icon: FileText },
          ],
        },
        {
          name: 'Ad Unit Management',
          path: '/app/unit',
          icon: FaBullhorn,
        },
        {
          name: 'Integration',
          icon: MdIntegrationInstructions,
          subOptions: [
            {
              name: 'Website',
              icon: MdWeb,
              subOptions: [
                { name: 'Quick Start', path: '/app/web-sdk-installation', icon: MdDownload },
                { name: 'Script Installation', path: '/app/web-script-installation', icon: MdCode },
                { name: 'Code Examples', path: '/app/web-code-examples', icon: PiBracketsCurlyLight },
                { name: 'Advanced Configuration', path: '/app/web-advanced-config', icon: MdSettings },
              ],
            },
            {
              name: 'Java',
              icon: SiOpenjdk,
              subOptions: [
                { name: 'Setup Guide', path: '/app/java-setup', icon: MdDownload },
                { name: 'Gradle Dependency', path: '/app/java-gradle', icon: MdCode },
                { name: 'AndroidManifest', path: '/app/java-manifest', icon: MdSettings },
                { name: 'Advanced', path: '/app/java-advanced', icon: LucideWrench },
              ],
            },
            {
              name: 'Flutter',
              icon: SiFlutter,
              subOptions: [
                { name: 'Setup Guide', path: '/app/flutter-setup', icon: MdDownload },
                { name: 'Pub.dev Setup', path: '/app/flutter-pubdev', icon: PiPuzzlePieceLight },
                { name: 'Dart Examples', path: '/app/flutter-examples', icon: MdCode },
                { name: 'Advanced', path: '/app/flutter-advanced', icon: MdSettings },
              ],
            },
            {
              name: 'iOS',
              icon: FaApple,
              subOptions: [
                { name: 'Setup Guide', path: '/app/ios-setup', icon: MdDownload },
                { name: 'Implementation Example', path: '/app/ios-examples', icon: MdCode },
                { name: 'Delegate Method', path: '/app/ios-delegate', icon: PiBracketsCurlyLight },
                { name: 'Advanced', path: '/app/ios-advanced', icon: LucideSmartphone },
              ],
            },
            {
              name: 'React Native',
              icon: FaReact,
              subOptions: [
                { name: 'Setup Guide', path: '/app/react-native-setup', icon: MdDownload },
                { name: 'NPM Package', path: '/app/react-native-npm', icon: MdCode },
                { name: 'Native Module', path: '/app/react-native-module', icon: PiBracketsCurlyLight },
              ],
            },
          ],
        },
        {
          name: 'Manage Platforms',
          icon: MdApps,
          path: '/app/property-management',
        },
        {
          name: 'Billing & Payments',
          icon: CreditCard,
          subOptions: [
            { name: 'Payment Methods', path: '/app/payment-method', icon: MdAccountBalanceWallet },
            { name: 'Billing History', path: '/app/payment-history', icon: MdList },
            { name: 'Invoices', path: '/app/invoices', icon: FileText },
          ],
        },
        {
          name: 'Support & Resources',
          icon: HelpCircle,
          subOptions: [
            { name: 'Help Center', path: '/app/help-center', icon: MdSupport },
            { name: 'Contact Support', path: '/app/contact', icon: Users },
            { name: 'Documentation', path: '/app/documentation', icon: BookOpen },
          ],
        },
      ],
      publisher: [
        {
          name: 'Dashboard',
          path: '/app/publisher-dashboard',
          icon: MdDashboard,
        },
        {
          name: 'Ad Campaigns',
          icon: MdDescription,
          subOptions: [
            { name: 'All Campaigns', path: '/app/publisher-campaigns', icon: List },
            { name: 'Create New Campaign', path: '/app/create-campaign', icon: Plus },
            { name: 'Draft Campaigns', path: '/app/draft-campaigns', icon: MdOutlineDrafts },
          ],
        },
        {
          name: 'Creatives Library',
          path: '/app/creative-library',
          icon: Image,
        },
        {
          name: 'Reports & Analytics',
          path: '/app/reports-analytics',
          icon: BarChart3,
        },
        {
          name: 'Payments',
          icon: Wallet,
          subOptions: [
            { name: 'Earnings Overview', path: '/app/earning-overview', icon: TrendingUp },
            { name: 'Transaction History', path: '/app/transaction-history', icon: CreditCard },
            { name: 'Payment Settings', path: '/app/payment-settings', icon: Settings2 },
          ],
        },
        {
          name: 'Account Settings',
          icon: Settings,
          path: '/app/profile-settings',
        },
        {
          name: 'Help & Support',
          icon: HelpCircle,
          path: '/app/help-and-support'
        },
      ],
      admin: [
        {
          name: 'Dashboard',
          path: '/app/admin-dashboard',
          icon: LayoutDashboardIcon,
        },

        {
          name: 'Publisher Management',
          icon: Users,
          subOptions: [
            { name: 'All Publishers', path: '/app/publisher-list', icon: Users2 },
            { name: 'KYC Review', path: '/app/publisher-kyc', icon: FileCheck },
            { name: 'Publisher Profiles', path: '/app/publisher-detail', icon: UserCircle },
          ],
        },

        {
          name: 'Campaign Management',
          icon: Megaphone,
          subOptions: [
            { name: 'All Campaigns', path: '/app/campaign-list', icon: Megaphone },
            { name: 'Campaign Review', path: '/app/campaign-review', icon: FileSearch },
          ],
        },

        {
          name: 'Viewer Management',
          icon: Eye,
          subOptions: [
            { name: 'All Viewers', path: '/app/viewers-list', icon: Eye },
            { name: 'Platform Verification', path: '/app/platform-verification', icon: CheckSquare },
            { name: 'Viewer Profiles', path: '/app/viewers-profile', icon: UserCheck },
          ],
        },

        {
          name: 'Approval Queue',
          path: '/app/admin-approval-queue',
          icon: ClipboardCheck,
        },

        {
          name: 'Financial Management',
          icon: DollarSign,
          subOptions: [
            { name: 'Revenue Overview', path: '/app/finance/revenue-overview', icon: BarChart3 },
            { name: 'Publisher Payments', path: '/app/finance/publisher-payment', icon: Wallet },
            { name: 'Viewer Payouts', path: '/app/finance/viewer-payout', icon: Users },
            { name: 'Transaction Logs', path: '/app/finance/transaction-logs', icon: FileText },
          ],
        },

        {
          name: 'Reports & Analytics',
          icon: BarChart3,
        subOptions: [
            { name: 'User Reports', path: '/app/reports/user-reports', icon: BarChart3 },
            { name: 'Campaign Reports', path: '/app/reports/campaign-reports', icon: Wallet },
            { name: 'Financial Reports ', path: '/app/reports/financial-reports', icon: Users },
          ],
        },

        {
          name: 'Communications',
          icon: Bell,
          subOptions: [
            { name: 'Announcements', path: '/app/communications/announcements', icon: Bell },
            { name: 'Email Campaigns', path: '/app/communications/emails', icon: Mail },
            { name: 'Support Tickets', path: '/app/communications/support', icon: Headphones },
            { name: 'Live Chat', path: '/app/communications/live-chat', icon: MessageSquare },
          ],
        },

        {
          name: 'Security',
          icon: Shield,
          subOptions: [
            // { name: 'Fraud Detection', path: '/app/security/fraud', icon: Shield },
            { name: 'Blocked Entities', path: '/app/security/blocked-publishers', icon: Ban },
            // { name: 'Audit Logs', path: '/app/security/audit', icon: FileText },
          ],
        },

        {
          name: 'Settings',
          path: '/app/settings',
          icon: Settings,
        },
      ]
    };

    return baseItems[role] || baseItems.viewer;
  };

  const navItems = user ? getNavItemsForRole(user.role) : [];

  const renderNavItem = (item, level = 0, parentKey = '') => {
    const hasSubOptions = item.subOptions && item.subOptions.length > 0;
    const isExpanded = expandedItems.has(item.name);
    const isActive = isItemActive(item);
    const itemKey = parentKey ? `${parentKey}-${item.name}` : item.name;

    // Standardized icon sizes based on level
    const getIconSizeClass = (currentLevel) => {
      switch (currentLevel) {
        case 0: return 'w-5 h-5'; // Main level
        case 1: return 'w-4 h-4'; // Second level
        case 2: return 'w-3.5 h-3.5'; // Third level
        case 3: return 'w-3 h-3'; // Fourth level
        default: return 'w-4 h-4';
      }
    };

    const iconSizeClass = getIconSizeClass(level);

    return (
      <div key={itemKey} className="mb-1">
        <div
          className={`
            flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer group
            ${isActive && !hasSubOptions
              ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-l-4 border-blue-600 shadow-sm'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }
            ${level > 0 ? 'ml-4 text-sm' : ''}
          `}
          onClick={() => {
            if (hasSubOptions) {
              toggleExpanded(item.name, level);
            } else if (item.path) {
              navigate(item.path);
              setSidebarOpen(false);
            }
          }}
        >
          <div className="flex items-center space-x-3 flex-1">
            <div className={`flex-shrink-0 ${iconSizeClass} flex items-center justify-center ${isActive && !hasSubOptions
              ? 'text-blue-600'
              : 'text-gray-500 group-hover:text-gray-700'
              }`}>
              <item.icon className={iconSizeClass} />
            </div>
            <span className={`font-medium ${level > 0 ? 'text-sm' : ''} ${isActive && !hasSubOptions ? 'text-blue-800' : 'text-gray-700'
              }`}>
              {item.name}
            </span>
          </div>

          {hasSubOptions && (
            <div className={`flex-shrink-0 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${isActive ? 'text-blue-600' : 'text-gray-400'
              }`}>
              <MdExpandMore className="w-4 h-4" />
            </div>
          )}
        </div>

        {hasSubOptions && isExpanded && (
          <div className="mt-1 space-y-1 overflow-hidden animate-slideDown">
            {item.subOptions.map((subItem) => {
              const isSubItemActive = location.pathname === subItem.path || (subItem.subOptions && subItem.subOptions.some(subSub => subSub.path === location.pathname));
              const hasSubSubOptions = subItem.subOptions && subItem.subOptions.length > 0;
              const isSubExpanded = expandedItems.has(subItem.name);
              const subItemKey = `${itemKey}-${subItem.name}`;
              const subIconSizeClass = getIconSizeClass(level + 1);

              return (
                <div key={subItemKey}>
                  <div
                    className={`
                      flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer group
                      ${isSubItemActive && !hasSubSubOptions
                        ? 'bg-gradient-to-r from-blue-50 to-blue-75 text-blue-700 border-l-2 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }
                      ml-6 text-sm
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (hasSubSubOptions) {
                        toggleExpanded(subItem.name, level + 1);
                      } else if (subItem.path) {
                        navigate(subItem.path);
                        setSidebarOpen(false);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`flex-shrink-0 ${subIconSizeClass} flex items-center justify-center ${isSubItemActive && !hasSubSubOptions
                        ? 'text-blue-600'
                        : 'text-gray-400 group-hover:text-gray-600'
                        }`}>
                        <subItem.icon className={subIconSizeClass} />
                      </div>
                      <span className={isSubItemActive && !hasSubSubOptions ? 'text-blue-800 font-medium' : ''}>
                        {subItem.name}
                      </span>
                    </div>

                    {hasSubSubOptions && (
                      <MdChevronRight className={`flex-shrink-0 w-3 h-3 text-gray-400 transform transition-transform ${isSubExpanded ? 'rotate-90' : ''
                        } ${isSubItemActive ? 'text-blue-500' : ''}`} />
                    )}
                  </div>

                  {hasSubSubOptions && isSubExpanded && (
                    <div className="mt-1 space-y-1 ml-6 animate-slideDown">
                      {subItem.subOptions.map((subSubItem) => {
                        const isSubSubActive = location.pathname === subSubItem.path || (subSubItem.subOptions && subSubItem.subOptions.some(subSubSub => subSubSub.path === location.pathname));
                        const hasSubSubSubOptions = subSubItem.subOptions && subSubItem.subOptions.length > 0;
                        const isSubSubExpanded = expandedItems.has(subSubItem.name);
                        const subSubItemKey = `${subItemKey}-${subSubItem.name}`;
                        const subSubIconSizeClass = getIconSizeClass(level + 2);

                        return (
                          <div key={subSubItemKey}>
                            <div
                              className={`
                                flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer text-sm group
                                ${isSubSubActive && !hasSubSubSubOptions
                                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-400'
                                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                }
                                ml-4
                              `}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (hasSubSubSubOptions) {
                                  toggleExpanded(subSubItem.name, level + 2);
                                } else if (subSubItem.path) {
                                  navigate(subSubItem.path);
                                  setSidebarOpen(false);
                                }
                              }}
                            >
                              <div className="flex items-center space-x-3 flex-1">
                                <div className={`flex-shrink-0 ${subSubIconSizeClass} flex items-center justify-center ${isSubSubActive && !hasSubSubSubOptions
                                  ? 'text-blue-600'
                                  : 'text-gray-400 group-hover:text-gray-600'
                                  }`}>
                                  <subSubItem.icon className={subSubIconSizeClass} />
                                </div>
                                <span className={isSubSubActive && !hasSubSubSubOptions ? 'text-blue-800 font-medium' : ''}>
                                  {subSubItem.name}
                                </span>
                              </div>

                              {hasSubSubSubOptions && (
                                <MdChevronRight className={`flex-shrink-0 w-2.5 h-2.5 text-gray-400 transform transition-transform ${isSubSubExpanded ? 'rotate-90' : ''
                                  } ${isSubSubActive ? 'text-blue-400' : ''}`} />
                              )}
                            </div>

                            {hasSubSubSubOptions && isSubSubExpanded && (
                              <div className="mt-1 space-y-1 ml-6 animate-slideDown">
                                {subSubItem.subOptions.map((subSubSubItem) => {
                                  const isSubSubSubActive = location.pathname === subSubSubItem.path;
                                  const subSubSubItemKey = `${subSubItemKey}-${subSubSubItem.name}`;
                                  const subSubSubIconSizeClass = getIconSizeClass(level + 3);

                                  return (
                                    <div
                                      key={subSubSubItemKey}
                                      className={`
                                        flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer text-xs group
                                        ${isSubSubSubActive
                                          ? 'bg-blue-25 text-blue-600 border-l border-blue-300'
                                          : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                                        }
                                        ml-4
                                      `}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(subSubSubItem.path);
                                        setSidebarOpen(false);
                                      }}
                                    >
                                      <div className={`flex-shrink-0 ${subSubSubIconSizeClass} flex items-center justify-center ${isSubSubSubActive
                                        ? 'text-blue-500'
                                        : 'text-gray-400 group-hover:text-gray-500'
                                        }`}>
                                        <subSubSubItem.icon className={subSubSubIconSizeClass} />
                                      </div>
                                      <span className={isSubSubSubActive ? 'text-blue-700 font-medium' : ''}>
                                        {subSubSubItem.name}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const SidebarUserInfo = () => (
    <div className="mt-auto border-t border-gray-200 bg-gray-50/50">
      <div className="px-4 pt-3">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-semibold text-sm">
              {getInitials(user?.username)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.username || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate capitalize">
              {user?.role || 'User'} Account
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
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
    <div className="h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800 ml-2">ST Zk AdSense</h1>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <span className='font-lg'>Welcome,</span>
              <span className="font-medium text-gray-800">{user?.username}</span>
            </div>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm">
                  {getInitials(user?.username)}
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 animate-fadeIn">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user?.username || 'User'}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigate('/app/profile');
                        setProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <MdAccountCircle className="w-4 h-4" />
                      <span>View Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <MdLogout className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static top-0 left-0 z-50 w-64 bg-white shadow-xl border-r transition-transform duration-300 ease-in-out h-full md:h-full flex flex-col`}>
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-2">
              {navItems.map((item) => renderNavItem(item))}
            </div>
          </nav>

          <SidebarUserInfo />
        </aside>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50/50">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {profileOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setProfileOpen(false)}
        ></div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.15s ease-out;
        }
        .bg-blue-25 {
          background-color: #f8faff;
        }
      `}</style>
    </div>
  );
};

export default Layout;