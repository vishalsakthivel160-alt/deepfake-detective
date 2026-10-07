import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#080c14] border-t border-[rgba(0,242,254,0.12)] py-12 text-sm text-[#849495] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[rgba(255,255,255,0.06)]">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[3px] bg-[#0b1120] border border-[rgba(0,242,254,0.3)] flex items-center justify-center text-[#00f2fe]">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base tracking-tight">
              Deepfake Detective
            </span>
            <span className="text-xs font-mono text-[#849495] ml-2">
              · AI Forensic Media Verification
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#b9cacb]">
            <a href="#hero" className="hover:text-[#00f2fe] transition-colors">
              Home
            </a>
            <a href="#scanner" className="hover:text-[#00f2fe] transition-colors">
              Forensic Scanner
            </a>
            <a href="#how-it-works" className="hover:text-[#00f2fe] transition-colors">
              Methodology
            </a>
            <a href="#technology" className="hover:text-[#00f2fe] transition-colors">
              Architecture
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#00f2fe] hover:underline cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#849495]">
          <div>
            © {new Date().getFullYear()} Deepfake Detective. Built for AI Forensic Research & Demonstration.
          </div>
          <div>
            Calibrated on FaceForensics++ & Celeb-DF
          </div>
        </div>
      </div>
    </footer>
  );
};
