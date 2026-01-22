
export interface RevenueEvent {
  id: string;
  source: string;
  amount: number;
  timestamp: Date;
  type: 'affiliate' | 'micropayment' | 'royalty' | 'tip' | 'crypto' | 'story_coin' | 'stream_payout';
}

export interface ConnectedAsset {
  id: string;
  name: string;
  type: 'email' | 'crypto' | 'platform' | 'author_profile' | 'streaming_profile' | 'distributor';
  status: 'active' | 'scanning' | 'alert';
  value?: string;
  lastAction: string;
}

export interface Opportunity {
  id: string;
  platform: string;
  title: string;
  potentialValue: string;
  description: string;
  actionCode: string;
  strategyLogic: string;
  scalingDirective: string;
  status: 'new' | 'active' | 'archived';
}

export interface BusinessAdjustment {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  projection: string;
}

export interface MusicMetric {
  platform: string;
  listeners: number;
  streams: number;
  revenue: number;
  trend: 'up' | 'down' | 'stable';
}

export interface RoyaltyInsight {
  id: string;
  source: string;
  amount: string;
  confidence: number;
  description: string;
  claimAction: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface ScalingProjection {
  period: string;
  conservative: number;
  aggressive: number;
  source: string;
}

export interface SiteAnalysis {
  healthScore: number;
  healthBreakdown: {
    label: string;
    score: number;
    status: 'critical' | 'warning' | 'optimal';
    impact: string;
  }[];
  missedRevenue: number;
  currentCashable: number;
  potentialCashout: number;
  opportunities: Opportunity[];
  businessAdjustments: BusinessAdjustment[];
  suggestedIntegrations: string[];
  scalingProjections: ScalingProjection[];
  musicMetrics: MusicMetric[];
  lastAuditDate: string;
  trend: 'improving' | 'stable' | 'declining';
}
