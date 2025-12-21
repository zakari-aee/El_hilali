// Get API URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🔗 Using API URL:', API_BASE_URL);

// Helper function to get token
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to handle API requests with proper token
const fetchApi = async (endpoint, options = {}) => {
  try {
    const token = getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    
    // Add authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('📡 API Request:', url);
    
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ API Request Failed:', error.message);
    throw error;
  }
};

// Auth API functions
export const authApi = {
  // Login with credentials
  login: async (username, password) => {
    try {
      const url = `${API_BASE_URL}/auth/login`;
      console.log('🔐 Login request to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      // Store token in localStorage if login successful
      if (data.success && data.token) {
        localStorage.setItem('authToken', data.token);
        console.log('✅ Token stored successfully');
      }
      
      return data;
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  },
  
  // Verify token is valid
  verify: async () => {
    try {
      console.log('✔️ Verifying token...');
      return await fetchApi('/auth/verify');
    } catch (error) {
      console.error('❌ Token verification failed:', error);
      localStorage.removeItem('authToken'); // Remove invalid token
      throw error;
    }
  },
  
  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    console.log('✅ Logged out');
  },
  
  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      return await fetchApi('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
    } catch (error) {
      console.error('❌ Change password error:', error);
      throw error;
    }
  }
};

// Product API functions
export const productApi = {
  // Get all products (PUBLIC - no auth required)
  getAll: async () => {
    try {
      console.log('📦 Fetching all products...');
      const url = `${API_BASE_URL}/products`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      throw error;
    }
  },
  
  // Get single product by ID (PUBLIC - no auth required)
  getById: async (id) => {
    try {
      console.log('📦 Fetching product:', id);
      const url = `${API_BASE_URL}/products/${id}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching product:', error);
      throw error;
    }
  },
  
  // Create product (admin only)
  create: async (productData) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token. Please login first.');
      }
      console.log('➕ Creating product...');
      return await fetchApi('/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
    } catch (error) {
      console.error('❌ Error creating product:', error);
      throw error;
    }
  },
  
  // Update product (admin only)
  update: async (id, productData) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token. Please login first.');
      }
      console.log('✏️ Updating product:', id);
      return await fetchApi(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      });
    } catch (error) {
      console.error('❌ Error updating product:', error);
      throw error;
    }
  },
  
  // Delete product (admin only)
  delete: async (id) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token. Please login first.');
      }
      console.log('🗑️ Deleting product:', id);
      return await fetchApi(`/products/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('❌ Error deleting product:', error);
      throw error;
    }
  },
  
  // Check API health (public)
  health: async () => {
    try {
      console.log('❤️ Checking API health...');
      return await fetch(`${API_BASE_URL}/health`).then(r => r.json());
    } catch (error) {
      console.error('❌ Health check error:', error);
      throw error;
    }
  },
};