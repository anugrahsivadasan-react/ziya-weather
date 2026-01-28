import React, { useState } from "react";
import { motion } from "framer-motion";

const temps = [60, 20, 10, 10, 20, 22, 25, 23, 26, 22, 12, 14, 18, 22, 44];
const hours = [
  "Now","9:00","10:00","11:00","12:00","13:00","14:00",
  "15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"
];

const HourlyTemperatureGraph: React.FC = () => {
  const width = 1180;
  const height = 260;
  const padding = 40;

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);

  const points = temps.map((t, i) => {
    const x = (i / (temps.length - 1)) * (width - padding * 2) + padding;
    const y =
      height -
      ((t - minTemp) / (maxTemp - minTemp)) * (height - padding * 2) -
      padding;

    return { x, y, t };
  });

 const catmullRom2bezier = (points: { x: number; y: number }[]) => {
  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i === 0 ? points[i] : points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i + 2 < points.length ? points[i + 2] : p2;

    const tension = 0.25;

    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;

    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return d;
};


  const linePath = catmullRom2bezier(points);;
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const step = (width - padding * 2) / (temps.length - 1);
    const index = Math.round((x - padding) / step);

    if (index >= 0 && index < temps.length) {
      setHoverIndex(index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-[1182px] mx-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl p-6 overflow-hidden mt-10"
    >
      <p className="text-white mb-4 font-medium">Upcoming hours</p>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-[280px]"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F9DC9A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#CC9706" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#665603" stopOpacity="0.25" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {points.map((p, i) => (
          <line
            key={i}
            x1={p.x}
            y1={0}
            x2={p.x}
            y2={height}
            stroke="white"
            strokeOpacity="0.15"
          />
        ))}

        <path
          d={linePath}
          fill="none"
          stroke="#fde047"
          strokeWidth="8"
          opacity="0.25"
          filter="url(#glow)"
        />

        <path d={areaPath} fill="url(#waveGradient)" />

        <path
          d={linePath}
          fill="none"
          stroke="#fde047"
          strokeWidth="2.5"
        />

        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="6" fill="white" />
            <circle cx={p.x} cy={p.y} r="3" fill="#1e40af" />

            <text
              x={p.x}
              y={p.y - 12}
              fill="white"
              fontSize="12"
              textAnchor="middle"
            >
              {p.t}°
            </text>
          </g>
        ))}

        {hoverIndex !== null && (
          <>
           {/* Glow layers */}
<line
  x1={points[hoverIndex].x}
  y1={0}
  x2={points[hoverIndex].x}
  y2={height}
  stroke="#fde047"
  strokeWidth="10"
  opacity="0.08"
/>

<line
  x1={points[hoverIndex].x}
  y1={0}
  x2={points[hoverIndex].x}
  y2={height}
  stroke="#fde047"
  strokeWidth="6"
  opacity="0.18"
/>

<line
  x1={points[hoverIndex].x}
  y1={0}
  x2={points[hoverIndex].x}
  y2={height}
  stroke="#fde047"
  strokeWidth="3"
  opacity="0.35"
/>

{/* Main line */}
<line
  x1={points[hoverIndex].x}
  y1={0}
  x2={points[hoverIndex].x}
  y2={height}
  stroke="#fde047"
  strokeWidth="1.5"
  opacity="0.9"
/>


            <foreignObject
              x={points[hoverIndex].x - 40}
              y={points[hoverIndex].y - 55}
              width={80}
              height={40}
            >
              <div className="bg-black/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-lg shadow-lg text-center">
                <div>{hours[hoverIndex]}</div>
                <div className="font-semibold">
                  {points[hoverIndex].t}°
                </div>
              </div>
            </foreignObject>
          </>
        )}
      </svg>

      <div className="flex justify-between text-xs text-white/70 mt-2 px-2">
        {hours.map((h, i) => (
          <span key={i}>{h}</span>
        ))}
      </div>
    </motion.div>
  );
};

export default HourlyTemperatureGraph;
