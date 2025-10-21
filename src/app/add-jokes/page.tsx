"use client";

import { useState, useEffect } from "react";

interface Joke {
  id: number;
  joke: string;
  submitter: string;
  rating: number;
  date: string;
}

export default function AddJokesPage() {
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hasJokes, setHasJokes] = useState(true);

  const fetchRandomJoke = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/app/api/jokes");
      if (response.ok) {
        const jokes = await response.json() as Joke[];
        if (jokes.length > 0) {
          // Get a random joke from the database
          const randomIndex = Math.floor(Math.random() * jokes.length);
          setCurrentJoke(jokes[randomIndex]);
          setHasJokes(true);
        } else {
          setCurrentJoke(null);
          setHasJokes(false);
        }
      }
    } catch (error) {
      console.error("Error fetching jokes:", error);
      setCurrentJoke(null);
      setHasJokes(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomJoke();
  }, []);

  const handleAddJoke = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleJokeAdded = () => {
    fetchRandomJoke(); // Refresh with a new random joke
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-8">
        ☁️ Cloud Jokes ☁️
        </h1>


        {/* Joke Display */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="text-xl text-gray-100 leading-relaxed font-medium min-h-[3rem] flex items-center justify-center">
            {isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
                <span>Loading joke...</span>
              </div>
            ) : !hasJokes ? (
              <div className="text-center">
                <div className="text-2xl mb-4">🎭</div>
                <div>No jokes in the database yet.</div>
                <div className="text-lg mt-2">Add your first joke!</div>
              </div>
            ) : currentJoke ? (
              <div className="w-full">
                <div className="mb-6">{currentJoke.joke}</div>
                <div className="flex justify-between items-center text-sm text-gray-400 border-t border-slate-600 pt-4">
                  <span>By: {currentJoke.submitter}</span>
                  <div className="flex items-center space-x-1">
                    <span>Rating:</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= currentJoke.rating ? "text-yellow-400" : "text-gray-600"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  Added: {new Date(currentJoke.date).toLocaleDateString()}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <button
            onClick={fetchRandomJoke}
            disabled={isLoading || !hasJokes}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl border border-blue-500 hover:border-blue-400 disabled:border-blue-700"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Getting Joke...</span>
              </div>
            ) : (
              "Get Another Joke! 🎲"
            )}
          </button>
          
          <button
            onClick={handleAddJoke}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl border border-green-500 hover:border-green-400"
          >
            Add New Joke ➕
          </button>
          
          <a
            href="/app"
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl border border-gray-500 hover:border-gray-400"
          >
            ← Back to Home
          </a>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <AddJokePopup
          onClose={handleClosePopup}
          onJokeAdded={handleJokeAdded}
        />
      )}
    </div>
  );
}

// Popup Component
interface AddJokePopupProps {
  onClose: () => void;
  onJokeAdded: () => void;
}

function AddJokePopup({ onClose, onJokeAdded }: AddJokePopupProps) {
  const [name, setName] = useState("");
  const [joke, setJoke] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !joke.trim() || rating === 0) {
      alert("Please fill in all fields and provide a rating!");
      return;
    }

    setIsSubmitting(true);
    try {
        const response = await fetch("/app/api/jokes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          joke: joke.trim(),
          submitter: name.trim(),
          rating,
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        onJokeAdded();
      } else {
        throw new Error("Failed to add joke");
      }
    } catch (error) {
      console.error("Error adding joke:", error);
      alert("Failed to add joke. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarClick = (starNumber: number) => {
    setRating(starNumber);
  };

  const handleStarHover = (starNumber: number) => {
    setHoveredStar(starNumber);
  };

  const handleMouseLeave = () => {
    setHoveredStar(0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Add New Joke</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="joke" className="block text-sm font-medium text-gray-300 mb-2">
              Your Joke
            </label>
            <textarea
              id="joke"
              value={joke}
              onChange={(e) => setJoke(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter your joke here..."
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rate Your Joke
            </label>
            <div 
              className="flex justify-center space-x-2"
              onMouseLeave={handleMouseLeave}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  className="transition-all duration-200 hover:scale-110 focus:outline-none"
                >
                  <svg
                    className={`w-8 h-8 ${
                      star <= (hoveredStar || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    } transition-colors duration-200`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-300 mt-2 text-center">
                You rated this joke {rating} star{rating !== 1 ? 's' : ''}! ⭐
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !joke.trim() || rating === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Adding...</span>
                </div>
              ) : (
                "Add Joke"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
