const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API requests
const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
};

// Product API functions
export const productApi = {
  // Get all products
  getAll: async () => {
    return fetchApi('/products');
  },
  
  // Get single product
  getById: async (id) => {
    return fetchApi(`/products/${id}`);
  },
  
  // Create product (admin)
  create: async (productData) => {
    return fetchApi('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },
  
  // Update product (admin)
  update: async (id, productData) => {
    return fetchApi(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },
  
  // Delete product (admin)
  delete: async (id) => {
    return fetchApi(`/products/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Check API health
  health: async () => {
    return fetchApi('/health');
  },
};