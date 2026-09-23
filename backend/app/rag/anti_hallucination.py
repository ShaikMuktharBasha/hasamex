import re
from typing import List, Dict, Optional, Tuple
from app.models.schemas import EvidenceItem, Transcript

def verify_quote_exactness(quote: str, raw_text: str) -> bool:
    """Verifies that the quote actually exists in the raw transcript."""
    # Normalize whitespaces and quotes for comparison
    clean_quote = re.sub(r"\s+", " ", quote).strip().strip('"\'')
    clean_raw = re.sub(r"\s+", " ", raw_text).strip()
    return clean_quote.lower() in clean_raw.lower()

def determine_evidence_level(
    evidence_items: List[EvidenceItem],
    top_score: float = 0.0
) -> str:
    """
    Classifies the evidence grounding level strictly based on retrieved support:
    - strong: evidence found across multiple transcripts or high similarity
    - moderate: evidence found with solid match
    - limited: minimal retrieval signal
    - no_evidence: no supporting evidence found
    """
    if not evidence_items or top_score < 0.08:
        return "no_evidence"
    
    unique_countries = set(item.country for item in evidence_items)
    
    if len(evidence_items) >= 2 and len(unique_countries) >= 2:
        return "strong"
    elif len(evidence_items) >= 2 or top_score >= 0.35:
        return "strong"
    elif len(evidence_items) >= 1 and top_score >= 0.18:
        return "moderate"
    else:
        return "limited"

def filter_grounded_evidence(
    raw_evidence: List[EvidenceItem],
    transcripts: Dict[str, Transcript]
) -> List[EvidenceItem]:
    """Validates and rejects ungrounded or fabricated quotes."""
    valid_items: List[EvidenceItem] = []
    
    for item in raw_evidence:
        transcript = transcripts.get(item.transcript_id)
        if not transcript:
            continue
            
        if verify_quote_exactness(item.quote, transcript.full_text):
            valid_items.append(item)
            
    return valid_items
