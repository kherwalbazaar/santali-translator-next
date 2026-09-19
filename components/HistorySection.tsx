"use client";

import { useState } from "react";
import { Clock, Trash2, Copy, Check, ArrowRight, RotateCcw } from "lucide-react";

interface HistoryItem {
  input: string;
  output: string;
  fromLang: string;
  toLang: string;
  timestamp: number;
}

const formatTime = (ts: number) => {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;

  const day = d.getDate();
  const month = d.toLocaleString("default", { month: "short" });
  const year = d.getFullYear();
  const isThisYear = year === now.getFullYear();
  return isThisYear ? `${day} ${month}` : `${day} ${month} ${year}`;
};

const getStoredHistory = (): HistoryItem[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("translationHistory") || "[]");
};

interface HistorySectionProps {
  onReuse?: (input: string, from: string, to: string) => void;
}

export default function HistorySection({ onReuse }: HistorySectionProps) {
  const [items, setItems] = useState<HistoryItem[]>(() => getStoredHistory());
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleDelete = (idx: number) => {
    const updated = items.filter((_, i) => i !== idx);
    setItems(updated);
    localStorage.setItem("translationHistory", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setItems([]);
    localStorage.removeItem("translationHistory");
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Clock size={28} className="text-gray-300" />
        </div>
        <p className="text-gray-500 text-sm font-medium">No history yet</p>
        <p className="text-gray-400 text-xs mt-1 text-center">
          Your translation history will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 px-3.5 pt-4 pb-20 overflow-y-auto space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-gray-800">History</h2>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {items.length} translations
          </span>
          <button
            onClick={handleClearAll}
            className="flex items-center space-x-1 text-[10px] text-gray-400 hover:text-red-500 transition"
          >
            <Trash2 size={10} />
            <span>Clear all</span>
          </button>
        </div>
      </div>

      {items.map((item, idx) => (
        <div
          key={`${item.timestamp}-${idx}`}
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
                  <ArrowRight size={10} className="text-gray-400" />
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

          <div className="flex items-center justify-between pt-1 border-t border-gray-50">
            <span className="text-[9px] text-gray-400">
              {formatTime(item.timestamp)}
            </span>
            <div className="flex items-center gap-3">
              {onReuse && (
                <button
                  onClick={() => onReuse(item.input, item.fromLang, item.toLang)}
                  className="flex items-center space-x-1 text-gray-400 hover:text-pink-600 transition text-[10px]"
                >
                  <RotateCcw size={12} />
                  <span>Reuse</span>
                </button>
              )}
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
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
