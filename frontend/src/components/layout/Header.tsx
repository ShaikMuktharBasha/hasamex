import React from 'react';
import { ShieldCheck, Cpu, Sparkles, BookOpen, Layers, Scale, Headphones, BookmarkCheck, Activity } from 'lucide-react';
import type { NavigationTab } from '../../types';

interface HeaderProps {
  activeTab: NavigationTab;
  isEngineConnected?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  isEngineConnected = false
}) => {
  const titles: Record<NavigationTab, { title: string; subtitle: string; icon: React.ElementType }> = {
    overview: {
      title: 'Executive Intelligence Dossier',
      subtitle: 'Synthesis & cross-market coverage for the European Robotic Surgery Market',
      icon: Sparkles
    },
    'interview-guide': {
      title: 'Interview Guide Synthesis',
      subtitle: 'Structured cross-expert answers with verified verbatim quotations and timestamps',
      icon: BookOpen
    },
    'ask-ai': {
      title: 'Cross-Transcript RAG Intelligence',
      subtitle: 'Ask arbitrary research questions with strict anti-hallucination evidence retrieval',
      icon: Sparkles
    },
    themes: {
      title: 'Common Cross-Call Themes',
      subtitle: 'Synthesized recurring themes across France, Germany, and the United Kingdom',
      icon: Layers
    },
    disagreements: {
      title: 'Expert Disagreements & Market Divergences',
      subtitle: 'Objective, neutral comparative analysis of contrasting hospital conditions and priorities',
      icon: Scale
    },
    transcripts: {
      title: 'Original Expert Transcripts',
      subtitle: 'Interactive transcript reader with clickable timestamps and search highlighting',
      icon: Headphones
    },
    evidence: {
      title: 'Evidence & Audit Explorer',
      subtitle: 'Inspect, filter, and audit every raw quotation and timestamp citation',
      icon: BookmarkCheck
    },
    evaluation: {
      title: 'System Accuracy & Grounding Benchmark',
      subtitle: 'Automated retrieval precision, citation exactness, and zero-hallucination checks',
      icon: Activity
    }
  };

  const current = titles[activeTab] || titles.overview;
  const TabIcon = current.icon;

  return (
    <header className="h-16 bg-[#faf9f5]/90 backdrop-blur-md border-b border-[#e8e5dc] px-8 flex items-center justify-between shrink-0 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#f0ebd8] border border-[#e2ded4] flex items-center justify-center text-[#c15f3e]">
          <TabIcon className="w-4 h-4" />
        </div>
        <div>
          <h2 className="font-serif text-lg font-bold text-[#1f1e1d] tracking-tight leading-tight">
            {current.title}
          </h2>
          <p className="text-xs text-[#706c64] font-normal">
            {current.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Evidence Grounding Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4efe6] border border-[#e2ded4] text-xs font-semibold text-[#5c5850]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Verbatim Grounded</span>
        </div>

        {/* Engine Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf3ef] border border-[#f5d5cb] text-xs font-bold text-[#a84c2f]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cc785c] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#cc785c]"></span>
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px]">
            <Cpu className="w-3 h-3 text-[#cc785c]" />
            {isEngineConnected ? 'AI Engine: Connected' : 'High-Precision Local Engine'}
          </span>
        </div>
      </div>
    </header>
  );
};
