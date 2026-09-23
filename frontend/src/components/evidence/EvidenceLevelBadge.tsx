import React from 'react';
import { ShieldCheck, ShieldAlert, Shield, AlertCircle } from 'lucide-react';

interface EvidenceLevelBadgeProps {
  level: 'strong' | 'moderate' | 'limited' | 'no_evidence' | string;
}

export const EvidenceLevelBadge: React.FC<EvidenceLevelBadgeProps> = ({ level }) => {
  switch (level?.toLowerCase()) {
    case 'strong':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
          Strong Grounding
        </span>
      );
    case 'moderate':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eff6ff] text-[#1e40af] border border-[#bfdbfe]">
          <Shield className="w-3.5 h-3.5 text-[#2563eb]" />
          Moderate Grounding
        </span>
      );
    case 'limited':
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#fffbeb] text-[#92400e] border border-[#fde68a]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#d97706]" />
          Limited Grounding
        </span>
      );
    case 'no_evidence':
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#fef2f2] text-[#991b1b] border border-[#fecaca]">
          <AlertCircle className="w-3.5 h-3.5 text-[#dc2626]" />
          No Supporting Evidence
        </span>
      );
  }
};
