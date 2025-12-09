// ✅ MASTER CONTROL CENTER
import profileImg from '../assets/profile.jpg';
import propertyImg from '../assets/property-dashboard.png';
import redinkImg from '../assets/redink.png';
import ujenziImg from '../assets/ujenzi.png';
import myBookCover from '../assets/my-book-cover.jpg'; 

// 1. HAPA: TUME-IMPORT PICHA MPYA ULIYOIWEKA
import tucasaImg from '../assets/tucasa-preview.png'; 

export const userData = {
  // 1. PERSONAL DETAILS
  name: "Abdalah Wambura",
  role: "Full Stack Developer | Finance & Admin",
  tagline: "Merging Technical Logic with Business Strategy.",
  about: {
    title: "The \"Why\" Behind the Code",
    desc: "I noticed a gap in the Tanzanian market: Developers write great code, but they often don't understand the financial or operational goals of the business. With my background in Accounting & Finance, I don't just take tickets. I build profitable systems."
  },

  // 2. CONTACT INFORMATION
  email: "abdalahjoseph80@gmail.com",
  phone: "+255 688 735 820",
  location: "Dar es Salaam, Tanzania",

  // 3. SOCIAL LINKS
  socials: {
    whatsapp: "https://wa.me/255688735820",
    instagram: "https://www.instagram.com/abdalahwambura",
    linkedin: "https://www.linkedin.com/in/abdalah-wambura-905a27361",
    twitter: "https://twitter.com/AbdalahJoseph52",
    github: "https://github.com/abdalahjoseph52-afk"
  },

  // 4. SKILLS
  skills: [
    { title: "Technical Architecture", desc: "React, Node.js, Tailwind, Firebase" },
    { title: "Business & Finance", desc: "Financial Analysis, Strategic Planning" },
    { title: "Psychology & EQ", desc: "User Experience (UX), Leadership" }
  ],

  // 5. PROJECTS
  projects: [
    // HII HAPA PROJECT MPYA YA TUCASA (YA KWANZA)
    {
      title: "TUCASA CBE Digital Platform",
      category: "Church Management System",
      description: "A comprehensive system bridging leadership and members. Features a secure Admin Dashboard for member database management, CSV exports, event scheduling, and a custom audio player for choir ministry.",
      tech: ["React", "Firebase", "Tailwind CSS", "Context API"],
      status: "Live System",
      statusColor: "text-green-600 bg-green-50 border-green-100", // Kijani kuonesha iko Live
      link: "https://tucasa-cbe-web.vercel.app/",
      github: "https://github.com/abdalahjoseph52-afk/tucasa-cbe-web",
      image: tucasaImg // Inatumia picha uliyoweka
    },
    // PROJECTS ZINGINE ZINAFUATA CHINI
    {
      title: "Ujenzi Tips Platform",
      category: "Construction Tech",
      description: "A national construction education platform with bilingual support.",
      tech: ["React", "Tailwind", "YouTube API"],
      status: "Live Product",
      statusColor: "text-yellow-600 bg-yellow-50 border-yellow-100",
      link: "https://ujenzi-tips.vercel.app",
      github: "https://github.com/abdalahjoseph52-afk/ujenzi-tips",
      image: ujenziImg
    },
    {
      title: "Redink Agency",
      category: "Creative Agency",
      description: "High-performance agency website with 'Pro Max' visuals.",
      tech: ["Framer Motion", "SEO", "Google Maps"],
      status: "Live Agency",
      statusColor: "text-red-600 bg-red-50 border-red-100",
      link: "https://redink-agency.vercel.app",
      github: "https://github.com/abdalahjoseph52-afk/redink-agency",
      image: redinkImg
    },
    {
      title: "PropertyPro TZ",
      category: "Fintech & Real Estate",
      description: "Financial dashboard for property managers with automated P&L reporting.",
      tech: ["React", "Recharts", "Finance Logic"],
      status: "Live Prototype",
      statusColor: "text-blue-600 bg-blue-50 border-blue-100",
      link: "https://property-pro-demo.vercel.app",
      github: "https://github.com/abdalahjoseph52-afk/property-pro-demo",
      image: propertyImg
    }
  ],

  // 6. BOOKS
  books: [
    {
      id: 1,
      title: "MAISHA ZAIDI YA KUISHI",
      subtitle: "Safari ya Kuijua Nafsi Yako",
      author: "Abdalah J. Wambura",
      cover: myBookCover, 
      desc: "Kitabu hiki si tangazo la majibu, bali ni ushuhuda wa mwaliko niliopewa na sauti ya ndani. Mwongozo wa kutoka kwenye 'kuwepo tu' na kuelekea kwenye 'kuishi kweli'.",
      pdfUrl: "/book.pdf" 
    }
  ]
};