const mongoose = require('mongoose');
require('dotenv').config();

// Test MongoDB connection
async function testConnection() {
  try {
    console.log('🔄 Testing MongoDB connection...');
    
    const mongoUri = 'mongodb+srv://rumanashar693_db_user:ITGKfxiOtAl4niC3@cluster0.8edwmoy.mongodb.net/alrehman?retryWrites=true&w=majority&appName=Cluster0';
    
    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully!');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📋 Available collections:', collections.map(c => c.name));
    
    // Test creating a sample document
    const Plan = mongoose.model('Plan', new mongoose.Schema({
      projectName: String,
      description: String,
      totalAmount: Number,
      image: String,
      category: String,
      targetAmount: Number,
      isActive: Boolean,
    }, { timestamps: true }));
    
    // Check if plans collection exists and has documents
    const planCount = await Plan.countDocuments();
    console.log(`📊 Plans collection has ${planCount} documents`);
    
    console.log('🎉 Database setup complete!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the test
testConnection();
