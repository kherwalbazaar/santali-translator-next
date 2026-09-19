"use client";

import {
  Heart,
  BookOpen,
  ArrowRightLeft,
  GraduationCap,
  User,
} from "lucide-react";

const navItems = [
  { id: "favourite", label: "Favourite", icon: Heart },
  { id: "dictionary", label: "Dictionary", icon: BookOpen },
  { id: "translate", label: "Translate", icon: ArrowRightLeft },
  { id: "learn", label: "Learn", icon: GraduationCap },
  { id: "profile", label: "Profile", icon: User },
] as const;

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <>
      {/* Mobile bottom bar */}
      <div className="bg-white border-t border-gray-100 px-3 py-2 flex items-center justify-around fixed bottom-0 left-0 right-0 z-20 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center transition active:scale-90 ${
                isActive ? "text-[#be185d]" : "text-gray-400 hover:text-pink-700"
              }`}
            >
              <Icon size={14} />
              <span
                className={`mt-0.5 ${
                  isActive ? "text-[10px] font-semibold" : "text-[10px]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 h-full w-16 lg:w-56 bg-white border-r border-gray-100 z-20 flex-col shadow-sm">
        {/* Logo */}
        <div className="flex items-center justify-center lg:justify-start lg:px-4 lg:py-5 py-4 border-b border-gray-50">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#831843] to-[#be185d] flex items-center justify-center text-white font-bold text-sm shadow-md">
            <span>ᱟ</span>
          </div>
          <span className="hidden lg:block ml-2.5 text-sm font-bold text-[#9d174d]">
            Santali Translator
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 flex flex-col items-center lg:items-stretch gap-1 px-2 lg:px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-3 px-2.5 lg:px-3 py-2.5 rounded-xl transition active:scale-90 text-sm ${
                  isActive
                    ? "bg-[#fdf2f8] text-[#be185d] font-semibold"
                    : "text-gray-400 hover:text-pink-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} className={isActive ? "text-[#be185d]" : ""} />
                <span className="hidden lg:block">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="hidden lg:flex items-center px-4 py-4 border-t border-gray-50">
          <p className="text-[10px] text-gray-300 text-center w-full">
            Connect Languages • Preserve Culture
          </p>
        </div>
      </div>
    </>
  );
}
