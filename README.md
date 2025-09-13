# Izafa - Dynamic SaaS Website

A fully dynamic Next.js website with MongoDB database, admin dashboard, and Cloudinary image management.

## Features

- **Dynamic Content Management**: All content is stored in MongoDB and can be managed through the admin dashboard
- **Admin Authentication**: Secure admin-only authentication using NextAuth
- **Image Management**: Cloudinary integration for image upload, update, and delete
- **CRUD Operations**: Full Create, Read, Update, Delete functionality for all content types
- **Responsive Design**: Modern, responsive UI built with Tailwind CSS

## Content Types

- **Services**: Manage your service offerings with features and descriptions
- **Testimonials**: Customer testimonials and reviews
- **Pricing Plans**: Monthly and yearly pricing plans
- **Portfolio**: Project showcase and portfolio items
- **FAQs**: Frequently asked questions
- **Partners**: Partner logos and information
- **Technologies**: Technology stack showcase

## Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud)
- Cloudinary account
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd package
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/izafa
   MONGODB_DB=izafa

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # Admin Credentials (you can change these)
   ADMIN_EMAIL=admin@izafa.com
   ADMIN_PASSWORD=admin123

   # Cloudinary Configuration (you'll need to provide these)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Base URL
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Set up MongoDB**
   
   Make sure MongoDB is running on your system. You can use:
   - Local MongoDB installation
   - MongoDB Atlas (cloud)
   - Docker: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

5. **Set up Cloudinary**
   
   - Create a free account at [Cloudinary](https://cloudinary.com)
   - Get your cloud name, API key, and API secret from the dashboard
   - Update the `.env.local` file with your credentials

6. **Seed the database**
   ```bash
   npm run seed
   ```
   
   This will populate your database with the existing static data and create an admin user.

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Access the application**
   - Website: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin
   - Admin Login: Use the credentials from your `.env.local` file

## Admin Dashboard

The admin dashboard provides a comprehensive interface for managing all website content:

### Access
- URL: `/admin`
- Login with the admin credentials from your `.env.local` file

### Features
- **Services Management**: Create, edit, and delete services
- **Testimonials**: Manage customer testimonials
- **Pricing Plans**: Configure monthly and yearly plans
- **Portfolio**: Upload and manage portfolio items
- **FAQs**: Manage frequently asked questions
- **Partners**: Manage partner logos and information
- **Image Upload**: Upload images to Cloudinary with automatic optimization

### Image Management
- All images are automatically uploaded to Cloudinary
- Images are optimized for web delivery
- Easy image replacement and deletion
- Automatic URL generation for use in content

## API Endpoints

### Public Endpoints
- `GET /api/service` - Get all services
- `GET /api/data` - Get all website data (technologies, plans, testimonials, etc.)

### Admin Endpoints (Authentication Required)
- `GET /api/admin/services` - Get all services (admin)
- `POST /api/admin/services` - Create new service
- `PUT /api/admin/services/[id]` - Update service
- `DELETE /api/admin/services/[id]` - Delete service
- `POST /api/admin/upload` - Upload image to Cloudinary
- `DELETE /api/admin/upload` - Delete image from Cloudinary

## Database Schema

### Services
```typescript
{
  icon: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  detail: string;
  features: Array<{
    title: string;
    description: string;
  }>;
}
```

### Other Models
- **Testimonials**: review, name, post, image
- **Plans**: type, price, text, benefits, isYearly
- **Portfolio**: image, title, description
- **FAQs**: question, answer
- **Partners**: image, name, website
- **Technologies**: base, styling

## Development

### Project Structure
```
src/
├── app/
│   ├── admin/           # Admin dashboard pages
│   ├── api/             # API routes
│   ├── components/      # React components
│   └── (site)/          # Public website pages
├── lib/                 # Utility functions
├── models/              # MongoDB models
└── types/               # TypeScript types
```

### Adding New Content Types

1. Create a new model in `src/models/`
2. Add API routes in `src/app/api/admin/`
3. Create admin pages in `src/app/admin/`
4. Update the main data API route

### Customization

- **Styling**: Modify Tailwind classes in components
- **Content**: Use the admin dashboard to manage all content
- **Images**: All images are managed through Cloudinary
- **Authentication**: Admin-only authentication is configured

## Deployment

### Environment Variables for Production
Make sure to set all environment variables in your production environment:
- MongoDB connection string
- NextAuth secret (generate a secure random string)
- Cloudinary credentials
- Admin credentials

### Build and Deploy
```bash
npm run build
npm start
```

## Security

- Admin authentication is required for all admin operations
- Passwords are hashed using bcrypt
- Environment variables are used for sensitive data
- API routes are protected with session validation

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Verify Cloudinary credentials are correct

## License

This project is licensed under the MIT License.

