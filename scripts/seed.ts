// Set environment variables directly for the seed script
process.env.MONGODB_URI = 'mongodb://localhost:27017/izafa';
process.env.MONGODB_DB = 'izafa';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = 'your-secret-key-here';
process.env.ADMIN_EMAIL = 'admin@izafa.com';
process.env.ADMIN_PASSWORD = 'admin123';
process.env.CLOUDINARY_CLOUD_NAME = 'your-cloud-name';
process.env.CLOUDINARY_API_KEY = 'your-api-key';
process.env.CLOUDINARY_API_SECRET = 'your-api-secret';
process.env.NEXT_PUBLIC_BASE_URL = 'http://localhost:3000';

import connectDB from '../src/lib/mongodb';
import Admin from '../src/models/Admin';
import Service from '../src/models/Service';
import Testimonial from '../src/models/Testimonial';
import Plan from '../src/models/Plan';
import Technology from '../src/models/Technology';
import Portfolio from '../src/models/Portfolio';
import FAQ from '../src/models/FAQ';
import Partner from '../src/models/Partner';

const servicesData = [
  {
    icon: "solar:notebook-bookmark-linear",
    title: "EdTech Apps",
    slug: "edtech-apps",
    image: "/images/ServiceDetail/EdTechAppImage.png",
    description: "Powerful tools that enhance learning experiences with interactive content, virtual classrooms, and performance tracking.",
    detail: "Develop comprehensive EdTech applications designed to transform the learning experience for students and educators. These apps offer seamless integration of multimedia tools, course management systems, real-time communication features, and advanced assessment modules. The platform enables instructors to create personalized lesson plans and interactive quizzes, while students can track their progress and engage with educational materials in a dynamic, user-friendly interface. Features such as video and audio integration, real-time feedback, and gamified learning make these apps ideal for modern classrooms and online learning environments.",
    features: [
      {
        title: "Course Management System",
        description: "Manage courses with multimedia support, helping both students and instructors organize and engage in learning materials.",
      },
      {
        title: "Student Profiles & Progress Tracking",
        description: "Track and manage students' progress with personalized learning paths, enabling educators to provide targeted support.",
      },
      {
        title: "Interactive Quizzes & Exams",
        description: "Create and grade interactive quizzes and exams, providing real-time feedback to students.",
      },
      {
        title: "Video & Audio Integration",
        description: "Incorporate multimedia elements like videos and audio for enhanced learning experiences.",
      },
      {
        title: "Real-Time Chat",
        description: "Enable instant communication between students and instructors for better engagement.",
      },
    ],
  },
  {
    icon: "solar:cart-3-linear",
    title: "eCommerce Apps",
    slug: "ecommerce-apps",
    image: "/images/ServiceDetail/eCommerceImage.png",
    description: "Seamlessly manage online stores, process payments, and optimize customer experiences to drive sales and conversions.",
    detail: "Create robust, scalable eCommerce applications that cater to the growing demands of online retail. These apps offer a wide range of features such as personalized product recommendations, real-time inventory management, and multi-currency payment gateways. With a focus on providing an intuitive user interface, secure checkout processes, and an integrated shipping solution, these apps are designed to enhance the customer experience. Admins can manage product listings, customer orders, and payment processing with ease, while shoppers benefit from a streamlined and efficient purchasing process that includes customer reviews, wishlists, and order tracking.",
    features: [
      {
        title: "Product Catalog",
        description: "Create a dynamic product catalog with advanced search filters and sorting options to improve customer experience.",
      },
      {
        title: "Secure Checkout Process",
        description: "Offer a secure checkout experience with multiple payment gateways for a seamless transaction process.",
      },
      {
        title: "Inventory Management",
        description: "Track inventory in real-time, ensuring stock levels are always accurate and updated.",
      },
      {
        title: "Customer Reviews & Ratings",
        description: "Allow customers to leave reviews and ratings, building trust and influencing purchasing decisions.",
      },
      {
        title: "Admin Dashboard",
        description: "Manage sales, orders, and customer data easily through a centralized admin dashboard.",
      },
    ],
  },
  {
    icon: "solar:video-frame-replace-linear",
    title: "CRM Apps",
    slug: "crm-apps",
    image: "/images/ServiceDetail/CRMAppsImage.png",
    description: "Track leads, manage customer data, and boost engagement with smart tools that streamline sales and support workflows.",
    detail: "Build powerful CRM and SaaS solutions that provide businesses with tools to efficiently manage customer relationships, streamline sales processes, and enhance team productivity. These applications allow organizations to track customer interactions, automate lead nurturing workflows, and create targeted marketing campaigns. With features like contact management, sales funnel visualization, and custom reporting, businesses can gain deeper insights into their performance and customer behavior. Integration with popular third-party platforms, real-time collaboration tools, and analytics dashboards further empower teams to improve customer satisfaction and optimize sales strategies.",
    features: [
      {
        title: "Client Database & Segmentation",
        description: "Organize clients and prospects into segments for targeted marketing and effective customer management.",
      },
      {
        title: "Sales Pipeline Management",
        description: "Manage leads and opportunities at various stages of the sales pipeline to ensure smooth transitions.",
      },
      {
        title: "Email Marketing & Automation",
        description: "Automate email campaigns and marketing workflows to nurture leads and drive conversions.",
      },
      {
        title: "Third-Party App Integration",
        description: "Integrate with popular tools like Mailchimp and Salesforce to streamline CRM and SaaS processes.",
      },
      {
        title: "Customizable Reports & Dashboards",
        description: "Generate and customize detailed reports and dashboards to monitor business performance.",
      },
    ],
  },
  {
    icon: "solar:stethoscope-linear",
    title: "Health Apps",
    slug: "health-apps",
    image: "/images/ServiceDetail/HealthAppImage.png",
    description: "Empower users to monitor health, book appointments, and access care with secure, user-friendly medical tools and features.",
    detail: "Create user-friendly and feature-rich health and fitness applications that motivate users to lead healthier lifestyles. These apps provide a holistic approach to fitness by offering workout logs, nutrition tracking, and personalized fitness goals. Users can track their progress through detailed analytics and receive workout recommendations tailored to their fitness levels and objectives. Integration with wearables such as fitness trackers and smartwatches allows for real-time health monitoring, while social features enable users to connect with a community for added motivation. From step tracking to meal planning, these apps provide everything users need to stay on track with their health journey.",
    features: [
      {
        title: "Workout Logging & Progress Tracking",
        description: "Log exercises and monitor progress to help users reach their fitness goals.",
      },
      {
        title: "Nutrition Tracking & Meal Suggestions",
        description: "Track meals and provide personalized meal suggestions based on the user's health goals.",
      },
      {
        title: "Integration with Wearable Devices",
        description: "Sync with wearable devices like Fitbit and Apple Health to gather more fitness data.",
      },
      {
        title: "Social Features & Community Support",
        description: "Engage with others by sharing progress, challenges, and encouraging social interactions.",
      },
      {
        title: "Health Analytics & Reporting",
        description: "Analyze health data over time and provide reports to track long-term fitness progress.",
      },
    ],
  },
  {
    icon: "solar:chart-square-linear",
    title: "Web Analytics Apps",
    slug: "web-analytics-apps",
    image: "/images/ServiceDetail/WebAnalyticsAppsImage.png",
    description: "Gain real-time insights into website traffic, user behavior, and performance to optimize digital strategies and ROI.",
    detail: "Design highly secure and intuitive banking and finance applications that empower users to manage their personal finances with ease. These apps enable seamless account management, bill payments, fund transfers, and real-time transaction tracking. Users can monitor their financial health with integrated budgeting tools, investment portfolio tracking, and access to financial insights like credit scores, loan applications, and market data. With a focus on security, the apps incorporate features such as two-factor authentication, biometric login, and encryption to ensure the protection of sensitive user data. Additionally, real-time stock updates, cryptocurrency support, and financial goal setting features make these apps ideal for users seeking to manage their finances efficiently.",
    features: [
      {
        title: "Real-Time User Analytics Dashboard",
        description: "Track visitors, their behavior, and website performance metrics in real-time.",
      },
      {
        title: "Customizable Metrics & Filters",
        description: "Filter and customize the data view to gain more specific insights into website performance.",
      },
      {
        title: "Google Analytics & Third-Party Tool Integration",
        description: "Integrate with tools like Google Analytics to enhance tracking and data collection.",
      },
      {
        title: "Traffic Source Tracking",
        description: "Monitor the sources of your website traffic, such as search engines, social media, and paid campaigns.",
      },
      {
        title: "Heatmap Integration",
        description: "Visualize user interactions on pages with heatmaps to better understand behavior and improve design.",
      },
    ],
  },
  {
    icon: "solar:hand-money-linear",
    title: "Banking Apps",
    slug: "banking-apps",
    image: "/images/ServiceDetail/BankingandFinanceImage.png",
    description: "Deliver secure, convenient financial services with features for transactions, account management, and fraud protection.",
    detail: "Design secure banking and finance apps to manage accounts, transactions, and investments. Key features include transaction tracking, bill payments, investment portfolios, and credit score management. The apps also ensure security with features like two-factor authentication and real-time market data, providing users with a reliable financial management tool.",
    features: [
      {
        title: "Account & Transaction Management",
        description: "Manage financial accounts and track transactions efficiently from a secure interface.",
      },
      {
        title: "Investment Portfolio Tracking",
        description: "Track investments and portfolio performance in real-time with up-to-date market data.",
      },
      {
        title: "Credit Score & Loan Management",
        description: "Monitor credit scores and apply for loans directly through the app with ease.",
      },
      {
        title: "Real-Time Market Data & Stock Updates",
        description: "Get real-time financial market data and stock updates to make informed investment decisions.",
      },
      {
        title: "Security Features",
        description: "Protect user data with advanced security features, including two-factor authentication and encryption.",
      },
    ],
  },
];

