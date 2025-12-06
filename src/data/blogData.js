// src/data/blogData.js
import profileImg from '../assets/profile.jpg'; // Your face image
import bookCover from '../assets/my-book-cover.jpg'; // Your book cover image for variation

export const blogPosts = [
  {
    id: 1,
    title: "The 3 Pillars of Profitable Software",
    slug: "3-pillars-profitable-software",
    date: "Dec 5, 2025",
    category: "Business Strategy",
    summary: "It’s not enough for code to work; it must deliver value. I break down the three fundamental principles (Financial, Technical, and Human) that ensure digital systems contribute directly to the bottom line.",
    image: bookCover, // Using the book cover for visual variation
    link: "#",
    content: `
      <p class="text-xl font-bold text-slate-900 mb-6">Introduction: Beyond 'It Works'</p>
      <p class="mb-4">In my career, I've seen countless software projects deemed "successful" by the development team, only to fail the true test: **profitability**. The traditional focus on technical excellence often misses the larger business context. As someone who bridges the gap between **technical logic** and **business strategy**, I rely on three core pillars to build systems that truly drive value.</p>
      
      <h3 class="text-2xl font-bold text-blue-600 mt-8 mb-4">Pillar 1: Financial Logic (The P&L Test)</h3>
      <p class="mb-4">Every feature should pass the P&L (Profit and Loss) test. Will it directly increase revenue, or will it reduce operational costs? My approach, rooted in **Financial Analysis**, ensures that software development is viewed as a calculated investment, not an expense.</p>
      
      <h3 class="text-2xl font-bold text-blue-600 mt-8 mb-4">Pillar 2: Technical Scalability (Future-Proofing)</h3>
      <p class="mb-4">This is where the **Full Stack Developer** in me comes into play. A profitable application must be able to handle growth without falling over. My use of robust stacks like **React, Node.js, and PostgreSQL** focuses on building a secure, performant foundation from day one.</p>

      <h3 class="text-2xl font-bold text-blue-600 mt-8 mb-4">Pillar 3: Human-Centricity (The Psychology Factor)</h3>
      <p class="mb-4">Profitability requires adoption. If the user interface is frustrating, no matter how clever the backend code, the system will fail. My knowledge of **User Psychology (UX)** and **Emotional Intelligence** ensures the final product is intuitive, reduces training time, and minimizes human error.</p>
      
      <p class="mt-6 text-lg font-semibold">By adhering to these three pillars, we don't just build software; we build profitable, enduring digital assets.</p>
    `,
  },
  {
    id: 2,
    title: "Why Your MVP Needs a CFO, Not Just a CTO",
    slug: "mvp-cfo-cto",
    date: "Nov 28, 2025",
    category: "Fintech",
    summary: "Most startups fail due to cash flow, not code. My background in Finance ensures every Minimum Viable Product I build is designed for economic viability from day one.",
    image: profileImg, // Using your profile image
    link: "#",
    content: `
      <p class="text-xl font-bold text-slate-900 mb-6">The Startup Paradox</p>
      <p class="mb-4">The typical MVP (Minimum Viable Product) conversation centers on features, libraries, and launch speed. The conversation *should* be centered on Unit Economics and runway. A **CTO** is essential for product vision, but an MVP that scales technically while bleeding cash is a guaranteed failure.</p>
      
      <h3 class="text-2xl font-bold text-yellow-600 mt-8 mb-4">Shifting from 'Launch' to 'Profit'</h3>
      <p class="mb-4">My **Accounting & Finance** background allows me to inject a CFO mindset early in the development cycle. This means asking critical questions that software-only developers often miss:</p>
      <ul class="list-disc list-inside ml-4 space-y-2 text-lg text-slate-700">
        <li>**Cost of Acquisition:** How much does it cost the system to acquire a single paying user?</li>
        <li>**Lifetime Value (LTV):** Is the technology we’re building designed to maximize LTV (e.g., through subscription models or upsells)?</li>
        <li>**Feature ROI:** What is the estimated Return on Investment for this feature before we commit a single hour of code?</li>
      </ul>
      
      <p class="mt-6 text-lg font-semibold">The goal of an MVP is to test market hypotheses quickly and cheaply. When I build, the first hypothesis we test is always: **is this viable?**</p>
    `,
  },
  {
    id: 3,
    title: "EQ in UI: Designing for the Human Brain",
    slug: "eq-in-ui-design",
    date: "Nov 20, 2025",
    category: "Psychology & UX",
    summary: "A great interface is intuitive, but an exceptional one uses emotional intelligence to reduce cognitive load and enhance user satisfaction. Learn how psychology drives my design choices.",
    image: bookCover,
    link: "#",
    content: `
      <p class="text-xl font-bold text-slate-900 mb-6">The Unspoken Conversation</p>
      <p class="mb-4">Every user interface is a conversation. A good conversation is clear and concise; a great one makes you feel understood. My study of **Psychology** is applied directly to **User Experience (UX)**.</p>
      
      <h3 class="text-2xl font-bold text-purple-600 mt-8 mb-4">Reducing Cognitive Load</h3>
      <p class="mb-4">The most human-centric design is the one that forces the user to think the least. By applying principles of **Emotional Intelligence**, I design workflows that anticipate user needs and reduce the feeling of frustration, which ultimately boosts adoption and retention.</p>
      
      <h3 class="text-2xl font-bold text-purple-600 mt-8 mb-4">The Power of Predictability</h3>
      <p class="mb-4">Users crave predictability. Consistency in navigation, button placement, and feedback loops is paramount. This predictability builds **trust** and makes the system feel reliable, turning a transactional relationship into a loyal one. This attention to detail reflects the **Precision First** mentality from my finance background.</p>
      
      <p class="mt-6 text-lg font-semibold">Building systems that feel good to use is not a bonus—it's a requirement for commercial success.</p>
    `,
  },
];