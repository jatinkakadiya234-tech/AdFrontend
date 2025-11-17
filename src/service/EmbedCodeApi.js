const API_BASE_URL = 'http://localhost:5500/api/ad';

const EmbedCodeApi = {
  // Get embed code for any user (public access)
  getPublicEmbedCode: async (adId, language = 'html') => {
    try {
      const response = await fetch(`${API_BASE_URL}/public/embed-code/${adId}?language=${language}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch embed code');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching public embed code:', error);
      throw error;
    }
  },

  // Get embed code for authenticated users
  getEmbedCode: async (adId, language = 'html') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/embed-code/${adId}?language=${language}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch embed code');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching embed code:', error);
      throw error;
    }
  }
};

export default EmbedCodeApi;