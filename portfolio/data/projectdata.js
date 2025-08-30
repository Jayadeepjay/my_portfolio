export const projectsData = [
    {
      title: "AI-Based Personalized Learning Notes Generator",
      description:
        "A full-stack Django application that allows users to upload documents (PDFs/audio) and generates personalized structured study notes using OpenAI (LangChain). The platform features user authentication, file management, RESTful APIs with documentation, asynchronous task processing, and cloud storage (AWS S3), providing both web and API interfaces for accessibility.",
      technologies: ["Django REST Framework", "Celery", "OpenAI API", "LangChain", "PostgreSQL","SQLite","AWS S3","JWT Authentication","Swagger","Redoc"],
      github: "https://github.com/yourusername/resume-screener",
      liveDemo: "https://resume-screener-demo.vercel.app",
      image: "/projects/AiNotes_pic.jpg"
    },
    {
      title: "Eventify – End-to-End Event Management Solution",
      description:
        "A comprehensive event management system built with Next.js and React, designed for admins, vendors, and customers to manage bookings, vendors, gigs, and finances. The platform features AI-powered event planning, dashboards, CRUD operations, and responsive UI/UX, offering end-to-end workflows for seamless event organization.",
      technologies:["React","Next.js","Tailwind CSS","Next.js API Routes","Prisma ORM","SQLite"],
      github: "https://github.com/yourusername/college-events",
      liveDemo: "https://college-events.vercel.app",
      image: "/projects/EventManage_pic.jpg"
    },
    {
      title: "FoodServe – Django-Based Food Ordering System",
      description:
        "A Django web application for food ordering and menu browsing, featuring multi-app architecture with modules for food items, user authentication, and basic calculations. Users can browse menus, view item details, register/login, while admins manage data via the Django admin panel. Built with reusable templates and models, ensuring modularity and scalability.",
      technologies:["Django","Django ORM","Django Templates (HTML, CSS, Bootstrap)","SQLite"],
      github: "https://github.com/yourusername/fake-review-detector",
      liveDemo: "https://fake-review-app.streamlit.app",
      image: "/projects/FoodOrder_pic.jpg"
    },
    {
      title: "Personal Portfolio Website",
      description:
        "Built a Next.js-based personal portfolio website to showcase projects, skills, and certifications with a modern, responsive UI. Designed reusable React components, organized data-driven sections, and integrated deployment scripts for both Windows and Unix environments. The site is fully customizable, easy to maintain, and optimized with server-side rendering and static generation.",
      technologies: ["Next.js","React", "Tailwind CSS", "PortCSS", "API route integration"],
      github: "https://github.com/yourusername/portfolio",
      liveDemo: "https://yourusername.github.io/portfolio",
      image: "/projects/portfolio_pic.jpg"
    }
  ];
  