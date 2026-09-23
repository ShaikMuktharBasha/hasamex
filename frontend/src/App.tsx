import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { OverviewPage } from './pages/OverviewPage';
import { InterviewGuidePage } from './pages/InterviewGuidePage';
import { AskAIPage } from './pages/AskAIPage';
import { ThemesPage } from './pages/ThemesPage';
import { DisagreementsPage } from './pages/DisagreementsPage';
import { TranscriptsPage } from './pages/TranscriptsPage';
import { EvidenceExplorerPage } from './pages/EvidenceExplorerPage';
import { EvaluationPage } from './pages/EvaluationPage';
import { HowItWorksWidget } from './components/common/HowItWorksWidget';
import { api } from './services/api';
import { NavigationTab } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>('q1');
  const [targetTranscriptId, setTargetTranscriptId] = useState<string>('france');
  const [targetTimestamp, setTargetTimestamp] = useState<string | null>(null);
  const [isEngineConnected, setIsEngineConnected] = useState<boolean>(false);

  useEffect(() => {
    const checkEngine = async () => {
      try {
        const health = await api.getHealth();
        setIsEngineConnected(health.llm_engine_connected);
      } catch (err) {
        console.warn('Backend offline or health check failed', err);
      }
    };
    checkEngine();
  }, []);

  const handleOpenTranscript = (transcriptId: string, timestamp: string) => {
    setTargetTranscriptId(transcriptId);
    setTargetTimestamp(timestamp);
    setActiveTab('transcripts');
  };

  const handleSelectCountry = (countryId: string) => {
    setTargetTranscriptId(countryId);
    setTargetTimestamp(null);
    setActiveTab('transcripts');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 font-sans text-slate-900 relative">
      {/* Fixed Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectCountry={handleSelectCountry}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-slate-50/50">
        <Header activeTab={activeTab} isEngineConnected={isEngineConnected} />

        <main className="flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewPage
              onNavigate={setActiveTab}
              onOpenTranscript={handleOpenTranscript}
              onSelectQuestion={setSelectedQuestionId}
            />
          )}

          {activeTab === 'interview-guide' && (
            <InterviewGuidePage
              selectedQuestionId={selectedQuestionId}
              onSelectQuestion={setSelectedQuestionId}
              onOpenTranscript={handleOpenTranscript}
            />
          )}

          {activeTab === 'ask-ai' && (
            <AskAIPage onOpenTranscript={handleOpenTranscript} />
          )}

          {activeTab === 'themes' && (
            <ThemesPage onOpenTranscript={handleOpenTranscript} />
          )}

          {activeTab === 'disagreements' && (
            <DisagreementsPage onOpenTranscript={handleOpenTranscript} />
          )}

          {activeTab === 'transcripts' && (
            <TranscriptsPage
              initialTranscriptId={targetTranscriptId}
              targetTimestamp={targetTimestamp}
            />
          )}

          {activeTab === 'evidence' && (
            <EvidenceExplorerPage onOpenTranscript={handleOpenTranscript} />
          )}

          {activeTab === 'evaluation' && <EvaluationPage />}
        </main>
      </div>

      {/* Floating "How It Works" Guide Widget */}
      <HowItWorksWidget
        onNavigate={setActiveTab}
        onOpenTranscript={handleOpenTranscript}
        onSelectQuestion={setSelectedQuestionId}
      />
    </div>
  );
}

export default App;
