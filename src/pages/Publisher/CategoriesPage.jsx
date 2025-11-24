import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Apihelper from '../../service/Apihelper';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAds, setModalAds] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editActive, setEditActive] = useState(true);
  const [editType, setEditType] = useState('banner');
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchCategories();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Refresh when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchCategories();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await Apihelper.GetCategoryStats();
      console.log('Categories response:', response.data);
      
      const categoriesData = response.data.categories || [];
      const categoriesWithColors = categoriesData.map((cat, index) => ({
        ...cat,
        count: cat.adCount || 0,
        color: ['bg-blue-500', 'bg-pink-500', 'bg-orange-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 'bg-indigo-500', 'bg-yellow-500'][index % 8]
      }));
      setCategories(categoriesWithColors);
    } catch (err) {
      console.error('Fetch categories error:', err);
      setError(err.response?.data?.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, category) => {
    if (!category.active) {
      setError('Inactive category cannot be deleted. Only status can be changed.');
      setTimeout(() => setError(''), 3000);
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this active category?')) {
      try {
        await Apihelper.DeleteCategory(id);
        fetchCategories();
        setError('');
      } catch (err) {
        console.error('Delete category error:', err);
        setError(err.response?.data?.message || 'Failed to delete category');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setShowModal(true);
    setModalLoading(true);
    
    try {
      const response = await Apihelper.GetAdsByCategory(category._id);
      setModalAds(response.data.ads || []);
    } catch (error) {
      console.error('Error fetching category ads:', error);
      setModalAds([]);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setModalAds([]);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditDescription(category.description || '');
    setEditActive(category.active);
    setEditType(category.type || 'banner');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      await Apihelper.UpdateCategory(editingCategory._id, {
        name: editName,
        description: editDescription,
        active: editActive,
        type: editType
      });
      setEditingCategory(null);
      fetchCategories();
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update category');
      setTimeout(() => setError(''), 3000);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Ad Categories</h1>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="text-sm text-gray-500 text-center sm:text-left">
            {categories.length} categories
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <button
              onClick={fetchCategories}
              className="flex-1 sm:flex-none bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-700 text-sm sm:text-base"
            >
              Refresh
            </button>
            <Link 
              to="/create-category" 
              className="flex-1 sm:flex-none bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 text-center text-sm sm:text-base"
            >
              Create Category
            </Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {categories.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📁</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
          <p className="text-gray-500 mb-4">Create your first category to get started.</p>
          <Link 
            to="/create-category" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Category
          </Link>
        </div>
      ) : (
        <>
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div 
                key={category._id}
                onClick={() => handleCategoryClick(category)}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-all cursor-pointer hover:scale-105 relative"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} ads</p>
                    {category.description && (
                      <p className="text-xs text-gray-500 mt-1 truncate">{category.description}</p>
                    )}
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    category.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {category.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                {category.active ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(category._id, category);
                    }}
                    className="absolute bottom-2 right-2 text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(category);
                    }}
                    className="absolute bottom-2 right-2 text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Edit Status
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Categories Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Categories List</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 ${category.color} rounded flex items-center justify-center mr-3`}>
                          <span className="text-white font-bold text-sm">
                            {category.name.charAt(0)}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {category.description || 'No description'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {category.type || 'banner'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        category.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {category.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
                      {category.active ? (
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(category._id, category)}
                        >
                          Delete
                        </button>
                      ) : (
                        <button 
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => handleEdit(category)}
                        >
                          Edit Status
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Selected Category Details */}
      {selectedCategory && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-16 h-16 ${selectedCategory.color} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-2xl">
                {selectedCategory.name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedCategory.name}</h2>
              <p className="text-gray-600">{selectedCategory.count} advertisements in this category</p>
            </div>
          </div>

          {/* Category Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-900 font-semibold text-lg">{selectedCategory.count}</div>
              <div className="text-blue-700 text-sm">Total Ads</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-900 font-semibold text-lg">
                {Math.floor(selectedCategory.count * 0.8)}
              </div>
              <div className="text-green-700 text-sm">Active Ads</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-purple-900 font-semibold text-lg">
                {Math.floor(selectedCategory.count * 0.15)}
              </div>
              <div className="text-purple-700 text-sm">New This Week</div>
            </div>
          </div>

          {/* Sample Ads Preview */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Sample Ads</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-4">
                  <div className="w-full h-24 bg-gray-200 rounded mb-2 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Ad Preview {i}</span>
                  </div>
                  <h4 className="font-medium text-gray-900">Sample {selectedCategory.name} Ad {i}</h4>
                  <p className="text-sm text-gray-600">300x250px • Image</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              View All Ads
            </button>
            <button 
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {categories.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Overview</h2>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 ${category.color} rounded`}></div>
                  <span className="text-gray-900">{category.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{category.count} ads</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 ${category.color} rounded-full`}
                      style={{ width: `${Math.min((category.count / 50) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showModal && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${selectedCategory.color} rounded-lg flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">
                      {selectedCategory.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCategory.name}</h2>
                    <p className="text-gray-600">{selectedCategory.description || 'No description'}</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Category Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-blue-900 font-bold text-2xl">{selectedCategory.adCount || 0}</div>
                  <div className="text-blue-700 text-sm">Total Ads</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-green-900 font-bold text-2xl">{selectedCategory.totalImpressions || 0}</div>
                  <div className="text-green-700 text-sm">Impressions</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-purple-900 font-bold text-2xl">{selectedCategory.totalClicks || 0}</div>
                  <div className="text-purple-700 text-sm">Clicks</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-orange-900 font-bold text-2xl">{selectedCategory.ctr || 0}%</div>
                  <div className="text-orange-700 text-sm">CTR</div>
                </div>
              </div>

              {/* Ads List */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ads in this Category</h3>
                {modalLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : modalAds.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-2">📢</div>
                    <p className="text-gray-500">No ads found in this category</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {modalAds.map((ad) => (
                      <div key={ad._id} className="bg-gray-50 rounded-lg p-4">
                        <div className="aspect-video bg-gray-200 rounded-lg mb-3 overflow-hidden">
                          {ad.mediaType === 'video' ? (
                            <video 
                              src={ad.mediaUrl} 
                              className="w-full h-full object-cover"
                              controls
                            />
                          ) : (
                            <img 
                              src={ad.mediaUrl} 
                              alt={ad.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{ad.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{ad.width}x{ad.height}px • {ad.mediaType}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{ad.analytics?.impressions || 0} views</span>
                          <span>{ad.analytics?.clicks || 0} clicks</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="mt-6 flex justify-end space-x-3">
                <Link 
                  to={`/create-ad`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={closeModal}
                >
                  Create Ad in Category
                </Link>
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Edit Category</h2>
                <button
                  onClick={() => setEditingCategory(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Type</label>
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="banner">Banner</option>
                    <option value="video">Video</option>
                    <option value="popup">Popup</option>
                    <option value="native">Native</option>
                    <option value="display">Display</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="editActive"
                      checked={editActive}
                      onChange={(e) => setEditActive(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="editActive" className="text-sm font-medium text-gray-700">
                      Category Status
                    </label>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    editActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {editActive ? 'Active' : 'Inactive'}
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingCategory(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {updateLoading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;