"use client";

import { useState, useEffect } from "react";

export default function TypewriterLoop({ words, speed = 100, pause = 1500 }: { words: string[]; speed?: number; pause?: number }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = words[currentWordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(fullText.substring(0, displayedText.length + 1));
        }, speed);
      } else {
        timer = setTimeout(() => setIsDeleting(true), pause);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(fullText.substring(0, displayedText.length - 1));
        }, speed / 2);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex, words, speed, pause]);

  return (
    <div className="flex items-center font-sans text-gray-400 text-xs">
      <span>{displayedText}</span>
      <span className="ml-0.5 w-0.5 h-3.5 bg-pink-400 animate-pulse" />
    </div>
  );
}
