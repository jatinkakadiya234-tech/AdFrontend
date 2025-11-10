// Utility function to get cookie value by name
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

// Get token from cookies
export const getTokenFromCookie = () => {
  return getCookie('token');
};