import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  HelpCircle,
  Globe2,
  CornerDownLeft,
  Feather
} from 'lucide-react';
import { EvidenceCard } from '../components/evidence/EvidenceCard';
import { EvidenceLevelBadge } from '../components/evidence/EvidenceLevelBadge';
import { api } from '../services/api';
import type { RAGResponse } from '../types';

interface AskAIPageProps {
  onOpenTranscript: (transcriptId: string, timestamp: string) => void;
}

export const AskAIPage: React.FC<AskAIPageProps> = ({ onOpenTranscript }) => {
  const [query, setQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<RAGResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sampleQuestions = [
    'What are the biggest challenges mentioned by the experts?',
    'Where do the experts disagree on purchasing decisions?',
    'What factors influence hospital ROI across markets?',
    'How do surgical training requirements differ between France and the UK?',
    'What 3 to 5 year adoption trends are expected?'
  ];

  const handleAsk = async (questionToAsk?: string) => {
    const q = (questionToAsk || query).trim();
    if (!q) return;

    if (questionToAsk) {
      setQuery(questionToAsk);
    }

    try {
      setLoading(true);
      setError(null);
      const res = await api.askQuestion({
        question: q,
        country_filter: countryFilter || undefined,
        top_k: 5
      });
      setResponse(res);
    } catch (err: any) {
      console.error('RAG Query Failed', err);
      setError('Failed to retrieve intelligence. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-7">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf3ef] border border-[#f5d5cb] text-[#c15f3e] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#cc785c]" />
          <span>Cross-Transcript RAG Retrieval</span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#1f1e1d] tracking-tight">
          Ask anything across the expert calls
        </h2>
        <p className="text-xs text-[#706c64] leading-relaxed">
          Query all three transcripts simultaneously. Every answer is synthesized strictly from retrieved evidence and verified verbatim quotes.
        </p>
      </div>

      {/* Query Search Bar in Claude Warm Card Style */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#e8e5dc] shadow-sm space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8a857e] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Where do France and the UK disagree on procurement priorities?"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e8e5dc] text-xs focus:outline-none focus:border-[#cc785c] focus:ring-2 focus:ring-[#f5d5cb] transition-all text-[#1f1e1d] placeholder:text-[#9b968f]"
            />
          </div>

          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-3 py-3 rounded-xl border border-[#e8e5dc] text-xs font-semibold text-[#5c5850] bg-[#faf9f5] focus:outline-none focus:border-[#cc785c]"
          >
            <option value="">🌐 All Markets</option>
            <option value="France">🇫🇷 France</option>
            <option value="Germany">🇩🇪 Germany</option>
            <option value="United Kingdom">🇬🇧 United Kingdom</option>
          </select>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#cc785c] hover:bg-[#b8674d] disabled:opacity-50 text-white text-xs font-bold shadow-sm transition-all shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <span>Search Calls</span>
                <CornerDownLeft className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Suggested Case Questions Chips */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[11px] font-bold text-[#8a857e] mr-1 font-mono flex items-center gap-1">
            <Feather className="w-3 h-3 text-[#cc785c]" /> Prompt Dossiers:
          </span>
          {sampleQuestions.map((sq, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAsk(sq)}
              className="text-[11px] bg-[#faf9f5] hover:bg-[#fdf3ef] hover:text-[#c15f3e] hover:border-[#f5d5cb] text-[#5c5850] px-2.5 py-1 rounded-lg border border-[#e8e5dc] transition-colors text-left"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Response Card */}
      {response && (
        <div className="space-y-6">
          {/* Answer Container */}
          <div className="bg-white rounded-2xl border border-[#e8e5dc] p-6 shadow-xs space-y-5">
            {/* Header with Evidence Level */}
            <div className="flex items-center justify-between pb-3 border-b border-[#f0ebd8]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#242321] text-white flex items-center justify-center font-serif font-bold text-xs">
                  AI
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1f1e1d] font-mono">
                  Synthesized Research Assessment
                </span>
              </div>

              <div className="flex items-center gap-2">
                <EvidenceLevelBadge level={response.evidence_level} />
              </div>
            </div>

            {/* Answer Content in Claude Serif */}
            <div className="space-y-4">
              <p className="font-serif text-[14.5px] text-[#1f1e1d] leading-relaxed font-normal">
                {response.answer}
              </p>

              {/* Key Findings List */}
              {response.findings && response.findings.length > 0 && (
                <div className="p-4.5 rounded-xl bg-[#fbf9f4] border border-[#e8e5dc] space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8a857e] font-mono">
                    Key Findings Summary
                  </h4>
                  <ul className="space-y-1.5">
                    {response.findings.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#3d3a36]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Supporting Evidence Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-base font-bold text-[#1f1e1d] tracking-tight">
                  Supporting Transcript Evidence ({response.evidence.length})
                </h3>
                <p className="text-xs text-[#706c64]">
                  Dialogue turns retrieved with exact verbatim quotations and timestamps
                </p>
              </div>
            </div>

            {response.evidence.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#706c64] bg-white rounded-xl border border-[#e8e5dc]">
                No supporting evidence was found in the provided transcripts for this query.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {response.evidence.map((ev) => (
                  <EvidenceCard
                    key={ev.id}
                    evidence={ev}
                    onOpenTranscript={onOpenTranscript}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
