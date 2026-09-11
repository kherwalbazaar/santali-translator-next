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
    <div className="bg-white border-t border-gray-100 px-3 py-2 flex items-center justify-around fixed bottom-0 left-0 right-0 z-20">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center transition ${
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
  );
}
