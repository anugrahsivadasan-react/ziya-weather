import { useState } from "react";
import axios from "axios";

interface LocationSearchProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onResult?: (data: any) => void; // to pass API data to parent if needed
}

const API_URL = import.meta.env.VITE_BACKEND_URL; // ex: https://ai-weather-backend.onrender.com

export default function LocationSearch({
  darkMode,
  setDarkMode,
  onResult,
}: LocationSearchProps) {
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(false);

  const searchLocation = async () => {
    if (!place.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/weather`, {
        place: place,
      });

      if (onResult) {
        onResult(res.data);
      }
      console.log("Weather API Response:", res.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Unable to fetch weather data. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchLocation();
    }
  };

  return (
    <div
      className="
        max-w-[1162px] mx-auto flex items-center justify-between pt-[38px]
        px-4 sm:px-6 lg:px-0
        flex-wrap gap-4 mb-10
      "
    >
      {/* Heading */}
      <h1 className="text-[#595958] dark:text-white text-xl sm:text-2xl font-semibold w-full sm:w-auto">
        AI Weather Prediction
      </h1>

      {/* Search Bar */}
      <div
        className="
          w-full sm:w-[461px] h-[47px] flex items-center gap-[10px]
          bg-white/10 backdrop-blur-md rounded-[20px]
          border border-white/20 px-[20px] py-[10px] shadow-md
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search location"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-[#595958] dark:text-white placeholder-white outline-none flex-1"
        />

        <button
          onClick={searchLocation}
          disabled={loading}
          className="text-[#595958] dark:text-white text-sm opacity-80 hover:opacity-100"
        >
          {loading ? "..." : "Go"}
        </button>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`
          relative w-[90px] h-[44px] rounded-full transition-all duration-300
          ${darkMode ? "bg-[#1e293b]" : "bg-[#9ad4f5]"}
          shadow-inner
        `}
      >
        {/* Sliding Circle */}
        <span
          className={`
            absolute top-[4px] w-[36px] h-[36px] rounded-full bg-white
            flex items-center justify-center transition-all duration-300 shadow-md
            ${darkMode ? "translate-x-[46px]" : "translate-x-[4px]"}
          `}
        >
          {darkMode ? "🌙" : "☀️"}
        </span>
      </button>

      {/* Location Display */}
      <div className="flex items-center gap-2 text-white font-medium w-full sm:w-auto sm:pt-0 pt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="yellow"
          viewBox="0 0 24 24"
          stroke="none"
          className="w-5 h-5"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        </svg>
        {place || "Aluva"}
      </div>
    </div>
  );
}
