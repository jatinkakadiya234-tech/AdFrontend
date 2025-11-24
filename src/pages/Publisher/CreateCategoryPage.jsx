import React, { useState } from 'react';
import Apihelper from '../../service/Apihelper';

const CreateCategoryPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setMessage('Category name is required');
      return;
    }
    
    setLoading(true);
    setMessage('');

    try {
      const response = await Apihelper.CreateCategory(formData);
      setMessage('Category created successfully!');
      setFormData({ name: '', description: '', isActive: true });
      
      // Redirect to categories page after 2 seconds
      setTimeout(() => {
        window.location.href = '/categories';
      }, 2000);
    } catch (error) {
      console.error('Create category error:', error);
      setMessage(error.response?.data?.message || 'Error creating category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Create Category</h1>
        
        {message && (
          <div className={`mb-4 p-4 rounded-md ${
            message.includes('successfully') 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="mr-2"
              />
              <label className="text-sm text-gray-700">Active</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? 'Creating...' : 'Create Category'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryPage;