import React, { useEffect, useRef, useState } from "react";
export default function Letter() {
  const [fullText, setFullText] = useState("");
  const [displayedText, setDisplayedText] = useState("");

  const wordIndex = useRef(0);
  const scrollRef = useRef(null);
  const wordsRef = useRef([]);

  // Fetch letter from public folder
  useEffect(() => {
    fetch("/letter.txt")
      .then((res) => res.text())
      .then((text) => {
        setFullText(text.trim());
        wordsRef.current = text.trim().split(" ");
      })
      .catch((err) => console.error("Failed to load letter:", err));
  }, []);

  // Typing effect
  useEffect(() => {
    if (!wordsRef.current.length) return;

    const interval = setInterval(() => {
      if (wordIndex.current < wordsRef.current.length) {
        setDisplayedText(
          (prev) => prev + " " + wordsRef.current[wordIndex.current]
        );
        wordIndex.current++;

        // auto-scroll
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#fff8dc]">
      <div className="h-full w-full flex shadow-[0_10px_30px_rgba(0,0,0,0.2)] overflow-hidden">

        {/* Left Side - Static Heart Frame */}
        <div className="w-3/4 flex p-4 items-center justify-center bg-[#ffe4c4]">
          <img
            src="/heart_frame3.png"
            alt="Heart Memories"
            className="h-auto m-2 object-contain animate-fadeZoom"
          />
        </div>

        {/* Right Side - Typed Letter */}
        <div
          className="w-1/2 p-10 text-[#4a2c2a] font-[cursive] flex flex-col"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(255,248,220,0.8) 0%, rgba(255,248,220,0.3) 80%),
              url('/vintage-paper.jpg')
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        >
          <div
  ref={scrollRef}
  className="flex-1 overflow-y-auto pr-3 text-xl leading-relaxed hide-scrollbar tracking-wide"
  style={{
    fontFamily: "'Dancing Script', cursive",
    animation: "handwritingFloat 6s ease-in-out infinite",
  }}
>
  <p
    className="whitespace-pre-line"
    style={{
      textShadow: "0.3px 0.3px 0.6px rgba(0,0,0,0.15)",
      letterSpacing: "0.04em",
    }}
  >
    {displayedText}
    <span className="animate-pulse">|</span>
  </p>

  {wordIndex.current >= wordsRef.current.length && (
    <p
      className="mt-8 text-right text-3xl"
      style={{ fontFamily: "'Dancing Script', cursive" }}
    >
      — M
    </p>
  )}
</div>

        </div>

      </div>
    </div>
  );
}


