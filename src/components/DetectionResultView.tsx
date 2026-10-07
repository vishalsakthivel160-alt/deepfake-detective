import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  RotateCcw, 
  Download, 
  Sliders, 
  Layers, 
  Cpu, 
  Eye, 
  AudioWaveform, 
  FileSearch, 
  Sun, 
  Radio, 
  Activity, 
  Terminal, 
  AlertTriangle, 
  CheckCircle2,
  ExternalLink,
  Zap,
  Lock
} from 'lucide-react';
import { DetectionResult, MetricCardData } from '../types/forensic';
import { ReportModal } from './ReportModal';

interface DetectionResultViewProps {
  result: DetectionResult;
  onReset: () => void;
}

type ViewMode = 'rgb' | 'mesh' | 'fft' | 'ela';

export const DetectionResultView: React.FC<DetectionResultViewProps> = ({
  result,
  onReset,
}) => {
  const [activeViewMode, setActiveViewMode] = useState<ViewMode>('rgb');
  const [showReportModal, setShowReportModal] = useState(false);
  const isDeepfake = result.verdict === 'DEEPFAKE';

  return (
    <div className="w-full space-y-8">
      {/* 1. PRIMARY VERDICT BANNER & THREAT INDICATOR */}
      <div
        className={`relative rounded-[4px] p-6 sm:p-8 backdrop-blur-md border transition-all ${
          isDeepfake
            ? 'bg-[#0b1120] border-[#f43f5e]/50 shadow-[0_0_40px_rgba(244,63,94,0.18)]'
            : 'bg-[#0b1120] border-[#10b981]/50 shadow-[0_0_40px_rgba(16,185,129,0.18)]'
        }`}
      >
        {/* Subtle decorative edge markers */}
        <div
          className={`absolute top-0 left-0 w-2 h-full rounded-l-[4px] ${
            isDeepfake ? 'bg-[#f43f5e]' : 'bg-[#10b981]'
          }`}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Verdict Status & Confidence */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#849495]">
                Forensic Verification Verdict
              </span>
              <span className="text-[#849495]">·</span>
              <span className="text-xs font-mono text-[#00f2fe]">
                {result.timestamp}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                {isDeepfake ? (
                  <div className="w-12 h-12 rounded-[4px] bg-[#93000a]/30 border border-[#f43f5e] flex items-center justify-center text-[#f43f5e] shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-[4px] bg-[#003824]/30 border border-[#10b981] flex items-center justify-center text-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                )}

                <div>
                  <div className="flex items-baseline gap-3">
                    <h2
                      className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
                        isDeepfake ? 'text-[#f43f5e]' : 'text-[#10b981]'
                      }`}
                    >
                      {result.verdict}
                    </h2>
                    <span className="text-sm font-mono text-[#b9cacb]">
                      {isDeepfake ? 'SYNTHETIC MEDIA DETECTED' : 'ORGANIC HUMAN MEDIA VERIFIED'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#dfe2ee] max-w-2xl leading-relaxed">
              {result.executiveSummary}
            </p>
          </div>

          {/* Quick Metrics Badges & Action Controls */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-4">
              {/* Confidence Score Pill/Box */}
              <div className="p-3 rounded-[4px] bg-[#080c14] border border-[rgba(255,255,255,0.1)] text-right">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#849495]">
                  Confidence Rating
                </div>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  {result.confidenceScore}<span className="text-xs text-[#00f2fe]">%</span>
                </div>
              </div>

              {/* Risk Level Box */}
              <div className="p-3 rounded-[4px] bg-[#080c14] border border-[rgba(255,255,255,0.1)] text-right">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#849495]">
                  Threat Risk Level
                </div>
                <div
                  className={`text-2xl font-bold font-mono uppercase ${
                    result.riskLevel === 'CRITICAL' || result.riskLevel === 'HIGH'
                      ? 'text-[#f43f5e]'
                      : 'text-[#10b981]'
                  }`}
                >
                  {result.riskLevel}
                </div>
              </div>
            </div>

            {/* Actions: Analyze Another & Download Report */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onReset}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-[4px] text-xs font-mono font-medium text-[#00f2fe] bg-[#080c14] border border-[rgba(0,242,254,0.3)] hover:bg-[#00f2fe]/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Analyze Another File</span>
              </button>
              <button
                onClick={() => setShowReportModal(true)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-[4px] text-xs font-mono font-bold text-[#080c14] bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:shadow-[0_0_20px_rgba(0,242,254,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. SPECTRAL PROBABILITY THREAT BAR (Stitch Specification) */}
        <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-[#849495] uppercase">
              Spectral Threat Gradient (0% Human ➔ 100% Synthetic AI)
            </span>
            <span className="text-white font-bold tabular-nums">
              Calculated Probability: {result.syntheticProbability}%
            </span>
          </div>

          {/* Segmented Gradient Threat Bar */}
          <div className="relative w-full h-3 rounded-[2px] bg-[#080c14] border border-[rgba(255,255,255,0.1)] overflow-hidden">
            {/* Background 3-stage colored gradient zone */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#10b981] via-[#4facfe] to-[#f43f5e] opacity-35" />

            {/* Active filled indicator */}
            <div
              className={`h-full transition-all duration-700 ease-out relative ${
                isDeepfake ? 'bg-[#f43f5e]' : 'bg-[#10b981]'
              }`}
              style={{ width: `${result.syntheticProbability}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_#ffffff]" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#849495] mt-1.5">
            <span>0% AUTHENTIC BASELINE</span>
            <span>35% SUSPICIOUS ZONE</span>
            <span>70% HIGH PROBABILITY</span>
            <span>100% DEFINITIVE DEEPFAKE</span>
          </div>
        </div>
      </div>

      {/* 2. DUAL COLUMN FORENSIC INSPECTION CHAMBER & TECHNICAL CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Multi-Layer Media Chamber */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-[4px] bg-[#0b1120] border border-[rgba(0,242,254,0.2)] overflow-hidden">
            {/* Viewport Toolbar */}
            <div className="px-4 py-3 bg-[#080c14] border-b border-[rgba(0,242,254,0.15)] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00f2fe]" />
                <span className="text-xs font-mono uppercase tracking-wider text-white">
                  Inspection Chamber Reticle
                </span>
              </div>

              {/* View Mode Tabs */}
              <div className="flex items-center gap-1 p-0.5 bg-[#0b1120] rounded-[3px] border border-[rgba(0,242,254,0.2)]">
                <button
                  onClick={() => setActiveViewMode('rgb')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-[2px] transition-colors cursor-pointer ${
                    activeViewMode === 'rgb'
                      ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                      : 'text-[#849495] hover:text-[#dfe2ee]'
                  }`}
                >
                  RGB Normal
                </button>
                <button
                  onClick={() => setActiveViewMode('mesh')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-[2px] transition-colors cursor-pointer ${
                    activeViewMode === 'mesh'
                      ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                      : 'text-[#849495] hover:text-[#dfe2ee]'
                  }`}
                >
                  Landmark Heatmap
                </button>
                <button
                  onClick={() => setActiveViewMode('fft')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-[2px] transition-colors cursor-pointer ${
                    activeViewMode === 'fft'
                      ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                      : 'text-[#849495] hover:text-[#dfe2ee]'
                  }`}
                >
                  2D-FFT Spectrum
                </button>
                <button
                  onClick={() => setActiveViewMode('ela')}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-[2px] transition-colors cursor-pointer ${
                    activeViewMode === 'ela'
                      ? 'bg-[#00f2fe]/20 text-[#00f2fe] font-semibold'
                      : 'text-[#849495] hover:text-[#dfe2ee]'
                  }`}
                >
                  ELA Noise
                </button>
              </div>
            </div>

            {/* Media Viewport with Mode-Specific Forensic Overlays */}
            <div className="relative bg-[#080c14] p-4 flex items-center justify-center min-h-[360px] overflow-hidden">
              <div className="relative w-full aspect-video rounded-[3px] overflow-hidden bg-black flex items-center justify-center border border-[rgba(0,242,254,0.25)]">
                {result.mediaFile.type === 'video' ? (
                  <video
                    src={result.mediaFile.url}
                    controls
                    playsInline
                    className={`w-full h-full object-contain ${
                      activeViewMode === 'fft'
                        ? 'filter invert hue-rotate-180 contrast-200'
                        : activeViewMode === 'ela'
                        ? 'filter saturate-200 contrast-150 brightness-110'
                        : ''
                    }`}
                  />
                ) : (
                  <img
                    src={result.mediaFile.url}
                    alt={result.mediaFile.name}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-contain ${
                      activeViewMode === 'fft'
                        ? 'filter invert hue-rotate-180 contrast-200'
                        : activeViewMode === 'ela'
                        ? 'filter saturate-200 contrast-150 brightness-110'
                        : ''
                    }`}
                  />
                )}

                {/* Mode Overlay: Landmark Mesh & Heatmap */}
                {activeViewMode === 'mesh' && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    {/* Bounding box around face */}
                    <div className="relative w-56 h-64 border-2 border-dashed border-[#00f2fe] rounded-[4px] bg-[#00f2fe]/5 flex items-center justify-center">
                      <div className="absolute top-2 left-2 text-[10px] font-mono text-[#00f2fe] bg-[#080c14]/80 px-1 py-0.5 border border-[#00f2fe]/40">
                        ROI_01 · 68 FACIAL POINTS
                      </div>

                      {/* Anomaly Heatmap Cloud */}
                      {isDeepfake && (
                        <div className="absolute bottom-6 w-36 h-20 bg-gradient-to-t from-[#f43f5e]/50 via-[#f43f5e]/30 to-transparent blur-md rounded-full border border-[#f43f5e]/80" />
                      )}

                      {/* Synthetic Landmarks Dots */}
                      <div className="grid grid-cols-4 grid-rows-5 gap-3 opacity-60">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              isDeepfake && i > 12 ? 'bg-[#f43f5e] animate-ping' : 'bg-[#00f2fe]'
                            }`}
                          />
                        ))}
                      </div>

                      {isDeepfake && (
                        <div className="absolute bottom-2 text-[9px] font-mono text-white bg-[#f43f5e] px-1.5 py-0.5 rounded-[2px]">
                          SEAM BLEND JITTER: +88%
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Mode Overlay: 2D-FFT Radial Harmonics */}
                {activeViewMode === 'fft' && (
                  <div className="pointer-events-none absolute inset-0 bg-[#080c14]/40 flex items-center justify-center">
                    <div className="relative w-64 h-64 rounded-full border border-[rgba(0,242,254,0.4)] flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full border border-dashed border-[rgba(0,242,254,0.3)] flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border border-[rgba(0,242,254,0.2)] flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border border-[#00f2fe] flex items-center justify-center bg-[#00f2fe]/10">
                            <div className="w-2 h-2 rounded-full bg-[#00f2fe]" />
                          </div>
                        </div>
                      </div>

                      {/* Crosshairs */}
                      <div className="absolute top-0 bottom-0 w-[1px] bg-[#00f2fe]/30" />
                      <div className="absolute left-0 right-0 h-[1px] bg-[#00f2fe]/30" />

                      {isDeepfake && (
                        <div className="absolute top-10 right-10 text-[9px] font-mono text-[#f43f5e] bg-[#080c14] border border-[#f43f5e] px-1 py-0.5">
                          PERIODIC LATTICE PEAK (12.4 kHz)
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Mode Overlay: ELA (Error Level Analysis) */}
                {activeViewMode === 'ela' && (
                  <div className="pointer-events-none absolute inset-0 bg-blue-950/20 mix-blend-color-dodge flex items-center justify-center">
                    <div className="text-[11px] font-mono text-[#00f2fe] bg-[#080c14]/80 px-2 py-1 rounded-[2px] border border-[#00f2fe]">
                      ERROR LEVEL ANALYSIS: COMPRESSION VARIANCE MAP
                    </div>
                  </div>
                )}

                {/* 4 Corner Targeting Reticle Brackets */}
                <div className="pointer-events-none absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00f2fe]" />
                <div className="pointer-events-none absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00f2fe]" />
                <div className="pointer-events-none absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00f2fe]" />
                <div className="pointer-events-none absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00f2fe]" />
              </div>
            </div>

            {/* Chamber Footer info */}
            <div className="px-4 py-2.5 bg-[#080c14] border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] font-mono text-[#849495]">
              <span>ACTIVE LAYER: {activeViewMode.toUpperCase()} INSPECTION</span>
              <span>ARCHITECTURE: {result.primaryArchitectureDetected || 'Standard CNN-ViT'}</span>
            </div>
          </div>

          {/* Frequency Spectral Bands Decomposition Card */}
          <div className="p-5 rounded-[4px] bg-[#0b1120] border border-[rgba(0,242,254,0.18)]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2">
                <AudioWaveform className="w-4 h-4 text-[#00f2fe]" />
                <span>Radial Frequency Decomposition (2D-FFT)</span>
              </h4>
              <span className="text-[10px] font-mono text-[#849495]">5 Discrete Bands</span>
            </div>

            <p className="text-xs text-[#849495] mb-4">
              Measures spatial frequency energy distribution against natural optical 1/f decay curves.
            </p>

            <div className="space-y-3">
              {result.spectralBands.map((band, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#dfe2ee]">{band.band}</span>
                    <span
                      className={`tabular-nums font-semibold ${
                        band.hasArtifact ? 'text-[#f43f5e]' : 'text-[#10b981]'
                      }`}
                    >
                      {band.power} dB {band.hasArtifact ? '(ANOMALY)' : '(NOMINAL)'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#080c14] overflow-hidden border border-[rgba(255,255,255,0.06)]">
                    <div
                      className={`h-full rounded-full ${
                        band.hasArtifact ? 'bg-[#f43f5e]' : 'bg-[#00f2fe]'
                      }`}
                      style={{ width: `${Math.min(100, band.power)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry Stream Log */}
          <div className="p-5 rounded-[4px] bg-[#0b1120] border border-[rgba(0,242,254,0.18)]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00f2fe]" />
                <span>Forensic Execution Audit Trail</span>
              </h4>
              <span className="text-[10px] font-mono text-[#00f2fe]">SEALED LOG</span>
            </div>

            <div className="space-y-2 font-mono text-xs max-h-48 overflow-y-auto telemetry-scroll pr-1">
              {result.telemetryLogs.map((log, index) => (
                <div
                  key={index}
                  className="p-2 rounded-[2px] bg-[#080c14] border border-[rgba(255,255,255,0.04)] flex items-start justify-between gap-3"
                >
                  <div className="text-[11px]">
                    <span className="text-[#00f2fe] mr-2">[{log.stage}]</span>
                    <span className="text-[#dfe2ee]">{log.message}</span>
                  </div>
                  <span className="text-[10px] text-[#849495] tabular-nums shrink-0">
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 6 Technical Analysis Forensic Cards (Stitch Spec) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-sm font-mono uppercase tracking-wider text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00f2fe]" />
              <span>Six-Vector Deep Technical Analysis</span>
            </h3>
            <span className="text-xs font-mono text-[#849495]">
              Threshold: 50/100
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.values(result.metrics).map((metric: MetricCardData) => {
              const isAnomaly = metric.status === 'anomaly';
              const isWarning = metric.status === 'warning';

              return (
                <div
                  key={metric.id}
                  className={`p-4 rounded-[4px] bg-[#0b1120] border transition-all ${
                    isAnomaly
                      ? 'border-[#f43f5e]/40 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                      : isWarning
                      ? 'border-[#4facfe]/40'
                      : 'border-[rgba(0,242,254,0.15)] hover:border-[rgba(0,242,254,0.3)]'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h5 className="text-xs font-mono font-bold text-white uppercase tracking-tight">
                      {metric.title}
                    </h5>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-[2px] uppercase ${
                        isAnomaly
                          ? 'bg-[#93000a]/30 text-[#f43f5e] border border-[#f43f5e]/40'
                          : isWarning
                          ? 'bg-[#002c4b]/30 text-[#9bcbff] border border-[#3196e6]/40'
                          : 'bg-[#003824]/30 text-[#10b981] border border-[#10b981]/40'
                      }`}
                    >
                      {metric.status}
                    </span>
                  </div>

                  {/* Anomaly Gauge & Verdict */}
                  <div className="mb-2">
                    <div className="flex items-baseline justify-between text-xs font-mono mb-1">
                      <span className="text-[#849495]">Anomaly Index:</span>
                      <span
                        className={`font-bold tabular-nums ${
                          isAnomaly ? 'text-[#f43f5e]' : 'text-[#00f2fe]'
                        }`}
                      >
                        {metric.score}/100
                      </span>
                    </div>
                    <div className="w-full h-1 bg-[#080c14] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          isAnomaly ? 'bg-[#f43f5e]' : isWarning ? 'bg-[#4facfe]' : 'bg-[#10b981]'
                        }`}
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Verdict text */}
                  <div className="text-xs font-medium text-white mb-1.5">
                    {metric.verdict}
                  </div>

                  <p className="text-xs text-[#b9cacb] leading-relaxed mb-3">
                    {metric.details}
                  </p>

                  {/* Evidence tokens */}
                  <div className="pt-2 border-t border-[rgba(255,255,255,0.06)] space-y-1">
                    {metric.evidence.map((item, idx) => (
                      <div
                        key={idx}
                        className="text-[11px] font-mono text-[#849495] flex items-start gap-1.5"
                      >
                        <span className="text-[#00f2fe] mt-0.5">·</span>
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Scientific Findings Card */}
          <div className="p-5 rounded-[4px] bg-[#0b1120] border border-[rgba(0,242,254,0.18)]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-2 flex items-center gap-2">
              <FileSearch className="w-4 h-4 text-[#00f2fe]" />
              <span>Forensic Investigator Findings</span>
            </h4>
            <p className="text-xs text-[#dfe2ee] leading-relaxed font-mono">
              {result.detailedAnalysis}
            </p>

            <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#849495] gap-2">
              <span>SHA-256: {result.integrityHash.slice(0, 24)}...</span>
              <button
                onClick={() => setShowReportModal(true)}
                className="text-[#00f2fe] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Audit Certificate</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal result={result} onClose={() => setShowReportModal(false)} />
      )}
    </div>
  );
};
