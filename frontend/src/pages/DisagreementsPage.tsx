import React, { useEffect, useState } from 'react';
import { Scale, HelpCircle, CheckCircle2, Info, ArrowRight, Feather, Stethoscope, Building2, FileBadge2 } from 'lucide-react';
import { EvidenceCard } from '../components/evidence/EvidenceCard';
import { Skeleton } from '../components/common/Skeleton';
import { api } from '../services/api';
import type { DisagreementItem } from '../types';

interface DisagreementsPageProps {
  onOpenTranscript: (transcriptId: string, timestamp: string) => void;
}

export const DisagreementsPage: React.FC<DisagreementsPageProps> = ({ onOpenTranscript }) => {
  const [disagreements, setDisagreements] = useState<DisagreementItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisagreements = async () => {
      try {
        setLoading(true);
        const data = await api.getDisagreements();
        setDisagreements(data);
      } catch (err) {
        console.error('Failed to load disagreements', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDisagreements();
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-48 rounded-xl bg-[#ede9de]" />
        <Skeleton className="h-64 rounded-xl bg-[#ede9de]" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8e5dc] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#b45309] bg-[#fffbeb] px-2.5 py-1 rounded-md border border-[#fde68a] mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Contrasting Market Perspectives</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1f1e1d] tracking-tight">
            Expert Disagreements & Market Divergences
          </h2>
          <p className="text-xs text-[#706c64] mt-1">
            Objective, neutral comparative synthesis where expert priorities, clinical philosophies, and procurement gates diverge
          </p>
        </div>
      </div>

      {/* Disagreements List in Claude Dossier Style */}
      <div className="space-y-8">
        {disagreements.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#e8e5dc] p-7 shadow-xs space-y-6"
          >
            {/* Topic & Summary */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#8a857e]">
                <span>CASE DIVERGENCE 0{index + 1}</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1f1e1d]">
                {item.topic}
              </h3>
              <p className="text-xs text-[#5c5850] leading-relaxed font-normal">
                {item.summary}
              </p>
            </div>

            {/* Neutral Comparative Analysis Box */}
            <div className="p-5 rounded-xl bg-[#fbf9f4] border border-[#e8e5dc] space-y-2.5">
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#8a422a] uppercase tracking-wider font-mono">
                <Scale className="w-4 h-4 text-[#cc785c]" />
                <span>Neutral Comparative Assessment</span>
              </div>
              <p className="text-xs text-[#2d2b29] leading-relaxed font-normal">
                {item.neutral_analysis}
              </p>
            </div>

            {/* Side by Side Position Summaries */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#faf9f5] p-5 rounded-xl border border-[#e8e5dc] text-xs">
              <div className="space-y-1.5 p-3 rounded-lg bg-white border border-[#e8e5dc] border-l-3 border-l-[#3b82f6]">
                <div className="font-bold text-[#1d4ed8] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>France Perspective</span>
                </div>
                <p className="text-[#3d3a36] leading-relaxed font-medium">
                  {item.france_position}
                </p>
              </div>

              <div className="space-y-1.5 p-3 rounded-lg bg-white border border-[#e8e5dc] border-l-3 border-l-[#d97706]">
                <div className="font-bold text-[#b45309] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Germany Perspective</span>
                </div>
                <p className="text-[#3d3a36] leading-relaxed font-medium">
                  {item.germany_position}
                </p>
              </div>

              <div className="space-y-1.5 p-3 rounded-lg bg-white border border-[#e8e5dc] border-l-3 border-l-[#059669]">
                <div className="font-bold text-[#047857] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <FileBadge2 className="w-3.5 h-3.5" />
                  <span>UK Perspective</span>
                </div>
                <p className="text-[#3d3a36] leading-relaxed font-medium">
                  {item.uk_position}
                </p>
              </div>
            </div>

            {/* Exact Evidence Quotes Grid */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8a857e] mb-3 font-mono">
                Direct Supporting Quotations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {item.evidence['France'] && (
                  <EvidenceCard
                    evidence={item.evidence['France']}
                    onOpenTranscript={onOpenTranscript}
                  />
                )}
                {item.evidence['Germany'] && (
                  <EvidenceCard
                    evidence={item.evidence['Germany']}
                    onOpenTranscript={onOpenTranscript}
                  />
                )}
                {item.evidence['UK'] && (
                  <EvidenceCard
                    evidence={item.evidence['UK']}
                    onOpenTranscript={onOpenTranscript}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
