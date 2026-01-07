import { useState, useRef } from "react";
import Landing from "./components/Landing";
import CardBook from "./components/CardBook";
import Letter from "./components/Letter";
import "./App.css";

export default function App() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const audioRef = useRef(null);

  // Open card book
  const handleOpenCard = () => {
    setIsCardOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  // Open letter (from card)
  const handleOpenLetter = () => {
    setIsLetterOpen(true);
  };

  //  Open letter directly from landing
  const handleOpenLetterDirect = () => {
    setIsCardOpen(true);   // optional, keeps flow consistent
    setIsLetterOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <audio
        ref={audioRef}
        src="/Sang_Rahiyo.mp3"
        loop
        autoPlay
        muted={false}
      />

      {!isCardOpen ? (
        <Landing
          onOpen={handleOpenCard}
          onOpenLetter={handleOpenLetterDirect}   //  NEW PROP
        />
      ) : isLetterOpen ? (
        <Letter />
      ) : (
        <CardBook onOpenLetter={handleOpenLetter} />
      )}
    </div>
  );
}
