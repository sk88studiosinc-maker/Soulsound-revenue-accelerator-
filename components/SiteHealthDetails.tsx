
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus, 
  Activity, 
  Zap, 
  Layers, 
  Info 
} from 'lucide-react';
import { SiteAnalysis } from '../types';

interface SiteHealthDetailsProps {
  analysis: SiteAnalysis;
}

export const SiteHealthDetails: React.FC<SiteHealthDetailsProps> = ({ analysis }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'critical': 
        return (
          <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[9px] uppercase font-bold tracking-widest flex items-center gap-1 shadow-sm shadow-rose-500/5">
            <AlertTriangle className="w-2.5 h-2.5" /> Critical
          </span>
        );
      case 'warning': 
        return (
          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] uppercase font-bold tracking-widest flex items-center gap-1 shadow-sm shadow-amber-500/5">
            <AlertTriangle className="w-2.5 h-2.5" /> Warning
          </span>
        );
      case 'optimal': 
        return (
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] uppercase font-bold tracking-widest flex items-center gap-1 shadow-sm shadow-emerald-500/5">
            <CheckCircle className="w-2.5 h-2.5" /> Optimal
          </span>
        );
      default: 
        return (
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 text-[9px] uppercase font-bold tracking-widest flex items-center gap-1 shadow-sm shadow-indigo-500/5">
            <ShieldCheck className="w-2.5 h-2.5" /> Stable
          </span>
        );
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <ArrowUpRight className="w-4 h-4 text-emerald-400" />;
      case 'declining': return <ArrowDownRight className="w-4 h-4 text-rose-400" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-950/20 border border-indigo-500/20 rounded-2xl overflow-hidden mb-12 shadow-2xl shadow-indigo-500/5 transition-all duration-500">
      <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[10px] rounded border border-indigo-500/20 uppercase font-bold tracking-widest">System Health Audit</span>
              <span className="text-gray-500 text-xs font-mono">ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
            </div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              Monetization Diagnostic
              {getTrendIcon(analysis.trend)}
            </h2>
          </div>
          
          <div className="flex items-center gap-8 relative">
            <div className="text-right cursor-help group" 
                 onMouseEnter={() => setShowTooltip(true)} 
                 onMouseLeave={() => setShowTooltip(false)}
                 onClick={() => setShowTooltip(!showTooltip)}>
              <p className="text-gray-500 text-xs uppercase tracking-tighter mb-1 font-bold flex items-center justify-end gap-1">
                Health Score <Info className="w-3 h-3 text-indigo-400/50" />
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-white leading-none">{analysis.healthScore}</span>
                <span className="text-indigo-400 font-bold text-sm">/ 100</span>
              </div>

              {/* Tooltip Overlay */}
              <div className={`absolute top-full right-0 mt-4 z-50 w-72 bg-gray-900 border border-indigo-500/30 p-5 rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-300 origin-top-right ${showTooltip ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3 border-b border-gray-800 pb-2">Score Calculation</h4>
                <p className="text-[10px] text-gray-400 leading-relaxed mb-4">
                  The overall health index is calculated as the aggregate of weighted performance metrics across your platform ecosystem.
                </p>
                <div className="space-y-3">
                  {analysis.healthBreakdown.map((m, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px]">
                      <span className="text-gray-500">{m.label}</span>
                      <span className={`font-mono font-bold ${m.score > 80 ? 'text-emerald-400' : m.score > 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {m.score}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-[9px] text-indigo-400 font-bold uppercase">Weighted Index</span>
                  <span className="text-xs font-black text-white">{analysis.healthScore}.0</span>
                </div>
              </div>
            </div>

            <div className="w-16 h-16 rounded-full border-4 border-gray-800 relative flex items-center justify-center">
              <div 
                className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent transition-transform duration-1000" 
                style={{ transform: `rotate(${analysis.healthScore * 3.6}deg)` }}
              ></div>
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Detailed Progress Bars */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4" /> Performance Breakdown
            </h3>
            {analysis.healthBreakdown.map((metric, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-center mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-gray-400">{metric.score}%</span>
                    {renderStatusBadge(metric.status)}
                  </div>
                </div>
                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out rounded-full ${
                      metric.status === 'critical' ? 'bg-rose-500' : 
                      metric.status === 'warning' ? 'bg-amber-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${metric.score}%` }}
                  ></div>
                </div>
                <p className="text-[10px] text-gray-500 mt-2 italic flex items-center gap-1.5">
                  <div className={`w-1 h-1 rounded-full ${metric.status === 'critical' ? 'bg-rose-500' : metric.status === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                  {metric.impact}
                </p>
              </div>
            ))}
          </div>

          {/* Key Insights / Metrics */}
          <div className="bg-black/20 rounded-xl p-6 border border-gray-800">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" /> Executive Insights
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-indigo-500/30 transition-all">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Missed Potential</p>
                <p className="text-xl font-bold text-white">${analysis.missedRevenue.toLocaleString()}</p>
                <div className="mt-2 text-[10px] text-rose-400 flex items-center gap-1 font-bold">
                  <ArrowDownRight className="w-3 h-3" /> Potential Loss
                </div>
              </div>
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-indigo-500/30 transition-all">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Integration Gap</p>
                <p className="text-xl font-bold text-white">{analysis.suggestedIntegrations.length}</p>
                <div className="mt-2 text-[10px] text-indigo-400 flex items-center gap-1 font-bold">
                  <Layers className="w-3 h-3" /> Ready to Deploy
                </div>
              </div>
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl col-span-2">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-3 italic">Optimization Strategy</p>
                <div className="flex flex-wrap gap-2">
                  {analysis.suggestedIntegrations.slice(0, 4).map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-1 bg-indigo-500/10 text-indigo-300 rounded-md border border-indigo-500/20 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800 flex justify-between items-center text-[10px] text-gray-500 font-mono">
              <span>LAST AUDIT: {analysis.lastAuditDate}</span>
              <span className="flex items-center gap-1 animate-pulse"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> REAL-TIME MONITORING</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
