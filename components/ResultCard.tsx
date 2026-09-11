"use client";

import { useState } from "react";
import { Copy, Volume2, Share2, Heart, Maximize2, Check, X } from "lucide-react";

interface ResultCardProps {
  translatedText: string;
  inputText: string;
  fromLang: string;
  toLang: string;
}

export default function ResultCard({ translatedText, inputText, fromLang, toLang }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!translatedText || speaking) return;
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = "en-US";
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleShare = async () => {
    if (!translatedText) return;
    if (navigator.share) {
      try {
        await navigator.share({ text: translatedText });
      } catch {
        // share cancelled
      }
    } else {
      navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!translatedText || !inputText) return;
    const saved = JSON.parse(localStorage.getItem("savedTranslations") || "[]");
    const exists = saved.some(
      (item: { input: string; output: string }) =>
        item.input === inputText && item.output === translatedText
    );
    if (!exists) {
      saved.push({
        input: inputText,
        output: translatedText,
        fromLang,
        toLang,
        timestamp: Date.now(),
      });
      localStorage.setItem("savedTranslations", JSON.stringify(saved));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const actions = [
    { label: "Copy", icon: copied ? Check : Copy, color: "pink", onClick: handleCopy },
    { label: "Share", icon: Share2, color: "blue", onClick: handleShare },
    { label: "Save", icon: saved ? Check : Heart, color: "rose", onClick: handleSave },
    { label: "Speak", icon: Volume2, color: "purple", onClick: handleSpeak, disabled: speaking },
    { label: "Fullscreen", icon: Maximize2, color: "amber", onClick: () => setFullscreen(true) },
  ];

  const colorMap: Record<string, { bg: string; text: string; hover: string }> = {
    pink: { bg: "bg-pink-50", text: "text-pink-700", hover: "group-hover:bg-pink-100" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", hover: "group-hover:bg-blue-100" },
    rose: { bg: "bg-rose-50", text: "text-rose-500", hover: "group-hover:bg-rose-100" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", hover: "group-hover:bg-purple-100" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", hover: "group-hover:bg-amber-100" },
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-gray-800 text-[12px]">Translation</span>
        </div>

        <p className={`text-xs min-h-[32px] ${translatedText ? "text-gray-800" : "text-gray-400 italic"}`}>
          {translatedText || "Translation will appear here..."}
        </p>

        <div className="flex items-center justify-between pt-1">
          {actions.map((action) => {
            const Icon = action.icon;
            const colors = colorMap[action.color];
            return (
              <button
                key={action.label}
                onClick={action.onClick}
                disabled={action.disabled}
                className="flex flex-col items-center group"
              >
                <div
                  className={`w-8 h-8 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xs ${colors.hover} transition`}
                >
                  <Icon size={14} />
                </div>
                <span className="text-[10px] text-gray-500 mt-1 font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-gray-800 text-sm">Translation</span>
            <button onClick={() => setFullscreen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-lg text-gray-800 text-center break-words px-4">
              {translatedText || "Translation will appear here..."}
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 pb-6">
            <button onClick={handleCopy} className="flex flex-col items-center text-pink-600">
              {copied ? <Check size={20} /> : <Copy size={20} />}
              <span className="text-[10px] mt-1">Copy</span>
            </button>
            <button onClick={handleShare} className="flex flex-col items-center text-blue-600">
              <Share2 size={20} />
              <span className="text-[10px] mt-1">Share</span>
            </button>
            <button onClick={handleSave} className="flex flex-col items-center text-rose-500">
              {saved ? <Check size={20} /> : <Heart size={20} />}
              <span className="text-[10px] mt-1">Save</span>
            </button>
            <button onClick={handleSpeak} disabled={speaking} className="flex flex-col items-center text-purple-600">
              <Volume2 size={20} />
              <span className="text-[10px] mt-1">Speak</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
