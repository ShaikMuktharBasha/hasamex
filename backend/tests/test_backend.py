import pytest
from app.services.case_service import case_service
from app.rag.vector_store import vector_store
from app.rag.anti_hallucination import verify_quote_exactness, determine_evidence_level
from app.rag.synthesizer import generate_grounded_answer

def test_initialization():
    case_service.initialize()
    assert len(case_service.transcripts) == 3
    assert "france" in case_service.transcripts
    assert "germany" in case_service.transcripts
    assert "uk" in case_service.transcripts
    assert len(case_service.questions) == 6
    assert len(case_service.evidence_items) > 0

def test_vector_search():
    case_service.initialize()
    results = vector_store.search("barriers to adoption", top_k=3)
    assert len(results) > 0
    top_item, score = results[0]
    assert top_item.quote is not None
    assert top_item.country in ["France", "Germany", "United Kingdom"]

def test_quote_exactness():
    case_service.initialize()
    france_t = case_service.transcripts["france"]
    exact_quote = "Adoption is growing, but it is still concentrated in larger academic hospitals"
    assert verify_quote_exactness(exact_quote, france_t.full_text)
    
    fake_quote = "Robotic surgery has been completely banned across all French hospitals"
    assert not verify_quote_exactness(fake_quote, france_t.full_text)

def test_interview_guide_analysis():
    case_service.initialize()
    analysis = case_service.get_question_analysis("q1")
    assert analysis is not None
    assert "France" in analysis.evidence_by_country
    assert "Germany" in analysis.evidence_by_country
    assert "UK" in analysis.evidence_by_country
    assert analysis.evidence_by_country["France"].timestamp == "00:18"

def test_disagreements_and_themes():
    case_service.initialize()
    themes = case_service.get_themes()
    assert len(themes) >= 3
    
    disagreements = case_service.get_disagreements()
    assert len(disagreements) >= 3
    for d in disagreements:
        assert d.topic is not None
        assert "France" in d.evidence
        assert "Germany" in d.evidence
        assert "UK" in d.evidence

def test_evaluation_metrics():
    case_service.initialize()
    metrics = case_service.run_evaluation()
    assert metrics.total_test_cases > 0
    assert metrics.retrieval_precision_pct >= 80.0
    assert metrics.quote_exactness_pct == 100.0
    assert metrics.unsupported_claim_rate_pct == 0.0
