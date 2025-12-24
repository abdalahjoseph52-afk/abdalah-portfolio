import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar'; 
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Blog from './components/sections/Blog';
import Library from './components/sections/Library';
import Contact from './components/sections/Contact';

// Hakikisha hizi zipo
import NotFound from './components/pages/NotFound';
import AdminDashboard from './components/admin/AdminDashboard';

import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Loader2 } from 'lucide-react'; 

import { auth, db } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { userData } from './data/userData'; 

const BlogPost = lazy(() => import('./components/pages/BlogPost'));

const PageLoader = () => (
  <div className="h-screen flex items-center justify-center bg-slate-50">
    <Loader2 className="animate-spin text-blue-600 w-8 h-8"/>
  </div>
);

const HomePage = () => (<> <Hero /> <Skills /> </>);
const AboutPage = () => (<div className="pt-20"><About /><Skills /></div>);

function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  
  // ✅ 1. Tunatengeneza State mpya kuhifadhi User
  const [currentUser, setCurrentUser] = useState(null);
  
  const [contactInfo, setContactInfo] = useState(userData.socials); 
  const [authLoading, setAuthLoading] = useState(true);
  
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  useEffect(() => {
     const unsubSettings = onSnapshot(doc(db, "settings", "general"), (docSnap) => { 
       if(docSnap.exists()) setContactInfo({ ...userData, ...userData.socials, ...docSnap.data() });
     });

     // ✅ 2. Hapa tunahifadhi User akilogin
     const unsubAuth = onAuthStateChanged(auth, (user) => {
       if (user) {
         setIsAdminView(true);
         setCurrentUser(user); // <--- HII NDIO ILIKOSEKANA
       } else {
         setCurrentUser(null);
       }
       setAuthLoading(false);
     });

     return () => { unsubSettings(); unsubAuth(); }
  }, []);

  if (authLoading) return <PageLoader />;

  if (isAdminView) {
    return (
      <>
        <div className="fixed bottom-4 right-4 z-[1000]">
          <button onClick={() => setIsAdminView(false)} className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm hover:bg-slate-800 transition-all border border-slate-700">Back to Site</button>
        </div>
        
        {/* ✅ 3. Tunapitisha "user" kwenda kwenye Dashboard */}
        <AdminDashboard user={currentUser} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 flex flex-col justify-between">
      <Navbar />
      
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<div className="pt-20"><Projects /></div>} />
            <Route path="/library" element={<div className="pt-20"><Library /></div>} />
            <Route path="/blog" element={<div className="pt-20"><Blog /></div>} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<div className="pt-20"><Contact /></div>} />
            
            {/* Catch-all Route for 404 Errors */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="bg-[#0f172a] text-white pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12 border-b border-slate-800 pb-12">
            
            <div className="text-center md:text-left space-y-6">
              <h3 className="text-3xl font-extrabold tracking-tight">Abdalah<span className="text-blue-500">.</span></h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
                Building digital assets that generate revenue through financial logic and robust code.
              </p>
              <div className="pt-2">
                <a href="/cv.pdf" download className="text-xs font-bold text-white border-b border-blue-500 pb-1 hover:text-blue-400 transition-colors tracking-widest uppercase">
                  Download My CV
                </a>
              </div>
            </div>

            <div className="text-center md:text-center">
              <h4 className="text-xs font-bold mb-6 text-slate-500 uppercase tracking-widest">Menu</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-300">
                <li><a href="/about" className="hover:text-blue-500 transition-colors">About Me</a></li>
                <li><a href="/projects" className="hover:text-blue-500 transition-colors">Featured Projects</a></li>
                <li><a href="/library" className="hover:text-blue-500 transition-colors">Library</a></li>
                <li><a href="/contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="text-center md:text-right flex flex-col items-center md:items-end">
              <h4 className="text-xs font-bold mb-6 text-slate-500 uppercase tracking-widest">Connect</h4>
              <ul className="space-y-3 text-sm text-slate-400 mb-8 w-full md:w-auto">
                <li className="flex items-center justify-center md:justify-end gap-3"><span className="text-slate-500">Call:</span> <span className="text-white font-medium">{contactInfo.phone}</span></li>
                <li className="flex items-center justify-center md:justify-end gap-3"><span className="text-slate-500">Email:</span> <span className="text-white font-medium">{contactInfo.email}</span></li>
                <li className="flex items-center justify-center md:justify-end gap-3"><span className="text-slate-500">Loc:</span> <span className="text-white font-medium">{contactInfo.location}</span></li>
              </ul>
              <div className="flex gap-6 justify-center md:justify-end">
                <a href={contactInfo.whatsapp} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors transform hover:-translate-y-1"><FaWhatsapp size={22} /></a>
                <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors transform hover:-translate-y-1"><FaLinkedinIn size={22} /></a>
                <a href={contactInfo.twitter} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors transform hover:-translate-y-1"><FaTwitter size={22} /></a>
                <a href={contactInfo.instagram} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors transform hover:-translate-y-1"><FaInstagram size={22} /></a>
                <a href={contactInfo.facebook} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors transform hover:-translate-y-1"><FaFacebookF size={22} /></a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-medium">
             <p>© {new Date().getFullYear()} Abdalah Wambura. All Rights Reserved.</p>
             <button onClick={() => setIsAdminView(true)} className="hover:text-slate-400 cursor-pointer select-none">Admin Login</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;