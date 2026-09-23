import React, { useEffect, useState, useRef } from 'react';
import {
  Search,
  Copy,
  Check,
  Clock,
  User,
  Headphones,
  Sparkles
} from 'lucide-react';
import { Skeleton } from '../components/common/Skeleton';
import { getCountryFlag } from '../components/common/CountryFlag';
import { api } from '../services/api';
import type { Transcript, DialogueTurn } from '../types';

interface TranscriptsPageProps {
  initialTranscriptId?: string;
  targetTimestamp?: string | null;
}

export const TranscriptsPage: React.FC<TranscriptsPageProps> = ({
  initialTranscriptId = 'france',
  targetTimestamp = null
}) => {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [selectedId, setSelectedId] = useState<string>(initialTranscriptId);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedTurn, setCopiedTurn] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const turnRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    let isMounted = true;
    const fetchTranscripts = async () => {
      try {
        setLoading(true);
        const data = await api.getTranscripts();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setTranscripts(data);
          if (initialTranscriptId) {
            setSelectedId(initialTranscriptId);
          }
        }
      } catch (err) {
        console.error('Failed to load transcripts', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchTranscripts();
    return () => { isMounted = false; };
  }, [initialTranscriptId]);

  useEffect(() => {
    if (targetTimestamp && turnRefs.current[targetTimestamp]) {
      setTimeout(() => {
        turnRefs.current[targetTimestamp]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 200);
    }
  }, [targetTimestamp, selectedId, loading]);

  const currentTranscript = transcripts.find((t) => t.id.toLowerCase() === selectedId.toLowerCase()) || transcripts[0];

  const handleCopyQuote = (turn: DialogueTurn, country: string) => {
    navigator.clipboard.writeText(`"${turn.text}" (${turn.speaker}, ${country} - ${turn.timestamp})`);
    setCopiedTurn(turn.turn_index);
    setTimeout(() => setCopiedTurn(null), 2000);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-[#fde68a] text-[#1f1e1d] rounded px-1 font-semibold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  if (loading && transcripts.length === 0) {
    return (
      <div className="p-8 max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-14 rounded-xl bg-[#ede9de]" />
        <Skeleton className="h-96 rounded-xl bg-[#ede9de]" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Country Tab Switcher & Search Bar */}
      <div className="bg-white rounded-2xl border border-[#e8e5dc] p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tabs with Flags */}
          <div className="flex items-center gap-1.5 p-1 bg-[#f4efe6] rounded-xl border border-[#e8e5dc]">
            {(transcripts || []).map((t) => {
              const isSelected = selectedId.toLowerCase() === t.id.toLowerCase();
              const flag = getCountryFlag(t.country);
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedId(t.id);
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-white text-[#c15f3e] shadow-xs border border-[#e8e5dc]'
                      : 'text-[#706c64] hover:text-[#1f1e1d] hover:bg-[#eae5da]'
                  }`}
                >
                  <span className="text-sm select-none leading-none">{flag}</span>
                  <span>{t.country}</span>
                </button>
              );
            })}
          </div>

          {/* Search inside transcript */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-[#8a857e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in transcript dialogue..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#e8e5dc] text-xs focus:outline-none focus:border-[#cc785c] text-[#1f1e1d] bg-[#faf9f5]"
            />
          </div>
        </div>

        {/* Expert Profile Card */}
        {currentTranscript && (
          <div className="flex items-center justify-between p-3.5 bg-[#fbf9f4] rounded-xl border border-[#e8e5dc] text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base select-none leading-none">{getCountryFlag(currentTranscript.country)}</span>
              <span className="font-serif font-bold text-[#1f1e1d] text-sm">{currentTranscript.expert_name}</span>
              <span className="text-[#8a857e] font-normal">• {currentTranscript.expert_role}</span>
            </div>
            <div className="text-[#8a857e] font-mono text-[11px] font-semibold">
              {(currentTranscript.dialogue_turns || []).length} Dialogue Turns Ingested
            </div>
          </div>
        )}
      </div>

      {/* Transcript Dialogue Feed */}
      {currentTranscript && (
        <div className="space-y-3">
          {(currentTranscript.dialogue_turns || []).map((turn) => {
            const isTarget = targetTimestamp === turn.timestamp;
            const isMatch = searchQuery.trim() && turn.text.toLowerCase().includes(searchQuery.toLowerCase());

            return (
              <div
                key={turn.turn_index}
                ref={(el) => {
                  turnRefs.current[turn.timestamp] = el;
                }}
                className={`p-5 rounded-xl border transition-all duration-200 ${
                  isTarget
                    ? 'bg-[#fff7f4] border-[#cc785c] ring-2 ring-[#f5d5cb] shadow-sm'
                    : isMatch
                    ? 'bg-[#fefce8] border-[#fde68a] shadow-xs'
                    : turn.is_interviewer
                    ? 'bg-[#fbf9f4] border-[#e8e5dc]'
                    : 'bg-white border-[#e8e5dc] shadow-xs'
                }`}
              >
                {/* Turn Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyQuote(turn, currentTranscript.country)}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#f4efe6] hover:bg-[#e8e5dc] text-[#5c5850] font-mono text-[11px] font-semibold transition-colors border border-[#e2ded4]"
                      title="Click to copy timestamp reference"
                    >
                      <Clock className="w-3 h-3 text-[#8a857e]" />
                      <span>{turn.timestamp}</span>
                    </button>

                    <span
                      className={`text-xs font-bold ${
                        turn.is_interviewer ? 'text-[#706c64] font-serif italic' : 'text-[#1f1e1d]'
                      }`}
                    >
                      {turn.speaker}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyQuote(turn, currentTranscript.country)}
                    className="text-[#8a857e] hover:text-[#1f1e1d] hover:bg-[#f4efe6] px-2 py-0.5 rounded text-xs inline-flex items-center gap-1 font-medium transition-colors"
                    title="Copy dialogue quote"
                  >
                    {copiedTurn === turn.turn_index ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-800 text-[11px] font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Turn Content */}
                <p
                  className={`text-xs leading-relaxed font-normal ${
                    turn.is_interviewer ? 'text-[#5c5850] italic font-serif' : 'text-[#262524]'
                  }`}
                >
                  {highlightText(turn.text, searchQuery)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
