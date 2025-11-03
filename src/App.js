import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import defaultCharacters from './characters.json';

const App = () => {
  const [characters, setCharacters] = useState(() => {
    const saved = localStorage.getItem('epicCharacters');
    if (!saved) {
      return defaultCharacters;
    }

    // Merge saved data with default characters to ensure new/updated characters are loaded
    const savedCharacters = JSON.parse(saved);
    const savedMap = new Map(savedCharacters.map(c => [c.id, c]));

    // Update existing characters and add new ones from defaultCharacters
    const mergedCharacters = defaultCharacters.map(defaultChar => {
      const savedChar = savedMap.get(defaultChar.id);
      if (savedChar) {
        // Keep user's custom audioUrl but update other fields from JSON
        return {
          ...defaultChar,
          audioUrl: savedChar.audioUrl // Preserve user's uploaded audio
        };
      }
      return defaultChar; // New character
    });

    return mergedCharacters;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef(null);
  const audioRef = useRef(null);

  const currentCharacter = characters.length > 0 ? characters[currentIndex] : null;

  // Save to localStorage whenever characters change
  useEffect(() => {
    localStorage.setItem('epicCharacters', JSON.stringify(characters));
  }, [characters]);

  useEffect(() => {
    if (!synthRef.current) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const goNext = () => {
    stopAudio();
    if (characters.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % characters.length);
    }
  };

  const goPrev = () => {
    stopAudio();
    if (characters.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length);
    }
  };

  const stopAudio = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const speakCharacter = () => {
    if (!currentCharacter) return;

    if (isPlaying) {
      stopAudio();
      return;
    }

    // Use text-to-speech
    const synth = synthRef.current;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(
      `${currentCharacter.name}. ${currentCharacter.description}`
    );
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    synth.speak(utterance);
  };


  // MAIN VIEW
  if (characters.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-orange-900 mb-4">Epic Characters</h1>
          <p className="text-orange-700">No characters available. Add characters through code.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-900">Epic Characters</h1>
          <p className="text-orange-700">Discover the heroes and villains</p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-8 text-center">
            <div className="text-8xl mb-4">{currentCharacter?.image}</div>
            <h2 className="text-3xl font-bold text-orange-900 mb-2">{currentCharacter?.name}</h2>
            <p className="text-sm font-semibold text-orange-700 mb-6 tracking-wide">{currentCharacter?.epic}</p>
            <p className="text-gray-700 leading-relaxed mb-6">{currentCharacter?.description}</p>

            <button
              onClick={speakCharacter}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                isPlaying
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <VolumeX size={20} />
                  Stop Audio
                </>
              ) : (
                <>
                  <Volume2 size={20} />
                  Listen
                </>
              )}
            </button>
          </div>

          <div className="bg-orange-50 px-8 py-4 text-center text-sm font-semibold text-orange-700">
            {currentIndex + 1} / {characters.length}
          </div>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          <button onClick={goPrev} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 transition-all shadow-lg">
            <ChevronLeft size={24} />
          </button>
          <button onClick={goNext} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 transition-all shadow-lg">
            <ChevronRight size={24} />
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-8">← Swipe or use buttons to navigate →</p>
      </div>
    </div>
  );
};

export default App;
