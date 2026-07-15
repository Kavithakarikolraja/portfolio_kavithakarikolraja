export interface Project {
  id: string;
  title: string;
  category: "Full Stack" | "AI & ML" | "UI/UX" | "Mini Project";
  description: string;
  techStack: string[];
  image: string;
  githubRepo: string;
  liveDemo: string;
  featured: boolean;
  details?: string[];
}

export const projects: Project[] = [
  {
    id: "campus-hub",
    title: "Campus Hub",
    category: "Full Stack",
    description: "A collaborative student platform for announcements, placement updates, discussion forums, academic resource sharing, and real-time communication. Built using the MERN stack with responsive UI and secure backend architecture.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API", "Socket.IO"],
    image: "/projects/campushub.jpg",
    githubRepo: "https://github.com/Kavithakarikolraja/campus_hub",
    liveDemo: "https://campushub-bice.vercel.app/",
    featured: true,
    details: [
      "Designed a real-time messaging and announcements system using Socket.IO.",
      "Built a secure backend in Express/Node.js utilizing JWT authorization and password encryption.",
      "Implemented a user-friendly frontend dashboard with React.js and Tailwind CSS.",
      "Managed academic and placement documents storage using MongoDB and cloud buckets."
    ]
  },
  {
    id: "medintel-selftrack",
    title: "MedIntel SelfTrack",
    category: "AI & ML",
    description: "An AI-powered healthcare analytics platform for cardiovascular and chronic disease monitoring with intelligent risk prediction, AI chatbot assistance, health analytics, and personalized recommendations.",
    techStack: ["Python", "Machine Learning", "TensorFlow", "Flask", "NLP"],
    image: "/projects/medintel.jpg",
    githubRepo: "https://github.com/Kavithakarikolraja/MedIntel",
    liveDemo: "#",
    featured: true,
    details: [
      "Engineered machine learning models for early risk prediction of heart and chronic diseases.",
      "Developed a custom AI medical advisor chatbot utilizing NLP text-processing and intent mapping.",
      "Created dynamic visual dashboards for patients to track health stats, trends, and risk scores.",
      "Implemented Flask REST APIs connecting the ML model endpoints to a modern client interface."
    ]
  },
  {
    id: "sentiment-analysis",
    title: "Movie Review Sentiment Analysis",
    category: "Mini Project",
    description: "An NLP-based sentiment analysis model that classifies movie reviews as positive or negative using text preprocessing, TF-IDF vectorization, and machine learning classification algorithms.",
    techStack: ["Python", "NLTK", "TF-IDF", "Scikit-learn"],
    image: "/projects/sentiment.jpg",
    githubRepo: "https://github.com/Kavithakarikolraja/movie_review_analysis",
    liveDemo: "#",
    featured: false,
    details: [
      "Preprocessed textual datasets with tokenization, stop-words removal, and lemmatization.",
      "Applied TF-IDF (Term Frequency-Inverse Document Frequency) text vectorization to capture semantic weight.",
      "Trained and compared classification models (Logistic Regression, Naive Bayes) to achieve optimal accuracy.",
      "Evaluated performance metrics using precision, recall, and F1-score confusion matrices."
    ]
  },
  {
    id: "food-app",
    title: "Food Ordering Mobile App",
    category: "UI/UX",
    description: "Designed a modern food delivery application with intuitive navigation, user-centered ordering flow, interactive prototypes, seamless checkout experience, and responsive mobile-first layouts.",
    techStack: ["Figma", "Wireframing", "User Research", "Prototyping", "Design System"],
    image: "/projects/foodapp.jpg",
    githubRepo: "#",
    liveDemo: "https://www.figma.com/proto/jOt2vC2etD14Pv4rXo86Uw/donut?node-id=1-2&t=TTKLVXfUKs7sRKpQ-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2",
    featured: false,
    details: [
      "Conducted user research interviews and created personas to map out order-and-delivery journeys.",
      "Built low-fidelity wireframes to iterate on UX layouts and navigation flows.",
      "Created a robust Design System with accessible typography, color tokens, and custom components.",
      "Developed high-fidelity interactive prototypes in Figma simulating search, cart, and payment states."
    ]
  },
  {
    id: "gaming-dashboard",
    title: "Gaming Dashboard",
    category: "UI/UX",
    description: "Designed a modern gaming analytics dashboard featuring responsive layouts, reusable components, data visualization cards, intuitive navigation, and premium dark-themed interfaces.",
    techStack: ["Figma", "Auto Layout", "Components", "Typography", "Interactive Prototype"],
    image: "/projects/gaming.jpg",
    githubRepo: "#",
    liveDemo: "https://www.figma.com/proto/w9GIqfeF7hc1Wjty8d0SRk/gamer?t=SeLQdZUXQBFVkxop-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=2-2&starting-point-node-id=2%3A2",
    featured: false,
    details: [
      "Developed dark-themed dashboard layouts with visual hierarchy optimized for gamers.",
      "Utilized Figma Auto Layout and components with variant states for flexible design scaling.",
      "Designed grid cards containing visual analytics charts and live streams indicators.",
      "Prototyped interactive navigation transitions and state micro-interactions."
    ]
  }
];
