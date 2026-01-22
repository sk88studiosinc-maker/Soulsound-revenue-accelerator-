
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  TrendingUp, 
  Search, 
  Activity, 
  Zap, 
  Code, 
  Layers, 
  RefreshCcw, 
  Globe, 
  DollarSign,
  PieChart as PieChartIcon,
  Filter,
  MessageSquare,
  ChevronRight,
  Mail,
  Wallet,
  LayoutGrid,
  ShieldCheck,
  Target,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Coins,
  LineChart,
  Music,
  Headphones,
  Radio,
  Gauge,
  Briefcase
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { StatCard } from './components/StatCard';
import { OpportunityCard } from './components/OpportunityCard';
import { HealthIntelligenceHub } from './components/HealthIntelligenceHub';
import { analyzeSiteRevenue, analyzeRoyaltyMetadata } from './services/geminiService';
import { SiteAnalysis, RevenueEvent, Opportunity, ConnectedAsset, RoyaltyInsight, MusicMetric, BusinessAdjustment } from './types';

const initialAssets: ConnectedAsset[] = [
  { id: '1', name: 'sk88studiozinc@gmail.com', type: 'email', status: 'active', value: 'Monitor Active', lastAction: 'Last Sync: 2m ago' },
  { id: '2', name: 'soulsoundworld.live@gmail.com', type: 'email', status: 'active', value: 'Monitor Active', lastAction: 'Last Sync: 5m ago' },
  { id: '3', name: 'sk88studiosinc@gmail.com', type: 'email', status: 'active', value: 'Monitor Active', lastAction: 'Last Sync: 10m ago' },
  { id: '4', name: 'Fresh Tunes (SoulSound)', type: 'distributor', status: 'active', lastAction: 'Back-end Audit' },
  { id: '5', name: 'Spotify (Samzin Kreave)', type: 'streaming_profile', status: 'active', value: '42.1K Streams', lastAction: 'Syncing Stats' },
  { id: '6', name: 'Pocket FM (Samzin)', type: 'author_profile', status: 'active', value: 'Author Level: Gold', lastAction: 'Coin Scaling' },
  { id: '7', name: 'Zora (SoulSound)', type: 'platform', status: 'active', value: '4.8 ETH', lastAction: 'Collection High' }
];

