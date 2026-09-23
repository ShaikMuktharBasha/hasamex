from fastapi import APIRouter, HTTPException
from app.models.schemas import RAGRequest, RAGResponse
from app.rag.vector_store import vector_store
from app.rag.synthesizer import generate_grounded_answer

router = APIRouter()

@router.post("/ask", response_model=RAGResponse)
def ask_question(request: RAGRequest):
    query = request.question.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Question cannot be empty")
        
    # Search vector store for top matching chunks
    retrieved = vector_store.search(
        query=query,
        top_k=request.top_k or 5,
        country_filter=request.country_filter,
        min_score=0.04
    )
    
    # Grounded synthesis
    response = generate_grounded_answer(query, retrieved)
    return response
