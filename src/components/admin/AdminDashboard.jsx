import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  LogOut,
  FolderOpen
} from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';

// 👇 FIX IS HERE: Changed './Login' to './login' (lowercase)
import Login from './login'; 

// Import Tab Components
import BlogManager from './tabs/BlogManager';
import LibraryManager from './tabs/LibraryManager';
import ProjectManager from './tabs/ProjectManager';
import MessageInbox from './tabs/MessageInbox';
import SettingsTab from './tabs/SettingsTab';

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // If not logged in, show Login Screen
  if (!user) {
    return <Login />;
  }

  // Handle Logout
  const handleLogout = async () => {
    if(window.confirm("Are you sure you want to logout?")) {
       await signOut(auth);
       window.location.reload();
    }
  };

  // Sidebar Menu Items
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen size={20} /> },
    { id: 'blog', label: 'Blog Posts', icon: <FileText size={20} /> },
    { id: 'library', label: 'Library', icon: <BookOpen size={20} /> },
    { id: 'messages', label: 'Inbox', icon: <MessageSquare size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <div className="p-8 text-center text-slate-500">Overview Dashboard (Coming Soon)</div>;
      case 'projects': return <ProjectManager />;
      case 'blog': return <BlogManager />;
      case 'library': return <LibraryManager />;
      case 'messages': return <MessageInbox />;
      case 'settings': return <SettingsTab />;
      default: return <ProjectManager />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#0f172a] text-white transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">Admin<span className="text-blue-500">.</span></span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            <LayoutDashboard size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors`}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800 capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-900">{user.email}</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
              {user.email[0].toUpperCase()}
            </div>
          </div>
        </header>
        
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;