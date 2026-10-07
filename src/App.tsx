import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UploadDropzone } from './components/UploadDropzone';
import { MediaPreview } from './components/MediaPreview';
import { ScanningOverlay } from './components/ScanningOverlay';
import { DetectionResultView } from './components/DetectionResultView';
import { HowItWorks } from './components/HowItWorks';
import { AboutTech } from './components/AboutTech';
import { Footer } from './components/Footer';
import { MediaFile, DetectionResult, SampleCase, VerdictType } from './types/forensic';
import { SAMPLE_CASES, generateMockDetection } from './data/samples';

type ScanState = 'idle' | 'preview' | 'scanning' | 'result';

export default function App() {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [currentResult, setCurrentResult] = useState<DetectionResult | null>(null);
  const [simulatedVerdict, setSimulatedVerdict] = useState<VerdictType | undefined>(undefined);

  const scrollToScanner = () => {
    const el = document.getElementById('scanner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileSelect = (file: MediaFile) => {
    setSelectedFile(file);
    setCurrentResult(null);
    setScanState('preview');
  };

  const handleSelectSampleCase = (sample: SampleCase) => {
    setSelectedFile(sample.sampleResult.mediaFile);
    setCurrentResult(sample.sampleResult);
    setSimulatedVerdict(sample.expectedVerdict);
    setScanState('preview');
    scrollToScanner();
  };

  const handleStartDetection = (overrideVerdict?: VerdictType) => {
    if (!selectedFile) return;
    setSimulatedVerdict(overrideVerdict);
    setScanState('scanning');
  };

  const handleScanningComplete = () => {
    if (!selectedFile) return;

    // Check if this matches a pre-configured sample case
    const matchedSample = SAMPLE_CASES.find(
      (s) => s.sampleResult.mediaFile.name === selectedFile.name
    );

    if (matchedSample && !simulatedVerdict) {
      setCurrentResult(matchedSample.sampleResult);
    } else {
      const generated = generateMockDetection(selectedFile, simulatedVerdict);
      setCurrentResult(generated);
    }

    setScanState('result');
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCurrentResult(null);
    setSimulatedVerdict(undefined);
    setScanState('idle');
    scrollToScanner();
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-[#dfe2ee] bg-forensic-grid selection:bg-[#00f2fe]/20 selection:text-[#00f2fe]">
      {/* Navigation Top Bar */}
      <Navbar onScanClick={scrollToScanner} activeSection="scanner" />

      <main>
        {/* Hero Section */}
        <Hero
          onScanClick={scrollToScanner}
          onSelectSample={(sampleId) => {
            const sample = SAMPLE_CASES.find((s) => s.id === sampleId);
            if (sample) handleSelectSampleCase(sample);
          }}
        />

        {/* Core Forensic Inspection Workspace / Scanner */}
        <section id="scanner" className="py-12 sm:py-16 md:py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-2 rounded-[3px] bg-[#0b1120] border border-[rgba(0,242,254,0.2)] text-[11px] font-mono tracking-wider text-[#00f2fe] uppercase">
                  Forensic Media Inspection Chamber
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {scanState === 'result'
                    ? 'Forensic Verification Report'
                    : scanState === 'scanning'
                    ? 'Neural Scanning & Spectral Deconvolution'
                    : scanState === 'preview'
                    ? 'Target Stream Pre-Flight Buffer'
                    : 'Upload Media for Deepfake Detection'}
                </h2>
              </div>

              {scanState !== 'idle' && (
                <div className="text-xs font-mono text-[#849495] flex items-center gap-2">
                  <span>SESSION ID:</span>
                  <span className="text-[#00f2fe]">
                    AUD-{selectedFile?.id.slice(-6).toUpperCase() || 'LIVE'}
                  </span>
                </div>
              )}
            </div>

            {/* Dynamic Viewport Container */}
            <div className="w-full">
              {scanState === 'idle' && (
                <UploadDropzone
                  onFileSelect={handleFileSelect}
                  onSelectSampleCase={handleSelectSampleCase}
                />
              )}

              {scanState === 'preview' && selectedFile && (
                <MediaPreview
                  file={selectedFile}
                  onStartDetection={handleStartDetection}
                  onReset={handleReset}
                />
              )}

              {scanState === 'scanning' && selectedFile && (
                <ScanningOverlay
                  file={selectedFile}
                  onComplete={handleScanningComplete}
                />
              )}

              {scanState === 'result' && currentResult && (
                <DetectionResultView
                  result={currentResult}
                  onReset={handleReset}
                />
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />

        {/* About & Technology Section */}
        <AboutTech />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