const technologiesData = [
  { base: "devicon:angular", styling: "devicon:tailwindcss" },
  { base: "devicon:html5", styling: "devicon:bootstrap" },
  { base: "devicon:react", styling: "devicon:materialui" },
  { base: "devicon:html5", styling: "devicon:tailwindcss" },
  { base: "devicon:react", styling: "devicon:tailwindcss" },
  { base: "devicon:nextjs", styling: "devicon:materialui" },
  { base: "devicon:react", styling: "devicon:bootstrap" },
  { base: "devicon:nextjs", styling: "devicon:tailwindcss" },
  { base: "devicon:angular", styling: "devicon:materialui" },
  { base: "devicon:nextjs", styling: "devicon:bootstrap" },
  { base: "devicon:angular", styling: "devicon:bootstrap" },
];

const portfolioData = [
  { image: "/images/productdoc/Portfolio-1.jpg" },
  { image: "/images/productdoc/Portfolio-2.jpg" },
  { image: "/images/productdoc/Portfolio-3.jpg" },
  { image: "/images/productdoc/Portfolio-4.jpg" },
  { image: "/images/productdoc/Portfolio-5.jpg" },
];

const monthlyPlansData = [
  {
    type: "Personal",
    price: 19,
    text: "For individuals looking for a simple CRM solution",
    benefits: [
      "Basic CRM features",
      "Unlimited Personal Pipelines",
      "Email Power Tools",
    ],
    isYearly: false,
  },
  {
    type: "Professional",
    price: 49,
    text: "For individuals looking for a simple CRM solution",
    benefits: [
      "Basic CRM features",
      "Unlimited Personal Pipelines",
      "Email Power Tools",
      "Unlimited Shared Pipelines",
    ],
    isYearly: false,
  },
  {
    type: "Enterprise",
    price: 99,
    text: "For individuals looking for a simple CRM solution",
    benefits: [
      "Basic CRM features",
      "Unlimited Personal Pipelines",
      "Email Power Tools",
      "Unlimited Shared Pipelines",
      "Full API Access",
    ],
    isYearly: false,
  },
];

