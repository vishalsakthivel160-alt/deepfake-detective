import React from 'react';
import { Scan, Cpu, AudioWaveform, ShieldCheck, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Frame Ingest & Facial ROI Tracking',
      subtitle: 'RetinaFace & 3D Spatial Landmarks',
      description: 'Incoming video or still image streams are demuxed into frame tensor buffers. High-resolution facial detection anchors 68 three-dimensional biological points across eyebrows, ocular sockets, nasal bridge, and jaw contour.',
      icon: Scan,
      tag: 'Spatial Alignment',
    },
    {
      step: '02',
      title: '2D-FFT Spectral Decomposition',
      subtitle: 'Fourier Domain Fingerprinting',
      description: 'Generative models leave distinct periodic lattice traces from transposed convolution upsamplers. Radial 2D Fast Fourier Transform analyzes azimuth power frequency against natural 1/f optical decay rates.',
      icon: AudioWaveform,
      tag: 'Frequency Forensics',
    },
    {
      step: '03',
      title: 'Physiological Biometrics & Gaze',
      subtitle: 'Corneal Specular & Oculomotor Kinematics',
      description: 'Biological micro-movements, spontaneous blink distributions, and specular light reflections in the cornea are evaluated using ray-traced geometric consistency with scene illumination normal fields.',
      icon: Cpu,
      tag: 'Biometric Integrity',
    },
    {
      step: '04',
      title: 'Ensemble Consensus Classification',
      subtitle: 'EfficientNet-B7 + MesoNet + ViT',
      description: 'Multi-stream outputs feed into a weighted forensic classifier trained on over 500,000 synthetic and authentic video sequences from FaceForensics++, Celeb-DF, and DeepFake Detection Challenge (DFDC).',
      icon: ShieldCheck,
      tag: 'Neural Decision',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 border-b border-[rgba(0,242,254,0.1)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 rounded-[3px] bg-[#0b1120] border border-[rgba(0,242,254,0.2)] text-[11px] font-mono tracking-wider text-[#00f2fe] uppercase">
            Four-Stage Verification Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 [text-wrap:balance]">
            How Deepfake Detective Unmasks Synthetic Media
          </h2>
          <p className="text-sm sm:text-base text-[#b9cacb] leading-relaxed">
            Unlike surface-level heuristics, our multi-modal forensic pipeline deconstructs media across spatial, frequency, temporal, and biological vectors to uncover imperceptible algorithmic signatures.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative p-6 rounded-[4px] bg-[#0b1120] border border-[rgba(0,242,254,0.18)] hover:border-[#00f2fe] transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Step index & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black font-mono text-[#00f2fe] group-hover:drop-shadow-[0_0_8px_#00f2fe] transition-all">
                      {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-[3px] bg-[#080c14] border border-[rgba(0,242,254,0.3)] flex items-center justify-center text-[#00f2fe] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#4facfe] mb-1">
                    {s.tag}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#00f2fe] transition-colors">
                    {s.title}
                  </h3>
                  <div className="text-xs font-mono text-[#849495] mb-3">
                    {s.subtitle}
                  </div>
                  <p className="text-xs text-[#b9cacb] leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] font-mono text-[#849495]">
                  <span>STAGE {s.step} AUDIT</span>
                  <span className="text-[#00f2fe] opacity-0 group-hover:opacity-100 transition-opacity">
                    ACTIVE
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
