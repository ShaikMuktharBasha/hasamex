from fastapi import APIRouter
from typing import List
from app.models.schemas import DisagreementItem
from app.services.case_service import case_service

router = APIRouter()

@router.get("/disagreements", response_model=List[DisagreementItem])
def get_disagreements():
    return case_service.get_disagreements()
