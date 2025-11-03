# Audio Files for Epic Characters

This folder contains audio files for each character in the Epic Characters app.

## Required Audio Files

Place your audio files in this directory with the following names:

- `arjuna.mp3` - Audio for Arjuna character
- `krishna.mp3` - Audio for Krishna character
- `rama.mp3` - Audio for Rama character
- `hanuman.mp3` - Audio for Hanuman character
- `pancha-pandava.mp3` - Audio for Pancha Pandava character

## Supported Formats

The app supports common audio formats:
- MP3 (recommended)
- WAV
- OGG
- M4A

## How It Works

1. When you click the "Listen" button, the app first tries to load the audio file
2. If the audio file is found, it plays the audio
3. If the audio file is not found or fails to load, it automatically falls back to text-to-speech

## Adding New Characters

When you add a new character to `src/characters.json`:

1. Add the character with an `audioUrl` field:
   ```json
   {
     "id": 6,
     "name": "New Character",
     "epic": "Mahabharata",
     "description": "Description here...",
     "image": "🔱",
     "audioUrl": "/audio/new-character.mp3"
   }
   ```

2. Place the audio file `new-character.mp3` in this directory

3. Deploy your changes

## Tips

- Keep audio files under 5MB for faster loading
- Use clear, quality recordings
- Name files with lowercase and hyphens (e.g., `rama.mp3`, not `Rama.MP3`)
- Test audio files work before deploying
