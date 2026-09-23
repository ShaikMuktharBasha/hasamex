import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Quote, Clock, User, Stethoscope, Building2, FileBadge2, ArrowUpRight } from 'lucide-react';
import type { EvidenceItem } from '../../types';

interface EvidenceCardProps {
  evidence: EvidenceItem;
  onOpenTranscript?: (transcriptId: string, timestamp: string) => void;
  highlightText?: string;
  showCountryHeader?: boolean;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  onOpenTranscript,
  showCountryHeader = true
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${evidence.quote}" (${evidence.country}, ${evidence.timestamp})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCountryStyles = (country: string) => {
    switch (country.toLowerCase()) {
      case 'france':
        return {
          badge: 'bg-[#eff6ff] text-[#1d4ed8] border-[#bfdbfe]',
          icon: Stethoscope,
          borderAccent: 'border-l-[#3b82f6]',
        };
      case 'germany':
        return {
          badge: 'bg-[#fffbeb] text-[#b45309] border-[#fde68a]',
          icon: Building2,
          borderAccent: 'border-l-[#d97706]',
        };
      case 'united kingdom':
      case 'uk':
        return {
          badge: 'bg-[#ecfdf5] text-[#047857] border-[#a7f3d0]',
          icon: FileBadge2,
          borderAccent: 'border-l-[#059669]',
        };
      default:
        return {
          badge: 'bg-[#f4efe6] text-[#5c5850] border-[#e2ded4]',
          icon: User,
          borderAccent: 'border-l-[#cc785c]',
        };
    }
  };

  const styles = getCountryStyles(evidence.country);
  const ExpertIcon = styles.icon;

  return (
    <div className={`bg-white rounded-xl border border-[#e8e5dc] ${styles.borderAccent} border-l-4 p-5 shadow-xs hover:border-[#cc785c] hover:shadow-md transition-all duration-200 flex flex-col justify-between`}>
      <div>
        {/* Header with Country Badge & Timestamp */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {showCountryHeader && (
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${styles.badge}`}>
                <ExpertIcon className="w-3.5 h-3.5" />
                {evidence.country}
              </span>
              <span className="text-[11px] text-[#8a857e] font-medium">Expert Interview</span>
            </div>
          )}

          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#f4efe6] text-[#5c5850] text-[11px] font-mono font-semibold ml-auto border border-[#e8e5dc]">
            <Clock className="w-3 h-3 text-[#9b968f]" />
            {evidence.timestamp}
          </div>
        </div>

        {/* Speaker Info */}
        <div className="flex items-center gap-1.5 text-xs text-[#5c5850] mb-3 font-semibold">
          <User className="w-3.5 h-3.5 text-[#9b968f]" />
          <span className="text-[#1f1e1d] font-bold">{evidence.expert_name}</span>
          <span className="text-[#c2beb6]">•</span>
          <span className="text-[#706c64] font-normal">{evidence.expert_role}</span>
        </div>

        {/* Verbatim Quotation in Claude warm quote box */}
        <div className="relative p-3.5 rounded-lg bg-[#fbf9f4] border-l-3 border-[#cc785c] my-2 text-[#2d2b29]">
          <Quote className="w-3.5 h-3.5 text-[#cc785c] mb-1 opacity-70" />
          <p className="font-serif text-[13.5px] leading-relaxed italic text-[#262524]">
            "{evidence.quote}"
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#f0ebd8] text-xs">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-[#706c64] hover:text-[#1f1e1d] hover:bg-[#f4efe6] font-medium py-1 px-2 rounded-lg transition-colors"
          title="Copy verbatim quotation"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-700" />
              <span className="text-emerald-800 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#9b968f]" />
              <span>Copy Quote</span>
            </>
          )}
        </button>

        {onOpenTranscript && (
          <button
            onClick={() => onOpenTranscript(evidence.transcript_id, evidence.timestamp)}
            className="inline-flex items-center gap-1 text-[#c15f3e] hover:text-[#9e4629] hover:bg-[#fdf3ef] font-semibold py-1 px-2 rounded-lg transition-colors text-[11px]"
          >
            <span>Open Transcript</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
