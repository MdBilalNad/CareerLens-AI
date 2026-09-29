import React from 'react';
import { APP_CONFIG, APP_NAME } from '../config/app';

interface TermsPageProps {
  navigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-14 space-y-10 text-neutral-800 dark:text-neutral-200">
      <div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-1">
          Legal &middot; Agreement
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Terms and Conditions
        </h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          Effective Date: September 28, 2026 &middot; Entity: {APP_CONFIG.legalEntityPlaceholder}
        </p>
      </div>

      <div className="space-y-8 text-xs leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using {APP_NAME}, operated by {APP_CONFIG.legalEntityPlaceholder} (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must discontinue use of the service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            2. Scope of Service and Disclaimers
          </h2>
          <p>
            {APP_NAME} provides automated resume parsing, deterministic ATS compatibility auditing, role archetype matching, and structured learning roadmaps for informational and self-improvement purposes.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Estimates and Variations:</strong> ATS scores represent deterministic estimations based on public applicant tracking software guidelines. Different employer platforms, recruiters, and hiring managers maintain varying criteria. We do not guarantee interview invitations, callbacks, or employment offers.
            </li>
            <li>
              <strong>Role Archetypes:</strong> Displayed job matches correspond to standardized industry role profiles, not live job vacancies or hiring commitments. We do not claim any affiliation with listed job classifications or corporate employers.
            </li>
            <li>
              <strong>Roadmap Recommendations:</strong> Skill and project suggestions reflect general engineering best practices. They do not constitute formal academic accreditation or vocational guarantees.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            3. User Representations and Document Ownership
          </h2>
          <p>
            You represent that any resume document you upload is your own personal document or that you possess explicit authorization from the candidate to process the file. You retain full copyright and ownership of all submitted text and documents.
          </p>
          <p>
            You agree not to upload corrupted files, malicious scripts, or documents containing unlawful content. We reserve the right to reject files that exceed our {APP_CONFIG.maxFileSizeMB} MB limit or violate formatting integrity.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            4. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, {APP_CONFIG.legalEntityPlaceholder} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of employment opportunities, profits, or data, arising from your reliance on our scoring or roadmap outputs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            5. Termination and Data Deletion
          </h2>
          <p>
            You may terminate your account and wipe all stored documents at any time using the one-click deletion feature in your Settings dashboard. We reserve the right to suspend accounts that abuse our platform or attempt to reverse-engineer our infrastructure.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            6. Governing Law and Disputes
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of {APP_CONFIG.jurisdictionPlaceholder}, without regard to conflict of law provisions.
          </p>
          <p>
            For questions regarding these Terms, contact our legal department at: {APP_CONFIG.supportEmailPlaceholder}.
          </p>
        </section>
      </div>
    </div>
  );
};
