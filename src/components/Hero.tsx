import React from 'react';
import { ArrowDown, CheckCircle2, ShieldCheck, Activity, Radio, Cpu } from 'lucide-react';

interface HeroProps {
  onScanClick: () => void;
  onSelectSample: (sampleId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScanClick, onSelectSample }) => {
  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[rgba(0,242,254,0.1)] overflow-hidden">
      {/* Background Ambient Radial Highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-[#00f2fe]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-[#4facfe]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Telemetry Micro Header */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-[4px] bg-[#0b1120] border border-[rgba(0,242,254,0.22)] text-[11px] font-mono tracking-wider text-[#00f2fe] uppercase">
            <Radio className="w-3 h-3 text-[#00f2fe] animate-pulse" />
            <span>Multi-Spectral Neural Forensic Engine</span>
            <span className="text-[#849495]">·</span>
            <span className="text-[#dfe2ee]">v2.6 Research Pipeline</span>
          </div>

          {/* Display Hero Headline with Balanced Wrap */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 [text-wrap:balance]">
            Detect What's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-[#9bcbff] to-[#4facfe]">Real.</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#b9cacb] max-w-2xl mx-auto mb-10 leading-relaxed [text-wrap:balance]">
            Deepfake Detective analyzes videos and still frames for synthetic manipulation, deep neural face-swaps, and generative diffusion artifacts using 6-vector mathematical forensic decomposition.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <button
              onClick={onScanClick}
              className="px-6 py-3.5 rounded-[4px] text-sm font-semibold tracking-wide text-[#080c14] bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:shadow-[0_0_25px_rgba(0,242,254,0.5)] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Inspect Media Now</span>
            </button>
            <a
              href="#how-it-works"
              className="px-6 py-3.5 rounded-[4px] text-sm font-medium text-[#00f2fe] bg-[#0b1120]/80 border border-[rgba(0,242,254,0.3)] hover:bg-[rgba(0,242,254,0.08)] hover:border-[#00f2fe] transition-all"
            >
              Explore Verification Pipeline
            </a>
          </div>

          {/* Telemetry Stat Bar (Unboxed clean layout, tabular-nums) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-[4px] bg-[#0b1120]/70 border border-[rgba(0,242,254,0.15)] backdrop-blur-md text-left">
            <div className="p-2 border-r border-[rgba(255,255,255,0.06)] last:border-r-0">
              <div className="text-xs font-mono uppercase tracking-wider text-[#849495] mb-1">Benchmark Precision</div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums flex items-baseline gap-1">
                99.2<span className="text-sm text-[#00f2fe]">%</span>
              </div>
              <div className="text-[11px] text-[#849495] mt-0.5">FaceForensics++ dataset</div>
            </div>

            <div className="p-2 border-r border-[rgba(255,255,255,0.06)] last:border-r-0">
              <div className="text-xs font-mono uppercase tracking-wider text-[#849495] mb-1">Inference Latency</div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums flex items-baseline gap-1">
                128<span className="text-sm text-[#4facfe]">ms</span>
              </div>
              <div className="text-[11px] text-[#849495] mt-0.5">GPU batch tensor pass</div>
            </div>

            <div className="p-2 border-r border-[rgba(255,255,255,0.06)] last:border-r-0">
              <div className="text-xs font-mono uppercase tracking-wider text-[#849495] mb-1">Forensic Vectors</div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums flex items-baseline gap-1">
                6<span className="text-sm text-[#10b981]">Layers</span>
              </div>
              <div className="text-[11px] text-[#849495] mt-0.5">Spectral, biometric, audio</div>
            </div>

            <div className="p-2">
              <div className="text-xs font-mono uppercase tracking-wider text-[#849495] mb-1">Architectures Caught</div>
              <div className="text-2xl font-bold font-mono text-white tabular-nums flex items-baseline gap-1">
                14<span className="text-sm text-[#00f2fe]">+</span>
              </div>
              <div className="text-[11px] text-[#849495] mt-0.5">FaceSwap, Wav2Lip, Sora, etc.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
