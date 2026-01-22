
import { GoogleGenAI, Type } from "@google/genai";
import { SiteAnalysis, RoyaltyInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeSiteRevenue = async (url: string): Promise<SiteAnalysis> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Complete forensic audit of all accounts associated with these three core identities:
    1. sk88studiozinc@gmail.com
    2. soulsoundworld.live@gmail.com
    3. sk88studiosinc@gmail.com
    
    Target Ecosystem:
    - Artist: Samzin Kreave (Samzin)
    - Labels/Distributors: SoulSoundWorld.world, distributed via Fresh Tunes.
    - Platforms: Spotify, Apple Music, iTunes, Pocket FM (Stories: 'Tomorrows Yesterday', 'Joker for the Queen'), Zora (SoulSound).

    Primary Directive: Use "Metric Logic" to identify passive, active, and potential income. Find every penny left on the table across all monitored emails.
    
    You MUST provide:
    1. REAL numbers for 'currentCashable' (available for withdrawal) and 'potentialCashout' (future scaled revenue).
    2. SCALING projections using real-time growth data for the 'scalingProjections' array.
    3. 'businessAdjustments': Solid strategic shifts to improve overall revenue (e.g., tiered subscription models, royalty reclaiming workflows, or platform-specific content adjustments).
    4. Music performance metrics for Samzin Kreave.

    Tone: Tactical, Elite, Performance-Oriented.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          healthScore: { type: Type.NUMBER },
          healthBreakdown: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                score: { type: Type.NUMBER },
                status: { type: Type.STRING, enum: ["critical", "warning", "optimal"] },
                impact: { type: Type.STRING }
              },
              required: ["label", "score", "status", "impact"]
            }
          },
          missedRevenue: { type: Type.NUMBER },
          currentCashable: { type: Type.NUMBER },
          potentialCashout: { type: Type.NUMBER },
          musicMetrics: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING },
                listeners: { type: Type.NUMBER },
                streams: { type: Type.NUMBER },
                revenue: { type: Type.NUMBER },
                trend: { type: Type.STRING, enum: ["up", "down", "stable"] }
              },
              required: ["platform", "listeners", "streams", "revenue", "trend"]
            }
          },
          opportunities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                platform: { type: Type.STRING },
                title: { type: Type.STRING },
                potentialValue: { type: Type.STRING },
                description: { type: Type.STRING },
                actionCode: { type: Type.STRING },
                strategyLogic: { type: Type.STRING },
                scalingDirective: { type: Type.STRING },
                status: { type: Type.STRING }
              },
              required: ["id", "platform", "title", "description", "actionCode", "strategyLogic", "scalingDirective"]
            }
          },
          businessAdjustments: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                impact: { type: Type.STRING, enum: ["high", "medium", "low"] },
                effort: { type: Type.STRING, enum: ["high", "medium", "low"] },
                projection: { type: Type.STRING }
              },
              required: ["id", "title", "description", "impact", "effort", "projection"]
            }
          },
          scalingProjections: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                period: { type: Type.STRING },
                conservative: { type: Type.NUMBER },
                aggressive: { type: Type.NUMBER },
                source: { type: Type.STRING }
              },
              required: ["period", "conservative", "aggressive", "source"]
            }
          },
          suggestedIntegrations: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          lastAuditDate: { type: Type.STRING },
          trend: { type: Type.STRING, enum: ["improving", "stable", "declining"] }
        },
        required: ["healthScore", "healthBreakdown", "missedRevenue", "currentCashable", "potentialCashout", "musicMetrics", "opportunities", "businessAdjustments", "scalingProjections", "suggestedIntegrations", "lastAuditDate", "trend"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Invalid analysis data returned");
  }
};

export const analyzeRoyaltyMetadata = async (metadataBatch: string[]): Promise<RoyaltyInsight[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Forensic royalty audit for Samzin Kreave / SoulSound World using Metric Logic. 
    Identifying unclaimed capital across: sk88studiozinc@gmail.com, soulsoundworld.live@gmail.com, sk88studiosinc@gmail.com.
    Audit Metadata: ${metadataBatch.join('\n---\n')}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            source: { type: Type.STRING },
            amount: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            description: { type: Type.STRING },
            claimAction: { type: Type.STRING },
            urgency: { type: Type.STRING, enum: ["high", "medium", "low"] }
          },
          required: ["id", "source", "amount", "confidence", "description", "claimAction", "urgency"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    console.error("Failed to parse royalty data", e);
    return [];
  }
};
