
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
  icon?: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, trend, trendDirection, icon }) => {
  return (
    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
          <h3 className="text-3xl font-bold tracking-tight text-white">{value}</h3>
          {trend && (
            <div className={`mt-2 flex items-center text-xs font-semibold ${trendDirection === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
              <span>{trendDirection === 'up' ? '▲' : '▼'} {trend}</span>
              <span className="text-gray-500 ml-1 font-normal">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-gray-800/50 rounded-xl text-emerald-400">
          {icon}
        </div>
      </div>
    </div>
  );
};
