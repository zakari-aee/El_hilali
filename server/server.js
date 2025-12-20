import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB Connection with better options
const MONGODB_URI = 'mongodb+srv://zallioua:zallioua@cluster0.5brmfhb.mongodb.net/productdb?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📊 Database: productdb');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('Please check:');
    console.error('1. Network Access in MongoDB Atlas');
    console.error('2. Database User credentials');
    console.error('3. Your internet connection');
  });

// Monitor connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

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

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '✅ Server is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    endpoints: {
      products: '/api/products',
      createProduct: 'POST /api/products',
      updateProduct: 'PUT /api/products/:id',
      deleteProduct: 'DELETE /api/products/:id'
    }
  });
});

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please wait and try again.'
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

// GET single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
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
    res.status(500).json({
      success: false,
      message: 'Error fetching product: ' + error.message
    });
  }
});

// POST create new product
app.post('/api/products', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please check MongoDB Atlas settings.'
      });
    }

    const { name, singlePrice, bulkPrice, category, description, image } = req.body;
    
    // Validation
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
    
    console.log('Attempting to save product:', name);
    await newProduct.save();
    console.log('✅ Product saved successfully:', newProduct._id);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    console.error('❌ Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product: ' + error.message
    });
  }
});

// PUT update product
app.put('/api/products/:id', async (req, res) => {
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

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
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

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api/products`);
  console.log('Waiting for MongoDB connection...');
});