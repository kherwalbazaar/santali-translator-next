"use client";

import { useState } from "react";
import { ChevronDown, ArrowRightLeft, X, Mic, Camera, Image, Languages } from "lucide-react";
import { useEffect } from "react";
import TypewriterLoop from "./TypewriterLoop";

const languages = [
  { name: "English", code: "en", icon: "🇮🇳", type: "flag" as const, color: "bg-blue-100 text-blue-700" },
  { name: "Santali", code: "sat", subtitle: "(Ol Chiki)", icon: "ᱟ", type: "script" as const, color: "bg-pink-500 text-white" },
  { name: "Hindi", code: "hi", icon: "🇮🇳", type: "flag" as const, color: "bg-orange-100 text-orange-700" },
  { name: "Bengali", code: "bn", icon: "🇮🇳", type: "flag" as const, color: "bg-green-100 text-green-700" },
  { name: "Odia", code: "or", icon: "🇮🇳", type: "flag" as const, color: "bg-emerald-100 text-emerald-700" },
  { name: "Tamil", code: "ta", icon: "🇮🇳", type: "flag" as const, color: "bg-red-100 text-red-700" },
  { name: "Telugu", code: "te", icon: "🇮🇳", type: "flag" as const, color: "bg-purple-100 text-purple-700" },
  { name: "Marathi", code: "mr", icon: "🇮🇳", type: "flag" as const, color: "bg-yellow-100 text-yellow-700" },
  { name: "Gujarati", code: "gu", icon: "🇮🇳", type: "flag" as const, color: "bg-teal-100 text-teal-700" },
  { name: "Punjabi", code: "pa", icon: "🇮🇳", type: "flag" as const, color: "bg-indigo-100 text-indigo-700" },
  { name: "Kannada", code: "kn", icon: "🇮🇳", type: "flag" as const, color: "bg-rose-100 text-rose-700" },
  { name: "Malayalam", code: "ml", icon: "🇮🇳", type: "flag" as const, color: "bg-cyan-100 text-cyan-700" },
];

interface TranslationCardProps {
  onTranslate: (text: string, from: string, to: string) => void;
  isTranslating: boolean;
  toLang?: string;
  onToLangChange?: (lang: string) => void;
  inputText?: string;
  onTextChange?: (text: string) => void;
  onReset?: () => void;
}

