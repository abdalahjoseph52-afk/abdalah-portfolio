// ✅ MASTER CONTROL CENTER
import profileImg from '../assets/profile.jpg';
// Import Project Images
import propertyImg from '../assets/property-dashboard.png';
import redinkImg from '../assets/redink.png';
import ujenziImg from '../assets/ujenzi.png';
// Import Book Cover (Use web link or local import)
const bookCover = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop";

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

  // 3. SOCIAL LINKS (This fixes the crash!)
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

  // 5. PROJECTS (Controlled from here now)
  projects: [
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
      subtitle: "Mwongozo wa Kusimama, Kutulia, na Kuanza Safari Yako",
      author: "Abdalah J. Wambura",
      cover: bookCover, 
      desc: "Kitabu hiki si tangazo la majibu, bali ni ushuhuda wa mwaliko niliopewa na sauti ya ndani. Mwongozo wa kutoka kwenye 'kuwepo tu' na kuelekea kwenye 'kuishi kweli'.",
      chapters: [
        {
          title: "DIBAJI",
          text: `Kuna wakati nilijikuta nimesimama kimya katikati ya kelele za maisha...`
          // (You can paste the rest of the content here later)
        }
      ]
    }
  ]
};