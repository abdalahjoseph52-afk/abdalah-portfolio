// src/App.jsx

import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Blog from './components/sections/Blog'; // <--- ADDED: Import Blog
import Library from './components/sections/Library'; 
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        
        {/* NEW BLOG SECTION */}
        <Blog /> {/* <--- ADDED: Blog component */}
        
        <Library />
        <Contact />
      </main>
      
    </div>
  );
}

export default App;