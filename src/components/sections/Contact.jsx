import React, { useState } from 'react';
import { ArrowRight, Loader2, Send } from 'lucide-react';
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
      success("Ujumbe umetumwa!");
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) { error("Imeshindikana."); }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="bg-white py-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Let's build something profitable.</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Whether you need a complex Property Management System, a financial dashboard, or a technical partner—I am ready.
            </p>
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="font-bold text-blue-900 mb-2">Why work with me?</p>
              <ul className="list-disc list-inside text-blue-800/80 space-y-1 text-sm">
                <li>Business-first approach to coding</li>
                <li>Financial systems expertise</li>
                <li>Reliable communication</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1"><label className="text-sm font-bold text-slate-700 ml-1">Name</label><input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-slate-50 focus:bg-white transition-all" placeholder="John Doe" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})}/></div>
                <div className="space-y-1"><label className="text-sm font-bold text-slate-700 ml-1">Phone</label><input type="tel" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-slate-50 focus:bg-white transition-all" placeholder="0xxx xxx xxx" value={formData.phone} onChange={e=>setFormData({...formData, phone:e.target.value})}/></div>
              </div>
              <div className="space-y-1"><label className="text-sm font-bold text-slate-700 ml-1">Email</label><input type="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-slate-50 focus:bg-white transition-all" placeholder="john@example.com" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})}/></div>
              <div className="space-y-1"><label className="text-sm font-bold text-slate-700 ml-1">Message</label><textarea rows="4" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none bg-slate-50 focus:bg-white resize-none transition-all" placeholder="Project details..." value={formData.message} onChange={e=>setFormData({...formData, message:e.target.value})}></textarea></div>
              <button disabled={isSubmitting} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl hover:-translate-y-1">{isSubmitting ? <Loader2 className="animate-spin"/> : <><Send size={20}/> Send Message</>}</button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;