# Epic Characters App

A beautiful React application to explore characters from the Mahabharata and Ramayana epics. Features include swipe navigation, text-to-speech audio, and custom audio upload functionality.

## Features

✨ **Interactive Character Display**
- Beautiful card-based UI with gradient backgrounds
- Swipe left/right to navigate through characters
- Character counter showing progress
- Emoji icons for visual representation

🎵 **Audio Support**
- Built-in text-to-speech narration
- Upload custom audio files for each character
- Adjustable speech rate and pitch
- Fallback to text-to-speech when no custom audio

💾 **Data Management**
- Automatic saving to browser storage
- Characters managed through code in `src/charactersData.js`
- Persistent data across sessions

## Project Structure

```
epic-characters/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   ├── App.js
│   └── charactersData.js  # Character data configuration
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
- Click **Listen** to hear the character description (uses text-to-speech by default)
- Click **Upload Audio** to add a custom audio file for the current character

### Adding or Modifying Characters
All character data is managed through code in the `src/charactersData.js` file.

To add a new character:
1. Open `src/charactersData.js`
2. Add a new object to the `defaultCharacters` array:
   ```javascript
   {
     id: 5,  // Use a unique ID
     name: 'Character Name',
     epic: 'Mahabharata', // or 'Ramayana'
     description: 'Detailed description of the character...',
     image: '🔱',  // An emoji icon
     audioUrl: null
   }
   ```
3. Save the file
4. Restart the development server to see changes

To edit or remove a character:
1. Open `src/charactersData.js`
2. Modify or remove the character object from the array
3. Save and restart the development server

## Sample Characters Included

- Arjuna (Mahabharata)
- Krishna (Mahabharata & Ramayana)
- Rama (Ramayana)
- Hanuman (Ramayana)

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
