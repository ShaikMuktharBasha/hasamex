from fastapi import APIRouter
from app.models.schemas import EvaluationMetrics
from app.services.case_service import case_service

router = APIRouter()

@router.get("/evaluation", response_model=EvaluationMetrics)
def run_system_evaluation():
    return case_service.run_evaluation()
