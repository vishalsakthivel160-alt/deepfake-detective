import React from 'react';
import { X, Printer, Download, ShieldCheck, ShieldAlert, FileText, CheckCircle2, Lock } from 'lucide-react';
import { DetectionResult } from '../types/forensic';

interface ReportModalProps {
  result: DetectionResult;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ result, onClose }) => {
  const isDeepfake = result.verdict === 'DEEPFAKE';

  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Forensic_Report_${result.mediaFile.name}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto no-print">
      <div className="relative w-full max-w-4xl bg-[#0b1120] border border-[rgba(0,242,254,0.3)] rounded-[4px] shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden my-8 report-printable">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#080c14] border-b border-[rgba(0,242,254,0.18)] flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00f2fe]" />
            <span className="text-sm font-mono uppercase tracking-wider text-white">
              Forensic Audit Certificate & Comprehensive Report
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              className="px-3 py-1.5 rounded-[4px] text-xs font-mono text-[#00f2fe] border border-[rgba(0,242,254,0.3)] hover:bg-[#00f2fe]/10 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-[4px] text-xs font-mono font-semibold text-[#080c14] bg-[#00f2fe] hover:bg-[#6ff6ff] transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,242,254,0.4)]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-[4px] text-[#849495] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Content Body */}
        <div className="p-6 sm:p-8 space-y-8 bg-[#0b1120] text-[#dfe2ee]">
          {/* Header & Watermark */}
          <div className="border-b border-[rgba(0,242,254,0.15)] pb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#00f2fe]">
                  DEEPFAKE DETECTIVE FORENSIC LABS
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Digital Media Forensic Verification Certificate
              </h2>
              <p className="text-xs font-mono text-[#849495] mt-1">
                REPORT REF: CERT-{result.id.toUpperCase()} · AUDIT TIME: {result.timestamp}
              </p>
            </div>

            {/* Verdict Box */}
            <div
              className={`px-5 py-3 rounded-[4px] border text-right ${
                isDeepfake
                  ? 'bg-[#93000a]/20 border-[#f43f5e] text-[#f43f5e]'
                  : 'bg-[#003824]/20 border-[#10b981] text-[#10b981]'
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-wider">
                FINAL VERDICT
              </div>
              <div className="text-2xl font-black font-mono tracking-tight">
                {result.verdict}
              </div>
              <div className="text-xs font-mono">
                Confidence: {result.confidenceScore}% · Risk: {result.riskLevel}
              </div>
            </div>
          </div>

          {/* Media Evidence Specs */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#00f2fe] mb-3">
              1. Ingested Evidence Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#080c14] rounded-[3px] border border-[rgba(255,255,255,0.06)]">
                <span className="text-[#849495] block text-[10px]">FILE NAME</span>
                <span className="text-white truncate block font-medium mt-0.5">{result.mediaFile.name}</span>
              </div>
              <div className="p-3 bg-[#080c14] rounded-[3px] border border-[rgba(255,255,255,0.06)]">
                <span className="text-[#849495] block text-[10px]">PAYLOAD SIZE</span>
                <span className="text-white block font-medium mt-0.5">{result.mediaFile.sizeFormatted}</span>
              </div>
              <div className="p-3 bg-[#080c14] rounded-[3px] border border-[rgba(255,255,255,0.06)]">
                <span className="text-[#849495] block text-[10px]">FRAMES AUDITED</span>
                <span className="text-white block font-medium mt-0.5">{result.framesAnalyzed} Frames</span>
              </div>
              <div className="p-3 bg-[#080c14] rounded-[3px] border border-[rgba(255,255,255,0.06)]">
                <span className="text-[#849495] block text-[10px]">INFERENCE TIME</span>
                <span className="text-white block font-medium mt-0.5">{result.inferenceDurationMs} ms</span>
              </div>
            </div>

            <div className="mt-2 p-2.5 bg-[#080c14] rounded-[3px] border border-[rgba(255,255,255,0.06)] text-xs font-mono">
              <span className="text-[#849495] text-[10px] block">CRYPTOGRAPHIC INTEGRITY HASH (SHA-256):</span>
              <span className="text-[#00f2fe] break-all select-all">{result.integrityHash}</span>
            </div>
          </div>

          {/* Executive & Detailed Analysis */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#00f2fe]">
              2. Executive Summary & Findings
            </h3>
            <div className="p-4 rounded-[4px] bg-[#080c14] border border-[rgba(0,242,254,0.15)] text-sm text-[#dfe2ee] leading-relaxed">
              <p className="font-medium text-white mb-2">{result.executiveSummary}</p>
              <p className="text-xs text-[#b9cacb] font-sans leading-normal">{result.detailedAnalysis}</p>
            </div>
          </div>

          {/* Technical Metric Scores Table */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#00f2fe] mb-3">
              3. Six-Vector Forensic Metric Breakdown
            </h3>
            <div className="overflow-x-auto border border-[rgba(255,255,255,0.08)] rounded-[4px]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#080c14] border-b border-[rgba(255,255,255,0.08)] text-[#849495]">
                  <tr>
                    <th className="py-2.5 px-3">Forensic Vector</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Anomaly Index</th>
                    <th className="py-2.5 px-3">Technical Finding</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.04)] bg-[#0b1120]">
                  {Object.values(result.metrics).map((metric) => (
                    <tr key={metric.id}>
                      <td className="py-2.5 px-3 font-medium text-white">{metric.title}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`uppercase text-[10px] font-bold ${
                            metric.status === 'anomaly'
                              ? 'text-[#f43f5e]'
                              : metric.status === 'warning'
                              ? 'text-[#9bcbff]'
                              : 'text-[#10b981]'
                          }`}
                        >
                          {metric.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 tabular-nums font-bold text-[#00f2fe]">
                        {metric.score}/100
                      </td>
                      <td className="py-2.5 px-3 text-[#b9cacb] text-[11px]">{metric.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legal / Research Project Attestation */}
          <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#849495] gap-4">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#00f2fe]" />
              <span>CRYPTOGRAPHICALLY SEALED BY DEEPFAKE DETECTIVE FORENSIC ENGINE</span>
            </div>
            <div>STATUS: VERIFIED AUDIT READY</div>
          </div>
        </div>
      </div>
    </div>
  );
};
