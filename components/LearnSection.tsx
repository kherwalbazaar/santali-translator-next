"use client";

import { useState } from "react";
import { BookOpen, Volume2, ChevronRight, Star, X, ArrowLeft } from "lucide-react";

const speak = (text: string) => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const doSpeak = () => {
    const voices = window.speechSynthesis.getVoices();
    const santaliVoice = voices.find((v) => v.lang.startsWith("sat"))
      || voices.find((v) => v.lang.startsWith("hi"))
      || null;
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = santaliVoice;
    utter.lang = "sat-IN";
    utter.rate = 0.75;
    utter.pitch = 0.85;
    window.speechSynthesis.speak(utter);
  };

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    doSpeak();
  } else {
    window.speechSynthesis.onvoiceschanged = () => doSpeak();
  }
};

// ─── Ol Chiki Alphabet ───
const olChikiAlphabet = [
  { letter: "ᱚ", roman: "O", example: "ᱚ", row: "Row 1" },
  { letter: "ᱛ", roman: "Ot", example: "ᱚᱫ", row: "Row 1" },
  { letter: "ᱜ", roman: "Og", example: "ᱚᱜ", row: "Row 1" },
  { letter: "ᱝ", roman: "Ong", example: "ᱚᱝ", row: "Row 1" },
  { letter: "ᱞ", roman: "Ol", example: "ᱚᱞ", row: "Row 1" },
  { letter: "ᱟ", roman: "A", example: "ᱟ", row: "Row 2" },
  { letter: "ᱠ", roman: "Ak", example: "ᱟᱠ", row: "Row 2" },
  { letter: "ᱡ", roman: "Aj", example: "ᱟᱡ", row: "Row 2" },
  { letter: "ᱢ", roman: "Am", example: "ᱟᱢ", row: "Row 2" },
  { letter: "ᱣ", roman: "Aw", example: "ᱟᱣ", row: "Row 2" },
  { letter: "ᱤ", roman: "I", example: "ᱤ", row: "Row 3" },
  { letter: "ᱥ", roman: "Is", example: "ᱤᱥ", row: "Row 3" },
  { letter: "ᱦ", roman: "Ih", example: "ᱤᱦ", row: "Row 3" },
  { letter: "ᱧ", roman: "Inj", example: "ᱤᱧ", row: "Row 3" },
  { letter: "ᱨ", roman: "Ir", example: "ᱤᱨ", row: "Row 3" },
  { letter: "ᱩ", roman: "U", example: "ᱩ", row: "Row 4" },
  { letter: "ᱪ", roman: "Uch", example: "ᱩᱪ", row: "Row 4" },
  { letter: "ᱫ", roman: "Ud", example: "ᱩᱫ", row: "Row 4" },
  { letter: "ᱬ", roman: "Un", example: "ᱩᱬ", row: "Row 4" },
  { letter: "ᱭ", roman: "Uy", example: "ᱩᱭ", row: "Row 4" },
  { letter: "ᱮ", roman: "E", example: "ᱮ", row: "Row 5" },
  { letter: "ᱯ", roman: "Ep", example: "ᱮᱯ", row: "Row 5" },
  { letter: "ᱰ", roman: "Ed", example: "ᱮᱰ", row: "Row 5" },
  { letter: "ᱱ", roman: "En", example: "ᱮᱱ", row: "Row 5" },
  { letter: "ᱲ", roman: "El", example: "ᱮᱲ", row: "Row 5" },
  { letter: "ᱳ", roman: "O", example: "ᱳ", row: "Row 6" },
  { letter: "ᱴ", roman: "Ot", example: "ᱳᱴ", row: "Row 6" },
  { letter: "ᱵ", roman: "Ob", example: "ᱳᱵ", row: "Row 6" },
  { letter: "ᱶ", roman: "On", example: "ᱳᱶ", row: "Row 6" },
  { letter: "ᱷ", roman: "Oh", example: "ᱳᱷ", row: "Row 6" },
];

const modifiers = [
  { letter: "ᱸ", roman: "Mu Ttuddag", desc: "Nasalization of a preceding vowel" },
  { letter: "ᱹ", roman: "Gaahlaa Ttuddaag", desc: "Change or extend vowel sounds" },
  { letter: "ᱺ", roman: "Mu-Gaahlaa Ttuddaag", desc: "Combined nasalization and vowel extension" },
  { letter: "ᱻ", roman: "Relaa", desc: "Vowel prolongator" },
  { letter: "ᱼ", roman: "Phaarkaa", desc: "Word separator or phonetic killer" },
  { letter: "ᱽ", roman: "Ahad", desc: "Aspiration or halting the sound" },
];

