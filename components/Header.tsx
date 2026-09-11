"use client";

import { Settings } from "lucide-react";

export default function Header() {
  return (
    <div className="relative bg-gradient-to-b from-[#831843] via-[#9d174d] to-[#be185d] pt-2 pb-3 px-4 text-white overflow-hidden">
      {/* Decorative SVG backdrop */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 400 200" className="w-full h-full object-cover">
          <circle cx="280" cy="40" r="30" fill="#facc15" opacity="0.85" />
          <path
            d="M0,180 Q100,120 200,160 T400,130 L400,200 L0,200 Z"
            fill="#500724"
          />
          <path
            d="M50,190 Q180,140 280,175 T400,150 L400,200 L0,200 Z"
            fill="#4a0620"
          />
        </svg>
      </div>

      {/* App Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-1">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#9d174d] font-bold text-xl shadow-md border border-white/40">
            <span>ᱟ</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
              Santali Translator
            </h1>
            <p className="text-[11px] text-pink-100 font-normal">
              Connect Languages • Preserve Culture
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-right hidden sm:block">
            <span className="block text-[9px] italic text-pink-100 font-serif leading-none">
              Our Language
            </span>
            <span className="block text-[10px] italic text-pink-200 font-serif leading-tight">
              Our Identity
            </span>
          </div>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-white/90 hover:bg-white/10 transition">
            <Settings size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
