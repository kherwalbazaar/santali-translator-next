"use client";

import { useState } from "react";
import { Heart, Trash2, Copy, Check } from "lucide-react";

interface SavedTranslation {
  input: string;
  output: string;
  fromLang: string;
  toLang: string;
  timestamp: number;
}

export default function FavouritesSection() {
  const [items, setItems] = useState<SavedTranslation[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("savedTranslations") || "[]");
  });
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleDelete = (idx: number) => {
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated);
    localStorage.setItem("savedTranslations", JSON.stringify(updated));
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mb-4">
          <Heart size={28} className="text-rose-300" />
        </div>
        <p className="text-gray-500 text-sm font-medium">No favourites yet</p>
        <p className="text-gray-400 text-xs mt-1 text-center">
          Save translations from the Translate tab to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 px-3.5 pt-4 pb-20 overflow-y-auto space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-gray-800">Favourites</h2>
        <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {items.length} saved
        </span>
      </div>

      {items.map((item, idx) => (
        <div
          key={item.timestamp}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <div className="bg-pink-50 rounded-xl px-3 py-2">
                <span className="text-[9px] text-pink-500 font-medium block mb-0.5">
                  {item.fromLang}
                </span>
                <p className="text-xs text-gray-800 font-medium">{item.input}</p>
              </div>

              <div className="flex justify-center">
                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-[8px] text-gray-400">↓</span>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl px-3 py-2">
                <span className="text-[9px] text-purple-500 font-medium block mb-0.5">
                  {item.toLang}
                </span>
                <p className="text-xs text-gray-800 font-medium">{item.output}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-1 border-t border-gray-50">
            <button
              onClick={() => handleCopy(item.output, idx)}
              className="flex items-center space-x-1 text-gray-400 hover:text-pink-600 transition text-[10px]"
            >
              {copiedIdx === idx ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
              <span>{copiedIdx === idx ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={() => handleDelete(idx)}
              className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition text-[10px]"
            >
              <Trash2 size={12} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
