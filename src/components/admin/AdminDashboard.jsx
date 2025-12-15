// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { 
  LayoutDashboard, Folder, BookOpen, FileText, Mail, LogOut, Settings, Menu, X, Loader2 
} from 'lucide-react';

// Sub-Components
import Login from './Login';
import ProjectManager from './tabs/ProjectManager';
import BlogManager from './tabs/BlogManager';
import LibraryManager from './tabs/LibraryManager';
import MessageInbox from './tabs/MessageInbox';
import SettingsTab from './tabs/SettingsTab';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  if (loading) return <div className="h-screen flex justify-center items-center"><Loader2 className="animate-spin text-blue-600"/></div>;
  
  if (!user) return <Login />;

  const renderContent = () => {
    switch(activeTab) {
      case 'projects': return <ProjectManager />;
      case 'blogs': return <BlogManager />;
      case 'books': return <LibraryManager />;
      case 'messages': return <MessageInbox />;
      case 'settings': return <SettingsTab />;
      default: return <ProjectManager />;
    }
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <button 
      onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }} 
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
    >
      <Icon size={20}/> {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h2 className="font-bold text-lg tracking-wide flex items-center gap-2"><LayoutDashboard size={20}/> Admin</h2>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 hover:bg-slate-800 rounded-lg">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-slate-900 p-4">
           <nav className="space-y-2">
             <NavItem id="projects" icon={Folder} label="Projects" />
             <NavItem id="blogs" icon={FileText} label="Blog" />
             <NavItem id="books" icon={BookOpen} label="Library" />
             <NavItem id="messages" icon={Mail} label="Inbox" />
             <NavItem id="settings" icon={Settings} label="Settings" />
           </nav>
           <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 w-full px-4 py-4 mt-8 border-t border-slate-800 font-bold"><LogOut size={20}/> Logout</button>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-slate-300 flex-col h-screen sticky top-0">
        <div className="p-6 font-bold text-white text-xl flex items-center gap-2"><LayoutDashboard className="text-blue-500"/> Dashboard</div>
        <nav className="flex-1 px-4 space-y-2">
          <NavItem id="projects" icon={Folder} label="Projects" />
          <NavItem id="blogs" icon={FileText} label="Blog" />
          <NavItem id="books" icon={BookOpen} label="Library" />
          <NavItem id="messages" icon={Mail} label="Inbox" />
          <NavItem id="settings" icon={Settings} label="Settings" />
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 w-full px-4 py-2 hover:bg-slate-800 rounded-lg transition-colors"><LogOut size={18}/> Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 pb-32 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;