const yearlyPlansData = [
  {
    type: "Personal",
    price: 149,
    text: "For individuals looking for a simple CRM solution",
    benefits: [
      "Basic CRM features",
      "Unlimited Personal Pipelines",
      "Email Power Tools",
    ],
    isYearly: true,
  },
  {
    type: "Professional",
    price: 299,
    text: "For individuals looking for a simple CRM solution",
    benefits: [
      "Basic CRM features",
      "Unlimited Personal Pipelines",
      "Email Power Tools",
      "Unlimited Shared Pipelines",
    ],
    isYearly: true,
  },
  {
    type: "Enterprise",
    price: 599,
    text: "For individuals looking for a simple CRM solution",
    benefits: [
      "Basic CRM features",
      "Unlimited Personal Pipelines",
      "Email Power Tools",
      "Unlimited Shared Pipelines",
      "Full API Access",
    ],
    isYearly: true,
  },
];

const faqData = [
  {
    question: "Letraset sheets containing sum passages ?",
    answer: "Seamlessly see the tasks that need your attention, check when your next meeting is coming up, and keep up with your progress.",
  },
  {
    question: "There are many variations ?",
    answer: "Seamlessly see the tasks that need your attention, check when your next meeting is coming up, and keep up with your progress.",
  },
  {
    question: "Lorem Ipsum generators on the Internet tend ?",
    answer: "Seamlessly see the tasks that need your attention, check when your next meeting is coming up, and keep up with your progress.",
  },
  {
    question: "Various versions have evolved over the ?",
    answer: "Seamlessly see the tasks that need your attention, check when your next meeting is coming up, and keep up with your progress.",
  },
  {
    question: "Finibus bonorum et malorum ?",
    answer: "Seamlessly see the tasks that need your attention, check when your next meeting is coming up, and keep up with your progress.",
  },
  {
    question: "Many desktop publishing packages ?",
    answer: "Seamlessly see the tasks that need your attention, check when your next meeting is coming up, and keep up with your progress.",
  },
];

