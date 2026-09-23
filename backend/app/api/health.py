from fastapi import APIRouter
from app.config import settings
from app.services.case_service import case_service

router = APIRouter()

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app_name": settings.app_name,
        "version": settings.version,
        "environment": settings.environment,
        "llm_engine_connected": bool(settings.llm_api_key and settings.llm_api_key.strip()),
        "mode": "Live LLM" if (settings.llm_api_key and settings.llm_api_key.strip()) else "High-Precision Grounded Engine",
        "transcripts_loaded": len(case_service.transcripts),
        "evidence_chunks_indexed": len(case_service.evidence_items)
    }

@router.get("/overview")
def get_overview():
    return case_service.get_overview_metrics()
