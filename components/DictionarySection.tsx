"use client";

import { useState, useEffect } from "react";
import { Search, X, Volume2, Heart, ChevronUp, ArrowRight, Sparkles } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const categories = [
  { id: "all", label: "All", icon: "📖" },
  { id: "nouns", label: "Nouns", icon: "🍃" },
  { id: "verbs", label: "Verbs", icon: "🏃" },
  { id: "adjectives", label: "Adjectives", icon: "📚" },
  { id: "others", label: "Others", icon: "⋯" },
];

interface Word {
  santali: string;
  pos: string;
  posColor: string;
  meaning: string;
  roman: string;
  example: string;
  exampleEn: string;
  letter: string;
}

interface LetterSection {
  letter: string;
  count: number;
  items: Word[];
}

const posColors: Record<string, string> = {
  pink: "bg-pink-50 text-pink-700",
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
};

interface SearchResult {
  santali: string;
  english: string;
  meaning: string;
  example: string;
  source: "database" | "ai";
}

const getStoredWords = (): SearchResult[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("santaliDictionary");
  return stored ? JSON.parse(stored) : [];
};

const saveToStorage = (result: SearchResult) => {
  const stored = getStoredWords();
  const exists = stored.some(
    (w) => w.english.toLowerCase() === result.english.toLowerCase()
  );
  if (!exists) {
    stored.push(result);
    localStorage.setItem("santaliDictionary", JSON.stringify(stored));
  }
};

