from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import Transcript
from app.services.case_service import case_service

router = APIRouter()

@router.get("/transcripts", response_model=List[Transcript])
def get_transcripts():
    return case_service.get_all_transcripts()

@router.get("/transcripts/{transcript_id}", response_model=Transcript)
def get_transcript(transcript_id: str):
    transcript = case_service.get_transcript(transcript_id)
    if not transcript:
        raise HTTPException(status_code=404, detail=f"Transcript '{transcript_id}' not found")
    return transcript