export default function TranslationCard({ onTranslate, isTranslating, toLang: toLangProp, onToLangChange, inputText, onTextChange, onReset }: TranslationCardProps) {
  const [text, setText] = useState("");
  const [fromLang, setFromLang] = useState("English");
  const [internalToLang, setInternalToLang] = useState("Santali");
  const toLang = toLangProp ?? internalToLang;
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [comingSoon, setComingSoon] = useState<string | null>(null);

  useEffect(() => {
    if (comingSoon) {
      const timer = setTimeout(() => setComingSoon(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [comingSoon]);
  const maxLength = 5000;

  const currentText = inputText !== undefined ? inputText : text;
  const updateText = (val: string) => {
    if (onTextChange) onTextChange(val);
    else setText(val);
  };

  const updateToLang = (lang: string) => {
    if (lang === fromLang) {
      setFromLang(toLang);
    }
    setInternalToLang(lang);
    onToLangChange?.(lang);
  };

  const handleFromLangChange = (lang: string) => {
    if (lang === toLang) {
      updateToLang(fromLang);
    }
    setFromLang(lang);
  };

  const handleTranslate = () => {
    const fromCode = languages.find(l => l.name === fromLang)?.code || "en";
    const toCode = languages.find(l => l.name === toLang)?.code || "sat";
    onTranslate(currentText, fromCode, toCode);
  };

  const handleReset = () => {
    updateText("");
    onReset?.();
  };

  return (
    <div className="bg-pink-100 p-3.5 pt-2 pb-3.5 shadow-sm border border-pink-200 space-y-2">
      {/* Language Switcher Bar */}
      <div className="flex items-center justify-between text-xs relative">
        {/* From */}
        <div className="flex-1 relative">
          <button
            onClick={() => { setShowFromDropdown(!showFromDropdown); setShowToDropdown(false); }}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 shadow-xs w-full"
          >
            <div className="flex items-center space-x-2">
              {languages.find(l => l.name === fromLang)?.type === "script" ? (
                <span className="w-5 h-5 rounded-full bg-[#be185d] text-white flex items-center justify-center text-[9px] shrink-0">
                  {languages.find(l => l.name === fromLang)?.icon}
                </span>
              ) : (
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${languages.find(l => l.name === fromLang)?.color}`}>{languages.find(l => l.name === fromLang)?.icon}</span>
              )}
              <span className="font-semibold text-gray-800 text-[12px]">{fromLang}</span>
            </div>
            <ChevronDown size={10} className="text-gray-400" />
          </button>
          {showFromDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.name}
                  onClick={() => { handleFromLangChange(lang.name); setShowFromDropdown(false); }}
                  className={`flex items-center space-x-2 w-full px-2.5 py-2 hover:bg-gray-50 text-left ${fromLang === lang.name ? 'bg-pink-50' : ''}`}
                >
                  {lang.type === "script" ? (
                    <span className="w-4 h-4 rounded-full bg-[#be185d] text-white flex items-center justify-center text-[9px] shrink-0">
                      {lang.icon}
                    </span>
                  ) : (
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${lang.color}`}>{lang.icon}</span>
                  )}
                  <span className="text-[11px] text-gray-700">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="mx-2 pt-3">
          <button
            onClick={() => { setFromLang(toLang); updateToLang(fromLang); }}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition shadow-xs"
          >
            <ArrowRightLeft size={11} />
          </button>
        </div>

        {/* To */}
        <div className="flex-1 relative">
          <button
            onClick={() => { setShowToDropdown(!showToDropdown); setShowFromDropdown(false); }}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-2 py-1.5 shadow-xs w-full"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              {languages.find(l => l.name === toLang)?.type === "script" ? (
                <span className="w-5 h-5 rounded-full bg-[#be185d] text-white flex items-center justify-center text-[9px] shrink-0">
                  {languages.find(l => l.name === toLang)?.icon}
                </span>
              ) : (
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${languages.find(l => l.name === toLang)?.color}`}>{languages.find(l => l.name === toLang)?.icon}</span>
              )}
              <span className="font-semibold text-gray-800 text-[12px] truncate">{toLang}</span>
            </div>
            <ChevronDown size={10} className="text-gray-400 shrink-0" />
          </button>
          {showToDropdown && (
            <div className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.name}
                  onClick={() => { updateToLang(lang.name); setShowToDropdown(false); }}
                  className={`flex items-center space-x-2 w-full px-2.5 py-2 hover:bg-gray-50 text-left ${toLang === lang.name ? 'bg-pink-50' : ''}`}
                >
                  {lang.type === "script" ? (
                    <span className="w-4 h-4 rounded-full bg-[#be185d] text-white flex items-center justify-center text-[9px] shrink-0">
                      {lang.icon}
                    </span>
                  ) : (
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${lang.color}`}>{lang.icon}</span>
                  )}
                  <span className="text-[11px] text-gray-700">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Text Input Area */}
      <div className="relative pt-1">
        <div className="flex justify-between items-start">
          <div className="relative w-full">
            {!currentText && (
              <div className="absolute left-0 top-1 pointer-events-none">
                <TypewriterLoop
                  words={["Type or paste text here...", "E.g. Hello, Good morning", "Translate English to Santali", " Try typing a word..."]}
                  speed={80}
                  pause={2000}
                />
              </div>
            )}
            <textarea
              rows={3}
              value={currentText}
              onChange={(e) => updateText(e.target.value.slice(0, maxLength))}
              className="w-full text-xs text-gray-700 outline-none resize-none bg-transparent relative z-10"
            />
          </div>
          {currentText && (
            <button
              onClick={handleReset}
              className="text-gray-400 hover:text-gray-600 text-xs ml-1 mt-0.5"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Input Mode Actions & Counter */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-gray-500">
          <div className="flex items-center space-x-4 text-[11px]">
            <button onClick={() => setComingSoon("Voice input")} className="flex flex-col items-center hover:text-pink-700">
              <Mic size={14} />
              <span className="text-[9px] mt-0.5">Voice</span>
            </button>
            <button onClick={() => setComingSoon("Camera translation")} className="flex flex-col items-center hover:text-pink-700">
              <Camera size={14} />
              <span className="text-[9px] mt-0.5">Camera</span>
            </button>
            <button onClick={() => setComingSoon("Image translation")} className="flex flex-col items-center hover:text-pink-700">
              <Image size={14} />
              <span className="text-[9px] mt-0.5">Image</span>
            </button>
          </div>
          <span className="text-[10px] text-gray-400">
            {currentText.length}/{maxLength}
          </span>
        </div>

        {/* Coming Soon Popup */}
        {comingSoon && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-30">
            <div className="bg-gradient-to-r from-[#be185d] to-[#ec4899] text-white text-[11px] px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>{comingSoon} is coming soon!</span>
            </div>
          </div>
        )}
      </div>

      {/* Translate Action Button */}
      <button
        onClick={handleTranslate}
        disabled={isTranslating || !currentText.trim()}
        className="w-full bg-[#be185d] hover:bg-[#9d174d] active:scale-[0.99] transition text-white font-semibold py-2.5 rounded-xl shadow flex items-center justify-center space-x-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Languages size={14} className={isTranslating ? "animate-spin" : ""} />
        <span>{isTranslating ? "Translating..." : "Translate"}</span>
      </button>
    </div>
  );
}