// ─── Days of the Week ───
const days = [
  { santali: "ᱥᱤᱸᱜᱤ", english: "Sunday", roman: "Singi" },
  { santali: "ᱳᱛᱮ", english: "Monday", roman: "Ote" },
  { santali: "ᱵᱟᱞᱮ", english: "Tuesday", roman: "Bale" },
  { santali: "ᱥᱟᱜᱩᱱ", english: "Wednesday", roman: "Sagun" },
  { santali: "ᱥᱟᱹᱨᱫᱤ", english: "Thursday", roman: "Sardi" },
  { santali: "ᱧᱩᱦᱩᱢ", english: "Friday", roman: "Nyuhum" },
  { santali: "ᱡᱟᱨᱩᱢ", english: "Saturday", roman: "Jarum" },
];

// ─── Months ───
const months = [
  { santali: "ᱢᱟᱜᱽ", english: "Magh", roman: "Magh" },
  { santali: "ᱯᱷᱟᱜᱩᱱ", english: "Phagun", roman: "Phagun" },
  { santali: "ᱪᱟᱹᱛ", english: "Chat", roman: "Chat" },
  { santali: "ᱵᱳᱭᱥᱳᱠ", english: "Boisok", roman: "Boisok" },
  { santali: "ᱡᱮᱴ", english: "Jet", roman: "Jet" },
  { santali: "ᱟᱥᱟᱲ", english: "Asarh", roman: "Asarh" },
  { santali: "ᱥᱟᱱ", english: "San", roman: "San" },
  { santali: "ᱵᱷᱟᱫᱚᱨ", english: "Bhador", roman: "Bhador" },
  { santali: "ᱫᱟᱥᱟᱸᱭ", english: "Dasay", roman: "Dasay" },
  { santali: "ᱥᱚᱦᱚᱨᱟᱭ", english: "Sohorai", roman: "Sohorai" },
  { santali: "ᱟᱸᱜᱟᱲ", english: "Angar", roman: "Angar" },
  { santali: "ᱯᱩᱥ", english: "Pus", roman: "Pus" },
];

// ─── Numbers ───
const numbers = [
  { santali: "ᱥᱩᱱ", english: "Zero", roman: "Sun", digit: "0" },
  { santali: "ᱢᱤᱫ", english: "One", roman: "Mit", digit: "1" },
  { santali: "ᱵᱟᱨ", english: "Two", roman: "Bar", digit: "2" },
  { santali: "ᱯᱮ", english: "Three", roman: "Pe", digit: "3" },
  { santali: "ᱯᱩᱱ", english: "Four", roman: "Pun", digit: "4" },
  { santali: "ᱢᱳᱬᱮ", english: "Five", roman: "Moñe", digit: "5" },
  { santali: "ᱛᱩᱨᱩᱭ", english: "Six", roman: "Turui", digit: "6" },
  { santali: "ᱮᱭᱟᱭ", english: "Seven", roman: "Eyah", digit: "7" },
  { santali: "ᱤᱨᱟᱹᱞ", english: "Eight", roman: "Iril", digit: "8" },
  { santali: "ᱟᱨᱮ", english: "Nine", roman: "Are", digit: "9" },
];

