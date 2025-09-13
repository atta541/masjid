// Fallback data when MongoDB is not available
export const fallbackServices = [
  {
    _id: "fallback-1",
    icon: "solar:notebook-bookmark-linear",
    title: "EdTech Apps",
    slug: "edtech-apps",
    image: "/images/ServiceDetail/EdTechAppImage.png",
    description: "Powerful tools that enhance learning experiences with interactive content, virtual classrooms, and performance tracking.",
    detail: "Develop comprehensive EdTech applications designed to transform the learning experience for students and educators. These apps offer seamless integration of multimedia tools, course management systems, real-time communication features, and advanced assessment modules.",
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
    ],
  },
  {
    _id: "fallback-2",
    icon: "solar:cart-3-linear",
    title: "eCommerce Apps",
    slug: "ecommerce-apps",
    image: "/images/ServiceDetail/eCommerceImage.png",
    description: "Seamlessly manage online stores, process payments, and optimize customer experiences to drive sales and conversions.",
    detail: "Create robust, scalable eCommerce applications that cater to the growing demands of online retail. These apps offer a wide range of features such as personalized product recommendations, real-time inventory management, and multi-currency payment gateways.",
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
    ],
  },
];

export const fallbackTechnologies = [
  { _id: "fallback-tech-1", base: "devicon:angular", styling: "devicon:tailwindcss" },
  { _id: "fallback-tech-2", base: "devicon:html5", styling: "devicon:bootstrap" },
  { _id: "fallback-tech-3", base: "devicon:react", styling: "devicon:materialui" },
  { _id: "fallback-tech-4", base: "devicon:nextjs", styling: "devicon:tailwindcss" },
];

export const fallbackPortfolio = [
  { _id: "fallback-port-1", image: "/images/productdoc/Portfolio-1.jpg" },
  { _id: "fallback-port-2", image: "/images/productdoc/Portfolio-2.jpg" },
  { _id: "fallback-port-3", image: "/images/productdoc/Portfolio-3.jpg" },
];

export const fallbackPlans = [
  {
    _id: "fallback-plan-1",
    type: "Personal",
    price: 19,
    text: "For individuals looking for a simple CRM solution",
    benefits: ["Basic CRM features", "Unlimited Personal Pipelines", "Email Power Tools"],
    isYearly: false,
  },
  {
    _id: "fallback-plan-2",
    type: "Professional",
    price: 49,
    text: "For individuals looking for a simple CRM solution",
    benefits: ["Basic CRM features", "Unlimited Personal Pipelines", "Email Power Tools", "Unlimited Shared Pipelines"],
    isYearly: false,
  },
  {
    _id: "fallback-plan-3",
    type: "Enterprise",
    price: 99,
    text: "For individuals looking for a simple CRM solution",
    benefits: ["Basic CRM features", "Unlimited Personal Pipelines", "Email Power Tools", "Unlimited Shared Pipelines", "Full API Access"],
    isYearly: false,
  },
];

export const fallbackFAQs = [
  {
    _id: "fallback-faq-1",
    question: "Letraset sheets containing sum passages ?",
    answer: "Seamlessly see the tasks that need your attention, check when your next meeting is coming up, and keep up with your progress.",
  },
  {
    _id: "fallback-faq-2",
    question: "There are many variations ?",
    answer: "Seamlessly see the tasks that need your attention, check when your next meeting is coming up, and keep up with your progress.",
  },
];

export const fallbackTestimonials = [
  {
    _id: "fallback-test-1",
    review: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece",
    name: "Merky Lester",
    post: "Manager",
    image: "/images/profile.png",
  },
  {
    _id: "fallback-test-2",
    review: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece",
    name: "Merky Lester",
    post: "Manager",
    image: "/images/profile.png",
  },
];

export const fallbackPartners = [
  { _id: "fallback-partner-1", image: "/images/info/amazon.svg" },
  { _id: "fallback-partner-2", image: "/images/info/microsoft.svg" },
  { _id: "fallback-partner-3", image: "/images/info/google.svg" },
  { _id: "fallback-partner-4", image: "/images/info/unique.svg" },
];

