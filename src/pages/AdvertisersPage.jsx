import { useState, useEffect } from 'react';
import { 
  Plus, Edit3, Trash2, Eye, Users, UserPlus, 
  Search, Filter, Mail, Phone, Building, Globe,
  CheckCircle, XCircle, AlertCircle, Sparkles, 
  Calendar, DollarSign, TrendingUp, BarChart3,
  X, Save, Upload, Shield, Crown, Star
} from 'lucide-react';
import Apihelper from '../service/Apihelper';

const AdvertisersPage = () => {
  const [advertisers, setAdvertisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAdvertiser, setEditingAdvertiser] = useState(null);
  const [viewingAdvertiser, setViewingAdvertiser] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [newAdvertiser, setNewAdvertiser] = useState({
    username: '',
    email: '',
    role: 'advertiser',
    profile: {
      firstName: '',
      lastName: '',
      phone: '',
      company: '',
      website: ''
    },
    isActive: true
  });

  useEffect(() => {
    fetchAdvertisers();
  }, []);

  const fetchAdvertisers = async () => {
    try {
      // This would be a new API endpoint to get all advertisers
      const response = await Apihelper.GetAllUsers({ role: 'advertiser' });
      setAdvertisers(response.data.users || []);
    } catch (err) {
      setError('Failed to fetch advertisers');
      // Mock data for now
      setAdvertisers([
        {
          _id: '1',
          username: 'advertiser1',
          email: 'advertiser1@example.com',
          role: 'advertiser',
          isActive: true,
          profile: {
            firstName: 'John',
            lastName: 'Doe',
            phone: '+1234567890',
            company: 'Tech Corp',
            website: 'https://techcorp.com'
          },
          wallet: { balance: 1500 },
          lastLogin: new Date(),
          createdAt: new Date()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdvertiser = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      await Apihelper.CreateUser(newAdvertiser);
      setShowCreateModal(false);
      setNewAdvertiser({
        username: '',
        email: '',
        role: 'advertiser',
        profile: {
          firstName: '',
          lastName: '',
          phone: '',
          company: '',
          website: ''
        },
        isActive: true
      });
      fetchAdvertisers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create advertiser');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateAdvertiser = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      await Apihelper.UpdateUser(editingAdvertiser._id, editingAdvertiser);
      setEditingAdvertiser(null);
      fetchAdvertisers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update advertiser');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteAdvertiser = async (id) => {
    if (window.confirm('Are you sure you want to delete this advertiser?')) {
      try {
        await Apihelper.DeleteUser(id);
        setAdvertisers(advertisers.filter(adv => adv._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete advertiser');
      }
    }
  };

  const handleToggleStatus = async (advertiser) => {
    try {
      const updatedAdvertiser = { ...advertiser, isActive: !advertiser.isActive };
      await Apihelper.UpdateUser(advertiser._id, updatedAdvertiser);
      setAdvertisers(advertisers.map(adv => 
        adv._id === advertiser._id ? updatedAdvertiser : adv
      ));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const filteredAdvertisers = advertisers.filter(advertiser => 
    advertiser.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advertiser.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advertiser.profile?.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAdvertisers = advertisers.length;
  const activeAdvertisers = advertisers.filter(adv => adv.isActive).length;
  const totalBalance = advertisers.reduce((sum, adv) => sum + (adv.wallet?.balance || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-xl font-semibold text-gray-700">Loading Advertiser Management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-6 shadow-lg">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Advertiser Management
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Manage advertiser accounts, monitor performance, and oversee platform operations
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Advertisers</p>
                <p className="text-3xl font-bold">{totalAdvertisers}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Advertisers</p>
                <p className="text-3xl font-bold">{activeAdvertisers}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Total Wallet Balance</p>
                <p className="text-3xl font-bold">${totalBalance.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Growth Rate</p>
                <p className="text-3xl font-bold">+12%</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 mb-8">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search advertisers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50/50"
              />
            </div>

            <button 
              onClick={() => setShowCreateModal(true)}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 mx-auto lg:mx-0"
            >
              <UserPlus className="w-5 h-5" />
              <span>Create Advertiser</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-center">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-800 mb-1">System Error</h4>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Advertisers Table */}
        {filteredAdvertisers.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 sm:p-16 text-center">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 sm:w-10 h-8 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">No Advertisers Found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8 text-sm sm:text-base">
              {searchTerm ? 'Try adjusting your search criteria' : 'Create your first advertiser account to get started'}
            </p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              Create First Advertiser
            </button>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Advertiser</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Contact</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Company</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Wallet</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Last Login</th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAdvertisers.map((advertiser) => (
                    <tr key={advertiser._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {advertiser.profile?.firstName?.[0] || advertiser.username[0].toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                              {advertiser.profile?.firstName && advertiser.profile?.lastName 
                                ? `${advertiser.profile.firstName} ${advertiser.profile.lastName}`
                                : advertiser.username
                              }
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">@{advertiser.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-xs sm:text-sm">
                            <Mail className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400 flex-shrink-0" />
                            <span className="text-gray-900 truncate">{advertiser.email}</span>
                          </div>
                          {advertiser.profile?.phone && (
                            <div className="flex items-center space-x-2 text-xs sm:text-sm">
                              <Phone className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400 flex-shrink-0" />
                              <span className="text-gray-900 truncate">{advertiser.profile.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {advertiser.profile?.company && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Building className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-900">{advertiser.profile.company}</span>
                            </div>
                          )}
                          {advertiser.profile?.website && (
                            <div className="flex items-center space-x-2 text-sm">
                              <Globe className="w-4 h-4 text-gray-400" />
                              <a href={advertiser.profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Website
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(advertiser)}
                          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                            advertiser.isActive 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {advertiser.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span>{advertiser.isActive ? 'Active' : 'Inactive'}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="font-semibold text-gray-900">
                            ${(advertiser.wallet?.balance || 0).toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {advertiser.lastLogin 
                            ? new Date(advertiser.lastLogin).toLocaleDateString()
                            : 'Never'
                          }
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button 
                            onClick={() => setViewingAdvertiser(advertiser)}
                            className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
                          </button>
                          <button 
                            onClick={() => setEditingAdvertiser(advertiser)}
                            className="p-1.5 sm:p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit Advertiser"
                          >
                            <Edit3 className="w-3 sm:w-4 h-3 sm:h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteAdvertiser(advertiser._id)}
                            className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Advertiser"
                          >
                            <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Create New Advertiser</h2>
                    <p className="text-gray-600">Add a new advertiser account - password will be auto-generated and sent via email</p>
                  </div>
                  <button 
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                
                <form onSubmit={handleCreateAdvertiser} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Username</label>
                      <input
                        type="text"
                        value={newAdvertiser.username}
                        onChange={(e) => setNewAdvertiser({...newAdvertiser, username: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                      <input
                        type="email"
                        value={newAdvertiser.email}
                        onChange={(e) => setNewAdvertiser({...newAdvertiser, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>



                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">First Name</label>
                      <input
                        type="text"
                        value={newAdvertiser.profile.firstName}
                        onChange={(e) => setNewAdvertiser({
                          ...newAdvertiser, 
                          profile: {...newAdvertiser.profile, firstName: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={newAdvertiser.profile.lastName}
                        onChange={(e) => setNewAdvertiser({
                          ...newAdvertiser, 
                          profile: {...newAdvertiser.profile, lastName: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={newAdvertiser.profile.phone}
                        onChange={(e) => setNewAdvertiser({
                          ...newAdvertiser, 
                          profile: {...newAdvertiser.profile, phone: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Company</label>
                      <input
                        type="text"
                        value={newAdvertiser.profile.company}
                        onChange={(e) => setNewAdvertiser({
                          ...newAdvertiser, 
                          profile: {...newAdvertiser.profile, company: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Website</label>
                    <input
                      type="url"
                      value={newAdvertiser.profile.website}
                      onChange={(e) => setNewAdvertiser({
                        ...newAdvertiser, 
                        profile: {...newAdvertiser.profile, website: e.target.value}
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={newAdvertiser.isActive}
                      onChange={(e) => setNewAdvertiser({...newAdvertiser, isActive: e.target.checked})}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                      Account is active
                    </label>
                  </div>

                  <div className="flex space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={createLoading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                    >
                      {createLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating...</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          <span>Create Advertiser</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* View Modal */}
        {viewingAdvertiser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Advertiser Details</h2>
                    <p className="text-gray-600">Complete advertiser profile and account information</p>
                  </div>
                  <button 
                    onClick={() => setViewingAdvertiser(null)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Profile Info */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                            {viewingAdvertiser.profile?.firstName?.[0] || viewingAdvertiser.username[0].toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">
                              {viewingAdvertiser.profile?.firstName && viewingAdvertiser.profile?.lastName 
                                ? `${viewingAdvertiser.profile.firstName} ${viewingAdvertiser.profile.lastName}`
                                : viewingAdvertiser.username
                              }
                            </h4>
                            <p className="text-gray-600">@{viewingAdvertiser.username}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-600">Email</label>
                            <p className="text-lg text-gray-900">{viewingAdvertiser.email}</p>
                          </div>
                          {viewingAdvertiser.profile?.phone && (
                            <div>
                              <label className="text-sm font-medium text-gray-600">Phone</label>
                              <p className="text-lg text-gray-900">{viewingAdvertiser.profile.phone}</p>
                            </div>
                          )}
                          {viewingAdvertiser.profile?.company && (
                            <div>
                              <label className="text-sm font-medium text-gray-600">Company</label>
                              <p className="text-lg text-gray-900">{viewingAdvertiser.profile.company}</p>
                            </div>
                          )}
                          {viewingAdvertiser.profile?.website && (
                            <div>
                              <label className="text-sm font-medium text-gray-600">Website</label>
                              <a href={viewingAdvertiser.profile.website} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 hover:underline">
                                {viewingAdvertiser.profile.website}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Info */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Status</label>
                          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
                            viewingAdvertiser.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {viewingAdvertiser.isActive ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                            <span>{viewingAdvertiser.isActive ? 'Active' : 'Inactive'}</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-600">Wallet Balance</label>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-5 h-5 text-green-500" />
                            <p className="text-2xl font-bold text-gray-900">
                              ${(viewingAdvertiser.wallet?.balance || 0).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-600">Member Since</label>
                          <p className="text-lg text-gray-900">
                            {new Date(viewingAdvertiser.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-600">Last Login</label>
                          <p className="text-lg text-gray-900">
                            {viewingAdvertiser.lastLogin 
                              ? new Date(viewingAdvertiser.lastLogin).toLocaleDateString()
                              : 'Never'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => {
                      setViewingAdvertiser(null);
                      setEditingAdvertiser(viewingAdvertiser);
                    }}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Edit3 className="w-5 h-5" />
                    <span>Edit Advertiser</span>
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(viewingAdvertiser)}
                    className={`px-6 py-3 font-semibold rounded-xl transition-colors flex items-center space-x-2 ${
                      viewingAdvertiser.isActive
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {viewingAdvertiser.isActive ? <XCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                    <span>{viewingAdvertiser.isActive ? 'Deactivate' : 'Activate'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingAdvertiser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Edit Advertiser</h2>
                    <p className="text-gray-600">Update advertiser account information</p>
                  </div>
                  <button 
                    onClick={() => setEditingAdvertiser(null)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
                
                <form onSubmit={handleUpdateAdvertiser} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Username</label>
                      <input
                        type="text"
                        value={editingAdvertiser.username}
                        onChange={(e) => setEditingAdvertiser({...editingAdvertiser, username: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                      <input
                        type="email"
                        value={editingAdvertiser.email}
                        onChange={(e) => setEditingAdvertiser({...editingAdvertiser, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">First Name</label>
                      <input
                        type="text"
                        value={editingAdvertiser.profile?.firstName || ''}
                        onChange={(e) => setEditingAdvertiser({
                          ...editingAdvertiser, 
                          profile: {...editingAdvertiser.profile, firstName: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={editingAdvertiser.profile?.lastName || ''}
                        onChange={(e) => setEditingAdvertiser({
                          ...editingAdvertiser, 
                          profile: {...editingAdvertiser.profile, lastName: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={editingAdvertiser.profile?.phone || ''}
                        onChange={(e) => setEditingAdvertiser({
                          ...editingAdvertiser, 
                          profile: {...editingAdvertiser.profile, phone: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Company</label>
                      <input
                        type="text"
                        value={editingAdvertiser.profile?.company || ''}
                        onChange={(e) => setEditingAdvertiser({
                          ...editingAdvertiser, 
                          profile: {...editingAdvertiser.profile, company: e.target.value}
                        })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Website</label>
                    <input
                      type="url"
                      value={editingAdvertiser.profile?.website || ''}
                      onChange={(e) => setEditingAdvertiser({
                        ...editingAdvertiser, 
                        profile: {...editingAdvertiser.profile, website: e.target.value}
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="editIsActive"
                      checked={editingAdvertiser.isActive}
                      onChange={(e) => setEditingAdvertiser({...editingAdvertiser, isActive: e.target.checked})}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="editIsActive" className="text-sm font-medium text-gray-700">
                      Account is active
                    </label>
                  </div>

                  <div className="flex space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setEditingAdvertiser(null)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updateLoading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                    >
                      {updateLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Update Advertiser</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisersPage;