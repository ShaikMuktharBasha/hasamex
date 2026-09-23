export interface DialogueTurn {
  turn_index: number;
  timestamp: string;
  speaker: string;
  text: string;
  is_interviewer: boolean;
}

export interface Transcript {
  id: string;
  country: string;
  expert_name: string;
  expert_role: string;
  dialogue_turns: DialogueTurn[];
  total_turns: number;
  full_text: string;
}

export interface EvidenceItem {
  id: string;
  transcript_id: string;
  country: string;
  expert_name: string;
  expert_role: string;
  timestamp: string;
  quote: string;
  context?: string;
  turn_index: number;
  theme?: string;
  relevance_score?: number;
}

export interface InterviewQuestion {
  id: string;
  question_number: number;
  question_text: string;
  theme: string;
}

export interface QuestionAnalysis {
  question_id: string;
  question_number: number;
  question_text: string;
  synthesis: string;
  key_findings: string[];
  evidence_by_country: Record<string, EvidenceItem>;
  evidence_level: string;
}

export interface RAGRequest {
  question: string;
  country_filter?: string;
  top_k?: number;
}

export interface RAGResponse {
  question: string;
  answer: string;
  findings: string[];
  evidence: EvidenceItem[];
  evidence_level: 'strong' | 'moderate' | 'limited' | 'no_evidence';
  is_demo_mode: boolean;
}

export interface ThemeMarketPresence {
  country: string;
  mentioned: boolean;
  key_point?: string;
  timestamp?: string;
  quote?: string;
}

export interface ThemeItem {
  id: string;
  title: string;
  summary: string;
  markets: Record<string, boolean>;
  market_details: ThemeMarketPresence[];
  evidence: EvidenceItem[];
}

export interface DisagreementItem {
  id: string;
  topic: string;
  summary: string;
  neutral_analysis: string;
  france_position: string;
  germany_position: string;
  uk_position: string;
  evidence: Record<string, EvidenceItem>;
}

export interface EvaluationMetrics {
  total_test_cases: number;
  retrieval_precision_pct: number;
  citation_correctness_pct: number;
  quote_exactness_pct: number;
  timestamp_accuracy_pct: number;
  unsupported_claim_rate_pct: number;
  status: string;
  details: Array<{
    query: string;
    retrieval_success: boolean;
    quote_exactness: boolean;
    timestamp_verified: boolean;
  }>;
}

export interface OverviewMetrics {
  expert_calls_count: number;
  interview_questions_count: number;
  markets_count: number;
  evidence_segments_count: number;
  countries: string[];
  experts: Array<{
    id: string;
    name: string;
    role: string;
    country: string;
    turns_count: number;
  }>;
  question_coverage: Array<{
    question_id: string;
    number: number;
    text: string;
    theme: string;
    evidence_available: boolean;
    markets_covered: string[];
  }>;
}

export type NavigationTab = 
  | 'overview'
  | 'interview-guide'
  | 'ask-ai'
  | 'themes'
  | 'disagreements'
  | 'transcripts'
  | 'evidence'
  | 'evaluation';
