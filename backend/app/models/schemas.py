from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class DialogueTurn(BaseModel):
    turn_index: int
    timestamp: str
    speaker: str
    text: str
    is_interviewer: bool

class Transcript(BaseModel):
    id: str
    country: str
    expert_name: str
    expert_role: str
    dialogue_turns: List[DialogueTurn]
    total_turns: int
    full_text: str

class EvidenceItem(BaseModel):
    id: str
    transcript_id: str
    country: str
    expert_name: str
    expert_role: str
    timestamp: str
    quote: str
    context: Optional[str] = None
    turn_index: int
    theme: Optional[str] = None
    relevance_score: Optional[float] = 1.0

class InterviewQuestion(BaseModel):
    id: str
    question_number: int
    question_text: str
    theme: str

class QuestionAnalysis(BaseModel):
    question_id: str
    question_number: int
    question_text: str
    synthesis: str
    key_findings: List[str]
    evidence_by_country: Dict[str, EvidenceItem]
    evidence_level: str = "strong"

class RAGRequest(BaseModel):
    question: str
    country_filter: Optional[str] = None
    top_k: Optional[int] = 5

class RAGResponse(BaseModel):
    question: str
    answer: str
    findings: List[str]
    evidence: List[EvidenceItem]
    evidence_level: str  # "strong", "moderate", "limited", "no_evidence"
    is_demo_mode: bool = False

class ThemeMarketPresence(BaseModel):
    country: str
    mentioned: bool
    key_point: Optional[str] = None
    timestamp: Optional[str] = None
    quote: Optional[str] = None

class ThemeItem(BaseModel):
    id: str
    title: str
    summary: str
    markets: Dict[str, bool]
    market_details: List[ThemeMarketPresence]
    evidence: List[EvidenceItem]

class DisagreementItem(BaseModel):
    id: str
    topic: str
    summary: str
    neutral_analysis: str
    france_position: str
    germany_position: str
    uk_position: str
    evidence: Dict[str, EvidenceItem]

class EvaluationMetrics(BaseModel):
    total_test_cases: int
    retrieval_precision_pct: float
    citation_correctness_pct: float
    quote_exactness_pct: float
    timestamp_accuracy_pct: float
    unsupported_claim_rate_pct: float
    status: str
    details: List[Dict[str, Any]]
