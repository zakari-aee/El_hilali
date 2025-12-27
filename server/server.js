import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================== CORS Configuration ====================
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000', 'http://192.168.11.106:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// ==================== Middleware ====================
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ==================== Environment Variables ====================
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-in-production';
const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔧 Configuration:');
console.log('   PORT:', PORT);
console.log('   MONGODB_URI:', MONGODB_URI ? '✅ Set' : '❌ Not set');
console.log('   Environment: Local Development\n');

// ==================== MongoDB Connection ====================
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
    });
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📊 Database: productdb\n');
    return true;
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('⚠️  Make sure:');
    console.error('   1. MongoDB Atlas cluster is running');
    console.error('   2. MONGODB_URI is correct in .env');
    console.error('   3. Your IP is whitelisted in MongoDB Atlas\n');
    return false;
  }
};

// Handle connection events
mongoose.connection.on('error', (err) => {
  console.error('📡 MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('📡 MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('📡 MongoDB reconnected');
});

// ==================== Schemas ====================
// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  singlePrice: {
    type: Number,
    required: true,
    min: 0
  },
  bulkPrice: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

// ==================== Authentication ====================
// Initialize default admin user
const initializeDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin' });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = new User({
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
      });
      
      await adminUser.save();
      console.log('✅ Default admin user created');
      console.log('   Username: admin');
      console.log('   Password: admin123\n');
    } else {
      console.log('✅ Admin user already exists\n');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error.message);
  }
};

// JWT Authentication Middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid or expired token'
        });
      }

      const dbUser = await User.findById(user.id);
      if (!dbUser) {
        return res.status(403).json({
          success: false,
          message: 'User no longer exists'
        });
      }

      req.user = dbUser;
      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

// Admin Role Middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
};

// ==================== Auth Routes ====================
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { 
        id: user._id,
        username: user.username,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token is valid',
    user: {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role
    }
  });
});

app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters'
      });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, req.user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    req.user.password = hashedPassword;
    await req.user.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error changing password'
    });
  }
});

// ==================== PUBLIC Product Routes ====================
// GET all products (PUBLIC - No auth required)
app.get('/api/products', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected'
      });
    }

    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: products,
      count: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products: ' + error.message
    });
  }
});

// GET single product by ID (PUBLIC - No auth required)
app.get('/api/products/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected'
      });
    }

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product: ' + error.message
    });
  }
});

// ==================== PROTECTED Admin Routes ====================
// POST create new product (ADMIN ONLY)
app.post('/api/products', authenticateToken, requireAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected'
      });
    }

    const { name, singlePrice, bulkPrice, category, description, image } = req.body;
    
    if (!name || !singlePrice || !bulkPrice || !category || !image) {
      return res.status(400).json({
        success: false,
        message: 'Name, prices, category, and image are required'
      });
    }
    
    if (bulkPrice >= singlePrice) {
      return res.status(400).json({
        success: false,
        message: 'Bulk price must be less than single price'
      });
    }
    
    const newProduct = new Product({
      name,
      singlePrice: parseFloat(singlePrice),
      bulkPrice: parseFloat(bulkPrice),
      category,
      description: description || '',
      image
    });
    
    console.log(`✅ Product created: ${name}`);
    await newProduct.save();
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product: ' + error.message
    });
  }
});

// PUT update product (ADMIN ONLY)
app.put('/api/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected'
      });
    }

    const { name, singlePrice, bulkPrice, category, description, image } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (singlePrice) updateData.singlePrice = parseFloat(singlePrice);
    if (bulkPrice) updateData.bulkPrice = parseFloat(bulkPrice);
    if (category) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    if (image) updateData.image = image;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    console.log(`✅ Product updated: ${product.name}`);
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product: ' + error.message
    });
  }
});

// DELETE product (ADMIN ONLY)
app.delete('/api/products/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected'
      });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    console.log(`✅ Product deleted: ${product.name}`);
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product: ' + error.message
    });
  }
});

// ==================== Public Health Check Routes ====================
app.get('/', (req, res) => {
  res.json({
    message: '✅ Server is running!',
    database: mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected',
    endpoints: {
      products: 'GET /api/products (public)',
      product: 'GET /api/products/:id (public)',
      login: 'POST /api/auth/login',
      createProduct: 'POST /api/products (admin only)',
      updateProduct: 'PUT /api/products/:id (admin only)',
      deleteProduct: 'DELETE /api/products/:id (admin only)'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// ==================== 404 Handler ====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

// ==================== Error Handler ====================
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// ==================== Start Server ====================
const startServer = async () => {
  try {
    // Connect to MongoDB
    const connected = await connectDB();
    
    if (!connected) {
      console.warn('⚠️  MongoDB not connected - check your connection string and ensure MongoDB Atlas is accessible');
    }

    // Initialize admin user if DB is connected
    if (connected) {
      await initializeDefaultAdmin();
    }

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`\n📡 PUBLIC ENDPOINTS:`);
      console.log(`   GET http://localhost:${PORT}/api/products`);
      console.log(`   GET http://localhost:${PORT}/api/products/:id`);
      console.log(`\n🔐 ADMIN ENDPOINTS (requires auth):`);
      console.log(`   POST http://localhost:${PORT}/api/products`);
      console.log(`   PUT http://localhost:${PORT}/api/products/:id`);
      console.log(`   DELETE http://localhost:${PORT}/api/products/:id`);
      console.log(`\n🔑 LOGIN:`);
      console.log(`   POST http://localhost:${PORT}/api/auth/login`);
      console.log(`   Username: admin | Password: admin123`);
      console.log(`\n❤️  Health: http://localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();