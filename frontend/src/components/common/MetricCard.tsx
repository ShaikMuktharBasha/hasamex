import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  colorScheme?: 'terracotta' | 'emerald' | 'amber' | 'blue' | 'indigo';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorScheme = 'terracotta'
}) => {
  const schemeClasses = {
    terracotta: {
      border: 'border-[#e8e5dc] hover:border-[#cc785c]',
      iconBg: 'bg-[#fbf2ee] text-[#c15f3e] border border-[#f5d5cb]',
      valueColor: 'text-[#1f1e1d]',
    },
    emerald: {
      border: 'border-[#e8e5dc] hover:border-[#059669]',
      iconBg: 'bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]',
      valueColor: 'text-[#1f1e1d]',
    },
    amber: {
      border: 'border-[#e8e5dc] hover:border-[#d97706]',
      iconBg: 'bg-[#fffbeb] text-[#d97706] border border-[#fde68a]',
      valueColor: 'text-[#1f1e1d]',
    },
    blue: {
      border: 'border-[#e8e5dc] hover:border-[#2563eb]',
      iconBg: 'bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]',
      valueColor: 'text-[#1f1e1d]',
    },
    indigo: {
      border: 'border-[#e8e5dc] hover:border-[#cc785c]',
      iconBg: 'bg-[#fbf2ee] text-[#c15f3e] border border-[#f5d5cb]',
      valueColor: 'text-[#1f1e1d]',
    }
  }[colorScheme];

  return (
    <div className={`bg-white rounded-xl border ${schemeClasses.border} p-5 shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-between`}>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#8a857e] mb-1 font-mono">
          {title}
        </p>
        <div className={`font-serif text-3xl font-bold tracking-tight ${schemeClasses.valueColor}`}>
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-[#8a857e] mt-1 font-medium">
            {subtitle}
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl ${schemeClasses.iconBg} flex items-center justify-center shadow-xs`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};