export default function DictionarySection() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [wordSections, setWordSections] = useState<LetterSection[]>([]);
  const [isLoadingWords, setIsLoadingWords] = useState(true);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const snapshot = await getDocs(collection(db, "words"));
        const wordsData: Word[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            santali: data.santali || "",
            pos: data.pos || "Noun",
            posColor: data.posColor || "pink",
            meaning: data.meaning || "",
            roman: data.roman || "",
            example: data.example || "",
            exampleEn: data.exampleEn || "",
            letter: data.letter || "",
          };
        });

        const grouped: Record<string, Word[]> = {};
        wordsData.forEach((word) => {
          const letter = word.letter.toUpperCase();
          if (!grouped[letter]) grouped[letter] = [];
          grouped[letter].push(word);
        });

        const sections: LetterSection[] = Object.keys(grouped)
          .sort()
          .map((letter) => ({
            letter,
            count: grouped[letter].length,
            items: grouped[letter],
          }));

        setWordSections(sections);
      } catch {
        setWordSections([]);
      } finally {
        setIsLoadingWords(false);
      }
    };

    fetchWords();
  }, []);

  const searchInLocalStorage = (term: string): SearchResult | null => {
    const stored = getStoredWords();
    const found = stored.find(
      (w) =>
        w.english.toLowerCase() === term.toLowerCase() ||
        w.santali === term
    );
    return found || null;
  };

  const searchWithAI = async (term: string): Promise<SearchResult | null> => {
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(term)}&langpair=en|sat`
      );
      const data = await res.json();
      const translated = data.responseData?.translatedText || "";

      if (translated && translated.toLowerCase() !== term.toLowerCase()) {
        return {
          santali: translated,
          english: term,
          meaning: `AI Translation: "${term}" in Santali`,
          example: translated,
          source: "ai",
        };
      }
      return null;
    } catch {
      return null;
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) return;
    setIsSearching(true);
    setHasSearched(true);

    const localResult = searchInLocalStorage(search);

    if (localResult) {
      setSearchResults([{ ...localResult, source: "database" }]);
      setIsSearching(false);
      return;
    }

    const aiResult = await searchWithAI(search);

    if (aiResult) {
      saveToStorage({ ...aiResult, source: "database" });
      setSearchResults([{ ...aiResult, source: "database" }]);
    } else {
      setSearchResults([]);
    }

    setIsSearching(false);
  };

  return (
    <div className="flex-1 -mt-4 bg-[#f8faf9] rounded-t-[24px] px-3.5 pt-4 pb-20 overflow-y-auto relative z-10">
      {/* Search Bar */}
      <div className="flex items-center space-x-2 mb-3.5">
        <div className="flex-1 bg-white border border-gray-200/90 rounded-full px-3.5 py-2 flex items-center space-x-2 shadow-xs">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search Santali or English word..."
            className="w-full text-xs text-gray-700 placeholder-gray-400 outline-none bg-transparent"
          />
          {search && (
            <button onClick={() => { setSearch(""); setSearchResults([]); setHasSearched(false); }} className="text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="w-9 h-9 rounded-full bg-[#be185d] text-white flex items-center justify-center shadow hover:bg-[#9d174d] shrink-0"
        >
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-between space-x-2 mb-3.5 text-xs font-medium">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl shadow-xs transition ${
              activeCategory === cat.id
                ? "bg-[#be185d] text-white"
                : "bg-white text-gray-600 border border-gray-100 hover:border-pink-200"
            }`}
          >
            <span className="text-xs mb-1">{cat.icon}</span>
            <span className={`text-[11px] ${activeCategory === cat.id ? "font-semibold" : ""}`}>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles size={14} className="text-pink-500" />
            <span className="text-xs font-bold text-gray-800">
              {searchResults.length > 0 ? "From Database" : "AI Search Result"}
            </span>
          </div>
          {isSearching ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs text-center">
              <div className="animate-spin w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <span className="text-xs text-gray-400">Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result, idx) => (
              <div key={idx} className="bg-white border border-pink-100 rounded-2xl p-3 shadow-xs">
                <div className="space-y-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-[#be185d] font-bold text-lg leading-none">{result.santali}</span>
                    <span className="bg-pink-50 text-pink-700 text-[9px] font-semibold px-2 py-0.5 rounded-full">
                      {result.source === "database" ? "DB" : "AI"}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">English: {result.english}</div>
                  <div className="text-[10px] text-gray-600">{result.meaning}</div>
                  {result.example && (
                    <div className="text-[10px] text-gray-600">
                      <span>Example: </span>
                      <span className="text-[#be185d] font-medium">{result.example}</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs text-center">
              <span className="text-xs text-gray-400">No results found</span>
            </div>
          )}
        </div>
      )}

      {/* Word Sections */}
      <div className="relative pr-5">
        {isLoadingWords ? (
          <div className="text-center py-10">
            <div className="animate-spin w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <span className="text-xs text-gray-400">Loading dictionary...</span>
          </div>
        ) : wordSections.length === 0 ? (
          <div className="text-center py-10 text-xs text-gray-400">
            No words found in database
          </div>
        ) : (
          wordSections.map((section) => (
          <div key={section.letter} className="mb-4">
            <div className="bg-pink-50/70 border border-pink-100/80 rounded-xl px-3 py-1.5 flex items-center justify-between mb-2.5">
              <span className="font-extrabold text-gray-800 text-xs">{section.letter}</span>
              <div className="flex items-center space-x-1 text-gray-500 text-[10px] font-medium">
                <span>{section.count} words</span>
                <ChevronUp size={9} />
              </div>
            </div>

            <div className="space-y-2.5">
              {section.items.map((word, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-[#be185d] font-bold text-lg leading-none">{word.santali}</span>
                      <span className={`${posColors[word.posColor]} text-[9px] font-semibold px-2 py-0.5 rounded-full`}>{word.pos}</span>
                      <span className="text-gray-400 text-[10px]">|</span>
                      <span className="text-gray-600 text-[10px]">meaning: <strong className="text-gray-800 font-semibold">{word.meaning}</strong></span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium">{word.roman}</div>
                    <div className="text-[10px] text-gray-600">
                      <span>Example: </span>
                      <span className="text-[#be185d] font-medium">{word.example}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 italic">{word.exampleEn}</div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <button className="hover:text-pink-700"><Volume2 size={16} className="text-pink-700" /></button>
                    <button className="hover:text-rose-500"><Heart size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )))}

        <div className="absolute right-0 top-1 bottom-1 flex flex-col items-center justify-between text-[8px] font-bold text-gray-400 select-none py-1">
          <span>#</span>
          <span className="w-3.5 h-3.5 bg-[#be185d] text-white rounded-full flex items-center justify-center text-[8px]">A</span>
          {["B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"].map((letter) => (
            <span key={letter} className="hover:text-pink-700 cursor-pointer">{letter}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
