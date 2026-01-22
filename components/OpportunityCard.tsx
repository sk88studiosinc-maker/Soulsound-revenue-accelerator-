
import React, { useState } from 'react';
import { Check, X, Loader2, Zap, Copy, Lightbulb, TrendingUp } from 'lucide-react';
import { Opportunity } from '../types';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const [copied, setCopied] = useState(false);
  const [applyStatus, setApplyStatus] = useState<'idle' | 'applying' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const copyCode = () => {
    navigator.clipboard.writeText(opportunity.actionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = async () => {
    setApplyStatus('applying');
    setErrorMessage('');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      setApplyStatus('success');
      setTimeout(() => setApplyStatus('idle'), 3000);
    } catch (err: any) {
      setApplyStatus('error');
      setErrorMessage('Injection rejected by remote host.');
      setTimeout(() => setApplyStatus('idle'), 4000);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all group flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-full font-bold border border-indigo-500/20">
              {opportunity.platform}
            </span>
            <h4 className="text-lg font-semibold text-white mt-2">{opportunity.title}</h4>
          </div>
          <div className="text-emerald-400 font-mono text-sm bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">
            +{opportunity.potentialValue}
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 leading-relaxed italic">
          "{opportunity.description}"
        </p>

        <div className="grid grid-cols-1 gap-3 mb-6">
          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Tactical Logic</span>
            </div>
            <p className="text-xs text-gray-300 leading-normal">
              {opportunity.strategyLogic}
            </p>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">Scaling Directive</span>
            </div>
            <p className="text-xs text-gray-200 leading-normal font-medium">
              {opportunity.scalingDirective}
            </p>
          </div>
        </div>
        
        <div className="relative mb-4">
          <div className="absolute top-2 right-2 flex gap-2">
            <button 
              onClick={copyCode}
              title="Copy Snippet"
              className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded border border-gray-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <pre className="bg-black/50 p-4 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto border border-gray-800 max-h-32 custom-scrollbar">
            <code>{opportunity.actionCode}</code>
          </pre>
        </div>

        <button
          onClick={handleApply}
          disabled={applyStatus !== 'idle'}
          className={`w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            applyStatus === 'idle' ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20' :
            applyStatus === 'applying' ? 'bg-gray-800 text-gray-400 cursor-wait' :
            applyStatus === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
            'bg-rose-500/20 text-rose-400 border border-rose-500/30'
          }`}
        >
          {applyStatus === 'idle' ? <><Zap className="w-3.5 h-3.5 fill-current" /> Deploy Loophole</> : 
           applyStatus === 'applying' ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Handshaking...</> :
           applyStatus === 'success' ? <><Check className="w-3.5 h-3.5" /> Integration Active</> :
           <><X className="w-3.5 h-3.5" /> Handshake Failed</>}
        </button>
      </div>
    </div>
  );
};
