import os
import math
import numpy as np
from typing import List, Dict, Any, Optional
from sklearn.feature_extraction.text import TfidfVectorizer
import httpx
from app.config import settings

class EmbeddingEngine:
    def __init__(self):
        self.use_openai = bool(settings.llm_api_key and settings.llm_api_key.strip())
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 2),
            stop_words="english",
            sublinear_tf=True
        )
        self.is_fitted = False
        self.corpus: List[str] = []

    def fit_corpus(self, texts: List[str]):
        if not texts:
            return
        self.corpus = texts
        self.vectorizer.fit(texts)
        self.is_fitted = True

    def get_embedding(self, text: str) -> np.ndarray:
        if self.use_openai:
            try:
                # Call OpenAI embeddings if API key is provided
                headers = {"Authorization": f"Bearer {settings.llm_api_key}"}
                response = httpx.post(
                    "https://api.openai.com/v1/embeddings",
                    headers=headers,
                    json={"input": text, "model": settings.embedding_model},
                    timeout=5.0
                )
                if response.status_code == 200:
                    emb = response.json()["data"][0]["embedding"]
                    vec = np.array(emb, dtype=np.float32)
                    norm = np.linalg.norm(vec)
                    return vec / (norm + 1e-9)
            except Exception:
                pass # Fallback to local vectorizer
                
        # Local TF-IDF semantic embedding representation
        if not self.is_fitted:
            self.fit_corpus([text])
            
        vec = self.vectorizer.transform([text]).toarray()[0]
        norm = np.linalg.norm(vec)
        if norm > 0:
            return vec / norm
        return np.zeros(len(vec), dtype=np.float32)

    def get_embeddings_batch(self, texts: List[str]) -> np.ndarray:
        if not self.is_fitted:
            self.fit_corpus(texts)
            
        if self.use_openai:
            try:
                headers = {"Authorization": f"Bearer {settings.llm_api_key}"}
                response = httpx.post(
                    "https://api.openai.com/v1/embeddings",
                    headers=headers,
                    json={"input": texts, "model": settings.embedding_model},
                    timeout=8.0
                )
                if response.status_code == 200:
                    embs = [d["embedding"] for d in response.json()["data"]]
                    matrix = np.array(embs, dtype=np.float32)
                    norms = np.linalg.norm(matrix, axis=1, keepdims=True)
                    return matrix / (norms + 1e-9)
            except Exception:
                pass
                
        sparse_mat = self.vectorizer.transform(texts)
        dense_mat = sparse_mat.toarray()
        norms = np.linalg.norm(dense_mat, axis=1, keepdims=True)
        norms[norms == 0] = 1.0
        return dense_mat / norms

embedding_engine = EmbeddingEngine()
