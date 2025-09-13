const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// MongoDB connection string
const mongoUri = 'mongodb+srv://rumanashar693_db_user:ITGKfxiOtAl4niC3@cluster0.8edwmoy.mongodb.net/alrehman?retryWrites=true&w=majority&appName=Cluster0';

// Admin schema
const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);

async function createAdminOnly() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB!');
    
    // Get admin credentials from environment variables
    const adminEmail = 'admin@alrahman.com';
    const adminPassword = 'alrahman123?';
    
    if (!adminEmail || !adminPassword) {
      console.error('❌ Missing admin credentials in .env file!');
      console.log('\n📝 Please add the following to your .env.local file:');
      console.log('ADMIN_EMAIL=your-email@example.com');
      console.log('ADMIN_PASSWORD=your-secure-password');
      console.log('\n💡 Example:');
      console.log('ADMIN_EMAIL=admin@yourtrust.org');
      console.log('ADMIN_PASSWORD=SecurePassword123!');
      process.exit(1);
    }
    
    console.log(`📧 Admin Email: ${adminEmail}`);
    console.log('🔒 Admin Password: [HIDDEN]');
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('Updating password...');
      
      // Hash the new password
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      // Update the admin
      await Admin.updateOne(
        { email: adminEmail },
        { 
          password: hashedPassword,
          updatedAt: new Date()
        }
      );
      
      console.log('✅ Admin password updated successfully!');
    } else {
      console.log('👤 Creating new admin user...');
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      // Create new admin
      const newAdmin = new Admin({
        name: 'Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      
      await newAdmin.save();
      console.log('✅ Admin user created successfully!');
    }
    
    // Verify admin was created/updated
    const admin = await Admin.findOne({ email: adminEmail });
    if (admin) {
      console.log('\n📊 Admin User Details:');
      console.log(`  - Name: ${admin.name}`);
      console.log(`  - Email: ${admin.email}`);
      console.log(`  - Role: ${admin.role}`);
      console.log(`  - Created: ${admin.createdAt}`);
      console.log(`  - Updated: ${admin.updatedAt}`);
    }
    
    console.log('\n🎉 Admin setup complete!');
    console.log('\n💡 You can now:');
    console.log('   • Sign in at: http://localhost:3000/signin');
    console.log('   • Access admin panel at: http://localhost:3000/admin');
    console.log('   • Use the credentials from your .env file');
    
  } catch (error) {
    console.error('❌ Admin setup failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

// Run the setup
createAdminOnly();
