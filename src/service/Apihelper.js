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
  // User APIs
  Ragister: (data) => {
    return axios.post(url + "/user/register", data)
  },
  Login: (data) => {
    return axios.post(url + "/user/login", data)
  },
  Logout: () => {
    return axios.post(url + "/user/logout")
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
  TrackClick: (id, data) => {
    return axios.post(url + `/ad/click/${id}`, data)
  },
  
  // User Management APIs
  GetAllUsers: (params) => {
    return axios.get(url + "/user/all", { params })
  },
  CreateUser: (data) => {
    return axios.post(url + "/user/create", data)
  },
  UpdateUser: (id, data) => {
    return axios.put(url + `/user/update/${id}`, data)
  },
  DeleteUser: (id) => {
    return axios.delete(url + `/user/delete/${id}`)
  }
}

export default Apihelper