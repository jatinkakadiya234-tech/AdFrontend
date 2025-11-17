const SettingsPage = () => {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Profile Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base" defaultValue="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base" defaultValue="john@example.com" />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full sm:w-auto text-sm sm:text-base">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;