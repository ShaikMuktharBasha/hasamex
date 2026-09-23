import axios from 'axios';
import type {
  Transcript,
  InterviewQuestion,
  QuestionAnalysis,
  RAGRequest,
  RAGResponse,
  ThemeItem,
  DisagreementItem,
  EvidenceItem,
  EvaluationMetrics,
  OverviewMetrics
} from '../types';

const rawBaseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '';
const API_BASE = rawBaseUrl ? `${rawBaseUrl.replace(/\/$/, '')}/api` : '/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 25000,
});

export const api = {
  // Health & Overview
  getHealth: async () => {
    const res = await client.get('/health');
    return res.data;
  },

  getOverview: async (): Promise<OverviewMetrics> => {
    const res = await client.get('/overview');
    return res.data;
  },

  // Transcripts
  getTranscripts: async (): Promise<Transcript[]> => {
    const res = await client.get('/transcripts');
    return res.data;
  },

  getTranscriptById: async (id: string): Promise<Transcript> => {
    const res = await client.get(`/transcripts/${id}`);
    return res.data;
  },

  // Interview Guide
  getQuestions: async (): Promise<InterviewQuestion[]> => {
    const res = await client.get('/questions');
    return res.data;
  },

  getQuestionAnalysis: async (questionId: string): Promise<QuestionAnalysis> => {
    const res = await client.get(`/interview-guide/${questionId}`);
    return res.data;
  },

  // Ask AI (RAG)
  askQuestion: async (params: RAGRequest): Promise<RAGResponse> => {
    const res = await client.post('/ask', params);
    return res.data;
  },

  // Themes & Disagreements
  getThemes: async (): Promise<ThemeItem[]> => {
    const res = await client.get('/themes');
    return res.data;
  },

  getDisagreements: async (): Promise<DisagreementItem[]> => {
    const res = await client.get('/disagreements');
    return res.data;
  },

  // Evidence Explorer
  getEvidence: async (params?: { country?: string; speaker?: string; q?: string }): Promise<EvidenceItem[]> => {
    const res = await client.get('/evidence', { params });
    return res.data;
  },

  getEvidenceById: async (id: string): Promise<EvidenceItem> => {
    const res = await client.get(`/evidence/${id}`);
    return res.data;
  },

  // Evaluation
  getEvaluation: async (): Promise<EvaluationMetrics> => {
    const res = await client.get('/evaluation');
    return res.data;
  },
};
