from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.models.schemas import EvidenceItem
from app.services.case_service import case_service

router = APIRouter()

@router.get("/evidence", response_model=List[EvidenceItem])
def get_evidence(
    country: Optional[str] = Query(None, description="Filter by country (France, Germany, United Kingdom)"),
    speaker: Optional[str] = Query(None, description="Filter by speaker name or role"),
    q: Optional[str] = Query(None, description="Search quote or context text")
):
    return case_service.get_evidence(country=country, speaker=speaker, query=q)

@router.get("/evidence/{evidence_id}", response_model=EvidenceItem)
def get_evidence_by_id(evidence_id: str):
    item = case_service.get_evidence_by_id(evidence_id)
    if not item:
        raise HTTPException(status_code=404, detail=f"Evidence item '{evidence_id}' not found")
    return item
