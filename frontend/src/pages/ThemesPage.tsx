import React, { useEffect, useState } from 'react';
import { Layers, Check, Minus, Sparkles, BookOpen, Quote, CheckCircle2, Feather } from 'lucide-react';
import { EvidenceCard } from '../components/evidence/EvidenceCard';
import { Skeleton } from '../components/common/Skeleton';
import { api } from '../services/api';
import type { ThemeItem } from '../types';

interface ThemesPageProps {
  onOpenTranscript: (transcriptId: string, timestamp: string) => void;
}

export const ThemesPage: React.FC<ThemesPageProps> = ({ onOpenTranscript }) => {
  const [themes, setThemes] = useState<ThemeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchThemes = async () => {
      try {
        setLoading(true);
        const data = await api.getThemes();
        if (isMounted && Array.isArray(data)) {
          setThemes(data);
        }
      } catch (err) {
        console.error('Failed to load themes', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchThemes();
    return () => { isMounted = false; };
  }, []);

  if (loading && themes.length === 0) {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-40 rounded-xl bg-[#ede9de]" />
        <Skeleton className="h-64 rounded-xl bg-[#ede9de]" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8e5dc] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#c15f3e] bg-[#fdf3ef] px-2.5 py-1 rounded-md border border-[#f5d5cb] mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Cross-Market Qualitative Matrix</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1f1e1d] tracking-tight">
            Common Themes Across Expert Calls
          </h2>
          <p className="text-xs text-[#706c64] mt-1">
            Major recurring themes and cross-market agreements identified across France 🇫🇷, Germany 🇩🇪, and the United Kingdom 🇬🇧
          </p>
        </div>
      </div>

      {/* Summary Matrix Table in Claude Stone Style */}
      <div className="bg-white rounded-2xl border border-[#e8e5dc] overflow-hidden shadow-xs">
        <div className="p-4.5 border-b border-[#e8e5dc] bg-[#faf9f5] flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#5c5850] font-mono flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5 text-[#cc785c]" />
            <span>Cross-Country Theme Presence Matrix</span>
          </h3>
          <span className="text-[11px] text-[#8a857e] font-medium">3 Markets Evaluated</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#e8e5dc] bg-[#fbf9f4] text-[#706c64] font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-6">Identified Theme</th>
                <th className="py-3.5 px-5 text-center w-36">🇫🇷 France</th>
                <th className="py-3.5 px-5 text-center w-36">🇩🇪 Germany</th>
                <th className="py-3.5 px-5 text-center w-36">🇬🇧 UK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0ebd8]">
              {themes.map((theme) => (
                <tr key={theme.id} className="hover:bg-[#faf9f5] transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#1f1e1d]">
                    <div className="font-serif text-sm font-bold text-[#1f1e1d]">{theme.title}</div>
                    <p className="text-xs text-[#706c64] font-normal mt-1 max-w-xl leading-relaxed">
                      {theme.summary}
                    </p>
                  </td>
                  <td className="py-4 px-5 text-center">
                    {theme.markets['France'] ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] font-bold">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="text-[#b8b3a9]">
                        <Minus className="w-4 h-4 mx-auto" />
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-center">
                    {theme.markets['Germany'] ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#fffbeb] text-[#b45309] border border-[#fde68a] font-bold">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="text-[#b8b3a9]">
                        <Minus className="w-4 h-4 mx-auto" />
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5 text-center">
                    {theme.markets['UK'] ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] font-bold">
                        <Check className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="text-[#b8b3a9]">
                        <Minus className="w-4 h-4 mx-auto" />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Theme Cards with Supporting Evidence */}
      <div className="space-y-6">
        <h3 className="font-serif text-lg font-bold text-[#1f1e1d] tracking-tight">
          Theme Deep-Dive & Exact Transcript Quotes
        </h3>

        <div className="space-y-6">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className="bg-white rounded-2xl border border-[#e8e5dc] p-6 shadow-xs space-y-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="font-serif text-base font-bold text-[#1f1e1d]">
                    {theme.title}
                  </h4>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
                    <span className="px-2 py-0.5 rounded bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]">🇫🇷 FR</span>
                    <span className="px-2 py-0.5 rounded bg-[#fffbeb] text-[#b45309] border border-[#fde68a]">🇩🇪 DE</span>
                    <span className="px-2 py-0.5 rounded bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">🇬🇧 UK</span>
                  </div>
                </div>
                <p className="text-xs text-[#5c5850] leading-relaxed font-normal">
                  {theme.summary}
                </p>
              </div>

              {/* Evidence Quotes Grid */}
              <div>
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#8a857e] mb-3 font-mono">
                  Grounded Verbatim Quotes Across Markets
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(theme.evidence || []).map((ev) => (
                    <EvidenceCard
                      key={ev.id}
                      evidence={ev}
                      onOpenTranscript={onOpenTranscript}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
