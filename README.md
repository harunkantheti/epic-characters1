# Epic Characters App

A beautiful React application to explore characters from the Mahabharata and Ramayana epics. Features include swipe navigation and audio narration for each character.

## Features

✨ **Interactive Character Display**
- Beautiful card-based UI with gradient backgrounds
- Swipe left/right to navigate through characters
- Character counter showing progress
- Emoji icons for visual representation

🎵 **Audio Support**
- Custom audio files for each character
- Automatic fallback to text-to-speech if audio file not found
- Adjustable speech rate and pitch for TTS
- Support for MP3, WAV, OGG, and M4A formats

💾 **Data Management**
- Automatic character updates from JSON file
- Characters managed through `src/characters.json`
- Automatic loading of new characters without cache clearing
- Persistent data across sessions

## Project Structure

```
epic-characters/
├── public/
│   ├── audio/           # Audio files for characters
│   └── index.html
├── src/
│   ├── index.js
│   ├── App.js
│   └── characters.json     # Character data configuration
├── package.json
├── .gitignore
└── README.md
```

## Installation

1. **Clone or download this project**

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

The app will open at `http://localhost:3000`

## Deployment

### Deploy with Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

Your app will be live in minutes!

### Deploy with Netlify

1. Push your code to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Select your GitHub repository
5. Netlify will auto-detect and deploy

## How to Use

### Viewing Characters
- Use arrow buttons to navigate between characters
- Swipe left/right on mobile to navigate
- Click **Listen** to play the character's audio narration

### Adding or Modifying Characters

All character data is managed in `src/characters.json`.

**To add a new character:**

1. Open `src/characters.json`
2. Add a new object to the array:
   ```json
   {
     "id": 6,
     "name": "Character Name",
     "epic": "Mahabharata",
     "description": "Detailed description of the character...",
     "image": "🔱",
     "audioUrl": "/audio/character-name.mp3"
   }
   ```
3. Add the audio file to `public/audio/character-name.mp3`
4. Commit and deploy your changes

**To add audio files:**

1. Place your audio file (MP3, WAV, OGG, or M4A) in `public/audio/`
2. Name it appropriately (e.g., `arjuna.mp3`, `krishna.mp3`)
3. Update the `audioUrl` field in `src/characters.json` to match: `/audio/filename.mp3`
4. If no audio file is provided or it fails to load, the app automatically falls back to text-to-speech

See `public/audio/README.md` for detailed audio file instructions.

## Sample Characters Included

- Arjuna (Mahabharata) 🏹
- Krishna (Mahabharata) 🎺
- Rama (Ramayana) ⚔️
- Hanuman (Ramayana) 🐵
- Pancha Pandava (Mahabharata) 👥

## Technologies Used

- **React** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Web Speech API** - Text-to-speech
- **localStorage** - Data persistence

## Browser Support

Works on all modern browsers that support:
- ES6+ JavaScript
- localStorage API
- Web Speech API (for audio)

## Customization

### Change App Title
Edit `public/index.html` and update the `<title>` tag

### Change Colors
Edit `src/App.js` and modify the Tailwind color classes (orange, slate, amber, etc.)

### Add or Modify Characters
Edit `src/charactersData.js` and modify the `defaultCharacters` array (see "Adding or Modifying Characters" section above)

### Change Speech Rate
Edit `src/App.js`, find the `utterance.rate` setting, and adjust the value (0.5 to 2.0)

## License

Free to use and modify

## Support

For issues or questions, feel free to ask!
