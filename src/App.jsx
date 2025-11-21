import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About'; // <--- Import
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      
      <main>
        <Hero />
        <About /> {/* <--- Place it here */}
        <Skills />
        <Projects />
        <Contact /> 
      </main>
      
    </div>
  );
}

export default App;