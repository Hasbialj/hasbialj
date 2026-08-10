/**
 * lang.js — English Translations for SITE_DATA
 * ==============================================
 * Stores the English version of all translatable content.
 * Keys match SITE_DATA structure exactly.
 * Non-translatable fields (name, phone, email, url, tech, etc.) are inherited from SITE_DATA.
 */

const LANG_EN = {

  profile: {
    tagline: "Pursuing a professional career in IT Support & Operations — focused on efficiency and human resource development.",
    bio_short: "Highly dedicated Software Developer & IT Support with experience in warehouse operational management and an Informatics Engineering background.",
    profession: "Software Developer & IT Support",
    location: "Kab. Bandung, West Java, Indonesia",

    bio_long: [
      "I am Hasbial Jamil Mardia Putra — a software developer and IT Support specialist from Katapang, Bandung Regency.",
      "My career journey has been shaped by a combination of hands-on experience in the operations & logistics industry (such as at PT. Nokha Warehouse and PT. Sarana Pancakarya Nusa) and academic knowledge in the field of Informatics Engineering.",
      "Field experience has trained me to be meticulous, agile, and to possess friendly and solution-oriented communication skills in handling the needs of both clients and teams.",
      "I am currently pursuing a Bachelor's degree in Informatics Engineering at Universitas Langlangbuana (2022–2026), with a commitment to continuous growth and making a real contribution to any organization."
    ],

    values: [
      { icon: "✦", label: "Meticulous & Agile", desc: "Ensuring every recording, packaging, and troubleshooting process is carried out accurately." },
      { icon: "◈", label: "Communicative & Friendly", desc: "Building effective working relationships and friendly service towards clients." },
      { icon: "◎", label: "Continuous Growth", desc: "Strong commitment to continuously learning new technologies and developing human resource potential." }
    ],

    interests: ["Social Activities", "Internet & Technology", "IT Infrastructure", "Open Source", "Human Resource Development"],
  },

  skills: [
    { name: "IT Support & Troubleshooting",    level: 92, category: "technical" },
    { name: "Web Development (HTML/CSS/JS)",    level: 90, category: "technical" },
    { name: "Warehouse & Inventory Management", level: 78, category: "technical" },
    { name: "Packing & Quality Control",        level: 75, category: "technical" },
    { name: "Accuracy & Detail-Oriented",       level: 95, category: "soft"      },
    { name: "Communication & Client Service",   level: 90, category: "soft"      },
    { name: "Agility & Adaptability",           level: 92, category: "soft"      },
    { name: "Teamwork",                         level: 88, category: "soft"      },
  ],

  timeline: [
    {
      year: "June 2020 — July 2020",
      type: "work",
      title: "Packing & Operations Staff",
      org: "PT. Sarana Pancakarya Nusa",
      location: "Bandung, ID",
      desc: "Responsible for arranging and packing goods precisely to prevent errors during loading onto transport fleets prior to delivery.",
      tags: ["Packing", "Quality Control", "Operations"]
    },
    {
      year: "February 2018 — July 2018",
      type: "work",
      title: "Warehouse Staff",
      org: "PT. Nokha Warehouse",
      location: "Bandung, ID",
      desc: "Assisted with warehouse stock checking, compiled inbound/outbound delivery and storage reports, and ensured goods were correctly delivered to clients.",
      tags: ["Stock Management", "Logistics Report", "Warehouse"]
    },
    {
      year: "2016",
      type: "milestone",
      title: "Certificate of National Insight & State Defense Orientation",
      org: "Kodam III / Siliwangi",
      location: "Bandung, ID",
      desc: "Received a certificate of national insight and state defense orientation at the Kodam III/Siliwangi Islamic Boarding School environment in 2016.",
      tags: ["State Defense", "National Insight", "Kodam III/Siliwangi"]
    },
    {
      year: "2022 — 2026",
      type: "education",
      title: "Bachelor of Informatics Engineering",
      org: "Universitas Langlangbuana",
      location: "Bandung, ID",
      desc: "Focused on software development, information systems, IT infrastructure, and networking.",
      tags: ["Informatics Engineering", "Web Development", "IT Infrastructure"]
    },
    {
      year: "2015 — 2018",
      type: "education",
      title: "Senior High School",
      org: "SMA Darul Falah",
      location: "Bandung, ID",
      desc: "Graduated in 2018. Actively participated in school organizations and national awareness activities.",
      tags: ["Senior High School", "Darul Falah"]
    },
  ],

  projects: [
    {
      id: "beligadget",
      title: "BeliGadget - E-Commerce Platform",
      description: "An e-commerce platform for gadgets with Midtrans payment gateway integration. Full features including shopping cart, product management, and online payment system.",
      category: "E-Commerce",
    },
    {
      id: "sistem-rekomendasi-bahan-masakan",
      title: "Cooking Ingredient Recommendation System",
      description: "A web-based cooking ingredient recommendation system as a thesis project. Helps users find ingredient combinations that match their preferences and available ingredients.",
      category: "Web App",
    },
    {
      id: "bimbel-adhiwikarta",
      title: "Adhiwikarta Tutoring Management System",
      description: "A management application for Adhiwikarta tutoring center with student management, scheduling, payment, and reporting features. Simplifies daily tutoring operations.",
      category: "Management System",
    },
    {
      id: "perpustakaan",
      title: "Digital Library System",
      description: "A library management system with book catalog, borrowing, returning, and reporting features. Helps libraries manage collections and lending transactions.",
      category: "Management System",
    },
    {
      id: "catshop081",
      title: "CatShop081 - Online Pet Shop",
      description: "An online shop platform for pet supplies with a catalog system and product management.",
      category: "E-Commerce",
    },
    {
      id: "personal-portfolio",
      title: "Personal Portfolio Website",
      description: "A professional portfolio website with dark/light mode, smooth animations, and dynamic content. Built to showcase skills and career experience.",
      category: "Website",
    }
  ],

  // UI Strings
  ui: {
    badge_available: "Available for projects",
    nav: {
      home: "Home",
      about: "About",
      cv: "Resume",
      portfolio: "Portfolio",
      blog: "Blog",
      contact: "Contact",
      read_blog: "Read Articles →"
    },
    hero: {
      cta_about: "Get to Know Me",
      cta_blog: "Read Articles",
      cta_cv: "Download ATS CV"
    },
    about: {
      title: "About Me",
      interests_label: "Interests",
    },
    experience: {
      title: "Resume & Experience",
      skills_title: "Skills",
      timeline_title: "Career Timeline",
      type_labels: { work: "Career", education: "Education", milestone: "Achievement" }
    },
    projects: {
      title: "Projects I've Worked On",
      subtitle: "A collection of real projects I've built."
    },
    certs: {
      title: "Training & Achievements",
      subtitle: "Certifications and achievements earned.",
      filter_all: "All",
      cat_labels: { teknologi: "Technology", kepemimpinan: "Leadership", pelatihan: "Training", penghargaan: "Award" }
    },
    contact: {
      title: "Let's Connect",
      subtitle: "Have a project or opportunity? Feel free to reach out.",
      form_name: "Full Name",
      form_email: "Email Address",
      form_message: "Your Message",
      form_submit: "Send Message",
      form_success: "Message sent! I'll get back to you shortly."
    },
    footer: {
      made_with: "Built with ❤️ by"
    }
  }
};
