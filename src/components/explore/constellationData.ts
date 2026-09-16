export type ConstellationStar = {
  id: string;
  x: number;
  y: number;
  size: number;
  title: string;
  description: string;
};

export type ConstellationConnection = {
  from: string;
  to: string;
};

export type Constellation = {
  id: string;
  name: string;
  stars: ConstellationStar[];
  connections: ConstellationConnection[];
};

export const constellations: Constellation[] = [
  {
    id: "constellation-1",
    name: "Pain",
    stars: [
      { id: "1-1", x: 16.872, y: 21.7, size: 32, title: "Thoughts Get Lost", description: "An important idea appears and then disappears if you don't save it right away." },
      { id: "1-2", x: 23.338, y: 29.3, size: 24, title: "Notes Turn Into Chaos", description: "Over time, notes pile up, mix together, and become increasingly difficult to understand." },
      { id: "1-3", x: 23.216, y: 39.9, size: 26, title: "You Don't Know Where to Save a New Thought", description: "Every time, you have to decide which folder, note, or category it belongs in." },
      { id: "1-4", x: 14.92, y: 39.4, size: 34, title: "Context Gets Lost Over Time", description: "You return to an old note and no longer remember why it mattered, what it was connected to, or where it started." },
      { id: "1-5", x: 20.166, y: 50.8, size: 32, title: "Old Ideas Are Hard to Continue", description: "A thought remains an isolated note, and after some time it becomes difficult to continue developing it." },
      { id: "1-6", x: 30.292, y: 43.9, size: 28, title: "Connections Between Thoughts Stay Invisible", description: "Similar and complementary ideas may be stored separately, making their connection easy to miss." },
      { id: "1-7", x: 33.83, y: 55.7, size: 36, title: "No Complete Picture of Your Thinking", description: "Separate notes exist on their own, making it difficult to see which themes, ideas, and directions form a single system." },
      { id: "1-8", x: 38.1, y: 42.6, size: 28, title: "Endless Stream of Thoughts", description: "Today you write down an idea, tomorrow you forget it, and a week later you return to the same thought as if starting from scratch." },
    ],
    connections: [
      { from: "1-1", to: "1-2" },
      { from: "1-2", to: "1-3" },
      { from: "1-3", to: "1-4" },
      { from: "1-4", to: "1-5" },
      { from: "1-5", to: "1-6" },
      { from: "1-6", to: "1-7" },
      { from: "1-7", to: "1-8" },
    ],
  },
  {
    id: "constellation-2",
    name: "Benefits",
    stars: [
      { id: "2-1", x: 85.9, y: 18.6, size: 36, title: "Clarity", description: "Your thoughts stop feeling like chaos." },
      { id: "2-2", x: 79.1, y: 31, size: 30, title: "No Lost Thoughts", description: "You stop forgetting important ideas." },
      { id: "2-3", x: 90.2, y: 38.9, size: 34, title: "Complete Picture", description: "You see the entire system of your ideas instead of isolated notes." },
      { id: "2-4", x: 83.5, y: 51, size: 24, title: "New Connections", description: "You notice connections between thoughts that you couldn't see before." },
      { id: "2-5", x: 80.6, y: 40.7, size: 34, title: "Ideas Keep Growing", description: "Good thoughts don't die after being written down — they continue to develop." },
      { id: "2-6", x: 76.9, y: 49.4, size: 28, title: "Preserved Context", description: "You return to an idea and understand what you were thinking at the time." },
      { id: "2-7", x: 70, y: 41.4, size: 32, title: "Less Mental Load", description: "You don't have to constantly keep everything in your head." },
      { id: "2-8", x: 63.8, y: 50.9, size: 28, title: "Better Understanding of Yourself", description: "Over time, you can see which themes and ideas matter most to you." },
    ],
    connections: [
      { from: "2-1", to: "2-2" },
      { from: "2-2", to: "2-3" },
      { from: "2-3", to: "2-4" },
      { from: "2-4", to: "2-5" },
      { from: "2-5", to: "2-6" },
      { from: "2-6", to: "2-7" },
      { from: "2-7", to: "2-8" },
    ],
  },
  {
    id: "constellation-3",
    name: "Special Features",
    stars: [
      { id: "3-1", x: 46.9, y: 74.6, size: 34, title: "Voice to Thought", description: "The service turns your speech into a written thought and saves it to your universe." },
      { id: "3-2", x: 43.9, y: 84.3, size: 28, title: "3D Universe of Thoughts", description: "Your thoughts exist not as a list, but as planets, constellations, and stars." },
      { id: "3-3", x: 56.7, y: 82.4, size: 32, title: "Smart Placement", description: "AI determines which topic or constellation a new thought belongs to and can place it in the appropriate location." },
      { id: "3-4", x: 64, y: 94.6, size: 28, title: "Thought Chain", description: "See how your thoughts appeared one after another and developed over time." },
      { id: "3-5", x: 53.7, y: 92.9, size: 30, title: "Your Own Universe", description: "Create your thought space the way you see it. Move stars, group them into constellations, and build your own universe." },
      { id: "3-6", x: 48.2, y: 99.8, size: 32, title: "Instant Saving", description: "Simply open the service, say or write your thought, and continue with your day. ThoughtUniverse saves it and determines the right place for it in your universe." },
    ],
    connections: [
      { from: "3-1", to: "3-2" },
      { from: "3-2", to: "3-3" },
      { from: "3-3", to: "3-4" },
      { from: "3-4", to: "3-5" },
      { from: "3-5", to: "3-6" },
    ],
  },
  {
    id: "constellation-4",
    name: "Why It’s Not Just Notes",
    stars: [
      { id: "4-1", x: 26.19, y: 67, size: 32, title: "The Whole Picture in Front of You", description: "See your thoughts visually: where they are located, which themes they form, and how they are connected." },
      { id: "4-2", x: 35.95, y: 69.5, size: 28, title: "Not a List, but a Living Universe", description: "Your thoughts don't exist in an endless list of notes. They have their own place among planets, constellations, and stars." },
      { id: "4-3", x: 16.308, y: 71.8, size: 30, title: "Every Thought Has Its Place", description: "An idea becomes part of a larger system instead of becoming just another isolated note." },
      { id: "4-4", x: 22.896, y: 79.7, size: 26, title: "Connections You Can See", description: "Related thoughts appear near each other and connect visually, making relationships between ideas easier to notice." },
      { id: "4-5", x: 32.656, y: 77.7, size: 32, title: "The Structure Grows With You", description: "You don't need to design the perfect system of folders and categories in advance. The structure develops as new thoughts appear." },
      { id: "4-6", x: 39, y: 92.9, size: 28, title: "See How Ideas Are Born", description: "Follow where a thought started, what came after it, and what it gradually developed into." },
      { id: "4-7", x: 29.362, y: 87.8, size: 30, title: "Thoughts Don't Become an Archive", description: "You can return to old ideas, continue developing them, and connect them with new ones." },
      { id: "4-8", x: 18.138, y: 93.5, size: 28, title: "Less Manual Sorting", description: "AI helps determine the right place for a new thought instead of making you choose a folder or category every time." },
    ],
    connections: [
      { from: "4-1", to: "4-2" },
      { from: "4-1", to: "4-3" },
      { from: "4-3", to: "4-4" },
      { from: "4-4", to: "4-5" },
      { from: "4-5", to: "4-6" },
      { from: "4-6", to: "4-7" },
      { from: "4-7", to: "4-8" },
    ],
  },
  {
    id: "constellation-5",
    name: "How It Works",
    stars: [
      { id: "5-1", x: 64, y: 68.9, size: 28, title: "Write a Thought", description: "Type it or simply say it out loud." },
      { id: "5-2", x: 74, y: 64.3, size: 32, title: "Get a Suggestion", description: "AI suggests a suitable planet or constellation for your new thought." },
      { id: "5-3", x: 69, y: 81.3, size: 28, title: "Place It in Your Universe", description: "Confirm the suggested location or choose another one manually." },
      { id: "5-4", x: 74.8, y: 90, size: 32, title: "Your Thought Becomes a Star", description: "The saved idea appears in your universe as its own star." },
      { id: "5-5", x: 79.2, y: 77.4, size: 34, title: "Connect and Structure", description: "Connect related thoughts, create constellations, and build a structure that works for you." },
      { id: "5-6", x: 89.7, y: 72.1, size: 30, title: "Return and Continue", description: "Open old thoughts, restore their context, and continue developing your ideas." },
      { id: "5-7", x: 93.1, y: 89.2, size: 32, title: "Your Universe Grows With You", description: "The more thoughts you save, the more complete the picture of your ideas becomes." },
    ],
    connections: [
      { from: "5-1", to: "5-2" },
      { from: "5-2", to: "5-3" },
      { from: "5-3", to: "5-4" },
      { from: "5-4", to: "5-5" },
      { from: "5-5", to: "5-6" },
      { from: "5-6", to: "5-7" },
    ],
  },
];