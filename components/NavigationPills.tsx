"use client";

import { useRef, useState, useEffect } from "react";
import { Languages, Clock, Heart, BookOpen } from "lucide-react";

const tabs = [
  { id: "translate", label: "Translate", icon: Languages },
  { id: "history", label: "History", icon: Clock },
  { id: "favourite", label: "Favourites", icon: Heart },
  { id: "learn", label: "Learn", icon: BookOpen },
] as const;

interface NavigationPillsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function NavigationPills({ activeTab, onTabChange }: NavigationPillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  useEffect(() => {
    const el = tabRefs.current.get(activeTab);
    const container = containerRef.current;
    if (el && container && tabs.some((t) => t.id === activeTab)) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = el.getBoundingClientRect();
      setIndicator({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
        visible: true,
      });
    } else {
      setIndicator((prev) => ({ ...prev, visible: false }));
    }
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center bg-white p-1 rounded-full shadow-sm border border-gray-100 text-[11px] sm:text-xs font-medium text-pink-600 w-full"
    >
      {/* Sliding indicator */}
      <div
        className="absolute top-1 bottom-1 rounded-full bg-[#be185d] shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0"
        style={{
          left: indicator.left,
          width: indicator.width,
          opacity: indicator.visible ? 1 : 0,
          transform: indicator.visible ? "scaleX(1)" : "scaleX(0)",
        }}
      />

      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id && tabs.some((t) => t.id === activeTab);
        return (
          <button
            key={tab.id}
            ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
            onClick={() => onTabChange(tab.id)}
            className={`relative z-10 flex-1 flex items-center justify-center space-x-1 sm:space-x-1.5 py-2 rounded-full transition-colors duration-300 ${
              isActive ? "text-white" : "hover:text-pink-800"
            }`}
          >
            <Icon size={12} className={`transition-transform duration-300 shrink-0 ${isActive ? "scale-110" : ""}`} />
            <span className="transition-all duration-300">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
