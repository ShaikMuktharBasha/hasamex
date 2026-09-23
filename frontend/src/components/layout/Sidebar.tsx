import React from 'react';
import {
  Compass,
  BookOpenCheck,
  Sparkles,
  Layers,
  Scale,
  Headphones,
  BookmarkCheck,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Building2,
  FileBadge2,
  Globe2,
  Feather
} from 'lucide-react';
import { getCountryFlag } from '../common/CountryFlag';
import type { NavigationTab } from '../../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onSelectCountry?: (countryId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onSelectCountry
}) => {
  const navItems = [
    { id: 'overview' as NavigationTab, label: 'Overview', icon: Compass },
    { id: 'interview-guide' as NavigationTab, label: 'Interview Guide', icon: BookOpenCheck, badge: '6 Qs' },
    { id: 'ask-ai' as NavigationTab, label: 'Ask AI (RAG)', icon: Sparkles, highlight: true },
    { id: 'themes' as NavigationTab, label: 'Common Themes', icon: Layers },
    { id: 'disagreements' as NavigationTab, label: 'Disagreements', icon: Scale },
    { id: 'transcripts' as NavigationTab, label: 'Transcripts', icon: Headphones, badge: '3 Calls' },
    { id: 'evidence' as NavigationTab, label: 'Evidence Explorer', icon: BookmarkCheck },
    { id: 'evaluation' as NavigationTab, label: 'Quality & Audit', icon: ShieldCheck },
  ];

  const expertCalls = [
    {
      id: 'france',
      name: 'Dr. Jean Martin',
      role: 'Head of Urology',
      country: 'France',
      flag: '🇫🇷',
      icon: Stethoscope,
      accent: 'border-l-[#3b82f6]'
    },
    {
      id: 'germany',
      name: 'Anna Keller',
      role: 'Procurement Director',
      country: 'Germany',
      flag: '🇩🇪',
      icon: Building2,
      accent: 'border-l-[#d97706]'
    },
    {
      id: 'uk',
      name: 'Dr. Emily Carter',
      role: 'Consultant Urologist',
      country: 'UK',
      flag: '🇬🇧',
      icon: FileBadge2,
      accent: 'border-l-[#059669]'
    },
  ];

  return (
    <aside className="w-68 bg-[#201f1e] text-[#d6d3cd] flex flex-col h-screen border-r border-[#343331] shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#343331]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#cc785c] flex items-center justify-center text-white shadow-sm shadow-[#cc785c]/30">
            <Feather className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-[#faf9f5] tracking-tight leading-none">
              ExpertLens <span className="font-sans text-xs px-1.5 py-0.5 rounded bg-[#38322e] text-[#e09f87] font-semibold ml-0.5 border border-[#52443d]">AI</span>
            </h1>
            <p className="text-[11px] text-[#9b968f] font-normal mt-1 leading-none">
              Evidence-grounded intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8a857e] px-3 pb-2 font-mono">
          <Compass className="w-3 h-3 text-[#cc785c]" />
          <span>Research Dossier</span>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-[#cc785c] text-white shadow-sm shadow-[#cc785c]/30 font-bold'
                  : 'text-[#c2beb6] hover:text-white hover:bg-[#2b2a28]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-[#e09f87]' : 'text-[#8a857e]'}`} />
                <span className="tracking-tight">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                  isActive ? 'bg-[#ab583d] text-white' : 'bg-[#2f2e2c] text-[#9b968f]'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Divider */}
        <div className="pt-5 pb-2">
          <div className="border-t border-[#343331] px-3 pt-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8a857e] font-mono mb-2">
              <Globe2 className="w-3 h-3 text-[#cc785c]" />
              <span>3 Ingested Calls</span>
            </div>
          </div>
        </div>

        {/* Expert Quick Jump */}
        <div className="space-y-1.5">
          {expertCalls.map((expert) => {
            const ExpertIcon = expert.icon;
            return (
              <button
                key={expert.id}
                onClick={() => {
                  setActiveTab('transcripts');
                  if (onSelectCountry) onSelectCountry(expert.id);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl bg-[#282725] hover:bg-[#32302d] border border-[#343331] ${expert.accent} border-l-4 transition-all group flex items-start justify-between`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#343331] flex items-center justify-center text-sm shrink-0 group-hover:bg-[#3e3b38] transition-colors">
                    <span>{expert.flag}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#faf9f5]">
                        {expert.country}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#9b968f] truncate max-w-[140px] mt-0.5">
                      {expert.name}
                    </p>
                  </div>
                </div>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-1" />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer Info */}
      <div className="p-3.5 border-t border-[#343331] bg-[#1a1918] text-[11px] text-[#8a857e]">
        <div className="flex items-center justify-between">
          <span className="font-medium">Project Case</span>
          <span className="text-[#d6d3cd] font-semibold truncate max-w-[120px]" title="European Robotic Surgery Market">
            Robotic Surgery
          </span>
        </div>
        <div className="flex items-center justify-between mt-1 text-[10px]">
          <span>Grounding Engine</span>
          <span className="text-[#e09f87] font-semibold">Strict Verbatim</span>
        </div>
      </div>
    </aside>
  );
};
