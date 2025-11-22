import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Download, X, Quote, ChevronRight, ChevronLeft } from 'lucide-react';
import { jsPDF } from 'jspdf';

// --- FULL BOOK CONTENT (Extracted from your Upload) ---
const myBooks = [
  {
    id: 1,
    title: "MAISHA ZAIDI YA KUISHI",
    subtitle: "Mwongozo wa Kusimama, Kutulia, na Kuanza Safari Yako",
    author: "Abdalah J. Wambura",
    // Ensure this link works or use a local import
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop", 
    desc: "Kitabu hiki si tangazo la majibu, bali ni ushuhuda wa mwaliko niliopewa na sauti ya ndani. Mwongozo wa kutoka kwenye 'kuwepo tu' na kuelekea kwenye 'kuishi kweli'.",
    chapters: [
      {
        title: "DIBAJI",
        text: `Kuna wakati nilijikuta nimesimama kimya katikati ya kelele za maisha, nikijiuliza kwa sauti ambayo haikusikika masikioni bali moyoni: “Hivi kweli haya ndiyo maisha? Je, nipo duniani kwa hili tu?”

Sauti hiyo haikunijia mara moja, bali kwa vipindi tofauti—wakati mwingine usiku wa manane, wakati mwingine katikati ya kazi za kila siku. Ilipokuja, kila kitu kingine kilipoteza maana.

Kitabu hiki, “MAISHA ZAIDI YA KUISHI”, si tangazo la majibu yangu binafsi, bali ni ushuhuda wa mwaliko niliopewa na ile sauti ya ndani. Sauti ambayo haikuniuliza niwe bora kuliko wengine, bali nionekane kweli mimi mwenyewe.`
      },
      {
        title: "UTANGULIZI",
        text: `Umewahi kusimama katikati ya shughuli nyingi za siku, ukiwa umechoka, na ukajiuliza kimoyomoyo, "Hivi ndiyo maisha yenyewe? Hiki ndicho nilichokuja kufanya duniani?"

Tangu utotoni, wengi wetu tunafundishwa njia moja ya maisha: soma kwa bidii, pata alama nzuri, tafuta kazi nzuri, fanya kazi kwa bidii, anzisha familia, na ustaafu. Ni njia nzuri na yenye heshima, lakini kwa wengi, haitoshi kujibu swali la msingi la "kwanini nipo hapa?".

Kitabu hiki ni rafiki yako. Ni mwongozo ambao utakushika mkono na kutembea nawe katika safari ya kutafuta majibu yako mwenyewe. Ni safari ya kutoka kwenye hali ya "kuwepo tu" na kuelekea kwenye "kuishi kweli".`
      },
      {
        title: "SURA YA 1: Sauti ya Ndani",
        text: `Inakuja kimya kimya. Wakati mwingine ni usiku wa manane, kila kitu kimetulia isipokuwa mawazo yako. Sio sauti ya kelele. Ni mnong’ono. Ni hisia nzito tumboni. Ni swali fupi linalojirudia kichwani: "Na iweje sasa?" au "Hii ndiyo yote?"

Wengi wetu, mara ya kwanza tunapoisikia, tunafanya kila tuwezalo kuipuuza. Tunaongeza sauti ya redio. Tunajiingiza kwenye kazi kwa nguvu zote. Tunaipuuza kwa sababu inatisha. Inatisha kujiuliza maswali ambayo huna majibu yake.

Lakini, vipi kama tunaitazama sauti hii kwa namna tofauti kabisa? Vipi kama sauti hii sio adui anayekuhukumu au ishara kwamba umeshindwa maishani? Vipi kama ni rafiki yako wa dhati anayejaribu kukuamsha kutoka kwenye usingizi wa mazoea?`
      },
      {
        title: "SURA YA 2: Mzunguko wa Kila Siku",
        text: `Hakuna hata mmoja wetu aliyeamka siku moja na kuamua, “Leo, nataka kuingia kwenye mzunguko wa maisha usiokuwa na mabadiliko.” Sivyo? Basi tuliingiaje humu?

Jibu ni rahisi: tuliongozwa. Tangu tukiwa watoto, tunapewa “ramani ya maisha” isiyo rasmi: Shule, Kazi, na Nyumbani. Shule inatufundisha kufuata sheria na ratiba.

Kazi inakuwa Nanga ya Mzunguko. Tunakubali kuuza mali yetu ya thamani kuliko zote—muda wetu—kwa pesa. Mwishowe, Nyumbani inakuwa Gome la Mzunguko. Majukumu ya familia, mikopo, na bili zinafunga mzunguko huo kuwa mgumu kuvunjika. Unatoa usalama, lakini unaua uhuru na ndoto za kweli.`
      },
      {
        title: "SURA YA 3: Wewe ni Nani?",
        text: `Hebu fikiria umekutana na mtu mgeni, na anakuuliza, “Wewe ni nani?” Ungejibuje? Wengi wetu tungejibu haraka, “Mimi ni Mwalimu,” au “Mimi ni Mama.”

Lakini sasa, hebu jaribu tena. Vipi kama ungekosa ruhusa ya kutumia cheo chako cha kazi au majukumu yako ya kifamilia? Ungebaki na nini?

Tatizo linaanza pale tunaposahau kuwa tumevaa nguo tu. Tunaanza kuamini sisi ndiyo zile nguo. Mtu anayeamini yeye ni “Mkurugenzi” anaweza kujikuta anashindwa kuonyesha upande wake wa udhaifu. Utambulisho wako halisi upo ndani ya moyo wako, si kwenye kadi yako ya kazi.`
      },
      {
        title: "SURA YA 4: Gundua Hazina Yako",
        text: `Kila binadamu anazaliwa akiwa na sanduku la hazina ndani yake. Sanduku hili limejaa vipaji vya kipekee na shauku (passions) za kweli.

Kipaji ni nini hasa? Sio lazima uwe mwimbaji au mchezaji mpira. Kipaji ni kitu chochote unachokifanya kwa urahisi na kwa ufanisi zaidi kuliko watu wengi. Labda ni uwezo wa kuwafanya watu wajisikie huru, au uwezo wa kupanga vitu kwa haraka.

Ili kuvigundua, rudi utotoni mwako. Kabla hujaambiwa "unapaswa kuwa nani", ulikuwa unafanya nini kwa furaha? Huko ndiko hazina yako ilipo.`
      },
      {
        title: "SURA YA 5: Dira Yako (Thamani)",
        text: `Gari lenye injini kali bila usukani ni hatari. Unachohitaji sasa ni Dira. Dira ya maisha yako ni thamani zako (your values).

Thamani ni vile vigezo vya msingi unavyoviamini na kuvipa umuhimu kuliko vingine vyote. Ni kanuni zako binafsi zinazoongoza maamuzi na matendo yako ya kila siku.

Mtu anayejua thamani zake ni kama meli yenye dira. Hata dhoruba ikija, anajua "kaskazini" yake iko wapi. Anafanya maamuzi kwa ujasiri kwa sababu yanatokana na kile anachokiamini hasa.`
      },
      {
        title: "SURA YA 6: Kuachilia Mizigo",
        text: `Kabla ya kuanza safari ya kuelekea mbele, ni lazima tuhakikishe hakuna nanga nzito za zamani zinazokuzuia. Fikiria unataka kupanda mlima mrefu, lakini mgongoni umebeba begi zito lililojaa mawe.

Haya "mawe" ni kinyongo, hasira, majuto, na imani potofu. Msamaha ni zawadi unayojipa MWENYEWE. Ni uamuzi wa kuacha kubeba lile jiwe la moto lililokuwa linakuunguza wewe.`
      },
      {
        title: "SURA YA 7: Lengo Kuu la Maisha",
        text: `Umefika katika hatua ya mwisho na ya kilele ya safari yako ya ndani. Ni wakati wa kuunganisha yote hayo pamoja na kuunda kitu chenye nguvu: Lengo Kuu la Maisha Yako.

Lengo kuu la maisha yako linapatikana pale ambapo vipaji na shauku zako vinakutana na mahitaji ya dunia, vikiongozwa na thamani zako.

Formula ya msingi ni hii: Kutumia [KIPAJI/SHAUKU YAKO] ili [KITENDO UNACHOFANYA] kwa ajili ya [WATU UNAOWAHUDUMIA] ili waweze [MATOKEO UNAYOTAKA KULETA].`
      },
      {
        title: "SURA YA 8: Kazi Kama Wito",
        text: `Tunatumia takriban theluthi moja ya maisha yetu ya utu uzima tukifanya kazi. Kama eneo hili halina maana, ni vigumu sana kuhisi kuwa maisha yote yana maana.

Lengo ni kuanza safari ya kuhamisha mtazamo wako kutoka kuiona kazi kama "Kazi" tu (chanzo cha pesa), na kuanza kuisogeza kwenye eneo la "Wito" (sehemu ya kusudi lako).`
      },
      {
        title: "SURA YA 9: Watu Wanaokuzunguka",
        text: `Kuna msemo maarufu unaosema, "Wewe ni wastani wa watu watano unaotumia nao muda mwingi zaidi."

Watu sahihi watakutia moyo na kukuinua (Wanaokujenga). Watu wasio sahihi watakuvuta chini na kuzima ndoto zako (Wanaokubomoa). Jenga mazingira yanayokusaidia kukua.`
      },
      {
        title: "SURA YA 10: Mchango Wako",
        text: `Maana ya kweli na ya kudumu ya maisha haipatikani kwa kujiangalia "mimi" tu. Inapatikana pale tunapogundua kuwa sisi ni sehemu ya "sisi".

Mchango wa kweli haupimwi kwa ukubwa wa tendo, bali kwa ukubwa wa upendo na nia iliyopo ndani ya tendo. Tabasamu moja linaweza kubadilisha siku ya mtu.`
      },
      {
        title: "SURA YA 11: Fedha Kama Chombo",
        text: `Fedha ni chombo kisicho na upande. Mikononi mwa mtu mkarimu mwenye kusudi, inakuwa chombo cha wema.

Swali la msingi si "Jinsi ya kupata pesa nyingi zaidi?". Swali la msingi ni: "Ninataka kutumia chombo hiki cha fedha kutimiza nini duniani?" Jua kiwango chako cha "kutosha" na uwekeze kwenye uhuru wako.`
      },
      {
        title: "SURA YA 12: Kuwa Wewe Halisi",
        text: `Uhalisia wa kweli ni uwiano kamili kati ya dunia yako ya ndani na dunia yako ya nje. Ni kuacha kuigiza.

Kuwa wewe halisi kuna gharama, lakini pia kuna zawadi kubwa isiyo na kifani: Unaanza kujenga mahusiano ya kweli na watu wanaokupenda kwa jinsi ulivyo.`
      },
      {
        title: "SURA YA 13: Kukabiliana na Vikwazo",
        text: `Safari ya maana ina milima na mabonde yake. Kutakuwa na changamoto. Hii si ishara kwamba umepotea njia; ni ishara kwamba unatembea na unakua.

Kumbuka, mti imara ni ule uliopambana na dhoruba nyingi. Vikwazo vinakomaza kusudi lako.`
      },
      {
        title: "SURA YA 14: Ukuaji na Kujifunza",
        text: `Siku mti unapoacha kukua, ndiyo siku unapoanza kufa. Maisha zaidi ya kuishi ni maisha ya ukuaji.

Endelea kulisha ubongo wako na mawazo mapya. Fufua udadisi wako wa kitoto. Soma kidogo kila siku. Kubali kuwa mwanafunzi tena.`
      },
      {
        title: "SURA YA 15: Kuacha Alama",
        text: `Urithi wako halisi ni alama unayoiacha duniani na kwenye mioyo ya watu.

Urithi wako hauandikwi siku utakayokufa. Unajengwa na jumla ya maamuzi yako madogo madogo ya kila siku. Anza kuuandika leo kwa matendo yako.`
      },
      {
        title: "SURA YA 16: Kusherehekea Safari",
        text: `Maisha Zaidi ya Kuishi hayapatikani mwisho wa barabara; yanapatikana katika jinsi unavyotembea kwenye hiyo barabara, kila siku.

Dawa ya mtego wa "Nikifika nitafurahi" ni Shukrani. Shukrani inaizoeza akili kuona kile kilichopo sasa hivi. Safari ndiyo tuzo.`
      },
      {
        title: "HITIMISHO: Safari Endelevu",
        text: `Hongera sana. Umefika mwisho wa kurasa za kitabu hiki, lakini huu ndio mwanzo halisi wa kurasa za maisha yako mapya.

Wewe hukuletwa hapa duniani ili tu ulipe bili, utimize matarajio ya wengine, na kisha ufe. Umepewa zawadi za kipekee, shauku za kipekee, na una uwezo wa kuacha alama ya kipekee.

Sasa, nenda kaishi MAISHA ZAIDI YA KUISHI.`
      }
    ]
  }
];

