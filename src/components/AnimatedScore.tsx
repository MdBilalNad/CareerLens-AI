import React, { useEffect, useState } from 'react';

interface AnimatedScoreProps {
  score: number; // 0 to 100
  scoringVersion: string;
}

export const AnimatedScore: React.FC<AnimatedScoreProps> = ({ score, scoringVersion }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayScore(score);
      return;
    }

    // Count up once on first view under 800ms
    const durationMs = 700;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * score);
      setDisplayScore(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const handle = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(handle);
  }, [score]);

  // Circumference for 130px SVG circle with radius 54px
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const getScoreColor = (val: number) => {
    if (val >= 80) return 'stroke-blue-600 dark:stroke-blue-400';
    if (val >= 65) return 'stroke-indigo-600 dark:stroke-indigo-400';
    return 'stroke-neutral-700 dark:stroke-neutral-300';
  };

  return (
    <div className="surface-card p-6 sm:p-7 relative overflow-hidden">
      {/* Subtle ambient accent glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Radial progress indicator */}
          <div className="relative w-32 h-32 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 130 130">
              {/* Background track */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className="stroke-neutral-100 dark:stroke-neutral-800"
                strokeWidth="7"
                fill="none"
              />
              {/* Dynamic progress ring */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                className={`${getScoreColor(score)} transition-all duration-200 ease-out`}
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
              <span className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 tabular-nums">
                {displayScore}
              </span>
              <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-0.5">
                out of 100
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              <span>ATS Compatibility Index</span>
              <span aria-hidden="true">&middot;</span>
              <span>Engine {scoringVersion}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              {score >= 80
                ? 'Strong ATS Compatibility'
                : score >= 65
                ? 'Moderate Parseability with Actionable Gaps'
                : 'Substantial Structural & Content Gaps'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              {score >= 80
                ? 'Your document features standard section anchors, high technical keyword density, and quantified impact metrics that clear automated recruiting thresholds.'
                : score >= 65
                ? 'Your baseline structure is readable, but keyword depth, action verb strength, or quantified metric distribution requires editing to maximize callback rates.'
                : 'Your document lacks standard section markers, quantifiable results, or recognized technical keywords, which creates high rejection risks in automated filters.'}
            </p>
          </div>
        </div>

        {/* Honest ATS Estimate Notice with refined styling */}
        <div className="border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800 pt-4 lg:pt-0 lg:pl-6 max-w-xs text-xs text-neutral-500 dark:text-neutral-400 space-y-1 self-center lg:self-stretch flex flex-col justify-center">
          <span className="font-semibold text-neutral-800 dark:text-neutral-200 block text-xs">
            Understanding this estimate
          </span>
          <p className="leading-relaxed">
            Different employer systems behave differently, and this score is an estimate based on standard industry parsing rules.
          </p>
        </div>
      </div>
    </div>
  );
};
