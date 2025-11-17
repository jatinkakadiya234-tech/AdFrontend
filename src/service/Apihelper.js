import axios from "axios"

const url = "http://localhost:5500/api"

// Configure axios to include credentials (cookies)
axios.defaults.withCredentials = true;

// Add token to headers for authenticated requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const Apihelper = {
  // Legacy User APIs
  Ragister: (data) => {
    return axios.post(url + "/user/register", data)
  },
  Login: (data) => {
    return axios.post(url + "/user/login", data)
  },
  Logout: () => {
    return axios.post(url + "/user/logout")
  },
  
  // SuperAdmin APIs
  SuperAdminRegister: (data) => {
    return axios.post(url + "/superadmin/register", data)
  },
  SuperAdminLogin: (data) => {
    return axios.post(url + "/superadmin/login", data)
  },
  GetDashboardStats: () => {
    return axios.get(url + "/superadmin/dashboard")
  },
  GetAllUsers: (params) => {
    return axios.get(url + "/superadmin/users", { params })
  },
  UpdateUserStatus: (userId, role, data) => {
    return axios.put(url + `/superadmin/users/${userId}/${role}/status`, data)
  },
  DeleteUser: (userId, role) => {
    return axios.delete(url + `/superadmin/users/${userId}/${role}`)
  },
  
  // Advertiser APIs
  AdvertiserLogin: (data) => {
    return axios.post(url + "/advertiser/login", data)
  },
  GetAdvertiserProfile: () => {
    return axios.get(url + "/advertiser/profile")
  },
  UpdateAdvertiserProfile: (data) => {
    return axios.put(url + "/advertiser/profile", data)
  },
  AddFunds: (data) => {
    return axios.post(url + "/advertiser/wallet/add-funds", data)
  },
  GetAdvertiserTransactions: (params) => {
    return axios.get(url + "/advertiser/wallet/transactions", { params })
  },
  GetAdvertiserAnalytics: () => {
    return axios.get(url + "/advertiser/analytics")
  },
  
  // Publisher APIs
  PublisherLogin: (data) => {
    return axios.post(url + "/publisher/login", data)
  },
  GetPublisherProfile: () => {
    return axios.get(url + "/publisher/profile")
  },
  UpdatePublisherProfile: (data) => {
    return axios.put(url + "/publisher/profile", data)
  },
  AddAdSpace: (data) => {
    return axios.post(url + "/publisher/ad-spaces", data)
  },
  UpdateAdSpace: (adSpaceId, data) => {
    return axios.put(url + `/publisher/ad-spaces/${adSpaceId}`, data)
  },
  DeleteAdSpace: (adSpaceId) => {
    return axios.delete(url + `/publisher/ad-spaces/${adSpaceId}`)
  },
  GetPublisherEarnings: (params) => {
    return axios.get(url + "/publisher/earnings", { params })
  },
  RequestPayout: (data) => {
    return axios.post(url + "/publisher/payout/request", data)
  },
  GetPublisherAnalytics: () => {
    return axios.get(url + "/publisher/analytics")
  },
  
  // Join Request APIs
  SubmitJoinRequest: (data) => {
    return axios.post(url + "/join-request/submit", data)
  },
  GetAllJoinRequests: (params) => {
    return axios.get(url + "/join-request/all", { params })
  },
  ApproveJoinRequest: (id, data) => {
    return axios.put(url + `/join-request/${id}/approve`, data)
  },
  RejectJoinRequest: (id, data) => {
    return axios.put(url + `/join-request/${id}/reject`, data)
  },
  GetJoinRequestStats: () => {
    return axios.get(url + "/join-request/stats")
  },
  
  // Category APIs
  CreateCategory: (data) => {
    return axios.post(url + "/category/create", data)
  },
  GetCategories: (params) => {
    return axios.get(url + "/category/all", { params })
  },
  UpdateCategory: (id, data) => {
    return axios.put(url + `/category/update/${id}`, data)
  },
  DeactivateCategory: (id) => {
    return axios.put(url + `/category/deactivate/${id}`)
  },
  DeleteCategory: (id) => {
    return axios.delete(url + `/category/delete/${id}`)
  },
  
  // Category Analytics APIs
  GetCategoryStats: () => {
    return axios.get(url + "/category/stats")
  },
  GetTopCategories: (params) => {
    return axios.get(url + "/category/top", { params })
  },
  GetAdsByCategory: (id, params) => {
    return axios.get(url + `/category/${id}/ads`, { params })
  },
  GetCategoryTrends: (id, params) => {
    return axios.get(url + `/category/${id}/trends`, { params })
  },
  
  // Ad APIs
  CreateAd: (data) => {
    return axios.post(url + "/ad/create", data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  GetAds: (params) => {
    return axios.get(url + "/ad/ads", { params })
  },
  GetAllAds: (params) => {
    return axios.get(url + "/ad/all", { params })
  },
  UpdateAd: (id, data) => {
    return axios.put(url + `/ad/update/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  DeleteAd: (id) => {
    return axios.delete(url + `/ad/delete/${id}`)
  },
  GetAdAnalytics: (id) => {
    return axios.get(url + `/ad/analytics/${id}`)
  },
  GetDetailedAnalytics: (params) => {
    return axios.get(url + "/ad/detailed-analytics", { params })
  },
  GetAdByDevice: (id, params) => {
    return axios.get(url + `/ad/${id}`, { params })
  },
  TrackClick: (id, data) => {
    return axios.post(url + `/ad/click/${id}`, data)
  },
  
  // Dashboard APIs
  GetDashboardStats: () => {
    return axios.get(url + "/user/dashboard-stats")
  },
  GetAdvertiserAnalytics: () => {
    return axios.get(url + "/user/advertiser-analytics")
  },
  GetCategoryAnalytics: () => {
    return axios.get(url + "/category/stats")
  },
  
  // Common APIs
  ChangePassword: (data) => {
    const role = localStorage.getItem('userRole');
    return axios.put(url + `/${role}/change-password`, data)
  },
  LogoutUser: () => {
    const role = localStorage.getItem('userRole');
    return axios.post(url + `/${role}/logout`)
  },
  
  // Wallet APIs
  GetWalletData: () => {
    return axios.get(url + "/user/wallet")
  },
  AddWalletBalance: (data) => {
    return axios.post(url + "/user/wallet/add", data)
  },
  
  // Impression Tracking APIs
  TrackImpression: (id, data) => {
    return axios.post(url + `/ad/impression/${id}`, data)
  },
  GetImpressionStats: (id, params) => {
    return axios.get(url + `/ad/impression/${id}/stats`, { params })
  },
  GetTopAds: (params) => {
    return axios.get(url + "/ad/impression/top", { params })
  },
  GetImpressionSummary: () => {
    return axios.get(url + "/ad/impression/summary")
  },
  
  // Ad Wallet APIs
  RechargeAdWallet: (id, data) => {
    return axios.post(url + `/ad/wallet/${id}/recharge`, data)
  },
  GetAdWallet: (id) => {
    return axios.get(url + `/ad/wallet/${id}`)
  }
}

export default Apihelper