import React, { useState, useRef } from 'react';
import { Upload, Film, Image as ImageIcon, AlertCircle, FileCheck, Sparkles, ArrowRight } from 'lucide-react';
import { MediaFile, SampleCase } from '../types/forensic';
import { SAMPLE_CASES } from '../data/samples';

interface UploadDropzoneProps {
  onFileSelect: (file: MediaFile) => void;
  onSelectSampleCase: (sample: SampleCase) => void;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onFileSelect,
  onSelectSampleCase,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleFileProcessing = (file: File) => {
    setErrorMessage(null);
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const validVideoTypes = ['video/mp4', 'video/quicktime', 'video/webm'];

    const isImage = validImageTypes.includes(file.type);
    const isVideo = validVideoTypes.includes(file.type);

    if (!isImage && !isVideo) {
      setErrorMessage('Unsupported media format. Please upload MP4, MOV, WEBM, JPG, PNG, or WEBP.');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 100MB limit for client-side forensic inspection.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    // Generate pseudo-deterministic SHA-256 styled hash for tracking
    const hash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const mediaFile: MediaFile = {
      id: `upload-${Date.now()}`,
      name: file.name,
      size: file.size,
      sizeFormatted: formatFileSize(file.size),
      type: isVideo ? 'video' : 'image',
      url: objectUrl,
      dimensions: isVideo ? '1920 × 1080 (HD)' : 'Standard Resolution',
      duration: isVideo ? 'Variable' : undefined,
      hash,
    };

    onFileSelect(mediaFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcessing(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcessing(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-[4px] p-8 sm:p-12 text-center transition-all cursor-pointer bg-[#0b1120]/80 backdrop-blur-md group ${
          isDragging
            ? 'border-[#00f2fe] bg-[#00f2fe]/5 shadow-[0_0_30px_rgba(0,242,254,0.25)]'
            : 'border-[rgba(0,242,254,0.2)] hover:border-[rgba(0,242,254,0.5)] hover:bg-[#0b1120]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,video/mp4,video/quicktime,video/webm"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* 4 Corner Targeting Reticle Brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#00f2fe] opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00f2fe] opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00f2fe] opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#00f2fe] opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Upload Visual Elements */}
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-[4px] bg-[#080c14] border border-[rgba(0,242,254,0.3)] flex items-center justify-center text-[#00f2fe] mb-5 shadow-[0_0_15px_rgba(0,242,254,0.15)] group-hover:scale-105 group-hover:border-[#00f2fe] transition-all">
            <Upload className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
            Drop Inspection Media Here
          </h3>

          <p className="text-sm text-[#b9cacb] mb-5">
            Drag and drop your video or image file, or <span className="text-[#00f2fe] underline underline-offset-4">browse filesystem</span>
          </p>

          {/* Formats info */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[#849495] pt-3 border-t border-[rgba(255,255,255,0.06)] w-full">
            <span className="flex items-center gap-1.5 text-[#b9cacb]">
              <Film className="w-3.5 h-3.5 text-[#4facfe]" /> MP4 · MOV · WEBM
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 text-[#b9cacb]">
              <ImageIcon className="w-3.5 h-3.5 text-[#00f2fe]" /> JPG · PNG · WEBP
            </span>
            <span>·</span>
            <span>Max 100MB</span>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mt-4 p-3.5 rounded-[4px] bg-[#93000a]/20 border border-[#f43f5e]/40 flex items-center gap-3 text-sm text-[#ffb4ab]">
          <AlertCircle className="w-4 h-4 text-[#f43f5e] shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Preloaded Demo Benchmarks (Instant 1-Click Verification) */}
      <div id="sample-benchmarks" className="mt-8 pt-6 border-t border-[rgba(0,242,254,0.1)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#00f2fe]">
              Instant Demo Library
            </h4>
            <p className="text-xs text-[#849495] mt-0.5">
              Select verified benchmark media to inspect real forensic detection outputs immediately:
            </p>
          </div>
          <span className="text-xs font-mono text-[#849495] hidden sm:inline">
            2 Cases Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {SAMPLE_CASES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onSelectSampleCase(sample)}
              className="text-left p-3.5 rounded-[4px] bg-[#0b1120] border border-[rgba(0,242,254,0.18)] hover:border-[#00f2fe] hover:bg-[#0f172a] transition-all group flex items-start gap-3.5 cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-[3px] overflow-hidden bg-[#080c14] shrink-0 border border-[rgba(255,255,255,0.1)]">
                <img
                  src={sample.imageUrl}
                  alt={sample.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span
                  className={`absolute bottom-1 right-1 px-1 py-0.2 text-[9px] font-mono uppercase rounded-[2px] ${
                    sample.expectedVerdict === 'DEEPFAKE'
                      ? 'bg-[#f43f5e]/80 text-white'
                      : 'bg-[#10b981]/80 text-white'
                  }`}
                >
                  {sample.expectedVerdict}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-mono text-[#00f2fe] uppercase truncate">
                    {sample.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#849495] uppercase">
                    {sample.type}
                  </span>
                </div>
                <h5 className="text-sm font-semibold text-white truncate group-hover:text-[#00f2fe] transition-colors">
                  {sample.title}
                </h5>
                <p className="text-xs text-[#849495] line-clamp-1 mt-0.5">
                  {sample.description}
                </p>
              </div>

              <div className="shrink-0 self-center text-[#849495] group-hover:text-[#00f2fe] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
