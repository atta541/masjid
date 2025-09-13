const mongoose = require('mongoose');
require('dotenv').config();

// Define the Plan schema
const PlanSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  targetAmount: { type: Number, required: false },
  isActive: { type: Boolean, default: true },
}, {
  timestamps: true,
});

const Plan = mongoose.model('Plan', PlanSchema);

// Sample projects data
const sampleProjects = [
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
  },
  {
    projectName: "Emergency Relief Fund",
    description: "Providing immediate relief to families affected by natural disasters. This includes food, shelter, medical aid, and essential supplies for emergency situations.",
    totalAmount: 15000,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop",
    category: "Emergency Relief",
    targetAmount: 20000,
    isActive: true,
  },
  {
    projectName: "Community Center",
    description: "Building a community center that will serve as a hub for social activities, skill development workshops, and community meetings. This will strengthen community bonds and provide learning opportunities.",
    totalAmount: 40000,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
    category: "Community Development",
    targetAmount: 45000,
    isActive: true,
  },
  {
    projectName: "Tree Planting Initiative",
    description: "Planting 10,000 trees across the region to combat climate change and improve air quality. This environmental project will create green spaces and promote sustainability.",
    totalAmount: 12000,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    category: "Environmental",
    targetAmount: 15000,
    isActive: true,
  }
];

async function seedProjects() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    const mongoUri = 'mongodb+srv://rumanashar693_db_user:ITGKfxiOtAl4niC3@cluster0.8edwmoy.mongodb.net/alrehman?retryWrites=true&w=majority&appName=Cluster0';
    
    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB!');
    
    // Clear existing projects
    await Plan.deleteMany({});
    console.log('🗑️ Cleared existing projects');
    
    // Insert sample projects
    const createdProjects = await Plan.insertMany(sampleProjects);
    console.log(`✅ Created ${createdProjects.length} sample projects`);
    
    // Display created projects
    console.log('\n📋 Created Projects:');
    createdProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.projectName} - $${project.totalAmount} (${project.category})`);
    });
    
    console.log('\n🎉 Database seeding complete!');
    console.log('💡 You can now view these projects in your admin panel at /admin/plans');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seeding
seedProjects();
