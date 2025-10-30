import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Settings, Trash2, Edit2, X } from 'lucide-react';

const App = () => {
  // Default sample data
  const defaultCharacters = [
    {
      id: 1,
      name: 'Arjuna',
      epic: 'Mahabharata',
      description: 'The third Pandava prince, Arjuna is a master archer and central figure in the Bhagavad Gita. Known for his skill in combat and his moral dilemmas on the battlefield of Kurukshetra.',
      image: '🏹'
    },
    {
      id: 2,
      name: 'Krishna',
      epic: 'Mahabharata & Ramayana',
      description: 'The supreme deity incarnated as a charioteer and strategist, Krishna plays crucial roles in both epics. His wisdom and divine love are celebrated across Hindu philosophy.',
      image: '🎺'
    },
    {
      id: 3,
      name: 'Rama',
      epic: 'Ramayana',
      description: 'The seventh avatar of Vishnu and the ideal man, Rama is the protagonist of the Ramayana. He is celebrated for his virtue, courage, and unwavering devotion to dharma.',
      image: '⚔️'
    },
    {
      id: 4,
      name: 'Hanuman',
      epic: 'Ramayana',
      description: 'The devoted follower of Rama, Hanuman is a monkey warrior of immense strength and loyalty. He symbolizes courage, wisdom, and perfect devotion to duty.',
      image: '🐵'
    }
  ];

  const [characters, setCharacters] = useState(() => {
    const saved = localStorage.getItem('epicCharacters');
    return saved ? JSON.parse(saved) : defaultCharacters;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [epic, setEpic] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const synthRef = useRef(null);

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

  const handleAddCharacter = () => {
    if (!name.trim() || !epic.trim() || !description.trim() || !image.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const newCharacter = {
      id: Date.now(),
      name: name.trim(),
      epic: epic.trim(),
      description: description.trim(),
      image: image.trim()
    };

    setCharacters([...characters, newCharacter]);
    alert('Character added successfully!');
    setName('');
    setEpic('');
    setDescription('');
    setImage('');
  };

  const handleEditCharacter = (character) => {
    setEditingId(character.id);
    setName(character.name);
    setEpic(character.epic);
    setDescription(character.description);
    setImage(character.image);
  };

  const handleUpdateCharacter = () => {
    if (!name.trim() || !epic.trim() || !description.trim() || !image.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setCharacters(
      characters.map(c =>
        c.id === editingId
          ? {
              id: c.id,
              name: name.trim(),
              epic: epic.trim(),
              description: description.trim(),
              image: image.trim()
            }
          : c
      )
    );
    alert('Character updated!');
    setEditingId(null);
    setName('');
    setEpic('');
    setDescription('');
    setImage('');
  };

  const handleDeleteCharacter = (id) => {
    setCharacters(characters.filter(c => c.id !== id));
    if (currentIndex >= characters.length - 1) {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName('');
    setEpic('');
    setDescription('');
    setImage('');
  };

  const goNext = () => {
    if (characters.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % characters.length);
    }
  };

  const goPrev = () => {
    if (characters.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length);
    }
  };

  const speakCharacter = () => {
    if (!currentCharacter) return;

    if (isPlaying) {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      setIsPlaying(false);
      return;
    }

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
            setCharacters(imported);
            alert('Data imported successfully!');
          }
        } catch (err) {
          alert('Error importing file: ' + err.message);
        }
      };
      reader.readAsText(file);
    }
  };

  // ADMIN VIEW (only available in development)
  if (showAdmin && process.env.NODE_ENV === 'development') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
            <button
              onClick={() => setShowAdmin(false)}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingId ? 'Edit Character' : 'Add New Character'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-orange-500 outline-none"
                    placeholder="Character name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Epic</label>
                  <input
                    type="text"
                    value={epic}
                    onChange={(e) => setEpic(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-orange-500 outline-none"
                    placeholder="e.g., Mahabharata"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Emoji Icon</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-orange-500 outline-none"
                    placeholder="🏹"
                    maxLength="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-orange-500 outline-none h-32 resize-none"
                    placeholder="Character description"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  {editingId ? (
                    <>
                      <button
                        onClick={handleUpdateCharacter}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleAddCharacter}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      Add Character
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Characters List */}
            <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Characters ({characters.length})</h2>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {characters.length === 0 ? (
                  <p className="text-gray-400">No characters yet. Add one to get started!</p>
                ) : (
                  characters.map((character) => (
                    <div key={character.id} className="bg-slate-700 p-4 rounded flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{character.image}</span>
                          <div>
                            <p className="font-bold text-white">{character.name}</p>
                            <p className="text-xs text-gray-400">{character.epic}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditCharacter(character)}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCharacter(character.id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-600">
                <p className="text-sm font-semibold text-gray-300 mb-3">Data Management</p>
                <div className="flex gap-2">
                  <button
                    onClick={exportData}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded text-sm"
                  >
                    Download Data
                  </button>
                  <label className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-3 rounded text-sm cursor-pointer text-center">
                    Upload Data
                    <input type="file" accept=".json" onChange={importData} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MAIN VIEW
  if (characters.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-orange-900 mb-4">Epic Characters</h1>
          <p className="text-orange-700 mb-8">Explore the heroes and villains of ancient epics</p>
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={() => setShowAdmin(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2 mx-auto"
            >
              <Settings size={20} />
              Open Admin Panel
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-orange-900">Epic Characters</h1>
            <p className="text-orange-700">Discover the heroes and villains</p>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={() => setShowAdmin(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg"
            >
              <Settings size={24} />
            </button>
          )}
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

        <div className="flex gap-4 justify-center mb-6">
          <button onClick={goPrev} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 transition-all shadow-lg">
            <ChevronLeft size={24} />
          </button>
          <button onClick={goNext} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 transition-all shadow-lg">
            <ChevronRight size={24} />
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">← Swipe or use buttons to navigate →</p>
      </div>
    </div>
  );
};

export default App;
