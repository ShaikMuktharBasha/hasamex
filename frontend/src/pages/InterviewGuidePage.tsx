import React, { useEffect, useState } from 'react';
import {
  BookOpenCheck,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  FileText,
  Quote,
  Feather
} from 'lucide-react';
import { EvidenceCard } from '../components/evidence/EvidenceCard';
import { EvidenceLevelBadge } from '../components/evidence/EvidenceLevelBadge';
import { Skeleton } from '../components/common/Skeleton';
import { api } from '../services/api';
import type { InterviewQuestion, QuestionAnalysis } from '../types';

interface InterviewGuidePageProps {
  selectedQuestionId: string;
  onSelectQuestion: (questionId: string) => void;
  onOpenTranscript: (transcriptId: string, timestamp: string) => void;
}

export const InterviewGuidePage: React.FC<InterviewGuidePageProps> = ({
  selectedQuestionId,
  onSelectQuestion,
  onOpenTranscript
}) => {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [analysis, setAnalysis] = useState<QuestionAnalysis | null>(null);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchQuestions = async () => {
      try {
        setLoadingQuestions(true);
        const data = await api.getQuestions();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setQuestions(data);
          if (!selectedQuestionId) {
            onSelectQuestion(data[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load questions', err);
      } finally {
        if (isMounted) setLoadingQuestions(false);
      }
    };
    fetchQuestions();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchAnalysis = async () => {
      if (!selectedQuestionId) return;
      try {
        setLoadingAnalysis(true);
        const data = await api.getQuestionAnalysis(selectedQuestionId);
        if (isMounted && data) {
          setAnalysis(data);
        }
      } catch (err) {
        console.error(`Failed to load analysis for ${selectedQuestionId}`, err);
      } finally {
        if (isMounted) setLoadingAnalysis(false);
      }
    };
    fetchAnalysis();
    return () => { isMounted = false; };
  }, [selectedQuestionId]);

  const questionsList = questions.length > 0 ? questions : [
    { id: 'q1', question_number: 1, question_text: 'How would you describe current adoption of robotic surgery in your market?', theme: 'Current Market Adoption' },
    { id: 'q2', question_number: 2, question_text: 'What are the main barriers to adoption?', theme: 'Adoption Barriers & Capital Approval' },
    { id: 'q3', question_number: 3, question_text: 'How important are hospital budgets and ROI in purchasing decisions?', theme: 'Budgets & ROI Importance' },
    { id: 'q4', question_number: 4, question_text: 'How important are surgeon training and clinical outcomes?', theme: 'Surgeon Training & Outcomes' },
    { id: 'q5', question_number: 5, question_text: 'What adoption trend do you expect over the next 3–5 years?', theme: '3-5 Year Outlook & Growth' },
    { id: 'q6', question_number: 6, question_text: 'What is the typical hospital decision-making timeline for purchasing a new robotic system?', theme: 'Purchasing Timelines & Decision Process' }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8e5dc] pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#c15f3e] bg-[#fdf3ef] px-2.5 py-1 rounded-md border border-[#f5d5cb] mb-2">
            <BookOpenCheck className="w-3.5 h-3.5" />
            <span>Standardized Case Pack Protocol</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#1f1e1d] tracking-tight">
            Interview Guide Synthesis & Multi-Market Grounding
          </h2>
          <p className="text-xs text-[#706c64] mt-1">
            Standardized questions evaluated across France, Germany, and the UK with verbatim quotation lineage
          </p>
        </div>

        <div className="flex items-center gap-2">
          <EvidenceLevelBadge level={analysis?.evidence_level || 'strong'} />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left: Question List (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#8a857e] px-1 font-mono mb-3 flex items-center gap-1.5">
            <Feather className="w-3 h-3 text-[#cc785c]" />
            <span>Interview Guide Questions (6)</span>
          </h3>

          {loadingQuestions && questions.length === 0 ? (
            <div className="space-y-2">
              <Skeleton className="h-20 rounded-xl bg-[#ede9de]" />
              <Skeleton className="h-20 rounded-xl bg-[#ede9de]" />
              <Skeleton className="h-20 rounded-xl bg-[#ede9de]" />
            </div>
          ) : (
            <div className="space-y-2.5">
              {questionsList.map((q) => {
                const isSelected = selectedQuestionId === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => onSelectQuestion(q.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-[#282725] text-white border-[#282725] shadow-md'
                        : 'bg-white text-[#1f1e1d] border-[#e8e5dc] hover:border-[#cc785c] hover:bg-[#fbf9f4] shadow-xs'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 border ${
                        isSelected ? 'bg-[#cc785c] text-white border-[#cc785c]' : 'bg-[#f4efe6] text-[#5c5850] border-[#e2ded4]'
                      }`}
                    >
                      {q.question_number}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold leading-snug ${isSelected ? 'text-[#faf9f5]' : 'text-[#1f1e1d]'}`}>
                        {q.question_text}
                      </p>
                      <p className={`text-[11px] mt-1.5 font-medium ${isSelected ? 'text-[#e09f87]' : 'text-[#8a857e]'}`}>
                        {q.theme}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 mt-1 ${isSelected ? 'text-[#e09f87]' : 'text-[#b8b3a9]'}`} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Synthesis & Verbatim Market Evidence (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {loadingAnalysis && !analysis ? (
            <div className="space-y-6">
              <Skeleton className="h-44 rounded-xl bg-[#ede9de]" />
              <Skeleton className="h-64 rounded-xl bg-[#ede9de]" />
            </div>
          ) : analysis ? (
            <>
              {/* Question Header & Synthesis Card */}
              <div className="bg-white rounded-2xl border border-[#e8e5dc] p-6 shadow-xs space-y-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-[#fbf2ee] text-[#c15f3e] border border-[#f5d5cb] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    Q{analysis.question_number}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#1f1e1d]">
                    {analysis.question_text}
                  </h3>
                </div>

                {/* AI Synthesis Box in Claude warm paper */}
                <div className="p-5 rounded-xl bg-[#fbf9f4] border border-[#e8e5dc] space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#8a422a] uppercase tracking-wider font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-[#cc785c]" />
                    <span>Cross-Market AI Synthesis</span>
                  </div>
                  <p className="text-sm text-[#262524] leading-relaxed font-normal">
                    {analysis.synthesis}
                  </p>
                </div>

                {/* Key Findings Checklist */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#8a857e] mb-2.5 font-mono">
                    Key Market Findings
                  </h4>
                  <ul className="space-y-2">
                    {(analysis.key_findings || []).map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#3d3a36]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Supporting Evidence Cards by Expert */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#1f1e1d] tracking-tight">
                      Supporting Verbatim Evidence
                    </h3>
                    <p className="text-xs text-[#706c64]">
                      Exact quotations extracted from France, Germany, and the UK transcripts
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {analysis.evidence_by_country && analysis.evidence_by_country['France'] && (
                    <EvidenceCard
                      evidence={analysis.evidence_by_country['France']}
                      onOpenTranscript={onOpenTranscript}
                    />
                  )}

                  {analysis.evidence_by_country && analysis.evidence_by_country['Germany'] && (
                    <EvidenceCard
                      evidence={analysis.evidence_by_country['Germany']}
                      onOpenTranscript={onOpenTranscript}
                    />
                  )}

                  {analysis.evidence_by_country && analysis.evidence_by_country['UK'] && (
                    <EvidenceCard
                      evidence={analysis.evidence_by_country['UK']}
                      onOpenTranscript={onOpenTranscript}
                    />
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