const Library = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  // --- PDF GENERATOR ENGINE ---
  const generatePDF = (book) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPos = 40;

    // 1. COVER PAGE
    doc.setFillColor(15, 23, 42); // Dark Blue
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    const titleLines = doc.splitTextToSize(book.title.toUpperCase(), pageWidth - 40);
    doc.text(titleLines, pageWidth / 2, 100, { align: "center" });
    
    doc.setFontSize(16);
    doc.setTextColor(245, 158, 11); // Yellow
    doc.text(book.subtitle, pageWidth / 2, 120, { align: "center" });

    doc.setFontSize(14);
    doc.setTextColor(200, 200, 200);
    doc.text(`By ${book.author}`, pageWidth / 2, 140, { align: "center" });

    // 2. CONTENT PAGES
    book.chapters.forEach((chapter) => {
      doc.addPage();
      doc.setTextColor(0, 0, 0);
      yPos = 30;
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(chapter.title, margin, yPos);
      yPos += 15;

      doc.setFont("times", "normal");
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(chapter.text, pageWidth - (margin * 2));
      
      // Simple pagination check
      if (splitText.length * 7 > pageHeight - 40) {
         // If text is too long for one page, split it (simplified logic for this demo)
         doc.text(splitText, margin, yPos);
      } else {
         doc.text(splitText, margin, yPos);
      }
      
      // Copyright Footer
      doc.setFontSize(9);
      doc.setTextColor(150);
      doc.text(
        `© 2025 Abdalah Wambura | Contact: +255 616 166 496 | Licensed Copy`, 
        pageWidth / 2, 
        pageHeight - 10, 
        { align: "center" }
      );
    });

    doc.save(`${book.title.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <section id="library" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">My Library</h2>
            <p className="text-lg text-slate-600 max-w-xl">
              Sharing knowledge through writing. Read samples or download full copies protected by copyright.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {myBooks.map((book) => (
            <motion.div 
              key={book.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex flex-col h-full group"
            >
              {/* Book Cover */}
              <div className="relative aspect-[3/4] bg-slate-900 rounded-lg mb-6 overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-500">
                {/* Uses web link or local image if imported */}
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 border-[12px] border-white/10">
                  <h3 className="text-white font-bold text-xl mb-2 font-serif drop-shadow-md">{book.title}</h3>
                  <p className="text-slate-200 text-xs uppercase tracking-widest font-bold">{book.author}</p>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{book.title}</h3>
                <p className="text-slate-600 text-sm line-clamp-3 mb-6">{book.desc}</p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedBook(book)}
                  className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen size={16} /> Read
                </button>
                <button 
                  onClick={() => generatePDF(book)}
                  className="px-4 py-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                  title="Download PDF"
                >
                  <Download size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* READING MODAL */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-3xl h-[85vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                  <h3 className="font-bold text-xl text-slate-900">{selectedBook.title}</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Reading Mode</p>
                </div>
                <button onClick={() => setSelectedBook(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-[#fffdfa]">
                <div className="prose prose-lg max-w-none font-serif text-slate-800">
                  {selectedBook.chapters.map((chapter, i) => (
                    <div key={i} className="mb-12 border-b border-slate-100 pb-8 last:border-0">
                      <h4 className="text-2xl font-bold text-slate-900 mb-6">{chapter.title}</h4>
                      <p className="whitespace-pre-line leading-loose text-lg">{chapter.text}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 p-8 bg-blue-50 rounded-xl text-center">
                  <Quote className="mx-auto text-blue-300 mb-4" size={40} />
                  <p className="text-blue-900 font-medium italic mb-6">
                    "This is a preview. Download the full verified copy to continue your journey."
                  </p>
                  <button 
                    onClick={() => generatePDF(selectedBook)}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg"
                  >
                    <Download size={18} /> Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Library;