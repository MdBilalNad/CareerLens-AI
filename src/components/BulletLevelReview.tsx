import React, { useState } from 'react';
import { BulletReviewItem } from '../types';
import { Check, Copy, AlertTriangle, ArrowRight } from 'lucide-react';

interface BulletLevelReviewProps {
  bullets: BulletReviewItem[];
}

export const BulletLevelReview: React.FC<BulletLevelReviewProps> = ({ bullets }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'needs-work' | 'strong'>('all');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredBullets = bullets.filter((b) => {
    if (selectedFilter === 'needs-work') return b.score < 75;
    if (selectedFilter === 'strong') return b.score >= 75;
    return true;
  });

  if (bullets.length === 0) {
    return (
      <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm p-6 text-center text-xs text-neutral-500">
        No individual bullet points detected under Experience or Projects. Add bullet points starting with a dash or bullet character to receive line-by-line evaluations.
      </div>
    );
  }

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm divide-y divide-neutral-200 dark:divide-neutral-800">
      {/* Header and Filter */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-50/60 dark:bg-neutral-900/60">
        <div>
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Bullet-Level Impact Review ({bullets.length} lines evaluated)
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Every bullet evaluated for opening action verbs, quantified outcomes, and passive phrasing.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-2.5 py-1 rounded-xs border transition-colors ${
              selectedFilter === 'all'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 font-medium'
                : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            All ({bullets.length})
          </button>
          <button
            onClick={() => setSelectedFilter('needs-work')}
            className={`px-2.5 py-1 rounded-xs border transition-colors ${
              selectedFilter === 'needs-work'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 font-medium'
                : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            Needs Refinement ({bullets.filter((b) => b.score < 75).length})
          </button>
          <button
            onClick={() => setSelectedFilter('strong')}
            className={`px-2.5 py-1 rounded-xs border transition-colors ${
              selectedFilter === 'strong'
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-900 dark:border-neutral-100 font-medium'
                : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            Strong ({bullets.filter((b) => b.score >= 75).length})
          </button>
        </div>
      </div>

      {/* Bullets List */}
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {filteredBullets.map((bullet) => {
          const scoreBadgeClass =
            bullet.score >= 80
              ? 'text-neutral-900 dark:text-neutral-100 font-semibold'
              : bullet.score >= 60
              ? 'text-neutral-700 dark:text-neutral-300 font-medium'
              : 'text-neutral-500 font-medium';

          return (
            <div key={bullet.id} className="p-4 sm:p-5 space-y-3">
              {/* Top row: Section tag, score, word count */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                    {bullet.section}
                  </span>
                  <span aria-hidden="true">&middot;</span>
                  <span className="tabular-nums text-neutral-500 font-mono text-[11px]">
                    {bullet.wordCount} words
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-neutral-400 font-mono uppercase">Impact Score</span>
                  <span className={`tabular-nums font-mono text-xs ${scoreBadgeClass}`}>
                    {bullet.score} / 100
                  </span>
                </div>
              </div>

              {/* Original text block */}
              <div className="p-3 bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/80 rounded-xs text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-mono">
                &quot;{bullet.originalText}&quot;
              </div>

              {/* Reasons list */}
              <div className="space-y-1">
                {bullet.reasons.map((reason, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-1.5 text-[11px] text-neutral-600 dark:text-neutral-400"
                  >
                    {reason.includes('strong') || reason.includes('measurable') ? (
                      <Check size={12} className="text-neutral-900 dark:text-neutral-100 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle size={12} className="text-neutral-400 shrink-0 mt-0.5" />
                    )}
                    <span>{reason}</span>
                  </div>
                ))}
              </div>

              {/* Safe suggested rewrite with placeholders */}
              {bullet.score < 85 && (
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                      <ArrowRight size={12} className="text-blue-600 dark:text-blue-400" />
                      Suggested Action-Oriented Rewrite (Fill in bracketed placeholders):
                    </span>
                    <button
                      onClick={() => handleCopy(bullet.id, bullet.suggestedRewrite)}
                      className="text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1"
                    >
                      {copiedId === bullet.id ? (
                        <>
                          <Check size={12} className="text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy rewrite</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-2.5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xs text-xs text-neutral-800 dark:text-neutral-200 font-mono leading-relaxed">
                    {bullet.suggestedRewrite}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
