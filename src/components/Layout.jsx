import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  MdDashboard, 
  MdList, 
  MdCheckCircle, 
  MdAnalytics, 
  MdAdd, 
  MdDescription, 
  MdCategory, 
  MdSettings, 
  MdGroup, 
  MdPerson 
} from 'react-icons/md';
import Apihelper from '../service/Apihelper';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Debug: Check user data
    console.log('User data:', userData);
    console.log('Cookies (limited access):', document.cookie);
  }, []);

  const handleLogout = async () => {
    try {
      await Apihelper.Logout();
    } catch (error) {
      console.log('Logout API error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getNavItemsForRole = (role) => {
    switch (role) {
      case 'viewer':
        return [
          { name: 'Dashboard', path: '/dashboard', icon: MdDashboard },
          { name: 'Ad List', path: '/ad-list', icon: MdList },
          { name: 'Active Ads', path: '/active-ads', icon: MdCheckCircle },
          { name: 'Analytics', path: '/analytics', icon: MdAnalytics }
        ];
      case 'advertiser':
        return [
          { name: 'Dashboard', path: '/dashboard', icon: MdDashboard },
          { name: 'Create Ad', path: '/create-ad', icon: MdAdd },
          { name: 'My Ads', path: '/my-ads', icon: MdDescription },
          { name: 'Analytics', path: '/analytics', icon: MdAnalytics },
          { name: 'Categories', path: '/categories', icon: MdCategory },
          { name: 'Settings', path: '/settings', icon: MdSettings }
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/dashboard', icon: MdDashboard },
          { name: 'Advertisers', path: '/advertisers', icon: MdGroup },
          { name: 'Users', path: '/users', icon: MdPerson },
          { name: 'Analytics', path: '/analytics', icon: MdAnalytics },
          { name: 'Settings', path: '/settings', icon: MdSettings }
        ];
      default:
        return [
          { name: 'Dashboard', path: '/dashboard', icon: MdDashboard }
        ];
    }
  };

  const navItems = getNavItemsForRole(user?.role);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800 ml-2">Dashboard</h1>
          </div>
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {getInitials(user?.username)}
              </div>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                <div className="py-1">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">{user?.username || 'User'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                  </div>
                  <button 
                    onClick={() => navigate('/profile')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Profile
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static top-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out h-full md:h-full`}>
          <nav className="mt-8 px-4 h-full overflow-y-auto">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <item.icon className="text-lg" />
                    <span>{item.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Profile Dropdown Overlay */}
      {profileOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setProfileOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;