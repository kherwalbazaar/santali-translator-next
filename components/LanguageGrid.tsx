"use client";

import { ChevronRight } from "lucide-react";
import IndiaFlag from "./IndiaFlag";
import UKFlag from "./UKFlag";

const languages = [
  { name: "Santali", subtitle: "(Ol Chiki)", isIndia: true },
  { name: "English", isIndia: false },
  { name: "Hindi", isIndia: true },
  { name: "Bengali", isIndia: true },
  { name: "Odia", isIndia: true },
  { name: "Tamil", isIndia: true },
  { name: "Telugu", isIndia: true },
  { name: "Marathi", isIndia: true },
  { name: "Gujarati", isIndia: true },
  { name: "Punjabi", isIndia: true },
  { name: "Kannada", isIndia: true },
  { name: "Malayalam", isIndia: true },
];

interface LanguageGridProps {
  onLanguageSelect?: (lang: string) => void;
}

export default function LanguageGrid({ onLanguageSelect }: LanguageGridProps) {
  return (
    <div>
      <div className="mb-2 px-1">
        <span className="text-xs font-bold text-gray-800">
          Quick Language Selection
        </span>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-1 -mx-1 px-1 scrollbar-hide">
        {languages.map((lang) => (
          <div
            key={lang.name}
            onClick={() => onLanguageSelect?.(lang.name)}
            className="bg-pink-50 border border-pink-100 rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-xs hover:border-pink-200 hover:bg-pink-100 active:scale-95 transition cursor-pointer shrink-0 min-w-[60px]"
          >
            <div className="flex items-center justify-center mb-1">
              {lang.isIndia ? (
                <IndiaFlag size="w-7 h-7" />
              ) : (
                <UKFlag size="w-7 h-7" />
              )}
            </div>
            <span className="text-[10px] font-semibold text-gray-800 leading-tight">
              {lang.name}
            </span>
            {lang.subtitle && (
              <span className="text-[8px] text-gray-500">{lang.subtitle}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
