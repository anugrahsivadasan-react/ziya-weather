import React from 'react'

function WeekForcastStrip() {

const days = [
  { label: "Mon", temp: "16°C", isActive: true },
  { label: "Tue", temp: "16°C" },
  { label: "Wed", temp: "16°C" },
  { label: "Thu", temp: "16°C" },
  { label: "Fri", temp: "16°C" },
  { label: "Sat", temp: "16°C" },
  { label: "Sun", temp: "16°C" },
];



  return (
     <div className=" w-full max-w-[980px] h-[119px] mx-auto flex items-center justify-between gap-[10px] bg-white/10 backdrop-blur-md rounded-[20px] border border-white/20 shadow-lg px-[10px] mt-10">
      {days.map((day, idx) => (
        <div
          key={idx}
          className={`w-[127px] h-[79px] rounded-[20px] px-[10px] py-[10px] flex flex-col items-center justify-center text-white ${
            day.isActive
              ? "bg-gradient-to-br from-[#CC9706] to-yellow-500/20 border border-yellow-300/40"
              : "bg-white/10 border border-white/20"
          } backdrop-blur-md shadow-md`}
        >
          <span className="text-sm font-medium">{day.label}</span>
          <span className="text-lg font-semibold">{day.temp}</span>
        </div>
      ))}
    </div>
  );
};


export default WeekForcastStrip