const App: React.FC = () => {
  const [url, setUrl] = useState('soulsoundworld.world');
  const [analyzing, setAnalyzing] = useState(false);
  const [scanningInbox, setScanningInbox] = useState(false);
  const [analysis, setAnalysis] = useState<SiteAnalysis | null>(null);
  const [royaltyInsights, setRoyaltyInsights] = useState<RoyaltyInsight[]>([]);
  const [events, setEvents] = useState<RevenueEvent[]>([]);
  const [sessionRevenue, setSessionRevenue] = useState(0);
  const [assets] = useState<ConnectedAsset[]>(initialAssets);
  const [totalLiveGrowth, setTotalLiveGrowth] = useState(2450.85);

  const [liveProjections, setLiveProjections] = useState([
    { period: 'Jan', conservative: 450, aggressive: 1200 },
    { period: 'Feb', conservative: 820, aggressive: 2400 },
    { period: 'Mar', conservative: 1100, aggressive: 4800 },
    { period: 'Apr', conservative: 1500, aggressive: 9200 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const sources = [
        'Spotify Stream (Samzin)', 
        'Fresh Tunes Payout', 
        'Pocket FM Coins', 
        'sk88studiozinc Affiliate',
        'Zora Collector Fee'
      ];
      const amount = Math.random() * 0.25;
      const newEvent: RevenueEvent = {
        id: Math.random().toString(36).substr(2, 9),
        source: sources[Math.floor(Math.random() * sources.length)],
        amount: amount,
        timestamp: new Date(),
        type: amount > 0.12 ? 'stream_payout' : 'micropayment'
      };
      setEvents(prev => [newEvent, ...prev].slice(0, 10));
      setSessionRevenue(prev => prev + amount);
      setTotalLiveGrowth(prev => prev + amount);

      setLiveProjections(prev => prev.map(p => ({
        ...p,
        aggressive: p.aggressive + (Math.random() * 8)
      })));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const runAnalysis = useCallback(async () => {
    if (!url) return;
    setAnalyzing(true);
    try {
      const result = await analyzeSiteRevenue(url);
      setAnalysis(result);
      if (result.scalingProjections && result.scalingProjections.length > 0) {
        setLiveProjections(result.scalingProjections.map(p => ({
          period: p.period,
          conservative: p.conservative,
          aggressive: p.aggressive
        })));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  }, [url]);

  const runInboxRadar = useCallback(async () => {
    setScanningInbox(true);
    const mockMetadata = [
      "From: freshtunes-payout@freshtunes.com | Samzin Report | Payout: $42.50",
      "From: sk88studiozinc@gmail.com | Amazon Bounty | Earned: $11.10",
      "From: pocket-fm@pocketfm.com | Coin Redemption | Samzin: 1,200 Coins",
      "From: sk88studiosinc@gmail.com | DistroKid Sync | Royalty: $8.24",
      "From: soulsoundworld.live@gmail.com | Ad-Network | Yield: $4.12"
    ];
    try {
      const insights = await analyzeRoyaltyMetadata(mockMetadata);
      setRoyaltyInsights(insights);
    } catch (error) {
      console.error(error);
    } finally {
      setScanningInbox(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-[#030712] p-6 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tighter text-white uppercase italic">SoulSound</span>
        </div>

        <nav className="space-y-1 flex-1">
          <button className="flex items-center gap-3 w-full px-4 py-3 bg-gray-900 text-white rounded-xl border border-gray-800">
            <LayoutGrid className="w-5 h-5 text-indigo-400" />
            <span className="font-medium">Metric Hub</span>
          </button>
          <button onClick={runInboxRadar} className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl transition-all">
            <Mail className="w-5 h-5" />
            <span className="font-medium">Identity Radar</span>
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl transition-all">
            <Briefcase className="w-5 h-5" />
            <span className="font-medium">Strategic Adjust</span>
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl transition-all">
            <Radio className="w-5 h-5" />
            <span className="font-medium">Distribution Scan</span>
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-800">
          <div className="bg-emerald-500/10 rounded-2xl p-4 border border-emerald-500/20">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Live Multi-Email Node</p>
            <p className="text-lg text-white font-black font-mono tracking-tighter">${sessionRevenue.toFixed(4)}</p>
            <div className="mt-2 w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div className="w-full h-full bg-emerald-500 animate-[pulse_1s_infinite]"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">METRIC COMMAND CENTER</h1>
            <p className="text-gray-400 font-medium">Monitoring <span className="text-indigo-400 font-bold italic">Multi-Email Identity Context</span></p>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative group">
               <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
               <input 
                 type="text"
                 value={url}
                 onChange={(e) => setUrl(e.target.value)}
                 className="bg-gray-900 border border-gray-800 rounded-xl py-4 pl-11 pr-4 w-64 md:w-80 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-inner transition-all"
               />
             </div>
             <button 
               onClick={runAnalysis}
               disabled={analyzing}
               className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-indigo-600/30"
             >
               {analyzing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Target className="w-4 h-4" />}
               Handshake & Audit
             </button>
          </div>
        </header>

        {/* Core Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            label="Verified Liquidity" 
            value={`$${totalLiveGrowth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            trend="Live" 
            trendDirection="up"
            icon={<Coins className="w-6 h-6 text-emerald-400" />}
          />
          <StatCard 
            label="Monetization Gap" 
            value={analysis ? `$${analysis.missedRevenue.toLocaleString()}` : "$3,842"} 
            trend="Claimable" 
            icon={<AlertCircle className="w-6 h-6 text-rose-400" />}
          />
          <StatCard 
            label="Scaling Potential" 
            value={analysis ? `$${analysis.potentialCashout.toLocaleString()}` : "$24.1K"} 
            icon={<TrendingUp className="w-6 h-6 text-indigo-400" />}
          />
          <StatCard 
            label="Strategic Adjusts" 
            value={analysis ? analysis.businessAdjustments.length.toString() : "8 Ready"} 
            icon={<Briefcase className="w-6 h-6 text-amber-400" />}
          />
        </div>

        {/* Multi-Email Monitoring Grid */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Mail className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight uppercase">Multi-Email Asset Nodes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assets.filter(a => a.type === 'email').map((asset) => (
              <div key={asset.id} className="bg-gray-900/60 border border-gray-800 p-5 rounded-3xl hover:border-indigo-500/30 transition-all backdrop-blur-md group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-emerald-400 uppercase">Monitoring</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                  </div>
                </div>
                <p className="text-sm font-black text-white truncate mb-1">{asset.name}</p>
                <div className="flex justify-between items-center text-[9px] font-bold text-gray-500 uppercase">
                  <span>{asset.lastAction}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Metric Logic Growth Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-gray-900/60 border border-gray-800 rounded-3xl p-8 relative overflow-hidden backdrop-blur-md">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Gauge className="text-indigo-400 w-5 h-5" />
                Real-Time Scale (Metric Logic)
              </h2>
            </div>
            <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={liveProjections}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                    <XAxis dataKey="period" stroke="#6b7280" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#030712', border: '1px solid #1f2937', borderRadius: '16px' }}
                      cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
                    />
                    <Bar dataKey="conservative" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={32} />
                    <Bar dataKey="aggressive" fill="#10b981" radius={[6, 6, 0, 0]} barSize={32}>
                       {liveProjections.map((entry, index) => (
                         <Cell key={`cell-${index}`} opacity={0.7 + (index * 0.1)} />
                       ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-8 flex flex-col backdrop-blur-md">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="text-rose-500 w-5 h-5" />
              Recent Penny Collects
            </h2>
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[320px] pr-2 custom-scrollbar">
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-gray-800 hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <Coins className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-black text-white truncate uppercase tracking-tighter">{event.source}</p>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">{event.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-emerald-400 font-bold">+${event.amount.toFixed(4)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategic Business Adjustments */}
        {analysis && (
          <section className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-bold text-white tracking-tight uppercase">Solid Business Adjustment Options</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {analysis.businessAdjustments.map((adjust) => (
                <div key={adjust.id} className="bg-gray-900/40 border border-gray-800 p-6 rounded-3xl hover:border-amber-500/50 transition-all group backdrop-blur-sm shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase border ${
                      adjust.impact === 'high' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {adjust.impact} Impact
                    </span>
                    <span className="text-[10px] font-black text-gray-500 uppercase font-mono">Effort: {adjust.effort}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{adjust.title}</h4>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed italic">"{adjust.description}"</p>
                  <div className="bg-black/60 p-4 rounded-2xl border border-gray-800 group-hover:border-amber-500/30 transition-all">
                    <p className="text-[10px] text-amber-500 font-black uppercase mb-1 flex items-center gap-2">
                       <TrendingUp className="w-3 h-3" /> Growth Projection
                    </p>
                    <p className="text-xs text-gray-300 font-medium">"{adjust.projection}"</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Catalog Performance */}
        {analysis && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Music className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white tracking-tight uppercase">Artist Catalog (Samzin Kreave)</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {analysis.musicMetrics.map((m, i) => (
                <div key={i} className="bg-gray-900/60 border border-gray-800 p-6 rounded-3xl hover:border-indigo-500/50 transition-all backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest">{m.platform}</span>
                    <TrendingUp className={`w-4 h-4 ${m.trend === 'up' ? 'text-emerald-400' : 'text-gray-600'}`} />
                  </div>
                  <p className="text-3xl font-black text-white tracking-tighter">${m.revenue.toLocaleString()}</p>
                  <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-mono">
                    <div className="p-2 bg-black/40 rounded-lg border border-gray-800 text-center">
                      <span className="block text-gray-500">STREAMS</span>
                      <span className="text-white font-bold">{m.streams.toLocaleString()}</span>
                    </div>
                    <div className="p-2 bg-black/40 rounded-lg border border-gray-800 text-center">
                      <span className="block text-gray-500">LISTENERS</span>
                      <span className="text-white font-bold">{m.listeners.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* AI Health Hub */}
        {analysis && <HealthIntelligenceHub analysis={analysis} />}

        {/* Distribution Assets */}
        <section className="mb-20">
          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Distribution Infrastructure</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {assets.filter(a => a.type !== 'email').map((asset) => (
              <div key={asset.id} className="bg-gray-900/40 border border-gray-800 p-5 rounded-3xl hover:border-indigo-500/30 transition-all backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
                    {asset.type === 'streaming_profile' ? <Headphones className="w-5 h-5" /> : asset.type === 'author_profile' ? <BookOpen className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                  </div>
                  <div className={`w-2 h-2 rounded-full ${asset.status === 'active' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500 animate-pulse'}`} />
                </div>
                <p className="text-[11px] font-black text-white truncate tracking-tighter uppercase">{asset.name}</p>
                <div className="flex justify-between items-center mt-3 text-[9px] font-bold text-gray-500 uppercase">
                  <span>{asset.lastAction}</span>
                  <span className="text-emerald-400 font-mono">{asset.value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
