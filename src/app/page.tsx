"use client";

import { useState, useEffect } from "react";

interface JokeResponse {
  id: string;
  joke: string;
  status: number;
}

export default function Home() {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [currentJoke, setCurrentJoke] = useState("Loading a fresh joke...");
  const [isLoading, setIsLoading] = useState(false);

  const fetchJoke = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          "Accept": "application/json"
        }
      });
      const data = await response.json() as JokeResponse;
      console.log('data: ', data);
      if (data.joke) {
        setCurrentJoke(data.joke);
      }
    } catch (error) {
      console.error("Error fetching joke:", error);
      setCurrentJoke("Oops! Couldn't fetch a joke right now. Try again! 😅");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial joke when component mounts
  useEffect(() => {
    fetchJoke();
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-12">
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
                <span>Loading fresh joke...</span>
              </div>
            ) : (
              currentJoke
            )}
          </div>
        </div>

        {/* Star Rating */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-200">
            How funny was this joke?
          </h3>
          <div 
            className="flex justify-center space-x-2"
            onMouseLeave={handleMouseLeave}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
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
            <p className="text-sm text-gray-300 mt-2">
              Thanks for rating! You gave this joke {rating} star{rating !== 1 ? 's' : ''}! ⭐
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <button
            onClick={() => {
              fetchJoke();
              setRating(0); // Reset rating for new joke
            }}
            disabled={isLoading}
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
          
          <a
            href="/app/auth/signin"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl border border-green-500 hover:border-green-400"
          >
            Sign In to Dashboard 🔐
          </a>
        </div>
      </div>
    </div>
  );
}
