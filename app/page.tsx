"use client";

import { useState } from "react";
import Header from "@/components/Header";
import NavigationPills from "@/components/NavigationPills";
import TranslationCard from "@/components/TranslationCard";
import ResultCard from "@/components/ResultCard";
import FooterBanner from "@/components/FooterBanner";
import BottomNav from "@/components/BottomNav";
import DictionarySection from "@/components/DictionarySection";
import FavouritesSection from "@/components/FavouritesSection";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const getStoredWords = () => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("santaliDictionary");
  return stored ? JSON.parse(stored) : [];
};

const saveToStorage = (word: { santali: string; english: string; meaning: string; example: string }) => {
  const stored = getStoredWords();
  const exists = stored.some(
    (w: { english: string }) => w.english.toLowerCase() === word.english.toLowerCase()
  );
  if (!exists) {
    stored.push({ ...word, source: "database" });
    localStorage.setItem("santaliDictionary", JSON.stringify(stored));
  }
};

const searchInLocalStorage = (term: string, from: string, to: string) => {
  const stored = getStoredWords();
  return stored.find(
    (w: { english: string; santali: string }) =>
      (from === "en" && w.english.toLowerCase() === term.toLowerCase()) ||
      (to === "en" && w.santali.toLowerCase() === term.toLowerCase())
  ) || null;
};

const saveToFirestore = async (santali: string, english: string, setNewWord: (word: { santali: string; english: string; letter: string }) => void) => {
  try {
    const letter = english.charAt(0).toUpperCase();

    // Fetch a full sentence example in background
    let exampleSentence = santali;
    try {
      const exampleText = `This is ${english}`;
      const exRes = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(exampleText)}&langpair=en|sat`
      );
      const exData = await exRes.json();
      const translatedExample = exData.responseData?.translatedText || "";
      if (translatedExample && translatedExample.toLowerCase() !== exampleText.toLowerCase()) {
        exampleSentence = translatedExample;
      }
    } catch {
      // Keep word as example
    }

    await addDoc(collection(db, "words"), {
      santali,
      english,
      pos: "Noun",
      posColor: "pink",
      meaning: `"${english}" in Santali`,
      roman: "",
      example: exampleSentence,
      exampleEn: `This is ${english}`,
      letter,
    });
    setNewWord({ santali, english, letter });
  } catch {
    // Firestore save failed silently
  }
};

export default function Home() {
  const [translatedText, setTranslatedText] = useState("");
  const [inputText, setInputText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [activeTab, setActiveTab] = useState("translate");
  const [toLang, setToLang] = useState("Santali");
  const [fromLang, setFromLang] = useState("English");
  const [newWord, setNewWord] = useState<{ santali: string; english: string; letter: string } | null>(null);

  const handleTranslate = async (text: string, from: string, to: string) => {
    if (!text.trim()) return;
    setIsTranslating(true);
    setInputText(text.trim());
    setFromLang(from);

    const isSingleWord = text.trim().split(/\s+/).length === 1;

    try {
      if (isSingleWord) {
        const localResult = searchInLocalStorage(text.trim(), from, to);

        if (localResult) {
          const translated = from === "en" ? localResult.santali : localResult.english;
          setTranslatedText(translated);
          setIsTranslating(false);
          return;
        }
      }

      let translated = "";

      try {
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
        );
        const data = await res.json();
        translated = data?.responseData?.translatedText || "";
      } catch {
        // MyMemory failed, try alternative
      }

      if (!translated || translated.toLowerCase() === text.trim().toLowerCase()) {
        try {
          const res = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`
          );
          const data = await res.json();
          translated = data?.[0]?.map((item: [string]) => item[0]).join("") || "";
        } catch {
          // Google fallback also failed
        }
      }

      if (translated && translated.toLowerCase() !== text.trim().toLowerCase()) {
        setTranslatedText(translated);

        if (isSingleWord) {
          if (from === "en") {
            saveToStorage({ santali: translated, english: text.trim(), meaning: `"${text.trim()}" in Santali`, example: translated });
            saveToFirestore(translated, text.trim(), setNewWord);
          } else if (to === "en") {
            saveToStorage({ santali: text.trim(), english: translated, meaning: `"${text.trim()}" in English`, example: text.trim() });
            saveToFirestore(text.trim(), translated, setNewWord);
          }
        }
      } else {
        setTranslatedText("Translation not available for this language pair.");
      }
    } catch {
      setTranslatedText("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="bg-[#f8faf9] min-h-screen flex flex-col justify-between">
      <Header />

      {activeTab === "translate" ? (
        <div className="flex-1 -mt-4 px-3.5 pt-4 pb-20 overflow-y-auto space-y-3.5">
          <NavigationPills activeTab={activeTab} onTabChange={setActiveTab} />
          <TranslationCard onTranslate={handleTranslate} isTranslating={isTranslating} toLang={toLang} onToLangChange={setToLang} />
          <ResultCard translatedText={translatedText} inputText={inputText} fromLang={fromLang} toLang={toLang} />
          <FooterBanner />
        </div>
      ) : activeTab === "dictionary" ? (
        <div className="flex-1 flex flex-col">
          <DictionarySection newWord={newWord} />
        </div>
      ) : activeTab === "favourite" ? (
        <FavouritesSection />
      ) : (
        <div className="flex-1 -mt-4 px-3.5 pt-4 pb-20 overflow-y-auto space-y-3.5">
          <NavigationPills activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="text-center text-gray-400 text-xs py-10">
            Coming soon...
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
