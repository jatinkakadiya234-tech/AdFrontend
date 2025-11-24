import React from "react";
import { Search } from "lucide-react";

const FilterBar = ({ filters, setFilters, className = "" }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-5 shadow-sm ${className}`}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 pl-11 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition"
            placeholder="Search ad units..."
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
          />
        </div>

        {/* Platform */}
        <select
          className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition appearance-none"
          value={filters.platform}
          onChange={(e) =>
            setFilters({ ...filters, platform: e.target.value })
          }
        >
          <option value="">All Platforms</option>
          <option value="web">Web</option>
          <option value="ios">iOS</option>
          <option value="android">Android</option>
          <option value="flutter">Flutter</option>
          <option value="react-native">React Native</option>
        </select>

        {/* Status */}
        <select
          className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition appearance-none"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Format */}
        <select
          className="w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition appearance-none"
          value={filters.format}
          onChange={(e) => setFilters({ ...filters, format: e.target.value })}
        >
          <option value="">All Formats</option>
          <option value="banner">Banner</option>
          <option value="interstitial">Interstitial</option>
          <option value="rewarded">Rewarded</option>
          <option value="native">Native</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
