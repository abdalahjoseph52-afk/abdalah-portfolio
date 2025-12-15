import React, { useState } from 'react';
import { MdSend, MdCheckCircle } from 'react-icons/md'; // Google Material Icons
import { Loader2 } from 'lucide-react';
import { userData } from '../../data/userData';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '../../context/ToastContext';

const Contact = () => {
  const { success, error } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let formattedPhone = formData.phone.trim();
      if (formattedPhone.startsWith('0')) formattedPhone = '255' + formattedPhone.substring(1);
      
      await addDoc(collection(db, "messages"), {
        ...formData,
        phone: formattedPhone,
        createdAt: serverTimestamp()
      });
      success("Message Sent Successfully!");
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) { error("Failed to send message."); }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Corporate Pitch */}
          <div className="space-y-8 pt-4">
            <div>
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Get in Touch</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Ready to scale your <br/> business logic?
              </h3>
            </div>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              I don't just "freelance." I partner with companies to build financial engines and technical architectures that drive revenue.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="bg-green-100 p-2 rounded-full"><MdCheckCircle className="text-green-600 text-xl"/></div>
                <span className="font-medium text-slate-700">Financial Systems Expertise</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="bg-blue-100 p-2 rounded-full"><MdCheckCircle className="text-blue-600 text-xl"/></div>
                <span className="font-medium text-slate-700">Enterprise-Grade React/Node</span>
              </div>
            </div>
          </div>

          {/* Right Side: Modern Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
            <h4 className="text-xl font-bold text-slate-900 mb-6">Send a Message</h4>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Your Name</label>
                    <input type="text" required className="w-full px-4 py-3.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium" placeholder="John Doe" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})}/>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                    <input type="tel" required className="w-full px-4 py-3.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium" placeholder="+255..." value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})}/>
                </div>
              </div>
              
              <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                  <input type="email" required className="w-full px-4 py-3.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium" placeholder="name@company.com" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})}/>
              </div>
              
              <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">How can I help?</label>
                  <textarea rows="4" required className="w-full px-4 py-3.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium resize-none" placeholder="Tell me about your project..." value={formData.message} onChange={e=>setFormData({...formData, message:e.target.value})}></textarea>
              </div>

              <button disabled={isSubmitting} className="w-full bg-slate-900 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-900/20 mt-2">
                {isSubmitting ? <Loader2 className="animate-spin"/> : <><span className="text-sm">SEND MESSAGE</span> <MdSend size={18}/></>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;