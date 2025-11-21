import React from 'react';
import { Mail, Linkedin, Github, ArrowRight, MapPin, Facebook, Instagram, Phone } from 'lucide-react';

// --- CUSTOM ICONS (For the Real Brand Look) ---

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="bg-white py-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT: Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Let's build something profitable.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you need a complex Property Management System, a financial dashboard, or a technical partner for your business—I am ready.
              </p>
            </div>

            <div className="space-y-6">
              
              {/* Phone Number (NEW) */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Phone</h3>
                  <a href="tel:+255616166496" className="text-slate-600 hover:text-blue-600 transition-colors">
                    +255 616 166 496
                  </a>
                </div>
              </div>

              {/* Email (UPDATED) */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Email Me</h3>
                  <a href="mailto:abdalahwambura80@gmail.com" className="text-slate-600 hover:text-blue-600 transition-colors">
                    abdalahwambura80@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Location</h3>
                  <p className="text-slate-600">
                    Dar es Salaam, Tanzania
                  </p>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-6">
                <h3 className="font-bold text-slate-900 mb-4">Connect on Social</h3>
                <div className="flex flex-wrap gap-3">
                  <a href="https://www.linkedin.com/in/abdalah-wambura-905a27361?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" className="p-3 bg-slate-100 rounded-lg text-slate-600 hover:bg-[#0077b5] hover:text-white transition-all duration-300">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" target="_blank" rel="noreferrer" className="p-3 bg-slate-100 rounded-lg text-slate-600 hover:bg-[#333] hover:text-white transition-all duration-300">
                    <Github size={20} />
                  </a>
                  <a href="https://www.instagram.com/abdalahwambura?igsh=MTg5NWZraXA5eTcxZw==" target="_blank" rel="noreferrer" className="p-3 bg-slate-100 rounded-lg text-slate-600 hover:bg-[#E1306C] hover:text-white transition-all duration-300">
                    <Instagram size={20} />
                  </a>
                  <a href="https://twitter.com/AbdalahJoseph52" target="_blank" rel="noreferrer" className="p-3 bg-slate-100 rounded-lg text-slate-600 hover:bg-black hover:text-white transition-all duration-300">
                    <XIcon />
                  </a>
                  <a href="https://www.facebook.com/share/1KYRgiCz55/" target="_blank" rel="noreferrer" className="p-3 bg-slate-100 rounded-lg text-slate-600 hover:bg-[#1877F2] hover:text-white transition-all duration-300">
                    <Facebook size={20} />
                  </a>
                  <a href="https://wa.me/255688735820" target="_blank" rel="noreferrer" className="p-3 bg-slate-100 rounded-lg text-slate-600 hover:bg-[#25D366] hover:text-white transition-all duration-300">
                    <WhatsAppIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: The Working Form */}
          <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
            
            {/* FORM ACTION ADDED HERE */}
            <form 
              action="https://formsubmit.co/abdalahwambura80@gmail.com" 
              method="POST"
              className="space-y-6"
            >
              
              {/* Anti-spam honeypot */}
              <input type="text" name="_honey" style={{display: 'none'}} />
              
              {/* Disable Captcha for cleaner look */}
              <input type="hidden" name="_captcha" value="false" />
              
              {/* Success Page (Optional - stays on page if not set, or you can set a redirect) */}
              <input type="hidden" name="_next" value="https://abdalah-portfolio.vercel.app/" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Name</label>
                  <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white" placeholder="john@company.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Subject</label>
                <select name="subject" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-slate-600">
                  <option value="Project Inquiry">Project Inquiry (Dev)</option>
                  <option value="Business Consultation">Business Consultation</option>
                  <option value="Recruitment">Recruitment / Hiring</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea name="message" required rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white resize-none" placeholder="Tell me about your project goal..."></textarea>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                Send Message <ArrowRight size={20} />
              </button>
            </form>
          </div>

        </div>

        {/* Copyright Footer - UPDATED */}
        <div className="mt-24 pt-8 border-t border-slate-200 text-center text-slate-500 text-sm">
          <p>© 2025 Abdalah Wambura. All rights reserved.</p>
        </div>

      </div>
    </section>
  );
};

export default Contact;