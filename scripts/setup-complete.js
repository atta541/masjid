const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

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

// Sample data
const samplePlans = [
  {
    projectName: "School Building Construction",
    description: "Building a new school facility to provide quality education for 500+ children in the rural area. The school will include classrooms, library, computer lab, and playground facilities.",
    totalAmount: 50000,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    category: "Education",
    targetAmount: 60000,
    isActive: true,
  },
  {
    projectName: "Medical Clinic Setup",
    description: "Establishing a medical clinic to provide healthcare services to underserved communities. The clinic will offer general medicine, emergency care, and maternal health services.",
    totalAmount: 35000,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    category: "Healthcare",
    targetAmount: 40000,
    isActive: true,
  },
  {
    projectName: "Clean Water Wells",
    description: "Installing clean water wells in 10 villages to provide safe drinking water. This project will benefit over 2000 families and reduce waterborne diseases.",
    totalAmount: 25000,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    category: "Infrastructure",
    targetAmount: 30000,
    isActive: true,
  }
];

const sampleServices = [
  {
    icon: "solar:notebook-bookmark-linear",
    title: "Web Development",
    slug: "web-development",
    description: "Custom web applications built with modern technologies",
    detail: "We create responsive, scalable web applications using React, Next.js, Node.js, and other cutting-edge technologies. Our solutions are optimized for performance and user experience.",
    features: [
      { title: "Responsive Design", description: "Mobile-first approach ensuring perfect display on all devices" },
      { title: "SEO Optimized", description: "Built-in SEO features for better search engine visibility" },
      { title: "Fast Loading", description: "Optimized for speed and performance" }
    ]
  },
  {
    icon: "solar:smartphone-linear",
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description: "Native and cross-platform mobile applications",
    detail: "We develop mobile apps for iOS and Android using React Native, Flutter, and native technologies. Our apps are user-friendly and feature-rich.",
    features: [
      { title: "Cross-Platform", description: "Single codebase for both iOS and Android" },
      { title: "Native Performance", description: "Optimized for smooth performance" },
      { title: "App Store Ready", description: "Compliant with all store guidelines" }
    ]
  }
];

const samplePortfolios = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with payment integration and admin dashboard",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    projectUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    isActive: true,
  },
  {
    title: "Healthcare Management System",
    description: "A comprehensive system for managing patient records and appointments",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    category: "Web Development",
    technologies: ["Next.js", "PostgreSQL", "Prisma"],
    projectUrl: "https://example.com",
    isActive: true,
  }
];

const sampleTestimonials = [
  {
    name: "John Smith",
    position: "CEO",
    company: "Tech Corp",
    content: "Excellent work! The team delivered exactly what we needed on time and within budget.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    isActive: true,
  },
  {
    name: "Sarah Johnson",
    position: "Marketing Director",
    company: "Digital Agency",
    content: "Professional service and great communication throughout the project.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    isActive: true,
  }
];

const sampleFAQs = [
  {
    question: "What services do you offer?",
    answer: "We offer web development, mobile app development, UI/UX design, and digital marketing services.",
    category: "general",
    isActive: true,
  },
  {
    question: "How long does a project take?",
    answer: "Project duration depends on complexity. Simple websites take 2-4 weeks, while complex applications can take 2-6 months.",
    category: "general",
    isActive: true,
  }
];

const samplePartners = [
  {
    name: "Microsoft",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
    website: "https://microsoft.com",
    isActive: true,
  },
  {
    name: "Google",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=200&h=100&fit=crop",
    website: "https://google.com",
    isActive: true,
  }
];

