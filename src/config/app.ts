// Application configuration constants
// All app-wide naming and scoring version constants live here

export const APP_NAME = "CareerLens";
export const APP_TAGLINE = "Resume analysis and career roadmap for early-career candidates";
export const SCORING_VERSION = "v1.2.0";

export const APP_CONFIG = {
  name: APP_NAME,
  version: SCORING_VERSION,
  maxFileSizeMB: 5,
  maxFileSizeBytes: 5 * 1024 * 1024,
  acceptedFileTypes: [".pdf", ".docx", ".txt"],
  acceptedMimeTypes: [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ],
  supportEmailPlaceholder: "[support@careerlens.example.com]",
  legalEntityPlaceholder: "[CareerLens Technologies Inc.]",
  jurisdictionPlaceholder: "[State of Delaware, United States]",
};
