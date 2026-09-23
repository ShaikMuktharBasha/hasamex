import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  Sparkles,
  ShieldCheck,
  Compass,
  FileText,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Layers,
  Scale,
  Headphones,
  Search,
  ExternalLink,
  Info
} from 'lucide-react';
import type { NavigationTab } from '../../types';

interface HowItWorksWidgetProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenTranscript?: (transcriptId: string, timestamp: string) => void;
  onSelectQuestion?: (questionId: string) => void;
}

type GuideTopic = 'overview' | 'rag' | 'grounding' | 'workflow' | 'shortcuts';

export const HowItWorksWidget: React.FC<HowItWorksWidgetProps> = ({
  onNavigate,
  onOpenTranscript,
  onSelectQuestion,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTopic, setActiveTopic] = useState<GuideTopic>('overview');
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      step: 1,
      title: 'Real Expert Call Transcripts',
      tag: 'Raw Evidence',
      icon: Headphones,
      desc: 'ExpertLens AI ingests real, unedited transcripts from key opinion leaders across France (Dr. Jean Martin), Germany (Anna Keller), and the UK (Dr. Emily Carter).',
      actionLabel: 'View Raw Transcripts',
      action: () => onNavigate('transcripts')
    },
    {
      step: 2,
      title: 'Standardized Interview Guide',
      tag: 'Structured Analysis',
      icon: BookOpen,
      desc: 'Answers the 6 core commercial & clinical questions on robotic surgery market sizing, Da Vinci 5 positioning, and capital vs rental dynamics.',
      actionLabel: 'Explore Interview Guide',
      action: () => onNavigate('interview-guide')
    },
    {
      step: 3,
      title: 'Strict Substring Anti-Hallucination',
      tag: 'Zero-Hallucination',
      icon: ShieldCheck,
      desc: 'Every quote cited by the AI is verified with exact character substring matching against the raw text. Fabricated quotes are mathematically blocked.',
      actionLabel: 'Check Audit Benchmark',
      action: () => onNavigate('evaluation')
    },
    {
      step: 4,
      title: 'Interactive Deep Linking',
      tag: 'Audit Lineage',
      icon: Sparkles,
      desc: 'Click on any timestamp badge (e.g. [14:20]) anywhere in the app to jump directly to the exact spoken line in the full transcript with auto-scrolling.',
      actionLabel: 'Try Cross-Transcript RAG',
      action: () => onNavigate('ask-ai')
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none font-sans">
      {/* Expanded Modal / Card */}
      {isOpen && (
        <div className="mb-3 w-[440px] max-w-[calc(100vw-2rem)] max-h-[620px] bg-[#faf9f5] border border-[#e3dfd7] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200 text-[#201f1e]">
          {/* Header */}
          <div className="bg-[#201f1e] text-[#faf9f5] px-5 py-4 flex items-center justify-between border-b border-[#343331]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#da7a5b] to-[#b85f44] flex items-center justify-center text-white shadow-sm p-1.5">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                  <circle cx="32" cy="32" r="18" stroke="#faf9f5" strokeWidth="3" strokeOpacity="0.9" fill="none"/>
                  <path d="M32 18V46" stroke="#faf9f5" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M18 32H46" stroke="#faf9f5" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="32" cy="32" r="4.5" fill="#faf9f5"/>
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold tracking-tight text-[#faf9f5] flex items-center gap-2">
                  How ExpertLens AI Works
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#38322e] text-[#e09f87] border border-[#52443d]">
                    Guide
                  </span>
                </h3>
                <p className="text-[11px] text-[#9b968f] font-normal leading-tight">
                  Evidence-grounding & platform tour
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#9b968f] hover:text-white p-1 rounded-lg hover:bg-[#343331] transition-colors"
              title="Close guide"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Topic Navigation Tabs */}
          <div className="flex border-b border-[#e3dfd7] bg-[#f4f1ea] px-3 pt-2 gap-1 overflow-x-auto text-[11px] font-semibold">
            <button
              onClick={() => setActiveTopic('overview')}
              className={`px-3 py-1.5 rounded-t-lg transition-colors border-t border-x ${
                activeTopic === 'overview'
                  ? 'bg-[#faf9f5] text-[#cc785c] border-[#e3dfd7] font-bold border-b-[#faf9f5] -mb-px'
                  : 'text-[#6b665f] border-transparent hover:text-[#201f1e]'
              }`}
            >
              Step-by-Step Tour
            </button>
            <button
              onClick={() => setActiveTopic('rag')}
              className={`px-3 py-1.5 rounded-t-lg transition-colors border-t border-x ${
                activeTopic === 'rag'
                  ? 'bg-[#faf9f5] text-[#cc785c] border-[#e3dfd7] font-bold border-b-[#faf9f5] -mb-px'
                  : 'text-[#6b665f] border-transparent hover:text-[#201f1e]'
              }`}
            >
              RAG & Grounding
            </button>
            <button
              onClick={() => setActiveTopic('shortcuts')}
              className={`px-3 py-1.5 rounded-t-lg transition-colors border-t border-x ${
                activeTopic === 'shortcuts'
                  ? 'bg-[#faf9f5] text-[#cc785c] border-[#e3dfd7] font-bold border-b-[#faf9f5] -mb-px'
                  : 'text-[#6b665f] border-transparent hover:text-[#201f1e]'
              }`}
            >
              Quick Jumps
            </button>
          </div>

          {/* Content Area */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4 max-h-[440px]">
            {/* Topic 1: Interactive Step-by-Step Tour */}
            {activeTopic === 'overview' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#6b665f] pb-1 border-b border-[#ece8e1]">
                  <span className="font-mono font-medium">
                    Feature {activeStep + 1} of {steps.length}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#faebe6] text-[#cc785c] font-semibold text-[10px]">
                    {steps[activeStep].tag}
                  </span>
                </div>

                {/* Active Step Card */}
                <div className="p-4 rounded-xl bg-[#f5f2eb] border border-[#e6e2d8] space-y-3">
                  <div className="flex items-center gap-2.5">
                    {React.createElement(steps[activeStep].icon, {
                      className: 'w-5 h-5 text-[#cc785c]'
                    })}
                    <h4 className="font-serif font-bold text-sm text-[#201f1e]">
                      {steps[activeStep].title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#524e48] leading-relaxed">
                    {steps[activeStep].desc}
                  </p>
                  <button
                    onClick={() => {
                      steps[activeStep].action();
                      setIsOpen(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#cc785c] hover:bg-[#b85f44] text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    <span>{steps[activeStep].actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Step Indicators & Controls */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    {steps.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveStep(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === activeStep ? 'w-6 bg-[#cc785c]' : 'w-2 bg-[#d6d1c7]'
                        }`}
                        title={`Go to step ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                      disabled={activeStep === 0}
                      className="px-2.5 py-1 text-xs rounded border border-[#d6d1c7] disabled:opacity-30 hover:bg-[#f0ebe1] text-[#201f1e]"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                      disabled={activeStep === steps.length - 1}
                      className="px-2.5 py-1 text-xs rounded bg-[#201f1e] hover:bg-[#343331] text-white disabled:opacity-30"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Topic 2: RAG & Grounding Methodology */}
            {activeTopic === 'rag' && (
              <div className="space-y-3.5 text-xs text-[#524e48]">
                <div className="p-3 rounded-xl bg-[#faebe6] border border-[#edd5cc] flex gap-2.5 text-[#201f1e]">
                  <ShieldCheck className="w-5 h-5 text-[#cc785c] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold font-serif text-xs text-[#b85f44]">Strict Grounding Engine</h5>
                    <p className="text-[11px] text-[#6b665f] mt-0.5 leading-relaxed">
                      Every claim is anchored to verifiable quotes from Dr. Martin (FR), Anna Keller (DE), or Dr. Carter (UK).
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#f5f2eb] border border-[#e6e2d8]">
                    <span className="font-mono font-bold text-[#cc785c] text-xs">01</span>
                    <div>
                      <span className="font-bold text-[#201f1e]">Transcript Ingestion & Segmentation:</span>
                      <p className="text-[11px] text-[#6b665f] mt-0.5">
                        Transcripts are chunked into logical conversational turns preserving speakers and timestamps.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#f5f2eb] border border-[#e6e2d8]">
                    <span className="font-mono font-bold text-[#cc785c] text-xs">02</span>
                    <div>
                      <span className="font-bold text-[#201f1e]">Hybrid Vector + Keyword Retrieval:</span>
                      <p className="text-[11px] text-[#6b665f] mt-0.5">
                        Cosine similarity matches questions to the most relevant transcript segments across all 3 countries.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#f5f2eb] border border-[#e6e2d8]">
                    <span className="font-mono font-bold text-[#cc785c] text-xs">03</span>
                    <div>
                      <span className="font-bold text-[#201f1e]">Substring Quote Verification:</span>
                      <p className="text-[11px] text-[#6b665f] mt-0.5">
                        Anti-hallucination layer checks every cited quote against raw text before surfacing it in the UI.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onNavigate('evaluation');
                    setIsOpen(false);
                  }}
                  className="w-full py-2 px-3 rounded-lg border border-[#cc785c] text-[#cc785c] hover:bg-[#faebe6] text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View 100% Quality Benchmark Audit</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Topic 3: Quick Navigation & Sample Queries */}
            {activeTopic === 'shortcuts' && (
              <div className="space-y-3 text-xs">
                <p className="text-[11px] text-[#6b665f]">
                  Jump directly into key sections of the intelligence platform:
                </p>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => {
                      if (onSelectQuestion) onSelectQuestion('q1');
                      onNavigate('interview-guide');
                      setIsOpen(false);
                    }}
                    className="p-2.5 rounded-xl border border-[#e3dfd7] bg-[#fbf9f4] hover:bg-[#f0ebe1] hover:border-[#cc785c] text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-bold text-[#201f1e] group-hover:text-[#cc785c] flex items-center gap-1.5">
                        <span>🇬🇧 🇫🇷 🇩🇪</span> Market Adoption & Sizing (Q1)
                      </span>
                      <span className="text-[10px] text-[#8a857e]">Surgical penetration rates by country</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8a857e] group-hover:text-[#cc785c]" />
                  </button>

                  <button
                    onClick={() => {
                      if (onSelectQuestion) onSelectQuestion('q3');
                      onNavigate('interview-guide');
                      setIsOpen(false);
                    }}
                    className="p-2.5 rounded-xl border border-[#e3dfd7] bg-[#fbf9f4] hover:bg-[#f0ebe1] hover:border-[#cc785c] text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-bold text-[#201f1e] group-hover:text-[#cc785c] flex items-center gap-1.5">
                        <span>⚔️</span> Competitive Landscape (Q3)
                      </span>
                      <span className="text-[10px] text-[#8a857e]">Intuitive Da Vinci vs CMR Versius vs Hugo</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8a857e] group-hover:text-[#cc785c]" />
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('disagreements');
                      setIsOpen(false);
                    }}
                    className="p-2.5 rounded-xl border border-[#e3dfd7] bg-[#fbf9f4] hover:bg-[#f0ebe1] hover:border-[#cc785c] text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-bold text-[#201f1e] group-hover:text-[#cc785c] flex items-center gap-1.5">
                        <span>⚖️</span> Expert Disagreements Matrix
                      </span>
                      <span className="text-[10px] text-[#8a857e]">Contrasting perspectives on DV5 vs CMR</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8a857e] group-hover:text-[#cc785c]" />
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('ask-ai');
                      setIsOpen(false);
                    }}
                    className="p-2.5 rounded-xl border border-[#e3dfd7] bg-[#fbf9f4] hover:bg-[#f0ebe1] hover:border-[#cc785c] text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-bold text-[#201f1e] group-hover:text-[#cc785c] flex items-center gap-1.5">
                        <span>✨</span> Cross-Transcript RAG Chat
                      </span>
                      <span className="text-[10px] text-[#8a857e]">Ask any custom hypothesis with citation checks</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#8a857e] group-hover:text-[#cc785c]" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="px-4 py-2.5 bg-[#f4f1ea] border-t border-[#e3dfd7] flex items-center justify-between text-[11px] text-[#6b665f]">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
              Grounding: Verified verbatim quotes
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8a857e] hover:text-[#201f1e] font-semibold"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#201f1e] hover:bg-[#343331] text-[#faf9f5] shadow-xl hover:shadow-2xl border border-[#45423e] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        aria-label="How this works guide"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#da7a5b] to-[#b85f44] flex items-center justify-center text-white shadow-sm p-1">
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
            <circle cx="32" cy="32" r="18" stroke="#faf9f5" strokeWidth="4" strokeOpacity="0.9" fill="none"/>
            <path d="M32 18V46" stroke="#faf9f5" strokeWidth="4" strokeLinecap="round"/>
            <path d="M18 32H46" stroke="#faf9f5" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="32" cy="32" r="5" fill="#faf9f5"/>
          </svg>
        </div>
        <div className="flex flex-col items-start leading-none text-left">
          <span className="text-xs font-serif font-bold text-[#faf9f5] flex items-center gap-1.5">
            How This Works
            <span className="w-1.5 h-1.5 rounded-full bg-[#da7a5b] animate-pulse" />
          </span>
          <span className="text-[10px] text-[#9b968f] font-sans mt-0.5">
            Platform & RAG Guide
          </span>
        </div>
      </button>
    </div>
  );
};
