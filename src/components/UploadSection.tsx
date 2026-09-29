import React, { useRef, useState } from 'react';
import { APP_CONFIG } from '../config/app';
import { parseResumeFile, parseResumeText } from '../services/resumeParser';
import { analyzeResume } from '../services/scoringEngine';
import { SAMPLE_RESUMES, SampleResume } from '../services/sampleResumes';
import { saveAnalysis } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { ATSAnalysisResult } from '../types';
import { Upload, FileText, AlertTriangle, ArrowRight, Edit3 } from 'lucide-react';

interface UploadSectionProps {
  onAnalysisComplete: (result: ATSAnalysisResult) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onAnalysisComplete }) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [inputMode, setInputMode] = useState<'file' | 'paste'>('file');
  const [pastedText, setPastedText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scannedPdfWarning, setScannedPdfWarning] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = async (file: File) => {
    setErrorMessage(null);
    setScannedPdfWarning(null);

    // 1. File size check
    if (file.size > APP_CONFIG.maxFileSizeBytes) {
      setErrorMessage(
        `File exceeds the ${APP_CONFIG.maxFileSizeMB} MB size limit. Please upload a smaller file.`
      );
      return;
    }

    // 2. Extension check
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !['pdf', 'docx', 'txt'].includes(ext)) {
      setErrorMessage(
        'Unsupported file format. Please upload a PDF (.pdf), Word document (.docx), or plain text (.txt) file.'
      );
      return;
    }

    setIsProcessing(true);

    try {
      const parsed = await parseResumeFile(file);

      // Check for scanned or image-only PDF
      if (parsed.isScannedOrImageOnly) {
        setIsProcessing(false);
        setScannedPdfWarning(
          'This file appears to be a scanned or image-only PDF. Applicant tracking systems cannot extract text from image files. Export your resume as a text-based PDF or DOCX file to continue.'
        );
        return;
      }

      const result = analyzeResume(
        parsed,
        file.name,
        file.size,
        ext as 'pdf' | 'docx' | 'txt',
        user?.id || 'guest-user'
      );

      saveAnalysis(result);
      setIsProcessing(false);
      onAnalysisComplete(result);
    } catch (err: unknown) {
      console.error('Processing error:', err);
      setIsProcessing(false);
      const msg = err instanceof Error ? err.message : 'Unknown parsing error occurred.';
      setErrorMessage(`Failed to parse resume: ${msg}. Please verify your document is readable.`);
    }
  };

  const handleAnalyzePastedText = () => {
    if (!pastedText.trim() || pastedText.trim().length < 50) {
      setErrorMessage('Please paste at least 50 characters of resume content to run an evaluation.');
      return;
    }

    setErrorMessage(null);
    setScannedPdfWarning(null);
    setIsProcessing(true);

    try {
      const parsed = parseResumeText(pastedText);
      const result = analyzeResume(
        parsed,
        'Pasted_Resume_Document.txt',
        pastedText.length,
        'txt',
        user?.id || 'guest-user'
      );

      saveAnalysis(result);
      setIsProcessing(false);
      onAnalysisComplete(result);
    } catch (err: unknown) {
      console.error('Processing error:', err);
      setIsProcessing(false);
      setErrorMessage('Failed to evaluate pasted resume text.');
    }
  };

  const loadSample = (sample: SampleResume) => {
    setErrorMessage(null);
    setScannedPdfWarning(null);
    setIsProcessing(true);

    try {
      const parsed = parseResumeText(sample.content);
      const result = analyzeResume(
        parsed,
        sample.fileName,
        sample.content.length,
        sample.fileType,
        user?.id || 'guest-user'
      );

      saveAnalysis(result);
      setIsProcessing(false);
      onAnalysisComplete(result);
    } catch (err) {
      console.error('Sample load error:', err);
      setIsProcessing(false);
      setErrorMessage('Failed to load sample resume.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-xs max-w-xs border border-neutral-200 dark:border-neutral-700">
        <button
          onClick={() => setInputMode('file')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-xs transition-colors ${
            inputMode === 'file'
              ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          Upload Document
        </button>
        <button
          onClick={() => setInputMode('paste')}
          className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-xs transition-colors ${
            inputMode === 'paste'
              ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          Paste Raw Text
        </button>
      </div>

      {inputMode === 'file' ? (
        /* Upload Drag and Drop Box */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-sm p-8 sm:p-14 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-neutral-900 dark:border-neutral-100 bg-neutral-50 dark:bg-neutral-900'
              : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500 bg-white dark:bg-neutral-900/60 shadow-xs'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload resume file"
          />

          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-xs bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-700 dark:text-neutral-300">
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-neutral-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Upload size={22} />
              )}
            </div>

            <div>
              <span className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 block">
                {isProcessing
                  ? 'Extracting text streams and computing ATS metrics...'
                  : 'Drop your resume file here or click to browse'}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 block">
                Supports standard PDF and Word (.docx) formats up to {APP_CONFIG.maxFileSizeMB} MB
              </span>
            </div>

            <div className="text-[11px] text-neutral-400 dark:text-neutral-500 pt-1">
              Private client extraction &middot; Text is parsed directly on your device
            </div>
          </div>
        </div>
      ) : (
        /* Paste Raw Text Box */
        <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              <Edit3 size={14} />
              <span>Paste Resume Contents</span>
            </div>
            <span className="text-xs text-neutral-400 tabular-nums font-mono">
              {pastedText.length} characters
            </span>
          </div>

          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            rows={10}
            placeholder="Paste your resume text here (Education, Experience, Projects, Skills)..."
            className="w-full p-3 font-mono text-xs border border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950 rounded-xs text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:border-neutral-900 dark:focus:border-neutral-100 leading-relaxed"
          />

          <div className="flex justify-end">
            <button
              onClick={handleAnalyzePastedText}
              disabled={isProcessing}
              className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
            >
              <span>{isProcessing ? 'Analyzing...' : 'Analyze Pasted Text'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Scanned PDF warning fallback message */}
      {scannedPdfWarning && (
        <div className="p-4 bg-amber-50/80 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800 rounded-sm text-xs space-y-1">
          <div className="font-semibold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
            <AlertTriangle size={15} />
            Image-only or scanned PDF detected
          </div>
          <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
            {scannedPdfWarning}
          </p>
        </div>
      )}

      {/* Error message */}
      {errorMessage && (
        <div className="p-4 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-sm text-xs text-neutral-800 dark:text-neutral-200">
          <span className="font-semibold block mb-0.5">Upload Notice:</span>
          {errorMessage}
        </div>
      )}

      {/* Quick Sample Selector for immediate evaluation */}
      <div className="border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 p-4 rounded-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 block">
              Test with real sample candidate resumes
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Load an actual student or early-career profile to test scoring accuracy in one click:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {SAMPLE_RESUMES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => loadSample(sample)}
                disabled={isProcessing}
                className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5"
              >
                <FileText size={13} />
                <span>{sample.name}</span>
                <ArrowRight size={12} className="text-neutral-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
