import React, { useEffect, useState } from "react";
import { getWeatherData } from "../api/weatherapi";

// 👉 Import your Figma icons
import feelsLikeIcon from "../assets/feelsLikeIcon.svg";
import humidityIcon from "../assets/humidityIcon.svg";
import windIcon from "../assets/windIcon.svg";
import cloudIcon from "../assets/cloudIcon.svg";
import rainIcon from "../assets/rainIcon.svg";

interface LiveWeather {
  temperature: number;
  humidity: number;
  precipitation: number;
  cloud_cover: number;
  wind_speed: number;
  feels_like: number;
}

interface WeatherDetailsPanelProps {
  place?: string; // coming from search bar (LocationSearch)
}

const WeatherDetailsPanel: React.FC<WeatherDetailsPanelProps> = ({ place }) => {
  const [liveWeather, setLiveWeather] = useState<LiveWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPlace, setCurrentPlace] = useState<string>("");

  // Load last searched location on first load
  useEffect(() => {
    const savedPlace = localStorage.getItem("lastPlace") || "Aluva";
    setCurrentPlace(savedPlace);
    fetchWeather(savedPlace);
  }, []);

  // Whenever search bar place changes → update weather
  useEffect(() => {
    if (place && place.trim()) {
      setCurrentPlace(place);
      localStorage.setItem("lastPlace", place); // save as default
      fetchWeather(place);
    }
  }, [place]);

  const fetchWeather = async (location: string) => {
    try {
      setLoading(true);
      const data = await getWeatherData(location);
      setLiveWeather(data.live_weather);
      console.log("Live Weather:", data.live_weather);
    } catch (error) {
      console.error("Error fetching live weather:", error);
    } finally {
      setLoading(false);
    }
  };

  const details = [
    {
      label: "Feels like",
      value: liveWeather ? `${liveWeather.feels_like.toFixed(1)}°C` : "--",
      icon: feelsLikeIcon,
    },
    {
      label: "Humidity",
      value: liveWeather ? `${liveWeather.humidity.toFixed(0)}%` : "--",
      icon: humidityIcon,
    },
    {
      label: "Wind",
      value: liveWeather ? `${liveWeather.wind_speed.toFixed(1)} km/h` : "--",
      icon: windIcon,
    },
    {
      label: "Cloud cover",
      value: liveWeather ? `${liveWeather.cloud_cover.toFixed(0)}%` : "--",
      icon: cloudIcon,
    },
    {
      label: "Rain",
      value: liveWeather
        ? liveWeather.precipitation > 0
          ? "Yes"
          : "No"
        : "--",
      icon: rainIcon,
    },
  ];

  return (
    <div className="w-full max-w-[1182px] mx-auto mt-10 px-2">
      {/* Location Title */}
      <p className="text-white text-lg font-semibold mb-4">
        Weather Details for: <span className="text-yellow-400">{currentPlace}</span>
      </p>

      {loading && (
        <p className="text-center text-black dark:text-white mb-4">
          Loading weather details...
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {details.map((item, i) => (
         <div
  key={i}
  className="
    relative h-[130px] rounded-[20px] p-5
    flex flex-col justify-between
    bg-transparent overflow-hidden isolate
    shadow-[0_18px_35px_rgba(0,0,0,0.35)]
  "
>
  {/* Glass fill (prevents bg leak) */}
  <div className="absolute inset-0 rounded-[20px] bg-white/10 backdrop-blur-2xl" />

  {/* Broken corner border */}
  <div className="absolute inset-0 rounded-[20px] pointer-events-none">
    <div
      className="
        absolute inset-0 rounded-[20px] border border-white/70
        [mask-image:
          radial-gradient(circle at top left, transparent 0%, black 60%),
          radial-gradient(circle at top right, transparent 0%, black 60%),
          radial-gradient(circle at bottom left, transparent 0%, black 60%),
          radial-gradient(circle at bottom right, transparent 0%, black 60%)
        ]
      "
    />
  </div>

  

  {/* Bottom depth */}
  <div className="absolute -top-4 left-0 right-0 h-[35%] bg-gradient-to-b from-white to-transparent" />

{/* Top reflection */}
 <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-black to-transparent" />

  {/* Inner highlight */}
  <div className="absolute inset-0 rounded-[20px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)]" />
 
   


  {/* Content */}
  <div className="relative z-10 flex justify-between items-start">
    <div>
      <p className="text-[#595958] dark:text-white text-xl font-semibold">
        {item.value}
      </p>
      <p className="text-[#595958] dark:text-white text-sm mt-1 opacity-80">
        {item.label}
      </p>
    </div>

    <img
      src={item.icon}
      alt={item.label}
      className="w-7 h-7 object-contain"
    />
  </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default WeatherDetailsPanel;