async function setupComplete() {
  try {
    console.log('🚀 Starting complete database setup...');
    console.log('🔄 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB!');
    
    // Step 1: Setup Admin User
    console.log('\n👤 Setting up admin user...');
    
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminEmail || !adminPassword) {
      console.error('❌ Missing admin credentials in .env file!');
      console.log('Please add the following to your .env.local file:');
      console.log('ADMIN_EMAIL=your-email@example.com');
      console.log('ADMIN_PASSWORD=your-secure-password');
      process.exit(1);
    }
    
    console.log(`📧 Admin Email: ${adminEmail}`);
    console.log('🔒 Admin Password: [HIDDEN]');
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists! Updating password...');
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      await Admin.updateOne(
        { email: adminEmail },
        { 
          password: hashedPassword,
          updatedAt: new Date()
        }
      );
      console.log('✅ Admin password updated!');
    } else {
      console.log('👤 Creating new admin user...');
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      const newAdmin = new Admin({
        name: 'Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      await newAdmin.save();
      console.log('✅ Admin user created!');
    }
    
    // Step 2: Setup Collections
    console.log('\n📋 Setting up collections...');
    
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
        const tempDoc = new collection.model({});
        await tempDoc.save();
        await collection.model.deleteOne({ _id: tempDoc._id });
        console.log(`✅ Created collection: ${collection.name}`);
      } catch (error) {
        console.log(`⚠️  Collection ${collection.name} already exists`);
      }
    }
    
    // Step 3: Create Indexes
    console.log('\n🔍 Creating indexes...');
    
    await Admin.collection.createIndex({ email: 1 }, { unique: true });
    await Plan.collection.createIndex({ category: 1 });
    await Plan.collection.createIndex({ isActive: 1 });
    await Service.collection.createIndex({ slug: 1 }, { unique: true });
    await Portfolio.collection.createIndex({ category: 1 });
    await Portfolio.collection.createIndex({ isActive: 1 });
    await Testimonial.collection.createIndex({ isActive: 1 });
    await FAQ.collection.createIndex({ category: 1 });
    await FAQ.collection.createIndex({ isActive: 1 });
    await Partner.collection.createIndex({ isActive: 1 });
    
    console.log('✅ All indexes created!');
    
    // Step 4: Seed Sample Data
    console.log('\n🌱 Seeding sample data...');
    
    // Clear existing data (except admin)
    await Plan.deleteMany({});
    await Service.deleteMany({});
    await Portfolio.deleteMany({});
    await Testimonial.deleteMany({});
    await FAQ.deleteMany({});
    await Partner.deleteMany({});
    
    // Insert sample data
    const createdPlans = await Plan.insertMany(samplePlans);
    const createdServices = await Service.insertMany(sampleServices);
    const createdPortfolios = await Portfolio.insertMany(samplePortfolios);
    const createdTestimonials = await Testimonial.insertMany(sampleTestimonials);
    const createdFAQs = await FAQ.insertMany(sampleFAQs);
    const createdPartners = await Partner.insertMany(samplePartners);
    
    console.log(`✅ Created ${createdPlans.length} projects`);
    console.log(`✅ Created ${createdServices.length} services`);
    console.log(`✅ Created ${createdPortfolios.length} portfolio items`);
    console.log(`✅ Created ${createdTestimonials.length} testimonials`);
    console.log(`✅ Created ${createdFAQs.length} FAQs`);
    console.log(`✅ Created ${createdPartners.length} partners`);
    
    // Final Statistics
    console.log('\n📊 Final Database Statistics:');
    console.log(`  - Admins: ${await Admin.countDocuments()}`);
    console.log(`  - Plans: ${await Plan.countDocuments()}`);
    console.log(`  - Services: ${await Service.countDocuments()}`);
    console.log(`  - Portfolios: ${await Portfolio.countDocuments()}`);
    console.log(`  - Testimonials: ${await Testimonial.countDocuments()}`);
    console.log(`  - FAQs: ${await FAQ.countDocuments()}`);
    console.log(`  - Partners: ${await Partner.countDocuments()}`);
    
    console.log('\n🎉 Complete setup finished!');
    console.log('\n💡 You can now:');
    console.log('   • Sign in at: http://localhost:3000/signin');
    console.log('   • Access admin panel at: http://localhost:3000/admin');
    console.log('   • View projects at: http://localhost:3000/admin/plans');
    console.log('   • View services at: http://localhost:3000/admin/services');
    console.log('   • Start your app with: npm run dev');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the complete setup
setupComplete();
