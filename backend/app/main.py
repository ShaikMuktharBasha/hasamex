from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.services.case_service import case_service

# Routers
from app.api.health import router as health_router
from app.api.transcripts import router as transcripts_router
from app.api.questions import router as questions_router
from app.api.rag import router as rag_router
from app.api.themes import router as themes_router
from app.api.disagreements import router as disagreements_router
from app.api.evidence import router as evidence_router
from app.api.evaluation import router as evaluation_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: parse case pack transcripts and build vector index
    case_service.initialize()
    yield

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    description="Evidence-Grounded Expert Call Intelligence Platform for Hasamex AI Case Study",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred. Please verify backend logs."}
    )

# Include API Routers
app.include_router(health_router, prefix="/api", tags=["Health & Overview"])
app.include_router(transcripts_router, prefix="/api", tags=["Transcripts"])
app.include_router(questions_router, prefix="/api", tags=["Interview Guide"])
app.include_router(rag_router, prefix="/api", tags=["Ask AI (RAG)"])
app.include_router(themes_router, prefix="/api", tags=["Themes"])
app.include_router(disagreements_router, prefix="/api", tags=["Disagreements"])
app.include_router(evidence_router, prefix="/api", tags=["Evidence"])
app.include_router(evaluation_router, prefix="/api", tags=["Evaluation"])

# Static build locations (if deployed as a unified single service)
dist_paths = [
    Path(__file__).resolve().parent.parent.parent / "frontend" / "dist",
    Path(__file__).resolve().parent.parent / "static",
]

static_dist = None
for p in dist_paths:
    if p.exists() and (p / "index.html").exists():
        static_dist = p
        break

if static_dist:
    app.mount("/assets", StaticFiles(directory=str(static_dist / "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file_path = static_dist / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(static_dist / "index.html")
else:
    @app.get("/")
    def root():
        return {
            "status": "online",
            "app": "ExpertLens AI",
            "version": settings.version,
            "docs_url": "/docs",
            "api_endpoints": {
                "health": "/api/health",
                "overview": "/api/overview",
                "transcripts": "/api/transcripts",
                "questions": "/api/questions",
                "ask_rag": "/api/ask",
                "themes": "/api/themes",
                "disagreements": "/api/disagreements",
                "evidence": "/api/evidence",
                "evaluation": "/api/evaluation"
            }
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
