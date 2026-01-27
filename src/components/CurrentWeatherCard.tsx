import React from "react";

interface CurrentWeatherCardProps {
  label?: string;
  temperature?: string;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  label = "Today",
  temperature = "16°C",
}) => {
  return (
    <div className="relative w-[182px] h-[119px] rounded-2xl overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 bg-yellow-400/30 blur-2xl scale-110" />

      {/* Card */}
      <div
        className="
          relative z-10 w-full h-full rounded-2xl p-4
          bg-gradient-to-b from-white/40 via-yellow-400/70 to-yellow-500/90
          backdrop-blur-xl
          border border-white/30
          shadow-[0_20px_40px_rgba(0,0,0,0.4)]
          flex flex-col items-center justify-center gap-1
        "
      >
        <p className="text-white text-lg font-semibold tracking-wide">
          {label}
        </p>

        <p className="text-white text-4xl font-bold leading-none">
          {temperature.replace("°", "° ")}
        </p>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
