export type MediaType = 'image' | 'video';

export type VerdictType = 'REAL' | 'DEEPFAKE';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface MediaFile {
  id: string;
  name: string;
  size: number;
  sizeFormatted: string;
  type: MediaType;
  url: string;
  dimensions?: string;
  duration?: string;
  fps?: number;
  codec?: string;
  hash: string;
}

export interface MetricCardData {
  id: string;
  title: string;
  score: number; // 0 to 100
  status: 'nominal' | 'warning' | 'anomaly';
  verdict: string;
  details: string;
  evidence: string[];
}

export interface SpectralBand {
  band: string;
  frequency: string;
  power: number;
  expected: number;
  delta: number;
  hasArtifact: boolean;
}

export interface DetectionResult {
  id: string;
  mediaFile: MediaFile;
  verdict: VerdictType;
  confidenceScore: number; // 0 to 100 (e.g. 96.8)
  syntheticProbability: number; // 0 to 100
  riskLevel: RiskLevel;
  timestamp: string;
  inferenceDurationMs: number;
  framesAnalyzed: number;
  facesDetected: number;
  integrityHash: string;
  executiveSummary: string;
  detailedAnalysis: string;
  primaryArchitectureDetected?: string;
  metrics: {
    facialBoundary: MetricCardData;
    frequencySpectral: MetricCardData;
    eyeDynamics: MetricCardData;
    lightingConsistency: MetricCardData;
    audioVisualSync: MetricCardData;
    metadataForensics: MetricCardData;
  };
  spectralBands: SpectralBand[];
  telemetryLogs: Array<{
    timestamp: string;
    stage: string;
    message: string;
    level: 'info' | 'warn' | 'alert' | 'success';
  }>;
}

export interface SampleCase {
  id: string;
  title: string;
  type: MediaType;
  category: string;
  description: string;
  imageUrl: string;
  expectedVerdict: VerdictType;
  sampleResult: DetectionResult;
}
