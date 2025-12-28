import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, X, Save, Upload, RefreshCw, Search, ShoppingBag, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import translation from '../lib/admin_translition.js';

// Language context or translations object
const translations = translation;

// Header Component with Language Switcher
const Header = ({ language, setLanguage, username, onLogout }) => (
  <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-black/5">
    <div className="container mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="text-xl font-serif font-bold tracking-tighter cursor-pointer">
          {translations[language].appName}
        </div>
        {username && (
          <div className="text-[10px] uppercase tracking-wider text-black/60">
            👤 {username}
          </div>
        )}
      </div>
      <div className="flex items-center gap-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
          {translations[language].adminSpace}
        </div>
        
        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage('fr')}
            className={`text-[10px] uppercase tracking-wider px-2 py-1 transition-all ${language === 'fr' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
          >
            FR
          </button>
          <button
            onClick={() => setLanguage('ar')}
            className={`text-[10px] uppercase tracking-wider px-2 py-1 transition-all ${language === 'ar' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
          >
            AR
          </button>
          <button
            onClick={() => setLanguage('eng')}
            className={`text-[10px] uppercase tracking-wider px-2 py-1 transition-all ${language === 'eng' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
          >
            EN
          </button>
        </div>

        {/* Logout Button */}
        {username && (
          <button
            onClick={onLogout}
            className="text-[10px] uppercase tracking-wider px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 transition-all flex items-center gap-1"
          >
            <LogOut size={12} />
            {translations[language].logout || 'Logout'}
          </button>
        )}
      </div>
    </div>
  </nav>
);

// Luxury Input Component
const AdminInput = ({ label, language, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60 block">
      {label}
    </label>
    <input 
      className="w-full bg-transparent border-b border-black/10 py-3 text-sm font-medium focus:border-black focus:outline-none transition-colors placeholder:text-black/20"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      {...props}
    />
  </div>
);

const AdminButton = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyle = "px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-black text-white hover:bg-black/80",
    secondary: "bg-transparent border border-black/10 text-black hover:border-black",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- MAIN LOGIC ---

// API Base URL
const API_URL = 'http://localhost:5000/api';

export default function AdminPage() {
  const [language, setLanguage] = useState('fr');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
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
  const [loginError, setLoginError] = useState('');

  const t = translations[language];

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (token && user) {
      // Verify token with server
      verifyToken(token);
    }
  }, []);

  // Verify token with server
  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setUsername(data.user.username);
      } else {
        // Token is invalid, clear localStorage
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
    } catch (err) {
      console.error('Token verification error:', err);
    }
  };

  // Fetch products from database
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else if (data.message && (
        data.message.includes('token') || 
        data.message.includes('auth') || 
        data.message.includes('Access')
      )) {
        // Token expired or invalid
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setIsAuthenticated(false);
        setLoginError(t.sessionExpired || 'Session expired. Please login again.');
      } else {
        setError(data.message || 'Failed to load products');
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load products on mount when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  // Handle login with server
  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    
    setLoginError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.toLowerCase(),
          password: password
        })
      });

      const data = await response.json();

      if (data.success) {
        // Store the JWT token and user info
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        
        setIsAuthenticated(true);
        setPassword(''); // Clear password field
      } else {
        setLoginError(data.message || t.invalidCredentials || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError(t.serverError || 'Error connecting to server');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setProducts([]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        alert(t.imageSizeError || 'Image size should be less than 5MB');
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
      alert(t.requiredFields);
      return;
    }

    const singlePrice = parseFloat(formData.singlePrice);
    const bulkPrice = parseFloat(formData.bulkPrice);

    if (bulkPrice >= singlePrice) {
      alert(t.priceValidation);
      return;
    }

    if (!editingProduct && !imagePreview) {
      alert(t.imageRequired);
      return;
    }

    setLoading(true);
    setError('');

    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

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
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (data.success) {
        alert(editingProduct ? t.productUpdated : t.productAdded);
        setShowModal(false);
        setFormData({ name: '', singlePrice: '', bulkPrice: '', category: '', description: '', image: '' });
        setImageFile(null);
        setImagePreview('');
        fetchProducts(); // Refresh the list
      } else {
        if (data.message && data.message.includes('auth')) {
          // Authentication error
          handleLogout();
          alert(t.sessionExpired || 'Session expired. Please login again.');
        } else {
          alert('Error: ' + data.message);
        }
      }
    } catch (err) {
      alert(t.errorSaving + err.message);
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(t.confirmDelete)) {
      return;
    }

    setLoading(true);
    
    const token = localStorage.getItem('adminToken');
    
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        alert(t.productDeleted);
        fetchProducts();
      } else {
        if (data.message && data.message.includes('auth')) {
          handleLogout();
          alert(t.sessionExpired || 'Session expired. Please login again.');
        } else {
          alert('Error: ' + data.message);
        }
      }
    } catch (err) {
      alert(t.errorDeleting + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key in login form
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // --- LUXURY LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDFBF9] flex flex-col items-center justify-center p-6 text-black">
        <div className="w-full max-w-md space-y-12 text-center">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">
              {t.loginSubtitle}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter">
              {t.loginTitle}
            </h1>
          </div>
          
          <div className="bg-white p-10 border border-black/5 shadow-2xl shadow-black/[0.02] space-y-8">
            {/* Language switcher in login */}
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => setLanguage('fr')}
                className={`text-[10px] uppercase tracking-wider px-3 py-1 transition-all ${language === 'fr' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`text-[10px] uppercase tracking-wider px-3 py-1 transition-all ${language === 'ar' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
              >
                AR
              </button>
              <button
                onClick={() => setLanguage('eng')}
                className={`text-[10px] uppercase tracking-wider px-3 py-1 transition-all ${language === 'eng' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
              >
                EN
              </button>
            </div>
            
            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest">
                {loginError}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <AdminInput
                label={t.usernameLabel || "Username"}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t.usernamePlaceholder || "admin"}
                language={language}
                required
                disabled={loading}
              />
              
              <AdminInput
                label={t.passwordLabel}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.passwordPlaceholder}
                language={language}
                required
                disabled={loading}
              />
              
              <AdminButton 
                type="submit" 
                className="w-full py-4"
                disabled={loading}
              >
                {loading ? (t.loggingIn || 'Logging in...') : t.loginButton}
              </AdminButton>
            </form>
          </div>
          
          <div className="space-y-2">
            <p className="text-[10px] text-black/30 uppercase tracking-widest">{t.demoNote}</p>
            <p className="text-[9px] text-black/20">
              {t.defaultCredentials || "Default: admin / admin123"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --- LUXURY DASHBOARD ---
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF9] font-sans text-black" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        username={username}
        onLogout={handleLogout}
      />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-10">
          
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tighter mb-4">
                {t.inventoryTitle}
              </h1>
              <p className="text-black/50 text-sm font-medium">
                {t.inventorySubtitle}
              </p>
            </div>
            <div className="flex gap-4">
              <AdminButton 
                onClick={fetchProducts} 
                disabled={loading}
                variant="secondary"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                {t.refresh}
              </AdminButton>
              <AdminButton onClick={handleAddNew}>
                <Plus size={14} />
                {t.addProduct}
              </AdminButton>
            </div>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border-l-2 border-red-500 text-red-600 text-xs font-bold tracking-widest uppercase">
              {error}
            </div>
          )}

          {/* Product Grid - Luxury Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.length === 0 && !loading ? (
              <div className="col-span-full py-32 text-center border border-dashed border-black/10">
                <p className="text-black/40 font-serif italic text-lg">
                  {t.noProducts}
                </p>
                <button onClick={handleAddNew} className="mt-4 text-[10px] font-bold uppercase tracking-widest border-b border-black">
                  {t.addFirst}
                </button>
              </div>
            ) : (
              products.map((product) => (
                <div key={product._id} className="group bg-white border border-black/5 hover:border-black/20 transition-all duration-500">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F9F9F9]">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=500'; }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="bg-white text-black p-3 hover:bg-[#C5A27D] hover:text-white transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="bg-white text-black p-3 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-lg font-bold tracking-tight line-clamp-1">
                        {product.name}
                      </h3>
                      <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex justify-between items-end mt-4 pt-4 border-t border-black/5">
                      <div>
                        <p className="text-[9px] text-black/40 uppercase tracking-wider mb-1">
                          {t.retail}
                        </p>
                        <p className="font-medium">DH {product.singlePrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-[#C5A27D] uppercase tracking-wider mb-1">
                          {t.wholesale}
                        </p>
                        <p className="font-medium text-[#C5A27D]">DH {product.bulkPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Modal - Luxury Dialog Style */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 md:p-12 border border-black/5"
            >
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-black/5">
                <h2 className="text-3xl font-serif font-bold tracking-tight">
                  {editingProduct ? t.editProduct : t.newProduct}
                </h2>
                <button onClick={() => setShowModal(false)} className="hover:rotate-90 transition-transform duration-300">
                  <X size={24} className="text-black/40 hover:text-black" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AdminInput
                    label={t.productName}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.productNamePlaceholder}
                    language={language}
                  />
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60 block">
                      {t.category}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-transparent border-b border-black/10 py-3 text-sm font-medium focus:border-black focus:outline-none appearance-none rounded-none"
                    >
                      <option value="" disabled>{t.selectCategory}</option>
                      <option value={t.categories.skincare}>{t.categories.skincare}</option>
                      <option value={t.categories.makeup}>{t.categories.makeup}</option>
                      <option value={t.categories.perfume}>{t.categories.perfume}</option>
                      <option value={t.categories.bodycare}>{t.categories.bodycare}</option>
                      <option value={t.categories.accessories}>{t.categories.accessories}</option>
                      <option value={t.categories.tools}>{t.categories.tools}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <AdminInput
                    label={t.unitPrice}
                    type="number"
                    step="0.01"
                    value={formData.singlePrice}
                    onChange={(e) => setFormData({ ...formData, singlePrice: e.target.value })}
                    placeholder="0.00"
                    language={language}
                  />
                  <AdminInput
                    label={t.bulkPrice}
                    type="number"
                    step="0.01"
                    value={formData.bulkPrice}
                    onChange={(e) => setFormData({ ...formData, bulkPrice: e.target.value })}
                    placeholder="0.00"
                    language={language}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60 block">
                    {t.description}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-transparent border-b border-black/10 py-3 text-sm font-medium focus:border-black focus:outline-none min-h-[100px] resize-none placeholder:text-black/20"
                    placeholder={t.descriptionPlaceholder}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/60 block">
                    {t.imageLabel}
                  </label>
                  <div className="border border-dashed border-black/20 p-8 text-center hover:bg-[#F9F9F9] transition-colors cursor-pointer relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {imagePreview ? (
                      <div className="relative w-32 h-32 mx-auto">
                        <img src={imagePreview} alt="Preview" loading="lazy" className="w-full h-full object-cover shadow-lg" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] font-bold uppercase tracking-widest">
                          {t.changeImage}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 py-4">
                        <Upload size={24} className="text-black/30" />
                        <span className="text-xs font-bold uppercase tracking-widest text-black/50">
                          {t.uploadImage}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-12 pt-8 border-t border-black/5">
                <AdminButton 
                  onClick={handleSave} 
                  disabled={loading}
                  className="flex-1"
                >
                  <Save size={14} />
                  {loading ? t.saving : t.save}
                </AdminButton>
                <AdminButton 
                  onClick={() => setShowModal(false)} 
                  variant="secondary"
                  className="w-auto px-8"
                >
                  {t.cancel}
                </AdminButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}