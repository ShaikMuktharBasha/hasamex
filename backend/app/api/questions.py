from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import InterviewQuestion, QuestionAnalysis
from app.services.case_service import case_service

router = APIRouter()

@router.get("/questions", response_model=List[InterviewQuestion])
def get_questions():
    return case_service.get_questions()

@router.get("/interview-guide/{question_id}", response_model=QuestionAnalysis)
@router.post("/interview-guide/{question_id}", response_model=QuestionAnalysis)
def get_interview_guide_analysis(question_id: str):
    analysis = case_service.get_question_analysis(question_id)
    if not analysis:
        raise HTTPException(status_code=404, detail=f"Question '{question_id}' not found")
    return analysis
