"use client";

import { Copy, Volume2, Share2, Heart, Maximize2 } from "lucide-react";

const actions = [
  { label: "Copy", icon: Copy, color: "pink" },
  { label: "Share", icon: Share2, color: "blue" },
  { label: "Save", icon: Heart, color: "rose" },
  { label: "Speak", icon: Volume2, color: "purple" },
  { label: "Fullscreen", icon: Maximize2, color: "amber" },
] as const;

const colorMap: Record<string, { bg: string; text: string; hover: string }> = {
  pink: {
    bg: "bg-pink-50",
    text: "text-pink-700",
    hover: "group-hover:bg-pink-100",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    hover: "group-hover:bg-blue-100",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-500",
    hover: "group-hover:bg-rose-100",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    hover: "group-hover:bg-purple-100",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    hover: "group-hover:bg-amber-100",
  },
};

interface ResultCardProps {
  translatedText: string;
}

export default function ResultCard({ translatedText }: ResultCardProps) {
  const handleCopy = () => {
    if (translatedText) navigator.clipboard.writeText(translatedText);
  };

  return (
    <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-3">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-gray-800 text-[12px]">Translation</span>
        <div className="flex items-center space-x-2.5 text-gray-400">
          <button onClick={handleCopy} className="hover:text-gray-600">
            <Copy size={12} />
          </button>
          <button className="hover:text-gray-600">
            <Volume2 size={12} />
          </button>
        </div>
      </div>

      <p className={`text-xs min-h-[32px] ${translatedText ? 'text-gray-800' : 'text-gray-400 italic'}`}>
        {translatedText || "Translation will appear here..."}
      </p>

      {/* Quick Output Action Icons */}
      <div className="flex items-center justify-between pt-1">
        {actions.map((action) => {
          const Icon = action.icon;
          const colors = colorMap[action.color];
          return (
            <button key={action.label} className="flex flex-col items-center group">
              <div
                className={`w-8 h-8 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xs ${colors.hover} transition`}
              >
                <Icon size={14} />
              </div>
              <span className="text-[10px] text-gray-500 mt-1 font-medium">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