// ─── Family Words ───
const family = [
  { santali: "ᱵᱟᱵᱟ", english: "Father", roman: "Baba" },
  { santali: "ᱟᱭᱚ", english: "Mother", roman: "Ayo" },
  { santali: "ᱠᱟᱠᱟ", english: "Uncle", roman: "Kaka" },
  { santali: "ᱠᱟ.ᱠᱤ", english: "Aunt", roman: "Kaki" },
  { santali: "ᱜᱚᱲᱚᱢ ᱦᱟᱲᱟᱢ", english: "Grand Father", roman: "Gom Hadam" },
  { santali: "ᱜᱚᱲᱚᱢ ᱵᱩᱲᱷᱤ", english: "Grand Mother", roman: "Gom Budhi" },
  { santali: "ᱡᱟᱶᱟᱭ ᱜᱚᱢᱠᱮ", english: "Son in law", roman: "Jaday Gomke" },
  { santali: "ᱜᱟᱛᱮ", english: "Friend", roman: "Gate" },
  { santali: "ᱜᱚᱲᱚᱢ ᱦᱚᱲᱟᱢ", english: "Maternal Grandfather", roman: "Gom Horam" },
  { santali: "ᱜᱚᱲᱚᱢ ᱵᱩᱲᱷᱤ", english: "Maternal Grandmother", roman: "Gom Budhi" },
  { santali: "ᱡᱟᱶᱟᱭ", english: "Husband", roman: "Jaday" },
  { santali: "ᱵᱤᱴᱤ", english: "Daughter", roman: "Biti" },
  { santali: "ᱵᱮᱴᱟ", english: "Son", roman: "Beta" },
  { santali: "ᱫᱩᱞᱟ.ᱲ", english: "Love", roman: "Dular" },
  { santali: "ᱵᱚᱠᱚᱧ ᱠᱩᱲᱤ", english: "Sister", roman: "Bokon Kuri" },
  { santali: "ᱵᱚᱭᱦᱟ", english: "Brother", roman: "Bohata" },
  { santali: "ᱯᱮᱲᱟ", english: "Guest", roman: "Peda" },
  { santali: "ᱢᱟᱪᱮᱛ", english: "Teacher", roman: "Matcha" },
  { santali: "ᱜᱩᱨᱩ", english: "Preceptor", roman: "Guru" },
  { santali: "ᱤᱨᱤᱞ ᱠᱩᱲᱤ (ᱥᱟᱞᱤ)", english: "Sister in law", roman: "Iril Kuri (Sali)" },
  { santali: "ᱤᱨᱤᱞ ᱠᱩᱲᱤ (ᱱᱱᱚᱫ)", english: "Sister in law", roman: "Iril Kuri (Nanod)" },
  { santali: "ᱤᱨᱤᱞ ᱠᱩᱲᱤ (ᱫᱮᱣᱨᱟᱱᱤ)", english: "Sister in law", roman: "Iril Kuri (Dewrani)" },
  { santali: "ᱢᱟᱢᱟ", english: "Maternal Uncle", roman: "Mama" },
  { santali: "ᱢᱟᱢᱤ", english: "Maternal Aunt", roman: "Mami" },
  { santali: "ᱠᱟ.ᱠᱤ", english: "Mother's sister", roman: "Kaki" },
  { santali: "ᱟᱪᱮᱛ", english: "Pupil", roman: "Acha" },
  { santali: "ᱱᱤᱡᱟ.ᱨ", english: "Own", roman: "Nijar" },
  { santali: "ᱦᱚᱧᱦᱟᱨ ᱵᱟᱵᱟ", english: "Father in law", roman: "Hongar Baba" },
  { santali: "ᱦᱚᱧᱦᱟᱨ ᱟᱭᱚ", english: "Mother in law", roman: "Hongar Ayo" },
  { santali: "ᱱᱤᱡᱟ.ᱨ ᱯᱮᱲᱟ", english: "Relative", roman: "Nijar Peda" },
  { santali: "ᱠᱟᱴ ᱵᱟᱵᱟ", english: "Step Father", roman: "Kat Baba" },
  { santali: "ᱪᱷᱩᱴᱠᱤ ᱟᱭᱚ", english: "Step Mother", roman: "Chutki Ayo" },
  { santali: "ᱪᱷᱩᱴᱠᱤ ᱵᱚᱠᱚᱧ", english: "Step Brother", roman: "Chutki Bokon" },
  { santali: "ᱪᱷᱩᱴᱠᱤ ᱵᱚᱠᱚᱧ ᱠᱩᱲᱤ", english: "Step Sister", roman: "Chutki Bokon Kuri" },
  { santali: "ᱪᱷᱩᱴᱠᱤ ᱵᱚᱠᱚᱧ ᱮᱨᱟ", english: "Step Daughter", roman: "Chutki Bokon Era" },
  { santali: "ᱪᱷᱩᱴᱠᱤ ᱦᱚᱯᱚᱱ", english: "Step Son", roman: "Chutki Hopon" },
  { santali: "ᱦᱤᱞᱤ", english: "Maternal Sister", roman: "Hili" },
];

