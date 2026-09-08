"use client";

import { Languages, Clock, Heart, BookOpen } from "lucide-react";

const tabs = [
  { id: "translate", label: "Translate", icon: Languages },
  { id: "history", label: "History", icon: Clock },
  { id: "favourites", label: "Favourites", icon: Heart },
  { id: "learn", label: "Learn", icon: BookOpen },
] as const;

interface NavigationPillsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function NavigationPills({ activeTab, onTabChange }: NavigationPillsProps) {
  return (
    <div className="flex items-center justify-between bg-white p-1 rounded-full shadow-sm border border-gray-100 text-xs font-medium text-gray-600">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full transition shadow-sm ${
              isActive
                ? "bg-[#be185d] text-white"
                : "hover:text-pink-800 px-2 py-1"
            }`}
          >
            <Icon size={12} className={isActive ? "" : "text-gray-400"} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
