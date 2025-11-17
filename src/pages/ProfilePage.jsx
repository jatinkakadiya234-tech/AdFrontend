import { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        username: parsedUser.username || '',
        email: parsedUser.email || '',
        role: parsedUser.role || ''
      });
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold mx-auto sm:mx-0">
              {getInitials(user?.username)}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{user?.username}</h1>
              <p className="text-blue-100 capitalize text-sm sm:text-base">{user?.role} Account</p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Profile Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-sm sm:text-base"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{user?.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">{user?.email}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg capitalize">{user?.role}</p>
            </div>

            {/* User ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
              <p className="text-gray-900 bg-gray-50 px-3 py-2 rounded-lg font-mono text-sm">{user?.id}</p>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Account Stats */}
        <div className="border-t border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 text-sm sm:text-base">Account Status</h4>
              <p className="text-xs sm:text-sm text-blue-700 mt-1">Active</p>
            </div>
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-medium text-green-900 text-sm sm:text-base">Member Since</h4>
              <p className="text-xs sm:text-sm text-green-700 mt-1">January 2024</p>
            </div>
            <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 text-sm sm:text-base">Last Login</h4>
              <p className="text-xs sm:text-sm text-purple-700 mt-1">Today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;