// ─── Nature & Village Words ───
const nature = [
  { santali: "ᱦᱚᱨᱚᱢ", english: "Sun", roman: "Horom" },
  { santali: "ᱡᱩᱞ", english: "Moon", roman: "Jul" },
  { santali: "ᱥᱟᱨ", english: "Star", roman: "Sar" },
  { santali: "ᱵᱟᱨ", english: "Water", roman: "Bar" },
  { santali: "ᱨᱟᱲ", english: "River", roman: "Rad" },
  { santali: "ᱧᱟᱢ", english: "Hill/Mountain", roman: "Gam" },
  { santali: "ᱨᱟᱲᱚᱝ", english: "Forest", roman: "Rang" },
  { santali: "ᱢᱟᱞ", english: "Tree", roman: "Mal" },
  { santali: "ᱫᱟᱨ", english: "Flower", roman: "Dar" },
  { santali: "ᱜᱟᱨᱤ", english: "Village", roman: "Jari" },
];

// ─── Festivals & Culture ───
const culture = [
  { title: "Baha Festival", santali: "ᱵᱟᱦᱟ", desc: "Spring festival of flower worship. Celebrates nature and new beginnings.", icon: "🌸" },
  { title: "Karam Festival", santali: "ᱠᱟᱨᱟᱢ", desc: "Harvest festival dedicated to Karam Devta. People dance and pray for good crops.", icon: "🌾" },
  { title: "Sohrai Festival", santali: "ᱥᱚᱦᱨᱟᱭ", desc: "Post-harvest festival with traditional wall paintings and cattle worship.", icon: "🐂" },
  { title: "Tusu Festival", santali: "ᱛᱩᱥᱩ", desc: "Winter harvest festival. Girls make Tusu dolls and sing folk songs.", icon: "🎶" },
  { title: "Jadopatia", santali: "ᱡᱟᱣᱮᱯᱟᱛᱤᱟ", desc: "Traditional Santal art of wood carving, passed down through generations.", icon: "🪵" },
  { title: "Chhau Dance", santali: "ᱪᱷᱟᱩ", desc: "Traditional martial dance performed during festivals with masks.", icon: "💃" },
];

const sections = [
  { id: "alphabet", label: "Ol Chiki", icon: "ᱚ" },
  { id: "numbers", label: "Numbers", icon: "🔢" },
  { id: "greetings", label: "Days", icon: "📅" },
  { id: "months", label: "Months", icon: "📆" },
  { id: "family", label: "Family", icon: "👨‍👩‍👧" },
  { id: "nature", label: "Nature", icon: "🌿" },
  { id: "culture", label: "Culture", icon: "🎭" },
] as const;

