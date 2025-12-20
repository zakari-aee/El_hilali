import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, X, Save, Upload, RefreshCw } from 'lucide-react';

// API Base URL - change this to your backend URL
const API_URL = 'http://localhost:5000/api';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    singlePrice: '',
    bulkPrice: '',
    category: '',
    description: '',
    image: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');

  // Fetch products from database
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load products on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({ name: '', singlePrice: '', bulkPrice: '', category: '', description: '', image: '' });
    setImageFile(null);
    setImagePreview('');
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      singlePrice: product.singlePrice,
      bulkPrice: product.bulkPrice,
      category: product.category || '',
      description: product.description,
      image: product.image
    });
    setImagePreview(product.image);
    setImageFile(null);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.singlePrice || !formData.bulkPrice) {
      alert('Name, single price, and bulk price are required');
      return;
    }

    const singlePrice = parseFloat(formData.singlePrice);
    const bulkPrice = parseFloat(formData.bulkPrice);

    if (bulkPrice >= singlePrice) {
      alert('Bulk price should be less than single price');
      return;
    }

    if (!editingProduct && !imagePreview) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const productData = {
        name: formData.name,
        singlePrice,
        bulkPrice,
        category: formData.category,
        description: formData.description,
        image: imagePreview || formData.image
      };

      const url = editingProduct 
        ? `${API_URL}/products/${editingProduct._id}`
        : `${API_URL}/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (data.success) {
        alert(editingProduct ? 'Product updated!' : 'Product added!');
        setShowModal(false);
        setFormData({ name: '', singlePrice: '', bulkPrice: '', category: '', description: '', image: '' });
        setImageFile(null);
        setImagePreview('');
        fetchProducts(); // Refresh the list
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      alert('Error saving product: ' + err.message);
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        alert('Product deleted!');
        fetchProducts();
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      alert('Error deleting product: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Login</h1>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Login
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">Demo password: admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
          <div className="flex gap-3">
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={handleAddNew}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && products.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products yet. Add your first product!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Single Price:</span>
                      <span className="text-xl font-bold text-blue-600">${product.singlePrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Bulk Price:</span>
                      <span className="text-lg font-semibold text-green-600">${product.bulkPrice}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      disabled={loading}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      disabled={loading}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Fragrance">Fragrance</option>
                    <option value="Body Care">Body Care</option>
                    <option value="Tools">Tools</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Single Price * <span className="text-xs text-gray-500">(per unit)</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.singlePrice}
                      onChange={(e) => setFormData({ ...formData, singlePrice: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bulk Price * <span className="text-xs text-gray-500">(wholesale)</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.bulkPrice}
                      onChange={(e) => setFormData({ ...formData, bulkPrice: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                    placeholder="Enter product description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-48 h-48 object-cover rounded-lg mb-2"
                          />
                          <div className="text-sm text-gray-600 mt-2">Click to change image</div>
                        </div>
                      ) : (
                        <>
                          <Upload size={48} className="text-gray-400 mb-2" />
                          <span className="text-gray-600 font-medium">Click to upload image</span>
                          <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                        </>
                      )}
                    </label>
                  </div>
                  {imageFile && (
                    <div className="mt-2 text-sm text-gray-600">
                      Selected: {imageFile.name} ({(imageFile.size / 1024).toFixed(1)} KB)
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
                >
                  <Save size={20} />
                  {loading ? 'Saving...' : 'Save Product'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}