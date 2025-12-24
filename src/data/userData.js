import profileImg from '../assets/profile.jpg'; // 👈 Hii ndio picha yako
import propertyImg from '../assets/property-dashboard.png';
import redinkImg from '../assets/redink.png';
import ujenziImg from '../assets/ujenzi.png';
import tucasaImg from '../assets/tucasa-preview.png';
import myBookCover from '../assets/my-book-cover.jpg';

export const userData = {
  name: "Abdalah Wambura",
  role: "Strategic Technologist",
  tagline: "Merging Technical Logic with Business Strategy.",
  
  // ✅ Hii hapa! Tunatumia variable 'profileImg' (bila quotes "")
  profileImage: profileImg, 
  
  about: {
    title: "The Business Logic Developer",
    desc: "I bridge the gap between complex code and bottom-line growth. With a background in Finance and Accounting, I don't just write software; I build profitable digital assets that reduce operational costs and maximize revenue."
  },

  email: "abdalahjoseph80@gmail.com",
  phone: "+255 688 735 820",
  location: "Dar es Salaam, Tanzania",
  address: "P.O. Box 30112, Dar es Salaam",

  socials: {
    whatsapp: "https://wa.me/255688735820",
    instagram: "https://www.instagram.com/abdalahwambura",
    linkedin: "https://www.linkedin.com/in/abdalah-wambura-905a27361",
    twitter: "https://twitter.com/AbdalahJoseph52",
    github: "https://github.com/abdalahjoseph52-afk"
  },

  experience: [
    {
      company: "Redink Agency",
      role: "Lead Full Stack Developer",
      date: "2023 - Present",
      desc: "Led the technical restructuring of agency client sites, improving load speeds by 40% and implementing SEO strategies that increased organic traffic by 150%.",
      tech: ["React", "Next.js", "AWS"]
    },
    {
      company: "TUCASA CBE",
      role: "Technical Systems Lead",
      date: "2022 - 2023",
      desc: "Architected a centralized membership database system handling 500+ active records, reducing administrative data entry time by 20 hours per month.",
      tech: ["Firebase", "React", "Node.js"]
    },
    {
      company: "Freelance",
      role: "Web Developer & Consultant",
      date: "2021 - 2022",
      desc: "delivered custom web solutions for SMEs in Dar es Salaam, focusing on financial dashboards and inventory management systems.",
      tech: ["JavaScript", "Tailwind", "Firebase"]
    }
  ],

  clients: [
    { name: "TUCASA CBE", logo: "https://placehold.co/100" },
    { name: "Redink Agency", logo: "https://placehold.co/100" },
    { name: "PropertyPro", logo: "https://placehold.co/100" },
    { name: "Ujenzi Tips", logo: "https://placehold.co/100" }
  ],

  services: [
    { 
      title: "Technical Architecture", 
      desc: "Building scalable, secure, and high-performance digital architectures.",
      tags: ["React", "Node.js", "Firebase", "System Design"]
    },
    { 
      title: "Financial Strategy", 
      desc: "Ensuring every line of code contributes directly to business profitability.",
      tags: ["Financial Modeling", "Business Logic", "ROI Analysis"]
    },
    { 
      title: "Digital Growth", 
      desc: "Amplifying brand visibility through data-driven content and SEO strategies.",
      tags: ["SEO", "Content Strategy", "Brand Positioning"]
    },
    { 
      title: "User Experience (UX)", 
      desc: "Designing intuitive interfaces that reduce training time and friction.",
      tags: ["Psychology", "UI Design", "Workflow Optimization"]
    }
  ],

  testimonials: [
    {
      quote: "Abdalah doesn't just take instructions; he challenges the logic to ensure the product actually makes money. A rare find.",
      author: "Sarah J.",
      role: "CEO, Redink Agency"
    },
    {
      quote: "The financial dashboard he built saved us 15 hours of manual reconciliation every week. Highly recommended.",
      author: "David M.",
      role: "Director, PropertyPro TZ"
    }
  ],

  projects: [
    {
      title: "TUCASA CBE Digital",
      category: "Management Systems",
      description: "A comprehensive system bridging leadership and members with secure database management.",
      tech: ["React", "Firebase", "Tailwind"],
      status: "Live System",
      statusColor: "text-green-600 bg-green-50 border-green-100",
      link: "https://tucasa-cbe-web.vercel.app/",
      github: "https://github.com/abdalahjoseph52-afk/tucasa-cbe-web",
      image: tucasaImg
    },
    {
      title: "PropertyPro TZ",
      category: "Fintech",
      description: "Financial dashboard for property managers with automated P&L reporting.",
      tech: ["React", "Recharts", "Finance Logic"],
      status: "Prototype",
      statusColor: "text-blue-600 bg-blue-50 border-blue-100",
      link: "https://property-pro-demo.vercel.app",
      github: "https://github.com/abdalahjoseph52-afk/property-pro-demo",
      image: propertyImg
    },
    {
      title: "Ujenzi Tips",
      category: "EdTech Platform",
      description: "A national construction education platform with bilingual support.",
      tech: ["React", "YouTube API"],
      status: "Live Product",
      statusColor: "text-yellow-600 bg-yellow-50 border-yellow-100",
      link: "https://ujenzi-tips.vercel.app",
      github: "https://github.com/abdalahjoseph52-afk/ujenzi-tips",
      image: ujenziImg
    },
    {
      title: "Redink Agency",
      category: "Corporate Brand",
      description: "High-performance agency website with advanced SEO and motion graphics.",
      tech: ["Framer Motion", "SEO"],
      status: "Live Site",
      statusColor: "text-red-600 bg-red-50 border-red-100",
      link: "https://redink-agency.vercel.app",
      github: "https://github.com/abdalahjoseph52-afk/redink-agency",
      image: redinkImg
    }
  ],

  books: [
    {
      id: 1,
      title: "MAISHA ZAIDI YA KUISHI",
      subtitle: "Safari ya Kuijua Nafsi Yako",
      author: "Abdalah J. Wambura",
      cover: myBookCover, 
      desc: "A guide to moving from 'just existing' to 'truly living' through self-awareness and purpose.",
      pdfUrl: "/book.pdf" 
    }
  ]
};