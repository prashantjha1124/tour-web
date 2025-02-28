const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(bodyParser.json()); // Parse JSON request bodies

// Detailed data for Indian cities
const citiesData = {
  delhi: {
    name: "Delhi, India",
    description: "The capital of India, known for its rich history, vibrant culture, and bustling markets.",
    history: "Delhi has been a prominent city for centuries, serving as the capital of several empires, including the Mughals and the British. It is home to iconic landmarks like the Red Fort, Qutub Minar, and India Gate.",
    culture: "Delhi is a melting pot of cultures, with festivals like Diwali, Holi, and Eid celebrated with great enthusiasm.",
    cuisine: "North Indian cuisine, especially butter chicken, kebabs, and parathas.",
    restaurants: ["Indian Accent", "Bukhara", "Karim's"],
    hotels: ["The Imperial Palace", "Luxury Haven Delhi", "Royal Retreat Delhi"],
    mustVisit: ["Red Fort", "Qutub Minar", "India Gate", "Lotus Temple"],
  },
  mumbai: {
    name: "Mumbai, India",
    description: "The financial capital of India, known for its Bollywood industry, bustling streets, and coastal beauty.",
    history: "Mumbai, formerly known as Bombay, was a major trading port during the British era. It is now a melting pot of cultures and home to landmarks like the Gateway of India and Marine Drive.",
    culture: "Mumbai is the heart of Bollywood and a hub for arts, music, and theater.",
    cuisine: "Street food like vada pav, pav bhaji, and seafood.",
    restaurants: ["Trishna", "Bombay Canteen", "Leopold Cafe"],
    hotels: ["Taj Mahal Palace", "Ocean View Mumbai", "Starlight Suites Mumbai"],
    mustVisit: ["Gateway of India", "Marine Drive", "Elephanta Caves", "Juhu Beach"],
  },
  jaipur: {
    name: "Jaipur, India",
    description: "The Pink City, known for its majestic forts, palaces, and vibrant culture.",
    history: "Jaipur was founded in 1727 by Maharaja Sawai Jai Singh II. It is part of the Golden Triangle and is famous for its stunning architecture, including the Hawa Mahal and Amber Fort.",
    culture: "Jaipur is known for its traditional arts, crafts, and festivals like Teej and Gangaur.",
    cuisine: "Rajasthani cuisine, including dal baati churma and gatte ki sabzi.",
    restaurants: ["Chokhi Dhani", "1135 AD", "Laxmi Misthan Bhandar"],
    hotels: ["Rambagh Palace", "Golden Oasis Jaipur", "Royal Heritage Jaipur"],
    mustVisit: ["Hawa Mahal", "Amber Fort", "City Palace", "Jantar Mantar"],
  },
  bangalore: {
    name: "Bangalore, India",
    description: "The Silicon Valley of India, known for its tech industry, pleasant weather, and vibrant nightlife.",
    history: "Bangalore, now officially Bengaluru, has a history dating back to the 16th century. It became a major tech hub in the late 20th century and is known for its gardens and parks.",
    culture: "Bangalore is a cosmopolitan city with a mix of traditional and modern cultures.",
    cuisine: "South Indian cuisine, especially dosas, idlis, and filter coffee.",
    restaurants: ["Vidyarthi Bhavan", "Karavalli", "Toit Brewpub"],
    hotels: ["The Oberoi Bangalore", "Tech Oasis Bangalore", "Garden Retreat Bangalore"],
    mustVisit: ["Lalbagh Botanical Garden", "Cubbon Park", "Bangalore Palace", "ISKCON Temple"],
  },
  kolkata: {
    name: "Kolkata, India",
    description: "The cultural capital of India, known for its literature, art, and colonial architecture.",
    history: "Kolkata, formerly Calcutta, was the capital of British India until 1911. It is home to landmarks like the Victoria Memorial, Howrah Bridge, and Durga Puja celebrations.",
    culture: "Kolkata is known for its literary festivals, theater, and classical music.",
    cuisine: "Bengali cuisine, including macher jhol, roshogolla, and mishti doi.",
    restaurants: ["Peter Cat", "Kewpie's", "Oh! Calcutta"],
    hotels: ["The Grand Kolkata", "Heritage Haven Kolkata", "Royal Chambers Kolkata"],
    mustVisit: ["Victoria Memorial", "Howrah Bridge", "Dakshineswar Kali Temple", "Indian Museum"],
  },
};

// Search endpoint
app.get("/api/search", (req, res) => {
  const query = req.query.query?.toLowerCase(); // Get the search query
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  // Find matching data
  const result = citiesData[query];
  if (!result) {
    return res.status(404).json({ error: "No results found for this city." });
  }

  res.json(result); // Send the result
});

// Chatbot endpoint
app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Simulate an AI response
  const reply = `Thank you for your question about "${message}". For more details, please visit our website or contact support.`;
  res.json({ reply });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
