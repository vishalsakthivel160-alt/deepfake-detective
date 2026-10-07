import React, { useState } from 'react';
import { Play, RotateCcw, Cpu, Film, Image as ImageIcon, Sliders, ShieldAlert, CheckCircle2, Hash } from 'lucide-react';
import { MediaFile, VerdictType } from '../types/forensic';

interface MediaPreviewProps {
  file: MediaFile;
  onStartDetection: (overrideVerdict?: VerdictType) => void;
  onReset: () => void;
}

export const MediaPreview: React.FC<MediaPreviewProps> = ({
  file,
  onStartDetection,
  onReset,
}) => {
  const [pipelineMode, setPipelineMode] = useState<'ensemble' | 'fast'>('ensemble');
  const [verdictSimulation, setVerdictSimulation] = useState<'auto' | 'DEEPFAKE' | 'REAL'>('auto');

  const handleStart = () => {
    const override = verdictSimulation === 'auto' ? undefined : verdictSimulation;
    onStartDetection(override);
  };

  return (
    <div className="w-full rounded-[4px] bg-[#0b1120] border border-[rgba(0,242,254,0.22)] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      {/* Top Telemetry Header */}
      <div className="px-5 py-3.5 bg-[#080c14] border-b border-[rgba(0,242,254,0.15)] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-[#00f2fe]">
            Media Loaded for Inspection
          </span>
          <span className="text-[#849495]">·</span>
          <span className="text-xs font-mono text-[#dfe2ee] truncate max-w-[200px] sm:max-w-xs">
            {file.name}
          </span>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs text-[#849495] hover:text-[#00f2fe] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Change Media</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left / Center: Visual Media Preview Dock */}
        <div className="lg:col-span-7 bg-[#080c14] p-4 sm:p-6 flex flex-col items-center justify-center relative min-h-[340px] border-b lg:border-b-0 lg:border-r border-[rgba(0,242,254,0.12)]">
          {/* Subtle Reticle Target Overlay */}
          <div className="relative w-full max-w-lg aspect-video rounded-[3px] overflow-hidden bg-black flex items-center justify-center border border-[rgba(0,242,254,0.3)] shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            {file.type === 'video' ? (
              <video
                src={file.url}
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={file.url}
                alt={file.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            )}

            {/* Corner Reticle Brackets */}
            <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00f2fe]" />
            <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00f2fe]" />
            <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#00f2fe]" />
            <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#00f2fe]" />

            {/* Center target crosshair subtle */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-8 h-8 border border-[#00f2fe]/40 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#00f2fe] rounded-full" />
              </div>
            </div>
          </div>

          <div className="w-full max-w-lg mt-3 flex items-center justify-between text-[11px] font-mono text-[#849495]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              RAW BUFFER READY
            </span>
            <span>ASPECT: 16:9 LOCKED</span>
          </div>
        </div>

        {/* Right: Technical Inspector & Start Controls */}
        <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between bg-[#0b1120]">
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00f2fe]" />
              <span>Inspection Parameters</span>
            </h4>

            {/* Metadata breakdown list */}
            <div className="space-y-2.5 mb-6 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-[3px] bg-[#080c14] border border-[rgba(255,255,255,0.06)]">
                <span className="text-[#849495]">FILE IDENTIFIER:</span>
                <span className="text-[#dfe2ee] font-medium truncate max-w-[180px]">{file.name}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-[3px] bg-[#080c14] border border-[rgba(255,255,255,0.06)]">
                <span className="text-[#849495]">MEDIA TYPE:</span>
                <span className="text-[#00f2fe] uppercase">{file.type} STREAM</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-[3px] bg-[#080c14] border border-[rgba(255,255,255,0.06)]">
                <span className="text-[#849495]">BYTE PAYLOAD:</span>
                <span className="text-[#dfe2ee]">{file.sizeFormatted}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-[3px] bg-[#080c14] border border-[rgba(255,255,255,0.06)]">
                <span className="text-[#849495]">RESOLUTION:</span>
                <span className="text-[#dfe2ee]">{file.dimensions || '1920 × 1080 (HD)'}</span>
              </div>
              <div className="p-2 rounded-[3px] bg-[#080c14] border border-[rgba(255,255,255,0.06)]">
                <span className="text-[#849495] block mb-1">INSPECTION HASH (SHA-256):</span>
                <span className="text-[10px] text-[#4facfe] break-all leading-tight font-mono select-all">
                  {file.hash.slice(0, 32)}...{file.hash.slice(-16)}
                </span>
              </div>
            </div>

            {/* Pipeline Configuration Segmented Control */}
            <div className="mb-6">
              <label className="text-xs font-mono text-[#849495] uppercase block mb-2">
                Neural Pipeline Mode
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#080c14] rounded-[4px] border border-[rgba(0,242,254,0.15)]">
                <button
                  type="button"
                  onClick={() => setPipelineMode('ensemble')}
                  className={`py-2 px-3 text-xs font-mono rounded-[3px] transition-all cursor-pointer ${
                    pipelineMode === 'ensemble'
                      ? 'bg-[rgba(0,242,254,0.15)] text-[#00f2fe] border border-[rgba(0,242,254,0.4)] shadow-[0_0_10px_rgba(0,242,254,0.2)]'
                      : 'text-[#849495] hover:text-[#dfe2ee]'
                  }`}
                >
                  Full Ensemble (6 Vectors)
                </button>
                <button
                  type="button"
                  onClick={() => setPipelineMode('fast')}
                  className={`py-2 px-3 text-xs font-mono rounded-[3px] transition-all cursor-pointer ${
                    pipelineMode === 'fast'
                      ? 'bg-[rgba(0,242,254,0.15)] text-[#00f2fe] border border-[rgba(0,242,254,0.4)] shadow-[0_0_10px_rgba(0,242,254,0.2)]'
                      : 'text-[#849495] hover:text-[#dfe2ee]'
                  }`}
                >
                  Fast Optical Pass
                </button>
              </div>
            </div>

            {/* Demo Testing Scenario Selector */}
            <div className="mb-6 p-3 rounded-[4px] bg-[#080c14]/60 border border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between text-xs font-mono text-[#849495] mb-2">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#00f2fe]" />
                  <span>Demonstration Mode</span>
                </span>
                <span className="text-[10px] text-[#00f2fe]">Interactive Testing</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setVerdictSimulation('auto')}
                  className={`py-1.5 px-2 rounded-[3px] border transition-all cursor-pointer ${
                    verdictSimulation === 'auto'
                      ? 'bg-[#00f2fe]/10 border-[#00f2fe] text-[#00f2fe]'
                      : 'bg-[#080c14] border-[rgba(255,255,255,0.1)] text-[#849495]'
                  }`}
                >
                  Auto Detect
                </button>
                <button
                  type="button"
                  onClick={() => setVerdictSimulation('DEEPFAKE')}
                  className={`py-1.5 px-2 rounded-[3px] border transition-all cursor-pointer ${
                    verdictSimulation === 'DEEPFAKE'
                      ? 'bg-[#f43f5e]/15 border-[#f43f5e] text-[#f43f5e]'
                      : 'bg-[#080c14] border-[rgba(255,255,255,0.1)] text-[#849495]'
                  }`}
                >
                  Test Deepfake
                </button>
                <button
                  type="button"
                  onClick={() => setVerdictSimulation('REAL')}
                  className={`py-1.5 px-2 rounded-[3px] border transition-all cursor-pointer ${
                    verdictSimulation === 'REAL'
                      ? 'bg-[#10b981]/15 border-[#10b981] text-[#10b981]'
                      : 'bg-[#080c14] border-[rgba(255,255,255,0.1)] text-[#849495]'
                  }`}
                >
                  Test Real
                </button>
              </div>
            </div>
          </div>

          {/* Start Detection Action Trigger */}
          <div className="pt-2">
            <button
              onClick={handleStart}
              className="w-full py-4 px-6 rounded-[4px] text-sm font-bold uppercase tracking-wider text-[#080c14] bg-gradient-to-r from-[#00f2fe] via-[#6ff6ff] to-[#4facfe] hover:shadow-[0_0_30px_rgba(0,242,254,0.5)] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2.5 group"
            >
              <Cpu className="w-5 h-5 text-[#080c14] group-hover:rotate-45 transition-transform" />
              <span>Start Detection</span>
            </button>
            <p className="text-[11px] text-[#849495] text-center mt-2 font-mono">
              Deep Multi-Spectral Forensic Verification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
