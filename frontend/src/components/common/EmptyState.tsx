import React from 'react';
import { LucideIcon, SearchX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = SearchX,
  actionLabel,
  onAction
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto my-8 shadow-xs">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-1">
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-5">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm shadow-indigo-600/20"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
