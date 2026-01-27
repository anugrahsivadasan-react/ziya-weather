import React from "react";

// 👉 Import your Figma icons
import feelsLikeIcon from "../assets/feelsLikeIcon.svg";
import humidityIcon from "../assets/humidityIcon.svg";
import windIcon from "../assets/windIcon.svg";
import cloudIcon from "../assets/cloudIcon.svg";
import rainIcon from "../assets/rainIcon.svg";

const details = [
  {
    label: "Feels like",
    value: "20°C",
    icon: feelsLikeIcon,
  },
  {
    label: "Humidity",
    value: "20°C",
    icon: humidityIcon,
  },
  {
    label: "Wind",
    value: "16 km",
    icon: windIcon,
  },
  {
    label: "Cloud cover",
    value: "16%",
    icon: cloudIcon,
  },
  {
    label: "Rain",
    value: "High",
    icon: rainIcon,
  },
];

const WeatherDetailsPanel: React.FC = () => {
  return (
    <div className="w-full max-w-[1182px] mx-auto mt-10 px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {details.map((item, i) => (
          <div
            key={i}
            className="relative h-[130px] rounded-[20px] p-5 flex flex-col justify-between
            bg-transparent backdrop-blur-xl border border-white/10
            shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/10 to-transparent opacity-40 pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-white text-xl font-semibold">
                  {item.value}
                </p>
                <p className="text-slate-300 text-sm mt-1">
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
