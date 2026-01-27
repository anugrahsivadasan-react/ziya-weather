import CurrentWeatherCard from "../components/CurrentWeatherCard";
import HourlyTemperatureGraph from "../components/HourlyTemperatureGraph";
import WeatherDetailsPanel from "../components/WeatherDetailsPanel";
import WeekForcastStrip from "../components/WeekForcastStrip";
import cloud1 from "../assets/cloud1.png";
import cloud2 from "../assets/cloud1.png";
import cloud3 from "../assets/cloud1.png";

interface HomeViewProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomeView: React.FC<HomeViewProps> = ({ darkMode, setDarkMode }) => {
  return (
    <div
      className="relative w-full min-h-screen mx-auto p-6 space-y-6 overflow-hidden transition-colors
      bg-blue-300 text-black
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

  {/* Clouds */}
  <img
    src={cloud1}
    className="absolute top-16 left-10 w-48 opacity-70"
    alt="cloud"
  />
  <img
    src={cloud2}
    className="absolute top-32 left-1/3 w-36 opacity-60"
    alt="cloud"
  />
  <img
    src={cloud3}
    className="absolute top-20 right-20 w-44 opacity-65"
    alt="cloud"
  />
</div>

      {/* Animated Background Layer */}
    

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Top Section: Heading + Search + Theme + Location */}
        <div className="w-full flex items-center justify-between px-[128px] pt-[38px]">
          {/* Heading */}
          <h1 className="text-white text-2xl font-semibold w-[248px] h-[36px]">
            AI Weather Prediction
          </h1>

          {/* Search Bar */}
          <div className="w-[461px] h-[47px] flex items-center gap-[10px] bg-white/10 backdrop-blur-md rounded-[20px] border border-white/20 px-[20px] py-[10px] shadow-md">
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
              className="bg-transparent text-white placeholder-white outline-none flex-1"
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-full 
            bg-black/10 dark:bg-white/10 
            backdrop-blur-md border border-black/20 dark:border-white/20 
            flex items-center justify-center shadow-md"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Location Display */}
          <div className="flex items-center gap-2 text-white font-medium pt-[25px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="yellow"
              viewBox="0 0 24 24"
              stroke="none"
              className="w-5 h-5"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            Aluva
          </div>
        </div>

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
