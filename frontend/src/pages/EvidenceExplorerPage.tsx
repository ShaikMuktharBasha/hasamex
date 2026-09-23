import React, { useEffect, useState } from 'react';
import { Search, Filter, BookmarkCheck, RefreshCw, Feather } from 'lucide-react';
import { EvidenceCard } from '../components/evidence/EvidenceCard';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { api } from '../services/api';
import type { EvidenceItem } from '../types';

interface EvidenceExplorerPageProps {
  onOpenTranscript: (transcriptId: string, timestamp: string) => void;
}

export const EvidenceExplorerPage: React.FC<EvidenceExplorerPageProps> = ({ onOpenTranscript }) => {
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchEvidence = async () => {
    try {
      setLoading(true);
      const data = await api.getEvidence({
        country: country || undefined,
        speaker: speaker || undefined,
        q: searchQuery || undefined
      });
      setEvidence(data);
    } catch (err) {
      console.error('Failed to load evidence', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, [country, speaker]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEvidence();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-7">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8e5dc] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#c15f3e] bg-[#fdf3ef] px-2.5 py-1 rounded-md border border-[#f5d5cb] mb-2">
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Audit & Verification Explorer</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1f1e1d] tracking-tight">
            Evidence & Quotation Explorer
          </h2>
          <p className="text-xs text-[#706c64] mt-1">
            Browse, filter, and inspect every indexed quotation segment across the case pack
          </p>
        </div>

        <div className="text-xs font-bold text-[#706c64] font-mono bg-[#f4efe6] px-3 py-1.5 rounded-lg border border-[#e2ded4]">
          {evidence.length} Evidence Chunks
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e8e5dc] shadow-xs">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Query input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-[#8a857e] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search keyword in quote or context..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#e8e5dc] text-xs focus:outline-none focus:border-[#cc785c] bg-[#faf9f5] text-[#1f1e1d]"
            />
          </div>

          {/* Country filter */}
          <div className="sm:col-span-3">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#e8e5dc] text-xs font-medium text-[#5c5850] bg-[#faf9f5] focus:outline-none focus:border-[#cc785c]"
            >
              <option value="">🌐 All Countries</option>
              <option value="France">🇫🇷 France</option>
              <option value="Germany">🇩🇪 Germany</option>
              <option value="United Kingdom">🇬🇧 United Kingdom</option>
            </select>
          </div>

          {/* Speaker filter */}
          <div className="sm:col-span-3">
            <select
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#e8e5dc] text-xs font-medium text-[#5c5850] bg-[#faf9f5] focus:outline-none focus:border-[#cc785c]"
            >
              <option value="">👥 All Experts</option>
              <option value="Martin">🇫🇷 Dr. Jean Martin (France)</option>
              <option value="Keller">🇩🇪 Anna Keller (Germany)</option>
              <option value="Carter">🇬🇧 Dr. Emily Carter (UK)</option>
            </select>
          </div>
        </form>
      </div>

      {/* Evidence Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Skeleton className="h-44 rounded-xl bg-[#ede9de]" />
          <Skeleton className="h-44 rounded-xl bg-[#ede9de]" />
          <Skeleton className="h-44 rounded-xl bg-[#ede9de]" />
        </div>
      ) : evidence.length === 0 ? (
        <EmptyState
          title="No evidence found"
          description="No transcript quotes match your current filter criteria."
          actionLabel="Reset Filters"
          onAction={() => {
            setCountry('');
            setSpeaker('');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {evidence.map((ev) => (
            <EvidenceCard
              key={ev.id}
              evidence={ev}
              onOpenTranscript={onOpenTranscript}
              highlightText={searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  );
};
