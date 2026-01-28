import CurrentWeatherCard from "../components/CurrentWeatherCard";
import HourlyTemperatureGraph from "../components/HourlyTemperatureGraph";
import WeatherDetailsPanel from "../components/WeatherDetailsPanel";
import WeekForcastStrip from "../components/WeekForcastStrip";
import LocationSearch from "../components/LocationSearchBar";
import { useState } from "react";

import cloud1 from "../assets/cloud1.png";
import cloud2 from "../assets/cloud1.png";
import cloud3 from "../assets/cloud1.png";
import day1 from "../assets/day1.png";
import day2 from "../assets/day2.png";
import day3 from "../assets/day3.png";

interface HomeViewProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomeView: React.FC<HomeViewProps> = ({ darkMode, setDarkMode }) => {
  const [weather, setWeather] = useState<any>(null);

  return (
    <div
      className="relative w-full min-h-screen mx-auto p-6 space-y-6 overflow-hidden transition-colors
      bg-[#8AC8F1] text-black
      dark:bg-[#171717] dark:text-white"
    >
      {/* Background with Clouds (always visible) */}
      <div
        className={`absolute inset-0 transition-transform duration-1000 ease-in-out
        ${darkMode ? "-translate-x-1/2" : "translate-x-1/2"}`}
      >
        {/* Sky Layer */}
        <div
          className={`absolute inset-0 transition-colors duration-1000
          ${darkMode ? "bg-[#171717]" : "bg-blue-300"}`}
        />

        {/* Clouds (Day) */}
        <img
          src={day1}
          className="absolute top-16 left-10 w-32 opacity-70"
          alt="cloud"
        />
        <img
          src={day2}
          className="absolute top-32 left-1/3 w-25 opacity-60"
          alt="cloud"
        />
        <img
          src={day3}
          className="absolute top-[150px] left-[-300px] w-44 opacity-65"
          alt="cloud"
        />

        {/* Clouds (Dark) */}
        <img
          src={cloud1}
          className="absolute top-16 right-10 w-32 opacity-70"
          alt="cloud"
        />
        <img
          src={cloud2}
          className="absolute top-32 right-1/3 w-25 opacity-60"
          alt="cloud"
        />
        <img
          src={cloud3}
          className="absolute top-[150px] right-[-300px] w-44 opacity-65"
          alt="cloud"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Top Section: Heading + Search + Theme + Location */}
        <LocationSearch
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onResult={setWeather}
        />

        <section className="flex w-full max-w-[1182px] mx-auto">
          <WeekForcastStrip />
          <CurrentWeatherCard label="Today" temperature="22°C" />
        </section>

        <section>
          <HourlyTemperatureGraph />
        </section>

        <section>
          <WeatherDetailsPanel />
        </section>
      </div>
    </div>
  );
};

export default HomeView;
