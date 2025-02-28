import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await fetch(`/api/search?query=${searchQuery}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Explore the World</h1>
        <div className="flex items-center gap-2 mb-6">
          <Input
            placeholder="Search for a place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-300 p-3 rounded-lg text-gray-800"
          />
          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <Search size={20} />
          </Button>
        </div>
        {results && (
          <Card className="p-6 mb-6 bg-gray-50 shadow-md rounded-lg">
            <CardContent>
              <h2 className="text-3xl font-semibold text-gray-800">{results.name}</h2>
              <p className="text-gray-700 mt-2">{results.description}</p>
              <h3 className="mt-6 font-bold text-gray-800 text-xl">Best Places to Eat</h3>
              <ul className="list-disc ml-5 text-gray-700">
                {results.restaurants.map((rest, index) => (
                  <li key={index} className="mt-1">🍽 {rest}</li>
                ))}
              </ul>
              <h3 className="mt-6 font-bold text-gray-800 text-xl">Top Hotels (AI Recommended)</h3>
              <ul className="list-disc ml-5 text-gray-700">
                {results.hotels.map((hotel, index) => (
                  <li key={index} className="mt-1">🏨 {hotel}</li>
                ))}
              </ul>
              <h3 className="mt-6 font-bold text-gray-800 text-xl">Must-Try Cuisine</h3>
              <p className="text-gray-700">🍛 {results.cuisine}</p>
              <h3 className="mt-6 font-bold text-gray-800 text-xl">Historical Significance</h3>
              <p className="text-gray-700">📜 {results.history}</p>
            </CardContent>
          </Card>
        )}
        <Chatbot />
      </div>
    </div>
  );
}

// Chatbot.js (Enhanced with AI Integration)
import { useState } from "react";
import { Send } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      
      const botMessage = { role: "bot", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", content: "Error: Unable to fetch response." }]);
    }
    setLoading(false);
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md text-gray-800">
      <h2 className="text-2xl font-semibold mb-3">Travel Assistant Chatbot</h2>
      <div className="h-48 overflow-y-auto bg-white p-3 rounded-md border">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 rounded-md ${msg.role === "user" ? "bg-blue-100 text-blue-800" : "bg-gray-200 text-gray-800"}`}
          >
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </div>
        ))}
        {loading && <p className="text-gray-500">Typing...</p>}
      </div>
      <div className="flex mt-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded-lg"
          placeholder="Ask me about a place..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
