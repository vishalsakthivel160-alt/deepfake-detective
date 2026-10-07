import React from 'react';
import { Shield, Cpu, UploadCloud, Terminal } from 'lucide-react';

interface NavbarProps {
  onScanClick: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onScanClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#080c14]/90 backdrop-blur-md border-b border-[rgba(0,242,254,0.14)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element with forensic emblem) */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-[4px] bg-[#0b1120] border border-[rgba(0,242,254,0.35)] flex items-center justify-center text-[#00f2fe] shadow-[0_0_12px_rgba(0,242,254,0.2)] group-hover:border-[#00f2fe] transition-colors">
            <Shield className="w-4 h-4 text-[#00f2fe]" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#00f2fe] rounded-full animate-ping" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-[#00f2fe] transition-colors">
            Deepfake Detective
          </span>
        </a>

        {/* Zone 2: 4-6 Clean Text Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#b9cacb]">
          <a
            href="#scanner"
            className="hover:text-[#00f2fe] transition-colors"
          >
            Forensic Scanner
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#00f2fe] transition-colors"
          >
            How It Works
          </a>
          <a
            href="#technology"
            className="hover:text-[#00f2fe] transition-colors"
          >
            Architecture
          </a>
          <a
            href="#sample-benchmarks"
            className="hover:text-[#00f2fe] transition-colors"
          >
            Demo Samples
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onScanClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] text-xs font-semibold uppercase tracking-wider text-[#080c14] bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:shadow-[0_0_20px_rgba(0,242,254,0.45)] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Scan Media</span>
          </button>
        </div>
      </div>
    </header>
  );
};
