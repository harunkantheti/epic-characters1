import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Download, Upload } from 'lucide-react';

const App = () => {
  // Default sample data
  const defaultCharacters = [
    {
      id: 1,
      name: 'Arjuna',
      epic: 'Mahabharata',
      description: 'The third Pandava prince, Arjuna is a master archer and central figure in the Bhagavad Gita. Known for his skill in combat and his moral dilemmas on the battlefield of Kurukshetra.',
      image: '🏹',
      audioUrl: null
    },
    {
      id: 2,
      name: 'Krishna',
      epic: 'Mahabharata & Ramayana',
      description: 'The supreme deity incarnated as a charioteer and strategist, Krishna plays crucial roles in both epics. His wisdom and divine love are celebrated across Hindu philosophy.',
      image: '🎺',
      audioUrl: null
    },
    {
      id: 3,
      name: 'Rama',
      epic: 'Ramayana',
      description: 'The seventh avatar of Vishnu and the ideal man, Rama is the protagonist of the Ramayana. He is celebrated for his virtue, courage, and unwavering devotion to dharma.',
      image: '⚔️',
      audioUrl: null
    },
    {
      id: 4,
      name: 'Hanuman',
      epic: 'Ramayana',
      description: 'The devoted follower of Rama, Hanuman is a monkey warrior of immense strength and loyalty. He symbolizes courage, wisdom, and perfect devotion to duty.',
      image: '🐵',
      audioUrl: null
    }
  ];

  const [characters, setCharacters] = useState(() => {
    const saved = localStorage.getItem('epicCharacters');
    return saved ? JSON.parse(saved) : defaultCharacters;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [audioMap, setAudioMap] = useState({}); // Store audio files by character ID
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

    // Check if there's an audio file for this character
    if (audioMap[currentCharacter.id]) {
      // Play audio file
      const audio = new Audio(audioMap[currentCharacter.id]);
      audioRef.current = audio;
      
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setIsPlaying(false);
        alert('Error playing audio file');
      };
      
      audio.play();
    } else {
      // Fallback to text-to-speech
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
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(characters, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'characters.json';
    link.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            // Ensure all characters have audioUrl property
            const withAudio = imported.map(char => ({
              ...char,
              audioUrl: char.audioUrl || null
            }));
            setCharacters(withAudio);
            setCurrentIndex(0);
            setShowUpload(false);
            alert('Data imported successfully!');
          } else {
            alert('Invalid file format. Please upload a valid JSON file.');
          }
        } catch (err) {
          alert('Error importing file: ' + err.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAudioUpload = (characterId, e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if it's an audio file
      if (!file.type.startsWith('audio/')) {
        alert('Please upload an audio file');
        return;
      }

      // Create a URL for the audio file
      const audioUrl = URL.createObjectURL(file);
      
      // Store the audio URL
      setAudioMap(prev => ({
        ...prev,
        [characterId]: audioUrl
      }));

      alert(`Audio uploaded for ${currentCharacter.name}`);
    }
  };

  // MAIN VIEW
  if (characters.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-orange-900 mb-4">Epic Characters</h1>
          <p className="text-orange-700 mb-8">Upload character data to get started</p>
          <button
            onClick={() => setShowUpload(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2 mx-auto"
          >
            <Upload size={20} />
            Upload Data
          </button>
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
                  Listen {audioMap[currentCharacter?.id] && '(Custom)'}
                </>
              )}
            </button>

            {/* Audio Upload Button */}
            <label className="block mt-3">
              <div className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg cursor-pointer transition-colors text-sm">
                📁 {audioMap[currentCharacter?.id] ? 'Change Audio' : 'Upload Audio'}
              </div>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleAudioUpload(currentCharacter?.id, e)}
                className="hidden"
              />
            </label>
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

        {/* Data Management Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={exportData}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Download
          </button>
          <button
            onClick={() => setShowUpload(true)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <Upload size={18} />
            Upload
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-8">← Swipe or use buttons to navigate →</p>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Character Data</h2>
            
            <label className="block mb-6">
              <div className="border-2 border-dashed border-orange-500 rounded-lg p-8 text-center cursor-pointer hover:bg-orange-50 transition-colors">
                <Upload size={32} className="mx-auto text-orange-500 mb-2" />
                <p className="text-sm font-semibold text-gray-700">Click to upload JSON file</p>
                <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
              </div>
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Expected format:</strong>
              </p>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-32">
{`[
  {
    "id": 1,
    "name": "Name",
    "epic": "Epic",
    "description": "...",
    "image": "🏹",
    "audioUrl": null
  }
]`}
              </pre>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-sm text-gray-600 mb-2">
                <strong>💡 Tip:</strong>
              </p>
              <p className="text-xs text-gray-600">
                After uploading data, use the "Upload Audio" button on each character card to add custom audio files (MP3, WAV, etc.)
              </p>
            </div>

            <button
              onClick={() => setShowUpload(false)}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
