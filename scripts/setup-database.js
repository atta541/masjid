const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection string
const mongoUri = 'mongodb+srv://rumanashar693_db_user:ITGKfxiOtAl4niC3@cluster0.8edwmoy.mongodb.net/alrehman?retryWrites=true&w=majority&appName=Cluster0';

// Define all schemas
const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, { timestamps: true });

const PlanSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  targetAmount: { type: Number, required: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: false },
  description: { type: String, required: true },
  detail: { type: String, required: true },
  features: [{
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
}, { timestamps: true });

const PortfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  technologies: [{ type: String }],
  projectUrl: { type: String },
  githubUrl: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'general' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const PartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  website: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Create models
const Admin = mongoose.model('Admin', AdminSchema);
const Plan = mongoose.model('Plan', PlanSchema);
const Service = mongoose.model('Service', ServiceSchema);
const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
const FAQ = mongoose.model('FAQ', FAQSchema);
const Partner = mongoose.model('Partner', PartnerSchema);

async function setupDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB!');
    
    console.log('\n📋 Setting up collections...');
    
    // Create collections by inserting and immediately deleting a document
    // This ensures the collections are created with proper schemas
    const collections = [
      { name: 'admins', model: Admin },
      { name: 'plans', model: Plan },
      { name: 'services', model: Service },
      { name: 'portfolios', model: Portfolio },
      { name: 'testimonials', model: Testimonial },
      { name: 'faqs', model: FAQ },
      { name: 'partners', model: Partner }
    ];
    
    for (const collection of collections) {
      try {
        // Create a temporary document to ensure collection exists
        const tempDoc = new collection.model({});
        await tempDoc.save();
        await collection.model.deleteOne({ _id: tempDoc._id });
        console.log(`✅ Created collection: ${collection.name}`);
      } catch (error) {
        console.log(`⚠️  Collection ${collection.name} already exists or error: ${error.message}`);
      }
    }
    
    // Create indexes for better performance
    console.log('\n🔍 Creating indexes...');
    
    // Admin indexes
    await Admin.collection.createIndex({ email: 1 }, { unique: true });
    console.log('✅ Created index on admins.email');
    
    // Plan indexes
    await Plan.collection.createIndex({ category: 1 });
    await Plan.collection.createIndex({ isActive: 1 });
    console.log('✅ Created indexes on plans');
    
    // Service indexes
    await Service.collection.createIndex({ slug: 1 }, { unique: true });
    console.log('✅ Created index on services.slug');
    
    // Portfolio indexes
    await Portfolio.collection.createIndex({ category: 1 });
    await Portfolio.collection.createIndex({ isActive: 1 });
    console.log('✅ Created indexes on portfolios');
    
    // Testimonial indexes
    await Testimonial.collection.createIndex({ isActive: 1 });
    console.log('✅ Created index on testimonials');
    
    // FAQ indexes
    await FAQ.collection.createIndex({ category: 1 });
    await FAQ.collection.createIndex({ isActive: 1 });
    console.log('✅ Created indexes on faqs');
    
    // Partner indexes
    await Partner.collection.createIndex({ isActive: 1 });
    console.log('✅ Created index on partners');
    
    // List all collections
    console.log('\n📊 Database Collections:');
    const allCollections = await mongoose.connection.db.listCollections().toArray();
    allCollections.forEach(collection => {
      console.log(`  - ${collection.name}`);
    });
    
    // Count documents in each collection
    console.log('\n📈 Collection Statistics:');
    for (const collection of collections) {
      const count = await collection.model.countDocuments();
      console.log(`  - ${collection.name}: ${count} documents`);
    }
    
    console.log('\n🎉 Database setup complete!');
    console.log('\n💡 Your database is now ready with the following collections:');
    console.log('   • admins - Admin user accounts');
    console.log('   • plans - Trust/organization projects');
    console.log('   • services - Service offerings');
    console.log('   • portfolios - Portfolio items');
    console.log('   • testimonials - Customer testimonials');
    console.log('   • faqs - Frequently asked questions');
    console.log('   • partners - Partner organizations');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the setup
setupDatabase();

