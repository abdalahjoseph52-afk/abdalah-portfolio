// src/data/blogData.js
import profileImg from '../assets/profile.jpg';
import propertyImg from '../assets/property-dashboard.png'; // Added: Financial Dashboard Image
import ujenziImg from '../assets/ujenzi.png';             // Added: Platform/Business Image
import bookCover from '../assets/my-book-cover.jpg'; 

export const blogPosts = [
  {
    id: 1,
    title: "The 3 Pillars of Profitable Software",
    slug: "3-pillars-profitable-software",
    date: "Dec 5, 2025",
    category: "Business Strategy",
    summary: "It’s not enough for code to work; it must deliver value. I break down the three fundamental principles (Financial, Technical, and Human) that ensure digital systems contribute directly to the bottom line.",
    image: propertyImg, // <-- IMAGE NOW RELEVANT: Financial Dashboard
    link: "#",
    content: `
      <p class="text-2xl font-bold text-slate-900 mb-6 border-b pb-2 border-blue-100">Introduction: Beyond 'It Works'</p>
      <p class="mb-6 leading-relaxed">In my career, I've seen countless software projects deemed "successful" by the development team, only to fail the true test: <strong>profitability</strong>. The traditional focus on technical excellence often misses the larger business context. As someone who bridges the gap between <strong>technical logic</strong> and <strong>business strategy</strong>, I rely on three core pillars to build systems that truly drive value.</p>
      
      <h3 class="text-2xl font-bold text-blue-600 mt-10 mb-4">Pillar 1: Financial Logic (The P&L Test)</h3>
      <p class="mb-6 leading-relaxed">Every feature should pass the P&L (Profit and Loss) test. Will it directly increase revenue, or will it reduce operational costs? My approach, rooted in <strong>Financial Analysis</strong>, ensures that software development is viewed as a <strong>calculated investment, not an expense</strong>.</p>
      
      <h3 class="text-2xl font-bold text-blue-600 mt-10 mb-4">Pillar 2: Technical Scalability (Future-Proofing)</h3>
      <p class="mb-6 leading-relaxed">This is where the <strong>Full Stack Developer</strong> in me comes into play. A profitable application must be able to handle growth without falling over. My use of robust stacks like **React, Node.js, and PostgreSQL** focuses on building a secure, performant foundation from day one.</p>

      <h3 class="text-2xl font-bold text-blue-600 mt-10 mb-4">Pillar 3: Human-Centricity (The Psychology Factor)</h3>
      <p class="mb-6 leading-relaxed">Profitability requires adoption. If the user interface is frustrating, no matter how clever the backend code, the system will fail. My knowledge of <strong>User Psychology (UX)</strong> and <strong>Emotional Intelligence</strong> ensures the final product is intuitive, reduces training time, and minimizes human error.</p>
      
      <p class="mt-10 text-xl font-semibold text-slate-800">Conclusion</p>
      <p class="mb-4 leading-relaxed">By adhering to these three pillars, we don't just build software; we build profitable, enduring digital assets. This is the difference between an engineer and a hybrid professional.</p>
    `,
  },
  {
    id: 2,
    title: "Why Your MVP Needs a CFO, Not Just a CTO",
    slug: "mvp-cfo-cto",
    date: "Nov 28, 2025",
    category: "Fintech",
    summary: "Most startups fail due to cash flow, not code. My background in Finance ensures every Minimum Viable Product I build is designed for economic viability from day one.",
    image: ujenziImg, // <-- IMAGE NOW RELEVANT: Platform/Business
    link: "#",
    content: `
      <p class="text-2xl font-bold text-slate-900 mb-6 border-b pb-2 border-yellow-100">The Startup Paradox</p>
      <p class="mb-6 leading-relaxed">The typical MVP (Minimum Viable Product) conversation centers on features, libraries, and launch speed. The conversation *should* be centered on **Unit Economics and runway**. A CTO is essential for product vision, but an MVP that scales technically while bleeding cash is a guaranteed failure. My role is to prevent that failure.</p>
      
      <h3 class="text-2xl font-bold text-yellow-600 mt-10 mb-4">Shifting from 'Launch' to 'Profit'</h3>
      <p class="mb-6 leading-relaxed">My <strong>Accounting & Finance</strong> background allows me to inject a CFO mindset early in the development cycle. This means asking critical questions that software-only developers often miss:</p>
      <ul class="list-disc list-inside ml-8 space-y-3 text-lg text-slate-700 mb-6 leading-relaxed">
        <li><strong>Cost of Acquisition (CAC):</strong> How much does it cost the system to acquire a single paying user? Features should optimize this.</li>
        <li><strong>Lifetime Value (LTV):</strong> Is the technology we’re building designed to maximize LTV (e.g., through smart subscription models or automated upsells)?</li>
        <li><strong>Feature ROI:</strong> What is the estimated <strong>Return on Investment</strong> for this feature before we commit a single hour of code?</li>
      </ul>
      
      <p class="mt-10 text-xl font-semibold text-slate-800">Conclusion</p>
      <p class="mb-4 leading-relaxed">The goal of an MVP is to test market hypotheses quickly and cheaply. When I build, the first hypothesis we test is always: <strong>is this viable?</strong> This strategy transforms risk into calculable investment.</p>
    `,
  },
  {
    id: 3,
    title: "EQ in UI: Designing for the Human Brain",
    slug: "eq-in-ui-design",
    date: "Nov 20, 2025",
    category: "Psychology & UX",
    summary: "A great interface is intuitive, but an exceptional one uses emotional intelligence to reduce cognitive load and enhance user satisfaction. Learn how psychology drives my design choices.",
    image: bookCover, // <-- IMAGE RELEVANT: Links to your Author/Psychology brand
    link: "#",
    content: `
      <p class="text-2xl font-bold text-slate-900 mb-6 border-b pb-2 border-purple-100">The Unspoken Conversation</p>
      <p class="mb-6 leading-relaxed">Every user interface is a conversation. A good conversation is clear and concise; a great one makes you feel understood. My study of <strong>Psychology</strong> is applied directly to <strong>User Experience (UX)</strong>.</p>
      
      <h3 class="text-2xl font-bold text-purple-600 mt-10 mb-4">Principle 1: Reducing Cognitive Load</h3>
      <p class="mb-6 leading-relaxed">The most human-centric design is the one that forces the user to think the least. By applying principles of <strong>Emotional Intelligence</strong>, I design workflows that anticipate user needs and reduce the feeling of frustration, which ultimately boosts adoption and retention.</p>
      
      <h3 class="text-2xl font-bold text-purple-600 mt-10 mb-4">Principle 2: The Power of Predictability</h3>
      <p class="mb-6 leading-relaxed">Users crave predictability. Consistency in navigation, button placement, and feedback loops is paramount. This predictability builds **trust** and makes the system feel reliable, turning a transactional relationship into a loyal one. This attention to detail reflects the **Precision First** mentality from my finance background.</p>
      
      <p class="mt-10 text-xl font-semibold text-slate-800">Conclusion</p>
      <p class="mb-4 leading-relaxed">Building systems that feel good to use is not a bonus—it's a requirement for commercial success. An interface that speaks to the user’s emotions is an interface that gets used.</p>
    `,
  },
];