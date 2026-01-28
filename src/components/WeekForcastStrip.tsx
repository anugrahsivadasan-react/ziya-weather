import React, { useState } from "react";

interface DayForecast {
  label: string;
  temp: string;
  date?: string; // real date from API (optional but useful)
}

interface WeekForcastStripProps {
  data?: DayForecast[];               // API data
  onSelectDay?: (day: DayForecast) => void; // Send selected day to graph section
}

function WeekForcastStrip({ data, onSelectDay }: WeekForcastStripProps) {
  const defaultDays: DayForecast[] = [
    { label: "Mon", temp: "16°C" },
    { label: "Tue", temp: "16°C" },
    { label: "Wed", temp: "16°C" },
    { label: "Thu", temp: "16°C" },
    { label: "Fri", temp: "16°C" },
    { label: "Sat", temp: "16°C" },
    { label: "Sun", temp: "16°C" },
  ];

  const days = data && data.length ? data : defaultDays;

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (day: DayForecast, index: number) => {
    setActiveIndex(index);
    if (onSelectDay) {
      onSelectDay(day); // Send selected day info to parent (Graph section)
    }
  };

  return (
    <div className=" w-full max-w-[980px] h-[119px] mx-auto flex items-center justify-between gap-[10px] bg-white/10 backdrop-blur-md rounded-[20px] border border-white/20 shadow-lg px-[10px] mt-10">
      {days.map((day, idx) => (
        <div
          key={idx}
          onClick={() => handleSelect(day, idx)}
          className={`w-[127px] h-[79px] rounded-[20px] px-[10px] py-[10px] 
          flex flex-col items-center justify-center text-white
          transition-all duration-300 ease-in-out cursor-pointer
          ${
            activeIndex === idx
              ? "bg-gradient-to-br from-[#CC9706] to-yellow-500/20 border border-yellow-300/40"
              : "bg-transparent border border-white/20 backdrop-blur-sm"
          }
          shadow-lg`}
        >
          <span className="text-sm font-medium">{day.label}</span>
          <span className="text-lg font-semibold">{day.temp}</span>
        </div>
      ))}
    </div>
  );
}

export default WeekForcastStrip;
