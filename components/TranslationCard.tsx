"use client";

import { useState } from "react";
import { ChevronDown, ArrowRightLeft, X, Mic, Camera, Image, Languages } from "lucide-react";

const languages = [
  { name: "English", code: "en", icon: "🇬🇧", type: "flag" as const },
  { name: "Santali", code: "sat", subtitle: "(Ol Chiki)", icon: "ᱟ", type: "script" as const },
  { name: "Hindi", code: "hi", icon: "🇮🇳", type: "flag" as const },
  { name: "Bengali", code: "bn", icon: "🇮🇳", type: "flag" as const },
  { name: "Odia", code: "or", icon: "🇮🇳", type: "flag" as const },
  { name: "Tamil", code: "ta", icon: "🇮🇳", type: "flag" as const },
  { name: "Telugu", code: "te", icon: "🇮🇳", type: "flag" as const },
  { name: "Marathi", code: "mr", icon: "🇮🇳", type: "flag" as const },
  { name: "Gujarati", code: "gu", icon: "🇮🇳", type: "flag" as const },
  { name: "Punjabi", code: "pa", icon: "🇮🇳", type: "flag" as const },
  { name: "Kannada", code: "kn", icon: "🇮🇳", type: "flag" as const },
  { name: "Malayalam", code: "ml", icon: "🇮🇳", type: "flag" as const },
];

interface TranslationCardProps {
  onTranslate: (text: string, from: string, to: string) => void;
  isTranslating: boolean;
  toLang?: string;
  onToLangChange?: (lang: string) => void;
}

export default function TranslationCard({ onTranslate, isTranslating, toLang: toLangProp, onToLangChange }: TranslationCardProps) {
  const [text, setText] = useState("");
  const [fromLang, setFromLang] = useState("English");
  const [internalToLang, setInternalToLang] = useState("Santali");
  const toLang = toLangProp ?? internalToLang;
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const maxLength = 5000;

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
    onTranslate(text, fromCode, toCode);
  };

  return (
    <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-3">
      {/* Language Switcher Bar */}
      <div className="flex items-center justify-between text-xs relative">
        {/* From */}
        <div className="flex-1 relative">
          <span className="text-[10px] text-gray-400 font-medium block mb-1">
            From (Detect language)
          </span>
          <button
            onClick={() => { setShowFromDropdown(!showFromDropdown); setShowToDropdown(false); }}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-2.5 py-1.5 shadow-xs w-full"
          >
            <div className="flex items-center space-x-2">
              {languages.find(l => l.name === fromLang)?.type === "script" ? (
                <span className="w-4 h-4 rounded-full bg-[#be185d] text-white flex items-center justify-center text-[9px] shrink-0">
                  {languages.find(l => l.name === fromLang)?.icon}
                </span>
              ) : (
                <span className="text-sm">{languages.find(l => l.name === fromLang)?.icon}</span>
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
                    <span className="text-sm">{lang.icon}</span>
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
          <span className="text-[10px] text-gray-400 font-medium block mb-1">
            To
          </span>
          <button
            onClick={() => { setShowToDropdown(!showToDropdown); setShowFromDropdown(false); }}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-2 py-1.5 shadow-xs w-full"
          >
            <div className="flex items-center space-x-2 overflow-hidden">
              {languages.find(l => l.name === toLang)?.type === "script" ? (
                <span className="w-4 h-4 rounded-full bg-[#be185d] text-white flex items-center justify-center text-[9px] shrink-0">
                  {languages.find(l => l.name === toLang)?.icon}
                </span>
              ) : (
                <span className="text-sm">{languages.find(l => l.name === toLang)?.icon}</span>
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
                    <span className="text-sm">{lang.icon}</span>
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
          <textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, maxLength))}
            placeholder="Type or paste text here..."
            className="w-full text-xs text-gray-700 placeholder-gray-400 outline-none resize-none bg-transparent"
          />
          {text && (
            <button
              onClick={() => setText("")}
              className="text-gray-400 hover:text-gray-600 text-xs ml-1"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Input Mode Actions & Counter */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-gray-500">
          <div className="flex items-center space-x-4 text-[11px]">
            <button className="flex flex-col items-center hover:text-pink-700">
              <Mic size={14} />
              <span className="text-[9px] mt-0.5">Voice</span>
            </button>
            <button className="flex flex-col items-center hover:text-pink-700">
              <Camera size={14} />
              <span className="text-[9px] mt-0.5">Camera</span>
            </button>
            <button className="flex flex-col items-center hover:text-pink-700">
              <Image size={14} />
              <span className="text-[9px] mt-0.5">Image</span>
            </button>
          </div>
          <span className="text-[10px] text-gray-400">
            {text.length}/{maxLength}
          </span>
        </div>
      </div>

      {/* Translate Action Button */}
      <button
        onClick={handleTranslate}
        disabled={isTranslating || !text.trim()}
        className="w-full bg-[#be185d] hover:bg-[#9d174d] active:scale-[0.99] transition text-white font-semibold py-2.5 rounded-xl shadow flex items-center justify-center space-x-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Languages size={14} className={isTranslating ? "animate-spin" : ""} />
        <span>{isTranslating ? "Translating..." : "Translate"}</span>
      </button>
    </div>
  );
}
