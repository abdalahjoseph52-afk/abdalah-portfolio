// src/data/blogData.js

// Placeholder image (assuming you will create a new asset folder for blog covers)
import placeholderImg from '../assets/my-book-cover.jpg'; 

export const blogPosts = [
  {
    id: 1,
    title: "The 3 Pillars of Profitable Software",
    slug: "3-pillars-profitable-software",
    date: "Dec 5, 2025",
    category: "Business Strategy",
    summary: "It’s not enough for code to work; it must deliver value. I break down the three fundamental principles (Financial, Technical, and Human) that ensure digital systems contribute directly to the bottom line.",
    image: placeholderImg,
    link: "#" // Link to the full blog post page
  },
  {
    id: 2,
    title: "Why Your MVP Needs a CFO, Not Just a CTO",
    slug: "mvp-cfo-cto",
    date: "Nov 28, 2025",
    category: "Fintech",
    summary: "Most startups fail due to cash flow, not code. My background in Finance ensures every Minimum Viable Product I build is designed for economic viability from day one.",
    image: placeholderImg,
    link: "#"
  },
  {
    id: 3,
    title: "EQ in UI: Designing for the Human Brain",
    slug: "eq-in-ui-design",
    date: "Nov 20, 2025",
    category: "Psychology & UX",
    summary: "A great interface is intuitive, but an exceptional one uses emotional intelligence to reduce cognitive load and enhance user satisfaction. Learn how psychology drives my design choices.",
    image: placeholderImg,
    link: "#"
  },
];