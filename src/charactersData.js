/**
 * Epic Characters Data
 *
 * This file contains the default character data for the Epic Characters application.
 * To add or modify characters, edit this file directly in the codebase.
 *
 * Character Schema:
 * {
 *   id: number (unique identifier),
 *   name: string (character name),
 *   epic: string (which epic they appear in),
 *   description: string (character description),
 *   image: string (emoji or icon),
 *   audioUrl: null (reserved for future audio functionality)
 * }
 */

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
    epic: 'Mahabharata',
    description: 'The supreme deity incarnated as a charioteer and strategist, Krishna plays crucial role. His wisdom and divine love are celebrated across Hindu philosophy.',
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
  },
  {
    "id": 5,
    "name": "Pancha Pandava",
    "epic": "Mahabharata",
    "description": "The Pandavas refer to the five legendary brothers, Yudhishtira, Bhima, Arjuna, Nakula, and Sahadeva, who are central figures of the ancient Hindu epic Mahabharata. They are acknowledged as the sons of Pandu, the King of Kuru.",
    "image": '🐵',
    "audioUrl": null
  }
];

export default defaultCharacters;
