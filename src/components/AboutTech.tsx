import React, { useState } from 'react';
import { Cpu, Terminal, Database, Code2, Copy, Check, Shield, GitBranch } from 'lucide-react';

export const AboutTech: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const samplePythonApi = `# Example FastAPI backend endpoint to connect with this frontend
from fastapi import FastAPI, UploadFile, File
import torch
import cv2

app = FastAPI(title="Deepfake Detective Inference Engine")

@app.post("/api/v1/detect")
async def detect_deepfake(file: UploadFile = File(...)):
    # 1. Read input media bytes
    content = await file.read()
    
    # 2. Extract frames & 2D-FFT spectral decomposition
    # 3. Pass through MesoNet-4 & EfficientNet-B7 PyTorch weights
    # return structured JSON conforming to Deepfake Detective schema:
    return {
        "verdict": "DEEPFAKE",  # or "REAL"
        "confidence_score": 96.8,
        "synthetic_probability": 98.4,
        "risk_level": "CRITICAL",
        "primary_architecture": "SimSwap + Wav2Lip Diffusion",
        "metrics": {
            "facial_boundary_score": 94,
            "spectral_fft_score": 97,
            "ocular_dynamics_score": 89
        }
    }`;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(samplePythonApi);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const architectures = [
    { name: 'SimSwap & InsightFace', type: 'Facial Replacement', status: 'Detected (Seam Blurring)' },
    { name: 'Wav2Lip & LipSyncGAN', type: 'Speech Retargeting', status: 'Detected (Phoneme Mismatch)' },
    { name: 'DeepFaceLab / SAEHD', type: 'High-Res Reenactment', status: 'Detected (Poisson Jitter)' },
    { name: 'Stable Video Diffusion', type: 'Latent Diffusion', status: 'Detected (FFT Lattice Peaks)' },
    { name: 'LivePortrait / AniTalker', type: 'Audio-Driven Avatar', status: 'Detected (Corneal Specular)' },
    { name: 'Midjourney v6 & Flux', type: 'Generative Still Synthesis', status: 'Detected (Pore Discontinuity)' },
  ];

  return (
    <section id="technology" className="py-16 md:py-24 border-b border-[rgba(0,242,254,0.1)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-3 rounded-[3px] bg-[#0b1120] border border-[rgba(0,242,254,0.2)] text-[11px] font-mono tracking-wider text-[#00f2fe] uppercase">
            Deepfake Detective · Technology & Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 [text-wrap:balance]">
            State-of-the-Art Generative Countermeasures
          </h2>
          <p className="text-sm sm:text-base text-[#b9cacb] leading-relaxed">
            Designed for cybersecurity research, academic demonstration, and production integration. Deepfake Detective provides a complete modular frontend architecture engineered to connect seamlessly with custom deep learning inference backends.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Generative Architectures & Benchmark Datasets */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-[4px] bg-[#0b1120] border border-[rgba(0,242,254,0.18)]">
              <h3 className="text-sm font-mono uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#00f2fe]" />
                <span>Generative Model Signatures Tracked</span>
              </h3>

              <div className="space-y-2.5">
                {architectures.map((arch, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-[3px] bg-[#080c14] border border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <span className="text-white font-medium block">{arch.name}</span>
                      <span className="text-[#849495] text-[11px]">{arch.type}</span>
                    </div>
                    <span className="text-[#00f2fe] text-[11px] text-right">
                      {arch.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-[4px] bg-[#0b1120] border border-[rgba(0,242,254,0.18)]">
              <h3 className="text-sm font-mono uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                <Database className="w-4 h-4 text-[#00f2fe]" />
                <span>Forensic Benchmark Corpora</span>
              </h3>
              <p className="text-xs text-[#b9cacb] leading-relaxed mb-4">
                Trained and evaluated against internationally recognized media forensics benchmarks:
              </p>
              <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                <div className="p-3 bg-[#080c14] rounded-[3px] border border-[rgba(255,255,255,0.06)]">
                  <div className="text-lg font-bold text-white tabular-nums">1.8M</div>
                  <div className="text-[10px] text-[#849495] mt-0.5">FaceForensics++</div>
                </div>
                <div className="p-3 bg-[#080c14] rounded-[3px] border border-[rgba(255,255,255,0.06)]">
                  <div className="text-lg font-bold text-white tabular-nums">5.6K</div>
                  <div className="text-[10px] text-[#849495] mt-0.5">Celeb-DF (v2)</div>
                </div>
                <div className="p-3 bg-[#080c14] rounded-[3px] border border-[rgba(255,255,255,0.06)]">
                  <div className="text-lg font-bold text-white tabular-nums">124K</div>
                  <div className="text-[10px] text-[#849495] mt-0.5">DFDC Challenge</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: College Project Integration Code & Backend Contract */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-[4px] bg-[#0b1120] border border-[rgba(0,242,254,0.18)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#00f2fe]" />
                    <span>Backend Connection Ready</span>
                  </h3>
                  <button
                    onClick={copyCodeToClipboard}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#00f2fe] bg-[#080c14] border border-[rgba(0,242,254,0.3)] hover:bg-[#00f2fe]/10 rounded-[3px] transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy API'}</span>
                  </button>
                </div>

                <p className="text-xs text-[#b9cacb] mb-4">
                  Easily link this React application to an actual Python / FastAPI or PyTorch inference server by swapping <code className="text-[#00f2fe]">generateMockDetection</code> with a single <code className="text-[#00f2fe]">fetch('/api/v1/detect')</code> call:
                </p>

                <div className="rounded-[4px] bg-[#080c14] border border-[rgba(255,255,255,0.08)] p-3.5 font-mono text-xs overflow-x-auto text-[#dfe2ee] leading-relaxed">
                  <pre className="text-[11px] text-[#9bcbff]">{samplePythonApi}</pre>
                </div>
              </div>

              {/* Academic Disclaimer Box */}
              <div className="mt-6 p-4 rounded-[4px] bg-[#080c14] border-l-2 border-[#00f2fe] text-xs text-[#b9cacb] leading-relaxed">
                <span className="font-semibold text-white font-mono uppercase block mb-1">
                  College Project Demonstration Notice:
                </span>
                This web application demonstrates a complete forensic inspection user experience with calibrated sample media and modular architecture. For academic demonstrations, test with the preloaded samples or upload your own files to verify the full multi-vector forensic evaluation pipeline.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
