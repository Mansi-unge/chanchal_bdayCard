import { useRef } from "react";
import { FaMusic, FaEnvelopeOpenText } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";


export default function Landing({ onOpen, onOpenLetter }) {
  const audioRef = useRef(null);

  const handleFirstInteraction = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(() => { });
    }
  };

  return (
    <div
      onClick={handleFirstInteraction}
      className="fixed inset-0 w-screen h-screen overflow-hidden text-center cursor-pointer"
    >
      {/*  Background Image with slow fade-in and dramatic zoom */}
      <div
        className="absolute inset-0 animate-fadeZoom"
        style={{
          backgroundImage: "url('/us.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0,
        }}
      />

      {/*  Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      {/* Background music (autoplay muted) */}
      <audio ref={audioRef} loop muted>
        <source src="/Sang_Rahiyo.mp3" type="audio/mpeg" />
      </audio>

      {/* Lyric at bottom */}
      <div className="absolute bottom-16 w-full px-6 z-10">
        <p
          className="mx-auto max-w-3xl text-2xl md:text-3xl lg:text-4xl
                     font-serif text-pink-100/90 text-center
                     drop-shadow-[0_0_15px_rgba(255,192,203,0.8)]
                     animate-fadeIn
                     leading-snug"
          style={{
            animation: "fadeIn 3s ease-in-out forwards 1s",
          }}
        >
          {`Aage rahiyo, na pichhe rahiyo
Mera rahiyo, yaar, bas mera rahiyo
Sang rahiyo, sang rahiyo
Samjhe na duniya, tu toh mujhko samajhiyo`}
        </p>

        <p className="mt-4 text-sm text-white/70 flex items-center justify-center gap-2 animate-pulse">
          <FaMusic className="text-pink-200" />
          Tap anywhere to feel the melody 🎶
        </p>
      </div>

      {/* 📩 Action Buttons (Right Side, stacked) */}
<div className="fixed bottom-6 right-6 z-20 flex flex-col gap-4">
  
  {/* 💌 Open Letter Directly */}
  <button
    onClick={onOpenLetter}
    className="
      px-6 py-3 rounded-full
      bg-[#fff8dc]/90
      text-[#4a2c2a] text-lg
      shadow-2xl
      font-serif
      flex items-center gap-2
      hover:bg-[#ffe4c4]
      transition-all duration-300
      hover:scale-105
    "
  >
    <FaHeart className="text-pink-500 animate-pulse" />
    For You
  </button>

  {/* ✉️ Open Card */}
  <button
    onClick={onOpen}
    className="
      px-6 py-3 rounded-full
      bg-pink-500/90
      text-white text-lg
      shadow-2xl
      flex items-center gap-2
      hover:bg-pink-600
      transition-all duration-300
      hover:scale-105
    "
  >
    <FaEnvelopeOpenText />
    Open the Card
  </button>

</div>



      {/*  Animations */}
      <style>
        {`
          /* Lyric fade-in */
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          /* Background fade-in + more dramatic slow zoom */
          @keyframes fadeZoom {
            0% {
              opacity: 0;
              transform: scale(1.05);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.12);
            }
            100% {
              opacity: 1;
              transform: scale(1.2);
            }
          }

          .animate-fadeZoom {
            animation: fadeZoom 25s ease-in-out forwards;
          }
        `}
      </style>
    </div>
  );
}
