import React from 'react';
import { RadarStats } from '../../types/character';

interface RadarChartProps {
  stats: RadarStats;
  onChange?: (newStats: RadarStats) => void;
  editable?: boolean;
}

export const RadarChart: React.FC<RadarChartProps> = ({ stats, onChange, editable = false }) => {
  const axes = [
    { key: 'aggression', label: '好戦/攻撃性', value: stats.aggression },
    { key: 'rationality', label: '理性/冷静さ', value: stats.rationality },
    { key: 'fragility', label: '精神の脆さ', value: stats.fragility },
    { key: 'sociability', label: '社交性', value: stats.sociability },
    { key: 'attachment', label: '執着/依存', value: stats.attachment },
    { key: 'desire', label: '野心/欲望', value: stats.desire },
  ];

  const size = 260;
  const center = size / 2;
  const radius = 95;
  const count = axes.length;

  // Calculate polygon points for stats
  const points = axes.map((axis, i) => {
    const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
    const r = (axis.value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Background concentric circles/hexagons
  const levels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="overflow-visible">
          {/* Background grid */}
          {levels.map((lvl, idx) => {
            const gridPoints = axes.map((_, i) => {
              const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
              const r = lvl * radius;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return `${x},${y}`;
            }).join(' ');
            return (
              <polygon
                key={idx}
                points={gridPoints}
                fill="none"
                stroke="#1e293b"
                strokeWidth={idx === levels.length - 1 ? '1.5' : '1'}
                strokeDasharray={idx < levels.length - 1 ? '3 3' : undefined}
              />
            );
          })}

          {/* Axes lines */}
          {axes.map((_, i) => {
            const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#1e293b"
                strokeWidth="1"
              />
            );
          })}

          {/* Stat polygon */}
          <polygon
            points={points}
            fill="rgba(6, 182, 212, 0.25)"
            stroke="#06b6d4"
            strokeWidth="2"
          />

          {/* Data dots */}
          {axes.map((axis, i) => {
            const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
            const r = (axis.value / 100) * radius;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="#f59e0b"
                stroke="#0b0f17"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Labels */}
          {axes.map((axis, i) => {
            const angle = (Math.PI * 2 / count) * i - Math.PI / 2;
            const labelRadius = radius + 22;
            const x = center + labelRadius * Math.cos(angle);
            const y = center + labelRadius * Math.sin(angle);
            return (
              <text
                key={i}
                x={x}
                y={y}
                fill="#94a3b8"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
                className="select-none"
              >
                {axis.label}
              </text>
            );
          })}
        </svg>
      </div>

      {editable && onChange && (
        <div className="grid grid-cols-2 gap-2 mt-3 w-full max-w-xs text-xs text-slate-300">
          {axes.map((axis) => (
            <div key={axis.key} className="flex items-center justify-between bg-slate-900/60 px-2 py-1 rounded border border-slate-800">
              <span className="text-slate-400">{axis.label}:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={axis.value}
                onChange={(e) => {
                  onChange({
                    ...stats,
                    [axis.key]: parseInt(e.target.value, 10)
                  });
                }}
                className="w-16 accent-cyan-500 h-1 ml-2"
              />
              <span className="w-6 text-right font-mono text-cyan-400">{axis.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
