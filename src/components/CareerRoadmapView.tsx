import React, { useEffect, useState } from 'react';
import { CareerRoadmap, RoadmapPhase } from '../types';
import { ChevronDown, ChevronUp, Clock, Target, CheckCircle2 } from 'lucide-react';

interface CareerRoadmapViewProps {
  roadmap: CareerRoadmap;
}

export const CareerRoadmapView: React.FC<CareerRoadmapViewProps> = ({ roadmap }) => {
  const [expandedPhaseId, setExpandedPhaseId] = useState<string | null>(null);
  const [pathDrawn, setPathDrawn] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState<number[]>([]);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPathDrawn(true);
      setVisibleNodes(roadmap.phases.map((_, i) => i));
      if (roadmap.phases.length > 0) {
        setExpandedPhaseId(roadmap.phases[0].id);
      }
      return;
    }

    // Reset state on roadmap change
    setPathDrawn(false);
    setVisibleNodes([]);
    setExpandedPhaseId(null);

    // Sequence:
    // 1. Draw SVG path
    const drawTimer = setTimeout(() => {
      setPathDrawn(true);
    }, 100);

    // 2. Reveal phase nodes sequentially (350ms each, ease-out)
    const nodeTimers: NodeJS.Timeout[] = [];
    roadmap.phases.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleNodes((prev) => [...prev, index]);
        // Default expand first phase once revealed
        if (index === 0) {
          setExpandedPhaseId(roadmap.phases[0].id);
        }
      }, 400 + index * 350);
      nodeTimers.push(timer);
    });

    return () => {
      clearTimeout(drawTimer);
      nodeTimers.forEach((t) => clearTimeout(t));
    };
  }, [roadmap]);

  const togglePhase = (phaseId: string) => {
    setExpandedPhaseId(expandedPhaseId === phaseId ? null : phaseId);
  };

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-sm p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-neutral-100 dark:border-neutral-800 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
            <span>Career Readiness Roadmap</span>
            <span aria-hidden="true">/</span>
            <span>Target Role: {roadmap.roleTitle}</span>
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            Action Plan for {roadmap.roleTitle}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/80 px-3 py-1.5 rounded-xs border border-neutral-200 dark:border-neutral-700">
          <Clock size={14} className="text-neutral-500" />
          <span>Total estimated preparation: </span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100 tabular-nums">
            {roadmap.totalEstimatedWeeks} weeks
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Vertical SVG timeline spine */}
        <div className="absolute left-[19px] sm:left-[23px] top-6 bottom-6 w-1 -translate-x-1/2 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              className="stroke-neutral-200 dark:stroke-neutral-800"
              strokeWidth="2"
            />
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              className="stroke-blue-600 dark:stroke-blue-500 transition-all duration-1000 ease-out"
              strokeWidth="2"
              style={{
                strokeDasharray: '1000',
                strokeDashoffset: pathDrawn ? '0' : '1000',
              }}
            />
          </svg>
        </div>

        {/* Phase nodes */}
        <div className="space-y-6">
          {roadmap.phases.map((phase: RoadmapPhase, index: number) => {
            const isVisible = visibleNodes.includes(index);
            const isExpanded = expandedPhaseId === phase.id;

            return (
              <div
                key={phase.id}
                className={`relative pl-11 sm:pl-14 transition-all duration-400 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                {/* Node circle on SVG timeline */}
                <button
                  onClick={() => togglePhase(phase.id)}
                  aria-label={`Toggle phase ${phase.phaseNumber}: ${phase.title}`}
                  className={`absolute left-0 top-0.5 w-10 sm:w-12 h-10 sm:h-12 rounded-xs border flex items-center justify-center font-mono text-xs font-semibold transition-all ${
                    isExpanded
                      ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 border-neutral-900 dark:border-neutral-100 shadow-xs'
                      : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 hover:border-neutral-500'
                  }`}
                >
                  0{phase.phaseNumber}
                </button>

                {/* Phase card */}
                <div className="border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 rounded-xs overflow-hidden">
                  <div
                    onClick={() => togglePhase(phase.id)}
                    className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                        <span>Phase 0{phase.phaseNumber}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span className="tabular-nums font-medium text-neutral-700 dark:text-neutral-300">
                          {phase.timeEstimate}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                        {phase.title}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                        Focus: {phase.focus}
                      </p>
                    </div>

                    <div className="text-neutral-400 pt-1 sm:pt-0 shrink-0">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>

                  {/* Expanded Phase Content */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 pt-0 border-t border-neutral-200/60 dark:border-neutral-800 space-y-5 text-xs">
                      {/* Skills to learn */}
                      <div className="pt-4">
                        <span className="font-semibold text-neutral-900 dark:text-neutral-100 block mb-2">
                          Specific skills to master:
                        </span>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-neutral-700 dark:text-neutral-300">
                          {phase.skillsToLearn.map((skill, sIdx) => (
                            <React.Fragment key={skill}>
                              <span className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2.5 py-1 rounded-xs">
                                {skill}
                              </span>
                              {sIdx < phase.skillsToLearn.length - 1 && (
                                <span className="text-neutral-300 dark:text-neutral-700" aria-hidden="true">
                                  /
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Projects to build */}
                      <div>
                        <span className="font-semibold text-neutral-900 dark:text-neutral-100 block mb-2">
                          Project to build:
                        </span>
                        <div className="space-y-3">
                          {phase.projectsToBuild.map((project, pIdx) => (
                            <div
                              key={pIdx}
                              className="bg-white dark:bg-neutral-800/80 p-3.5 border border-neutral-200 dark:border-neutral-700 rounded-xs space-y-2"
                            >
                              <div className="flex items-center gap-1.5 font-medium text-neutral-900 dark:text-neutral-100">
                                <Target size={14} className="text-neutral-600 dark:text-neutral-400" />
                                {project.title}
                              </div>
                              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {project.description}
                              </p>
                              <div className="text-[11px] bg-neutral-50 dark:bg-neutral-900/60 p-2 rounded-xs border border-neutral-200/80 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
                                <span className="font-medium text-neutral-900 dark:text-neutral-100 mr-1">
                                  Proof deliverable:
                                </span>
                                {project.deliverable}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Phase Milestones */}
                      <div>
                        <span className="font-semibold text-neutral-900 dark:text-neutral-100 block mb-2">
                          Phase completion milestones:
                        </span>
                        <ul className="space-y-1.5">
                          {phase.milestones.map((milestone, mIdx) => (
                            <li
                              key={mIdx}
                              className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300"
                            >
                              <CheckCircle2 size={14} className="text-neutral-500 mt-0.5 shrink-0" />
                              <span>{milestone}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
