import { useState, useEffect } from "react";

// cards
const cards = [
  { title: "Childhood Dreams", image: "m1.png", description: "In the next life, I would love to be your childhood bestie." },
  { title: "The Beginning", image: "/m3.jpeg", description: "Before everything… there was us." },
  { title: "First Memory", image: "/m2.jpeg", description: "Do you remember the first time we talked? I didn’t know you’d become my safe place." },
  { title: "Our Chaos", image: "/m7.jpeg", description: "We’re not normal. And I LOVE that about us." },
  { title: "Tears We Shared", image: "/m8.jpeg", description: "You held my hand even when words failed." },
  { title: "Mood Swings & You", image: "/m10.jpeg", description: "Thanks for handling every version of me." },
  { title: "Inside Jokes", image: "/m9.jpeg", description: "No one else would get this… and that’s the best part." },
  { title: "Growth Together", image: "/m11.jpeg", description: "We didn’t grow apart. We grew together." },
  { title: "Unfiltered Me", image: "/m14.jpeg", description: "I never had to pretend with you." },
  { title: "College Days", image: "/m15.jpeg", description: "Our uniforms never looked cooler than the days we spent together." },
  { title: "Work Life Begins", image: "/m16.jpeg", description: "Navigating the office chaos together made it so much fun." },
  { title: "My Forever Person", image: "/m20.jpeg", description: "Some people are temporary. You’re permanent." },
  { title: "We Fight, We Fix", image: "/m13.jpeg", description: "No matter what, we choose each other." },
  { title: "Future Dreams", image: "/m17.jpg", description: "I can’t wait for all the memories we haven’t lived yet." },
  { title: "Bad Days", image: "/m18.webp", description: "When everything felt cold and heavy, you stayed and made it warm." },
  { title: "My Safe Person", image: "/m4.jpg", description: "When the world leaves me alone, thank you for being my moon and my star." },
  { title: "Laughter Therapy", image: "/m5.avif", description: "You made me laugh through my storms, even when you had yours too." },
  { title: "My Anchor", image: "/m6.jpg", description: "When everyone else let go, you stayed and mended the pieces." },
  { title: "Still Us", image: "/m12.jpeg", description: "Miles couldn’t break what our hearts built together." },
  { title: "Old Age Talk", image: "/m19.jpg", description: "Save me a chair next to you when we’re old." },
  { title: "Forever, in Every Age", image: "/m21.png", description: "At 80, when everything slows down, I hope our friendship never fades." },
  { title: "This Isn’t the End", image: "/m22.jpeg", description: "This card doesn’t end here.\nNeither do we.", isEnding: true },
];

export default function GreetingCard({ onOpenLetter }) {
 const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const leftCard = cards[currentPage % cards.length];
  const rightCard = cards[(currentPage + 1) % cards.length];
  const nextRightCard = cards[(currentPage + 3) % cards.length];
  const isEndingSpread = rightCard?.isEnding;

  // Auto flip
  useEffect(() => {
    if (isEndingSpread) return;
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => (prev + 2) % cards.length);
        setIsFlipping(false);
      }, 1200);
    }, 6000);
    return () => clearInterval(interval);
  }, [isEndingSpread]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-yellow-50 p-4 relative overflow-hidden">
      <div className="relative w-[780px] h-[500px] perspective drop-shadow-2xl">
        {/* Left Page */}
        <div className="absolute w-1/2 h-full left-0 top-0 bg-[#fff8f0] border-r-2 border-yellow-200 rounded-l-3xl shadow-lg flex flex-col items-center justify-center p-4 z-10">
          <div className="relative w-4/5 h-2/3 bg-white rounded-xl overflow-hidden border-3 border-yellow-200">
            <img src={leftCard.image} alt={leftCard.title} className="w-full h-full object-cover" />
          </div>
          <h2 className="mt-3 font-[cursive] text-pink-700 text-xl">{leftCard.title}</h2>
          <p className="text-gray-700 italic text-sm text-center">{leftCard.description}</p>
        </div>

        {/* Next page under flipping page */}
        <div className="absolute w-1/2 h-full right-0 top-0 z-0">
          <div className="absolute w-full h-full bg-[#fff8f0] rounded-r-3xl shadow-inner flex flex-col items-center justify-center p-4">
            <div className="relative w-4/5 h-2/3 bg-white rounded-xl overflow-hidden border-3 border-yellow-200">
              <img src={nextRightCard.image} alt={nextRightCard.title} className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-3 font-[cursive] text-pink-700 text-xl">{nextRightCard.title}</h2>
            <p className="text-gray-700 italic text-sm mt-1 text-center">{nextRightCard.description}</p>
          </div>
        </div>

        {/* Flipping page */}
        <div className={`absolute w-1/2 h-full right-0 top-0 z-20 transform-origin-left ${isFlipping ? "animate-page-turn" : ""}`}>
          <div className="absolute w-full h-full bg-[#fff8f0] rounded-r-3xl shadow-lg flex flex-col items-center justify-center p-4 backface-hidden">
            <div className="relative w-4/5 h-2/3 bg-white rounded-xl overflow-hidden border-3 border-yellow-200">
              <img src={rightCard.image} alt={rightCard.title} className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-3 font-[cursive] text-pink-700 text-xl">{rightCard.title}</h2>
            <p className="text-gray-700 italic text-sm mt-1 text-center">{rightCard.description}</p>

            {/* Options below image for ending card */}
             {isEndingSpread && (
          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(0)}
              className="px-4 py-2 rounded-full bg-pink-200 hover:bg-pink-300 transition text-sm"
            >
              Replay Memories
            </button>
            <button
              onClick={onOpenLetter} // <- now this works
              className="px-4 py-2 rounded-full bg-yellow-200 hover:bg-yellow-300 transition text-sm"
            >
              A Letter For You
            </button>
          </div>
        )}
          </div>
        </div>
      </div>


      <style>{`
        .perspective { perspective: 1200px; }
        .backface-hidden { backface-visibility: hidden; }
        @keyframes pageTurn {
          0% { transform: rotateY(0deg); box-shadow: 0 0 0 rgba(0,0,0,0); }
          30% { transform: rotateY(-60deg); box-shadow: -5px 5px 25px rgba(0,0,0,0.25); }
          60% { transform: rotateY(-120deg); box-shadow: -12px 12px 30px rgba(0,0,0,0.3); }
          100% { transform: rotateY(-180deg); box-shadow: -20px 20px 40px rgba(0,0,0,0.35); }
        }
        .animate-page-turn { animation: pageTurn 1.2s forwards; transform-origin: left; }
      `}</style>
    </div>
  );
}
