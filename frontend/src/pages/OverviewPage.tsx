import React, { useEffect, useState } from 'react';
import {
  Users,
  FileQuestion,
  Globe2,
  BookmarkCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Layers,
  ChevronRight,
  Stethoscope,
  Building2,
  FileBadge2,
  BookOpen,
  ArrowUpRight,
  Quote,
  Feather
} from 'lucide-react';
import { MetricCard } from '../components/common/MetricCard';
import { EvidenceCard } from '../components/evidence/EvidenceCard';
import { Skeleton } from '../components/common/Skeleton';
import { api } from '../services/api';
import type { OverviewMetrics, ThemeItem, EvidenceItem, NavigationTab } from '../types';

interface OverviewPageProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenTranscript: (transcriptId: string, timestamp: string) => void;
  onSelectQuestion: (questionId: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onNavigate,
  onOpenTranscript,
  onSelectQuestion
}) => {
  const [metrics, setMetrics] = useState<OverviewMetrics | null>(null);
  const [themes, setThemes] = useState<ThemeItem[]>([]);
  const [recentEvidence, setRecentEvidence] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [overviewData, themesData, evidenceData] = await Promise.all([
          api.getOverview(),
          api.getThemes(),
          api.getEvidence()
        ]);
        setMetrics(overviewData);
        setThemes(themesData);
        setRecentEvidence(evidenceData.slice(0, 3));
      } catch (err) {
        console.error('Failed to load overview data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 space-y-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <Skeleton className="h-28 rounded-xl bg-[#ede9de]" />
          <Skeleton className="h-28 rounded-xl bg-[#ede9de]" />
          <Skeleton className="h-28 rounded-xl bg-[#ede9de]" />
          <Skeleton className="h-28 rounded-xl bg-[#ede9de]" />
        </div>
        <Skeleton className="h-80 rounded-xl bg-[#ede9de]" />
      </div>
    );
  }

  const getExpertIcon = (country: string) => {
    switch (country.toLowerCase()) {
      case 'france': return Stethoscope;
      case 'germany': return Building2;
      default: return FileBadge2;
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Editorial Welcome Dossier Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#242321] text-[#faf9f5] p-8 border border-[#383633] shadow-md">
        <div className="relative z-10 max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3b332e] border border-[#5a483e] text-[#e09f87] text-xs font-semibold">
            <Feather className="w-3.5 h-3.5 text-[#cc785c]" />
            <span>European Robotic Surgery Market Case Study</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#faf9f5]">
            Evidence-Grounded Expert Call Intelligence
          </h2>
          <p className="text-sm text-[#b8b3a9] leading-relaxed font-normal">
            Synthesizing 3 expert clinical and procurement interviews from France, Germany, and the United Kingdom. Every analytical insight is strictly anchored to original transcripts with verbatim quotations and temporal audio timestamps.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate('interview-guide')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#cc785c] hover:bg-[#b8674d] text-white text-xs font-bold shadow-sm transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Interview Guide Synthesis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('ask-ai')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#32302d] hover:bg-[#3d3b37] text-[#e0ded8] text-xs font-bold border border-[#484541] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#cc785c]" />
              <span>Ask AI (Cross-Transcript RAG)</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards in Claude Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Expert Calls Ingested"
          value={metrics?.expert_calls_count || 3}
          subtitle="France, Germany, UK"
          icon={Users}
          colorScheme="terracotta"
        />
        <MetricCard
          title="Interview Questions"
          value={metrics?.interview_questions_count || 6}
          subtitle="Standardized Market Guide"
          icon={FileQuestion}
          colorScheme="blue"
        />
        <MetricCard
          title="European Markets"
          value={metrics?.markets_count || 3}
          subtitle="Multi-Country Alignment"
          icon={Globe2}
          colorScheme="emerald"
        />
        <MetricCard
          title="Evidence Segments"
          value={metrics?.evidence_segments_count || 21}
          subtitle="Verbatim Timestamped Units"
          icon={BookmarkCheck}
          colorScheme="amber"
        />
      </div>

      {/* Expert Call Coverage Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1f1e1d] tracking-tight">
              Expert Call Coverage
            </h3>
            <p className="text-xs text-[#706c64]">
              Complete transcribed stakeholder interviews with verified audio turns
            </p>
          </div>
          <button
            onClick={() => onNavigate('transcripts')}
            className="text-xs text-[#c15f3e] hover:text-[#9e4629] font-bold inline-flex items-center gap-1"
          >
            <span>Read All Transcripts</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {metrics?.experts.map((expert) => {
            const ExpertIcon = getExpertIcon(expert.country);
            return (
              <div
                key={expert.id}
                className="bg-white rounded-xl border border-[#e8e5dc] p-5 shadow-xs hover:border-[#cc785c] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#b45309] bg-[#fffbeb] px-2.5 py-1 rounded-md border border-[#fde68a] inline-flex items-center gap-1.5">
                      <ExpertIcon className="w-3 h-3" />
                      {expert.country}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-[#ecfdf5] px-2 py-0.5 rounded-full border border-[#a7f3d0]">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1f1e1d] mt-1">
                    {expert.name}
                  </h4>
                  <p className="text-xs text-[#706c64] font-medium mt-0.5">
                    {expert.role}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#f0ebd8] flex items-center justify-between text-xs">
                  <span className="text-[#8a857e] font-mono text-[11px]">{expert.turns_count} Dialogue Turns</span>
                  <button
                    onClick={() => onOpenTranscript(expert.id, '00:00')}
                    className="text-[#c15f3e] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Inspect Call</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Section: Interview Guide Coverage & Major Themes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {/* Left: Interview Guide Questions Coverage */}
        <div className="bg-white rounded-xl border border-[#e8e5dc] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-base font-bold text-[#1f1e1d] tracking-tight">
                  Interview Guide Coverage
                </h3>
                <p className="text-xs text-[#706c64]">
                  Evidence availability across the 6 standardized guide questions
                </p>
              </div>
              <button
                onClick={() => onNavigate('interview-guide')}
                className="text-xs text-[#c15f3e] hover:text-[#9e4629] font-bold"
              >
                View Synthesis →
              </button>
            </div>

            <div className="divide-y divide-[#f0ebd8]">
              {metrics?.question_coverage.map((q) => (
                <div
                  key={q.question_id}
                  onClick={() => {
                    onSelectQuestion(q.question_id);
                    onNavigate('interview-guide');
                  }}
                  className="py-3 group cursor-pointer flex items-center justify-between hover:bg-[#faf9f5] px-2 rounded-lg transition-colors"
                >
                  <div className="pr-4">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-[#f4efe6] text-[#5c5850] text-xs font-mono font-bold flex items-center justify-center shrink-0 border border-[#e2ded4]">
                        {q.number}
                      </span>
                      <p className="text-xs font-bold text-[#1f1e1d] group-hover:text-[#c15f3e] transition-colors line-clamp-1">
                        {q.text}
                      </p>
                    </div>
                    <p className="text-[11px] text-[#8a857e] pl-7 mt-0.5">
                      {q.theme}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#065f46] bg-[#ecfdf5] border border-[#a7f3d0] px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      3 Markets
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#b8b3a9] group-hover:text-[#c15f3e] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Key Recurring Themes */}
        <div className="bg-white rounded-xl border border-[#e8e5dc] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-base font-bold text-[#1f1e1d] tracking-tight">
                  Major Recurring Themes
                </h3>
                <p className="text-xs text-[#706c64]">
                  Synthesized recurring patterns identified across all 3 markets
                </p>
              </div>
              <button
                onClick={() => onNavigate('themes')}
                className="text-xs text-[#c15f3e] hover:text-[#9e4629] font-bold"
              >
                Matrix Deep-Dive →
              </button>
            </div>

            <div className="space-y-3">
              {themes.slice(0, 3).map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => onNavigate('themes')}
                  className="p-4 rounded-xl border border-[#e8e5dc] bg-[#faf9f5] hover:bg-[#fff7f4] hover:border-[#f5d5cb] cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="font-serif text-xs font-bold text-[#1f1e1d]">
                      {theme.title}
                    </h4>
                    <div className="flex items-center gap-1 font-mono text-[10px] font-bold">
                      <span className="px-1.5 py-0.5 rounded bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]">FR</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#fffbeb] text-[#b45309] border border-[#fde68a]">DE</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">UK</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#5c5850] line-clamp-2 leading-relaxed">
                    {theme.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Grounded Evidence Snippets */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1f1e1d] tracking-tight">
              Grounded Transcript Quotations
            </h3>
            <p className="text-xs text-[#706c64]">
              Sample verbatim quotes with verified speaker and timestamp markers
            </p>
          </div>
          <button
            onClick={() => onNavigate('evidence')}
            className="text-xs text-[#c15f3e] hover:text-[#9e4629] font-bold inline-flex items-center gap-1"
          >
            <span>Explore All Evidence ({metrics?.evidence_segments_count})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recentEvidence.map((ev) => (
            <EvidenceCard
              key={ev.id}
              evidence={ev}
              onOpenTranscript={onOpenTranscript}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