const testimonialData = [
  {
    review: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece",
    name: "Merky Lester",
    post: "Manager",
    image: "/images/profile.png",
  },
  {
    review: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece",
    name: "Merky Lester",
    post: "Manager",
    image: "/images/profile.png",
  },
  {
    review: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece",
    name: "Merky Lester",
    post: "Manager",
    image: "/images/profile.png",
  },
];

const partnersData = [
  { image: "/images/info/amazon.svg" },
  { image: "/images/info/microsoft.svg" },
  { image: "/images/info/google.svg" },
  { image: "/images/info/unique.svg" },
];

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    await Plan.deleteMany({});
    await Technology.deleteMany({});
    await Portfolio.deleteMany({});
    await FAQ.deleteMany({});
    await Partner.deleteMany({});
    await Admin.deleteMany({});

    // Create admin user
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || 'admin@izafa.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      name: 'Admin User',
    });
    await admin.save();
    console.log('Admin user created');

    // Seed services
    await Service.insertMany(servicesData);
    console.log('Services seeded');

    // Seed technologies
    await Technology.insertMany(technologiesData);
    console.log('Technologies seeded');

    // Seed portfolio
    await Portfolio.insertMany(portfolioData);
    console.log('Portfolio seeded');

    // Seed plans
    await Plan.insertMany([...monthlyPlansData, ...yearlyPlansData]);
    console.log('Plans seeded');

    // Seed FAQs
    await FAQ.insertMany(faqData);
    console.log('FAQs seeded');

    // Seed testimonials
    await Testimonial.insertMany(testimonialData);
    console.log('Testimonials seeded');

    // Seed partners
    await Partner.insertMany(partnersData);
    console.log('Partners seeded');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
