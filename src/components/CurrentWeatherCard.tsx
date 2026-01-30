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
  <div className="relative w-[182px] h-[119px] rounded-[22px] isolate">
  {/* 🌫 Outer glow */}
  <div className="absolute inset-0 bg-[#D6A21A]/35 blur-2xl scale-110 pointer-events-none" />

  {/* 🧊 Glass Card */}
  <div
    className="
      relative z-10 w-full h-full rounded-[22px] p-4
      backdrop-blur-2xl
      shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_18px_35px_rgba(0,0,0,0.35)]
      overflow-hidden
      flex flex-col items-center justify-center gap-1
    "
  >
    {/* ✅ Frosted base (prevents bg leak) */}
    <div className="absolute inset-0 bg-white/10" />

    {/* ✅ Bottom yellow glass tint */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#D6A21A]/85 via-[#D6A21A]/45 to-transparent" />

    {/* ✅ Top reflection */}
    <div className="absolute -top-6 left-0 right-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent opacity-70" />

    {/* ✅ Broken glass border */}
    <div className="absolute inset-0 rounded-[22px] pointer-events-none">
     <div
    className="absolute inset-0 rounded-[20px] pointer-events-none"
    style={{
      background:
        "linear-gradient(135deg, transparent 0%, rgba(255,255,255,.6) 18%, rgba(255,255,255,.6) 82%, transparent 100%)",
      WebkitMask:
        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor",
      padding: "1px",
    }}
  />
    </div>

    {/* Content */}
    <p className="relative z-10 text-white text-lg font-semibold tracking-wide">
      {label}
    </p>

    <p className="relative z-10 text-white text-4xl font-bold leading-none">
      {temperature.replace("°", "° ")}
    </p>
  </div>
</div>



  );
};

export default CurrentWeatherCard;
