// import React, { useState } from "react";
// import { motion } from "framer-motion";

// function WeekForcastStrip() {
//   const [active, setActive] = useState(0);

//   const days = [
//     { label: "Mon", temp: "16°C" },
//     { label: "Tue", temp: "16°C" },
//     { label: "Wed", temp: "16°C" },
//     { label: "Thu", temp: "16°C" },
//     { label: "Fri", temp: "16°C" },
//     { label: "Sat", temp: "16°C" },
//     { label: "Sun", temp: "16°C" },
//   ];

//   return (  

//     <div className="w-full max-w-[980px] h-[119px] mx-auto flex items-center justify-between gap-[10px] bg-white/10 backdrop-blur-md rounded-[20px] border border-white/20 shadow-lg px-[10px]">
//       {days.map((day, idx) => {
//         const isActive = active === idx;
 
//         return (
//           <button
//             key={idx}
//             onClick={() => setActive(idx)}
//             className="relative w-[127px] h-[79px] rounded-[20px] px-[10px] py-[10px] flex flex-col items-center justify-center text-white backdrop-blur-md shadow-md border border-white/20 overflow-hidden"
//           >
//             {isActive && (
//               <motion.div
//                 layoutId="weekHighlight"
//                 transition={{ type: "spring", stiffness: 220, damping: 26 }}
//                 className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-yellow-400/30 to-yellow-500/20 border border-yellow-300/40"
//               />
//             )}

//             <span className="relative z-10 text-sm font-medium">
//               {day.label}
//             </span>
//             <span className="relative z-10 text-lg font-semibold">
//               {day.temp}
//             </span>
//           </button>
//         );
//       })}

//     </div>
//   );
// }

// export default WeekForcastStrip;  




import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { get7DayForecast } from "../api/weatherApi";

interface ForecastDay {
  date: string;
  tmax: number;
  tmin: number;
}

interface WeekForcastStripProps {
  place?: string; // coming from your search (ex: "Kannur")
}

function WeekForcastStrip({ place = "Kannur" }: WeekForcastStripProps) {
  const [active, setActive] = useState(0);
  const [days, setDays] = useState<
    { label: string; temp: string; date: string }[]
  >([]);

  // Convert date → Sunday, Monday, etc.
  const getWeekDay = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" }); // Sun, Mon, Tue
  };

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await get7DayForecast(place);

        const formatted = data.forecast.map((item: ForecastDay) => ({
          label: getWeekDay(item.date),
          temp: `${Math.round(item.tmax)}°C`,
          date: item.date,
        }));

        setDays(formatted);
      } catch (error) {
        console.error("7-day forecast error:", error);
      }
    };

    fetchForecast();
  }, [place]);

  return (
    <div className="w-full max-w-[980px] h-[119px] mx-auto flex items-center justify-between gap-[10px] bg-white/10 backdrop-blur-md rounded-[20px] border border-white/20 shadow-lg px-[10px]">
      {days.map((day, idx) => {
        const isActive = active === idx;

        return (
          <button
  key={idx}
  onClick={() => setActive(idx)}
  className="relative w-[127px] h-[79px] rounded-[20px] px-[10px] py-[10px]
  flex flex-col items-center justify-center text-white
  backdrop-blur-xl
  border border-white/25
  shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_10px_25px_rgba(0,0,0,0.25)]
  overflow-hidden"
>
  {/* Base glass tint */}
  <div className="absolute inset-0 rounded-[20px] bg-white/10" />

  {/* Top light reflection */}
  <div className="absolute -top-1 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent opacity-60" />

  {/* Bottom fade */}
  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />

  {/* Noise */}
  <div className="absolute inset-0 opacity-[0.08] bg-[url('/noise.png')] mix-blend-overlay" />

  {/* Active highlight */}
  {isActive && (
    <motion.div
      layoutId="weekHighlight"
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className="absolute inset-0 rounded-[20px]
      bg-gradient-to-br from-[#CC9706]/40 to-[#CC9706]/20
      shadow-[0_0_20px_rgba(204,151,6,0.35)]
      border border-[#CC9706]/40"
    />
  )}

  <span className="relative z-10 text-sm font-medium">
    {day.label}
  </span>
  <span className="relative z-10 text-lg font-semibold">
    {day.temp}
  </span>
</button>
 
        );
      })}
    </div>
  );
}

export default WeekForcastStrip;

