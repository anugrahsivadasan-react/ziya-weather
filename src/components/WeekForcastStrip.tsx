import React, { useState } from "react";
import { motion } from "framer-motion";

function WeekForcastStrip() {
  const [active, setActive] = useState(0);

  const days = [
    { label: "Mon", temp: "16°C" },
    { label: "Tue", temp: "16°C" },
    { label: "Wed", temp: "16°C" },
    { label: "Thu", temp: "16°C" },
    { label: "Fri", temp: "16°C" },
    { label: "Sat", temp: "16°C" },
    { label: "Sun", temp: "16°C" },
  ];

  return (
    <div className="w-full max-w-[980px] h-[119px] mx-auto flex items-center justify-between gap-[10px] bg-white/10 backdrop-blur-md rounded-[20px] border border-white/20 shadow-lg px-[10px]">
      {days.map((day, idx) => {
        const isActive = active === idx;

        return (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className="relative w-[127px] h-[79px] rounded-[20px] px-[10px] py-[10px] flex flex-col items-center justify-center text-white backdrop-blur-md shadow-md border border-white/20 overflow-hidden"
          >
            {isActive && (
              <motion.div
                layoutId="weekHighlight"
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-yellow-400/30 to-yellow-500/20 border border-yellow-300/40"
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
