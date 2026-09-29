import React from 'react';
import { APP_CONFIG, APP_NAME } from '../config/app';

interface PrivacyPageProps {
  navigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-14 space-y-10 text-neutral-800 dark:text-neutral-200">
      <div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-1">
          Legal &middot; Privacy Documentation
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Effective Date: September 28, 2026 &middot; Entity: {APP_CONFIG.legalEntityPlaceholder}
        </p>
      </div>

      <div className="space-y-8 text-xs leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            1. Overview and Core Philosophy
          </h2>
          <p>
            This Privacy Policy explains how {APP_CONFIG.legalEntityPlaceholder} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates {APP_NAME} and handles information you provide when using our website and resume auditing services.
          </p>
          <p>
            We adhere to a data minimization standard: we process your resume solely to calculate ATS scores, detect formatting flaws, evaluate job match percentages, and compile preparation roadmaps. We do not sell your personal data, and we do not use your resume contents to train public machine learning models.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            2. Resume Data Collected and Parsing Mechanism
          </h2>
          <p>
            When you upload a resume in PDF, DOCX, or text format, {APP_NAME} parses the document to extract plain text lines. Extracted elements include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact details: name, email address, phone number, and online links (such as GitHub and LinkedIn profiles).</li>
            <li>Educational history: institution names, degrees pursued, graduation dates, and declared GPAs.</li>
            <li>Employment and internship records: employer names, job titles, tenures, and responsibility bullet points.</li>
            <li>Project and skill inventories: programming languages, developer tools, libraries, and project summaries.</li>
          </ul>
          <p>
            Parsing is conducted via client-side libraries in your web browser environment. Files are not broadcast to third-party advertising brokers or public file hosting buckets.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            3. Data Retention and User Deletion Rights
          </h2>
          <p>
            You maintain full sovereignty over all documents and audit records. Your data is retained only as long as you maintain an account or keep the browser storage record active.
          </p>
          <p>
            You can delete any single resume analysis immediately from the Dashboard. You can also delete your entire account, all uploaded resume files, and all historical audit metrics with a single action via the Settings page. Upon clicking delete, records are permanently erased from storage.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            4. Third-Party Processors and Hosting
          </h2>
          <p>
            Our web application is deployed using secure cloud container infrastructure under standard server access logging protocols. We do not integrate third-party tracking pixels, marketing cookies, social media trackers, or third-party telemetry scripts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            5. Cookies and Local Storage
          </h2>
          <p>
            {APP_NAME} uses local storage exclusively for essential functional purposes: storing authentication tokens, persisting your active theme preference (light or dark mode), and caching your analysis records on your device. We do not use advertising or behavioral tracking cookies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            6. Governing Jurisdiction and Contact Information
          </h2>
          <p>
            This Privacy Policy is governed by the laws of {APP_CONFIG.jurisdictionPlaceholder}.
          </p>
          <p>
            For privacy inquiries, data subject requests, or technical support, contact our designated privacy officer at: {APP_CONFIG.supportEmailPlaceholder}.
          </p>
        </section>
      </div>
    </div>
  );
};
