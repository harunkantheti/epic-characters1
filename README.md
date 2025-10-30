# Epic Characters App

A beautiful React application to explore and manage characters from the Mahabharata and Ramayana epics. Features include swipe navigation, text-to-speech audio, and an admin panel for managing character data.

## Features

✨ **Interactive Character Display**
- Beautiful card-based UI with gradient backgrounds
- Swipe left/right to navigate through characters
- Character counter showing progress
- Emoji icons for visual representation

🎵 **Audio Support**
- Built-in text-to-speech narration
- Read character descriptions aloud
- Adjustable speech rate and pitch

⚙️ **Admin Panel**
- Add new characters with name, epic, description, and emoji
- Edit existing characters
- Delete characters
- Live character list in admin view

💾 **Data Management**
- Automatic saving to browser storage
- Download character data as JSON
- Import character data from JSON files
- Persistent data across sessions

## Project Structure

```
epic-characters/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   └── App.js
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

### Main View
- Click the **Settings ⚙️** button in the top right to open the admin panel
- Use arrow buttons to navigate between characters
- Swipe left/right on mobile to navigate
- Click **Listen** to hear the character description

### Admin Panel
1. **Add Character:**
   - Fill in Name, Epic, Emoji Icon, and Description
   - Click "Add Character"

2. **Edit Character:**
   - Click the blue edit icon next to a character
   - Modify the fields
   - Click "Update"

3. **Delete Character:**
   - Click the red delete icon next to a character

4. **Backup/Restore:**
   - Click "Download Data" to save as JSON
   - Click "Upload Data" to restore from JSON

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

### Add Default Characters
Edit `src/App.js` and add to the `defaultCharacters` array

### Change Speech Rate
Edit `src/App.js`, line ~175, adjust `utterance.rate` value (0.5 to 2.0)

## License

Free to use and modify

## Support

For issues or questions, feel free to ask!
