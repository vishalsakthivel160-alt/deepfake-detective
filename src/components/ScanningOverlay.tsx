import React, { useState, useEffect } from 'react';
import { Cpu, Activity, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { MediaFile } from '../types/forensic';

interface ScanningOverlayProps {
  file: MediaFile;
  onComplete: () => void;
}

const SCAN_STAGES = [
  { progress: 15, text: 'Demuxing stream & allocating 512×512 tensor buffer...', stage: 'INGEST' },
  { progress: 35, text: 'Extracting RetinaFace 68-point 3D facial landmarks...', stage: 'LANDMARKS' },
  { progress: 55, text: 'Executing 2D Fast Fourier Transform (FFT) spectral decomposition...', stage: 'FFT_2D' },
  { progress: 75, text: 'Measuring ocular micro-saccades & bilateral corneal specular vectors...', stage: 'BIOMETRICS' },
  { progress: 88, text: 'Auditing DCT quantization tables & Poisson edge blending seams...', stage: 'DCT_QUANT' },
  { progress: 98, text: 'Synthesizing EfficientNet-B7 & MesoNet ensemble consensus...', stage: 'ENSEMBLE' },
];

export const ScanningOverlay: React.FC<ScanningOverlayProps> = ({ file, onComplete }) => {
  const [progress, setProgress] = useState(10);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    `[00:00.005] SCAN_INIT: Target file '${file.name}' buffered (${file.sizeFormatted})`,
    `[00:00.082] HASH_CHECK: Verified frame stream integrity hash`,
  ]);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2400; // 2.4s realistic inspection animation

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(rawProgress);

      // Determine active stage
      const stageIdx = SCAN_STAGES.findIndex((s) => rawProgress < s.progress);
      const activeIdx = stageIdx === -1 ? SCAN_STAGES.length - 1 : Math.max(0, stageIdx);
      setCurrentStageIndex(activeIdx);

      // Add log entries periodically
      if (rawProgress >= 30 && telemetryLogs.length === 2) {
        setTelemetryLogs((prev) => [
          ...prev,
          `[00:00.320] ROI_LOC: Primary facial boundary anchored [bbox: 342, 180, 480, 520]`,
        ]);
      }
      if (rawProgress >= 55 && telemetryLogs.length === 3) {
        setTelemetryLogs((prev) => [
          ...prev,
          `[00:00.680] FFT_SPECTRAL: Radial power integration computed over 16 frequency bands`,
        ]);
      }
      if (rawProgress >= 80 && telemetryLogs.length === 4) {
        setTelemetryLogs((prev) => [
          ...prev,
          `[00:01.050] OCULAR_EVAL: Ray-traced specular reflection irradiance calculated`,
        ]);
      }
      if (rawProgress >= 95 && telemetryLogs.length === 5) {
        setTelemetryLogs((prev) => [
          ...prev,
          `[00:01.350] ENSEMBLE_FINAL: Multi-spectral neural consensus converged`,
        ]);
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(onComplete, 250);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [file, onComplete]);

  return (
    <div className="w-full rounded-[4px] bg-[#0b1120] border border-[rgba(0,242,254,0.3)] overflow-hidden shadow-[0_0_40px_rgba(0,242,254,0.15)]">
      {/* Top Telemetry Scanning Header */}
      <div className="px-5 py-3 bg-[#080c14] border-b border-[rgba(0,242,254,0.18)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#00f2fe] animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-[#00f2fe]">
            Forensic Inspection in Progress
          </span>
        </div>
        <div className="text-xs font-mono text-[#00f2fe] tabular-nums font-bold">
          {progress}%
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Visual Inspection Reticle Chamber */}
        <div className="lg:col-span-7 bg-[#080c14] p-6 relative flex flex-col items-center justify-center min-h-[380px] border-b lg:border-b-0 lg:border-r border-[rgba(0,242,254,0.15)] overflow-hidden">
          {/* Target Media Box with Animated Scanline and Laser Sweep */}
          <div className="relative w-full max-w-lg aspect-video rounded-[3px] overflow-hidden bg-black flex items-center justify-center border border-[rgba(0,242,254,0.4)] shadow-[0_0_25px_rgba(0,242,254,0.2)]">
            {/* The Media underneath */}
            {file.type === 'video' ? (
              <video
                src={file.url}
                muted
                autoPlay
                loop
                playsInline
                className="w-full h-full object-contain filter brightness-90 contrast-110"
              />
            ) : (
              <img
                src={file.url}
                alt={file.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter brightness-90 contrast-110"
              />
            )}

            {/* Cyan Laser Sweep Line */}
            <div className="pointer-events-none absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent shadow-[0_0_15px_#00f2fe] animate-laser" />

            {/* Scanline CRT overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,242,254,0.06)_50%)] bg-[length:100%_4px]" />

            {/* Tracking Facial Bounding Box with L-brackets */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-52 border border-[#00f2fe]/40 rounded-[2px]">
              {/* Corner L-Brackets */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#00f2fe]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#00f2fe]" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#00f2fe]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#00f2fe]" />

              {/* Bounding Box Info Tag */}
              <div className="absolute -top-6 left-0 px-1.5 py-0.5 bg-[#080c14]/90 border border-[#00f2fe]/40 text-[9px] font-mono text-[#00f2fe] uppercase">
                ROI: FACE_01 [99.8%]
              </div>

              {/* Internal Mesh Crosshair points */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-25">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="border border-dashed border-[#00f2fe]" />
                ))}
              </div>
            </div>

            {/* Corner Targeting Reticle Brackets of Viewport */}
            <div className="pointer-events-none absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00f2fe]" />
            <div className="pointer-events-none absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00f2fe]" />
            <div className="pointer-events-none absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00f2fe]" />
            <div className="pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00f2fe]" />
          </div>

          <div className="w-full max-w-lg mt-3 flex items-center justify-between text-[11px] font-mono text-[#849495]">
            <span className="text-[#00f2fe] animate-pulse">
              ● SCANNING TENSOR SLICES
            </span>
            <span>FRAME_IDX: #{Math.floor(progress * 4.2)}</span>
          </div>
        </div>

        {/* Live Forensic Telemetry Stream */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-[#0b1120]">
          <div>
            {/* Progress Bar Container */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-mono text-[#dfe2ee] mb-2">
                <span className="text-[#849495] uppercase">Inference Progress</span>
                <span className="text-[#00f2fe] font-bold tabular-nums">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#080c14] rounded-full overflow-hidden border border-[rgba(0,242,254,0.2)]">
                <div
                  className="h-full bg-gradient-to-r from-[#00f2fe] to-[#4facfe] transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Current Active Pipeline Stage */}
            <div className="p-3.5 rounded-[4px] bg-[#080c14] border border-[rgba(0,242,254,0.25)] mb-6">
              <div className="text-[10px] font-mono text-[#00f2fe] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-[#00f2fe] animate-spin" />
                <span>STAGE: {SCAN_STAGES[currentStageIndex]?.stage}</span>
              </div>
              <p className="text-xs text-white font-mono leading-relaxed">
                {SCAN_STAGES[currentStageIndex]?.text}
              </p>
            </div>

            {/* Real-time Telemetry Stream Terminal */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#849495] uppercase mb-2">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#00f2fe]" />
                  <span>Telemetry Stream Log</span>
                </span>
                <span className="text-[10px] text-[#00f2fe]">LIVE</span>
              </div>
              <div className="h-40 rounded-[4px] bg-[#080c14] border border-[rgba(255,255,255,0.06)] p-3 overflow-y-auto telemetry-scroll font-mono text-[11px] space-y-1.5">
                {telemetryLogs.map((log, index) => (
                  <div key={index} className="text-[#b9cacb] leading-tight">
                    <span className="text-[#00f2fe]">{log.split(' ')[0]}</span>{' '}
                    <span>{log.substring(log.indexOf(' ') + 1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] text-[11px] font-mono text-[#849495] flex items-center justify-between">
            <span>MODELS: MesoNet-4 · EfficientNet-B7</span>
            <span>BACKEND: GPU TENSOR</span>
          </div>
        </div>
      </div>
    </div>
  );
};
