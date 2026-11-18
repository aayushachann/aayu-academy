export const COURSES = [
  {
    slug: "full-stack-javascript", title: "Full-Stack JavaScript", track: "WEB", level: "BEGINNER",
    image: "/images/courses/full-stack-javascript.jpg",
    outcomes: ["Write modern JavaScript", "Build pages that react to users", "Create a simple API with Node", "Deploy your app online"],
    lessons: [["Welcome and setup", 8], ["Variables and types", 12], ["Functions and scope", 14], ["Async and promises", 18], ["Build a REST API", 25], ["Connect a database", 22], ["Deploy to the web", 15]]
  },
  {
    slug: "python-fundamentals", title: "Python Fundamentals", track: "PYTHON", level: "BEGINNER",
    image: "/images/courses/python-fundamentals.jpg",
    outcomes: ["Write and run Python scripts", "Use conditions and loops", "Organize code in functions", "Read and write files"],
    lessons: [["Install Python", 7], ["Variables, strings and input", 11], ["Lists and dictionaries", 15], ["Loops and conditions", 14], ["Functions", 13]]
  },
  {
    slug: "modern-react-ui", title: "Modern React & UI", track: "WEB", level: "INTERMEDIATE",
    image: "/images/courses/modern-react-ui.jpg",
    outcomes: ["Build reusable components", "Manage state with hooks", "Fetch and show data", "Style with Tailwind CSS"],
    lessons: [["Components and props", 12], ["Effects and data fetching", 18], ["Forms", 14], ["Context and custom hooks", 17], ["Styling with Tailwind", 13], ["Testing components", 16]]
  },
  {
    slug: "data-structures-algorithms", title: "Data Structures & Algorithms", track: "PYTHON", level: "INTERMEDIATE",
    image: "/images/courses/data-structures-algorithms.jpg",
    outcomes: ["Choose the right data structure", "Implement sorting and searching", "Solve problems with recursion"],
    lessons: [["Big-O in plain words", 12], ["Arrays and linked lists", 16], ["Stacks and queues", 14], ["Hash tables", 15], ["Trees", 18], ["Sorting and searching", 20], ["Recursion", 15], ["Graphs", 19]]
  },
  {
    slug: "ios-swift-essentials", title: "iOS Swift Essentials", track: "MOBILE", level: "BEGINNER",
    image: "/images/courses/ios-swift-essentials.jpg",
    outcomes: ["Write Swift code", "Build screens with SwiftUI", "Handle taps and state", "Run your app on a simulator"],
    lessons: [["Xcode and Swift basics", 10], ["Types and functions", 12], ["Your first SwiftUI view", 14], ["State and bindings", 15], ["Lists and navigation", 16]]
  },
  {
    slug: "sql-database-architecture", title: "SQL & Database Architecture", track: "DATA", level: "INTERMEDIATE",
    image: "/images/courses/sql-database-architecture.jpg",
    outcomes: ["Query data with SQL", "Design tables", "Join data across tables", "Speed up queries with indexes"],
    lessons: [["SELECT and WHERE", 11], ["Sorting and grouping", 13], ["Joins", 17], ["Designing tables", 15], ["Indexes", 14], ["Transactions", 12]]
  },
  {
    slug: "android-kotlin-essentials", title: "Android Kotlin Essentials", track: "MOBILE", level: "INTERMEDIATE",
    image: "/images/placeholder/course.svg",
    outcomes: ["Write Kotlin code", "Build screens with Compose", "Store data on the device", "Call a web API"],
    lessons: [["Kotlin basics", 12], ["Screens in Compose", 14], ["Navigation", 13], ["Local storage", 16], ["Networking", 18]]
  },
  {
    slug: "machine-learning-pytorch", title: "Machine Learning with PyTorch", track: "DATA", level: "INTERMEDIATE",
    image: "/images/courses/machine-learning-pytorch.jpg",
    outcomes: ["Work with tensors", "Train a model and read the results", "Avoid overfitting"],
    lessons: [["Tensors", 14], ["Autograd", 16], ["Your first model", 20], ["Training loop", 18], ["Evaluating a model", 15]]
  }
];