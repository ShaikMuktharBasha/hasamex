from fastapi import APIRouter
from typing import List
from app.models.schemas import ThemeItem
from app.services.case_service import case_service

router = APIRouter()

@router.get("/themes", response_model=List[ThemeItem])
def get_themes():
    return case_service.get_themes()
