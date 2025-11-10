import { useState, useEffect } from 'react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Technology', count: 45, color: 'bg-blue-500' },
    { id: 2, name: 'Fashion', count: 32, color: 'bg-pink-500' },
    { id: 3, name: 'Food & Beverage', count: 28, color: 'bg-orange-500' },
    { id: 4, name: 'Automotive', count: 19, color: 'bg-red-500' },
    { id: 5, name: 'Health & Fitness', count: 24, color: 'bg-green-500' },
    { id: 6, name: 'Travel', count: 16, color: 'bg-purple-500' },
    { id: 7, name: 'Education', count: 21, color: 'bg-indigo-500' },
    { id: 8, name: 'Entertainment', count: 38, color: 'bg-yellow-500' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Here you would typically fetch ads for this category
    console.log(`Fetching ads for category: ${category.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Ad Categories</h1>
        <div className="text-sm text-gray-500">
          {categories.reduce((total, cat) => total + cat.count, 0)} total ads
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">
                  {category.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} ads</p>
              </div>
            </div>
          </div>
        ))}
      </div>

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
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Overview</h2>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 ${category.color} rounded`}></div>
                <span className="text-gray-900">{category.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{category.count} ads</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 ${category.color} rounded-full`}
                    style={{ width: `${(category.count / 45) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;