export default function LearnSection({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [expandedLetter, setExpandedLetter] = useState<string | null>(null);

  if (activeSection) {
    const sectionData = sections.find(s => s.id === activeSection);
    return (
      <div className="flex-1 pb-20 overflow-y-auto">
        <div className="bg-gradient-to-r from-[#831843] via-[#9d174d] to-[#be185d] px-3.5 py-4 relative">
          <button
            onClick={() => setActiveSection(null)}
            className="text-white/80 absolute left-3.5 top-1/2 -translate-y-1/2"
          >
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-base font-bold text-white tracking-wide text-center">{sectionData?.label || activeSection}</h2>
          <p className="text-[11px] text-white/70 mt-1 text-center">Explore the Santali language & culture</p>
        </div>

        <div className="px-3.5 pt-4">

        {activeSection === "alphabet" && (
          <div>
            <div className="space-y-1.5">
              {["Row 1", "Row 2", "Row 3", "Row 4", "Row 5", "Row 6"].map((row) => (
                <div key={row}>
                  <div className="grid grid-cols-5 gap-1.5">
                    {olChikiAlphabet.filter((item) => item.row === row).map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setExpandedLetter(expandedLetter === item.letter ? null : item.letter)}
                        className="bg-white p-2 shadow-sm border-2 border-pink-200 text-center active:scale-95 transition"
                      >
                        <span className="text-xl font-bold text-[#be185d] block">{item.letter}</span>
                        <span className="text-[9px] text-gray-600 font-medium block mt-0.5">{item.roman}</span>
                        <Volume2 size={8} className="text-pink-300 mx-auto mt-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Modifiers (Tudah/Ttuddaag)</p>
              <div className="grid grid-cols-3 gap-1.5">
                {modifiers.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => speak(item.letter)}
                    className="bg-white p-2 shadow-sm border-2 border-pink-200 text-center active:scale-95 transition"
                  >
                    <span className="text-xl font-bold text-[#be185d] block">{item.letter}</span>
                    <span className="text-[8px] text-gray-600 font-medium block mt-0.5">{item.roman}</span>
                    <Volume2 size={8} className="text-pink-300 mx-auto mt-0.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "greetings" && (
          <div>
            <div className="space-y-2.5">
              {days.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-[#be185d] font-bold text-base">{item.santali}</p>
                      <p className="text-[10px] text-gray-400 italic">{item.roman}</p>
                      <p className="text-[11px] text-gray-600 font-medium">{item.english}</p>
                    </div>
                    <button onClick={() => speak(item.santali)} className="text-pink-300 hover:text-pink-500 mt-1">
                      <Volume2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "months" && (
          <div>
            <div className="space-y-2.5">
              {months.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-[#be185d] font-bold text-base">{item.santali}</p>
                      <p className="text-[10px] text-gray-400 italic">{item.roman}</p>
                      <p className="text-[11px] text-gray-600 font-medium">{item.english}</p>
                    </div>
                    <button onClick={() => speak(item.santali)} className="text-pink-300 hover:text-pink-500 mt-1">
                      <Volume2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "numbers" && (
          <div>
            <div className="grid grid-cols-2 gap-1.5">
              {numbers.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => speak(item.santali)}
                  className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 text-left active:scale-95 transition"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-[#be185d] font-bold text-sm">{item.santali}</span>
                    <span className="text-lg font-bold text-gray-200">{item.digit}</span>
                  </div>
                  <p className="text-[8px] text-gray-400 italic mt-0.5">{item.roman}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-[9px] text-gray-600 font-medium">{item.english}</p>
                    <Volume2 size={8} className="text-pink-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeSection === "family" && (
          <div>
            <div className="space-y-2.5">
              {family.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => speak(item.santali)}
                  className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 w-full text-left active:scale-[0.98] transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#be185d] font-bold text-base">{item.santali}</p>
                      <p className="text-[10px] text-gray-400 italic">{item.roman}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-gray-600 font-medium">{item.english}</p>
                      <Volume2 size={10} className="text-pink-300 mt-0.5 ml-auto" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeSection === "nature" && (
          <div>
            <div className="grid grid-cols-2 gap-2.5">
              {nature.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => speak(item.santali)}
                  className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 text-left active:scale-95 transition"
                >
                  <p className="text-[#be185d] font-bold text-base">{item.santali}</p>
                  <p className="text-[10px] text-gray-400 italic">{item.roman}</p>
                  <p className="text-[11px] text-gray-600 font-medium mt-1">{item.english}</p>
                  <Volume2 size={10} className="text-pink-300 mt-1" />
                </button>
              ))}
            </div>
          </div>
        )}

        {activeSection === "culture" && (
          <div>
            <div className="space-y-3">
              {culture.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-[#be185d] font-bold text-sm">{item.title}</p>
                      <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 pb-20 overflow-y-auto">
      <div className="bg-gradient-to-r from-[#831843] via-[#9d174d] to-[#be185d] px-3.5 py-4 relative">
        <button
          onClick={onBack}
          className="text-white/80 absolute left-3.5 top-1/2 -translate-y-1/2"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-base font-bold text-white tracking-wide text-center">Learn Santali</h2>
        <p className="text-[11px] text-white/70 mt-1 text-center">Explore the Santali language & culture</p>
      </div>

      <div className="px-3.5 pt-4">

      <div className="grid grid-cols-2 gap-2.5">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center active:scale-[0.98] transition"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-lg mb-2">
              {section.icon}
            </div>
            <span className="text-[11px] font-bold text-gray-800">{section.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border border-pink-100/50">
        <div className="flex items-start space-x-2">
          <Star size={14} className="text-[#be185d] mt-0.5 shrink-0" />
          <div>
            <p className="text-[11px] font-bold text-gray-800">Did you know?</p>
            <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
              Santali is spoken by over 7 million people and is one of the 22 scheduled languages of India. The Ol Chiki script was created by Pandit Raghunath Murmu in 1925.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
