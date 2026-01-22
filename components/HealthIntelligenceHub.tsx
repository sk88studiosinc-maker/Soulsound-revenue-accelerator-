
import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Target,
  BarChart3,
  Activity
} from 'lucide-react';
import { SiteAnalysis } from '../types';

interface HealthIntelligenceHubProps {
  analysis: SiteAnalysis;
}

export const HealthIntelligenceHub: React.FC<HealthIntelligenceHubProps> = ({ analysis }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      case 'warning': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      default: return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  const getBarColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-rose-500';
      case 'warning': return 'bg-amber-500';
      default: return 'bg-indigo-500';
    }
  };

  return (
    <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
          <Activity className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Health Intelligence Hub</h2>
          <p className="text-gray-500 text-sm">Deep-dive diagnostic for soulsoundworld.world ecosystem</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Radial Health Gauge */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Target className="w-32 h-32 text-indigo-500" />
          </div>
          
          <div className="relative w-48 h-48 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-800"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={553}
                strokeDashoffset={553 - (553 * analysis.healthScore) / 100}
                className="text-indigo-500 transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-white">{analysis.healthScore}</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Index Score</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-3 ${getStatusColor(analysis.healthScore > 80 ? 'optimal' : analysis.healthScore > 50 ? 'warning' : 'critical')}`}>
              {analysis.healthScore > 80 ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
              {analysis.healthScore > 80 ? 'Healthy' : 'Needs Optimization'}
            </div>
            <p className="text-gray-400 text-sm max-w-[200px] mx-auto italic">
              Currently performing at {analysis.healthScore}% of predicted potential.
            </p>
          </div>
        </div>

        {/* Detailed Metrics Sparklines */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 xl:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              Metric Progression
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-black/40 px-3 py-1 rounded-lg border border-gray-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Trend Analysis
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {analysis.healthBreakdown.map((metric, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-300">{metric.label}</span>
                  <span className="text-sm font-mono font-bold text-indigo-400">{metric.score}%</span>
                </div>
                <div className="relative h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out ${getBarColor(metric.status)}`}
                    style={{ width: `${metric.score}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-gray-500 flex items-center gap-1 italic">
                    <Zap className="w-2.5 h-2.5" /> {metric.impact}
                  </span>
                  <div className={`px-2 py-0.5 rounded border uppercase font-black tracking-tighter scale-90 ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Trend</p>
                <p className="text-sm font-bold text-white capitalize">{analysis.trend}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Last Audit</p>
                <p className="text-sm font-bold text-white">{analysis.lastAuditDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <Target className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Audit Interval</p>
                <p className="text-sm font-bold text-white">24 Hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Roadmap */}
        <div className="xl:col-span-3 bg-gradient-to-r from-indigo-900/10 to-emerald-900/10 border border-indigo-500/20 rounded-2xl p-8">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                 <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-400" />
                    Strategic Integration Roadmap
                 </h3>
                 <p className="text-gray-400 text-sm">
                    Complete these recommended integrations to reach a <span className="text-emerald-400 font-bold">100% Monetization Health Score</span> and maximize your passive collection engine.
                 </p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                 {analysis.suggestedIntegrations.map((integration, idx) => (
                    <div 
                      key={idx} 
                      className="group flex items-center gap-3 bg-black/40 border border-gray-800 hover:border-indigo-500/40 p-3 rounded-xl transition-all cursor-default"
                    >
                       <div className="w-6 h-6 rounded-full border-2 border-gray-700 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                          <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-indigo-400" />
                       </div>
                       <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                          {integration}
                       </span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
