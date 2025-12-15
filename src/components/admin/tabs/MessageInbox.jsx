import React, { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Trash2, Download, MessageSquare, Phone } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

const MessageInbox = () => {
  const [msgs, setMsgs] = useState([]);
  const { success } = useToast();

  useEffect(() => {
    return onSnapshot(query(collection(db, 'messages'), orderBy('createdAt', 'desc')), s => setMsgs(s.docs.map(d=>({id:d.id, ...d.data()}))));
  }, []);

  const handleExport = () => {
    const headers = ["Name,Email,Phone,Message,Date"];
    const rows = msgs.map(m => [`"${m.name}"`,`"${m.email}"`,`"${m.phone}"`,`"${m.message}"`,`"${m.createdAt?.toDate().toLocaleDateString()}"`].join(","));
    const csv = "data:text/csv;charset=utf-8,\uFEFF" + [headers, ...rows].join("\n");
    const link = document.createElement("a"); link.href = encodeURI(csv); link.download = "messages.csv"; document.body.appendChild(link); link.click(); document.body.removeChild(link);
    success("Downloaded CSV");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Inbox ({msgs.length})</h1>
        <button onClick={handleExport} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700"><Download size={18}/> Export CSV</button>
      </div>
      <div className="space-y-4">
        {msgs.map(msg => (
          <div key={msg.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-2">
              <div><h4 className="font-bold text-slate-900">{msg.name}</h4><p className="text-xs text-slate-500">{msg.email} • {msg.createdAt?.toDate().toLocaleDateString()}</p></div>
              <button onClick={()=>deleteDoc(doc(db,'messages',msg.id))} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
            </div>
            <p className="bg-slate-50 p-3 rounded-lg text-slate-700 text-sm mb-3">{msg.message}</p>
            <div className="flex gap-2">
              {msg.phone && <a href={`https://wa.me/${msg.phone.replace('+','')}`} target="_blank" className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded font-bold flex items-center gap-1"><MessageSquare size={12}/> WhatsApp</a>}
              {msg.phone && <a href={`tel:${msg.phone}`} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded font-bold flex items-center gap-1"><Phone size={12}/> Call</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MessageInbox;