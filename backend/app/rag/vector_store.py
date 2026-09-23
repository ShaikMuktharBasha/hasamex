import numpy as np
from typing import List, Dict, Any, Optional, Tuple
from app.models.schemas import EvidenceItem
from app.rag.embeddings import embedding_engine

class VectorStore:
    def __init__(self):
        self.chunks: List[EvidenceItem] = []
        self.embeddings: Optional[np.ndarray] = None
        self.is_indexed = False

    def index_evidence(self, evidence_items: List[EvidenceItem]):
        self.chunks = evidence_items
        texts = [f"{item.country} {item.expert_role}: {item.quote}" for item in evidence_items]
        embedding_engine.fit_corpus(texts)
        self.embeddings = embedding_engine.get_embeddings_batch(texts)
        self.is_indexed = True

    def search(
        self,
        query: str,
        top_k: int = 5,
        country_filter: Optional[str] = None,
        min_score: float = 0.05
    ) -> List[Tuple[EvidenceItem, float]]:
        if not self.is_indexed or self.embeddings is None or len(self.chunks) == 0:
            return []

        query_vec = embedding_engine.get_embedding(query)
        
        # Calculate cosine similarities
        scores = np.dot(self.embeddings, query_vec)
        
        results: List[Tuple[EvidenceItem, float]] = []
        ranked_indices = np.argsort(scores)[::-1]

        for idx in ranked_indices:
            score = float(scores[idx])
            chunk = self.chunks[idx]
            
            if country_filter and chunk.country.lower() != country_filter.lower():
                continue
                
            if score >= min_score:
                item_copy = chunk.model_copy()
                item_copy.relevance_score = round(score, 3)
                results.append((item_copy, score))
                
            if len(results) >= top_k:
                break
                
        return results

    def get_by_id(self, item_id: str) -> Optional[EvidenceItem]:
        for chunk in self.chunks:
            if chunk.id == item_id:
                return chunk
        return None

vector_store = VectorStore()
