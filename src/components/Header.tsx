import React from 'react';
import { TabType } from '../types';
import { Bot, Sparkles, Database, BarChart3, Github, Play, Download, ExternalLink, ShieldCheck, BrainCircuit } from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onRunSimulation: () => void;
  isRunning: boolean;
  onExportSpec: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onRunSimulation,
  isRunning,
  onExportSpec
}) => {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand & Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
          }}>
            <BrainCircuit size={24} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em' }} className="text-gradient">
                NeuraFlow AI
              </h1>
              <span className="badge-glow" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} /> Unicorn Summit Candidate
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Distributed Autonomous Multi-Agent & Prompt Intelligence Engine • By{' '}
              <a 
                href="https://github.com/gelivisasi" 
                target="_blank" 
                rel="noreferrer"
                style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 600 }}
              >
                @gelivisasi <ExternalLink size={10} style={{ display: 'inline' }} />
              </a>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setActiveTab('canvas')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'canvas' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: activeTab === 'canvas' ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              border: activeTab === 'canvas' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent'
            }}
          >
            <Bot size={16} /> Agent Canvas
          </button>

          <button
            onClick={() => setActiveTab('prompt-lab')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'prompt-lab' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: activeTab === 'prompt-lab' ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              border: activeTab === 'prompt-lab' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent'
            }}
          >
            <Sparkles size={16} /> Prompt Lab
          </button>

          <button
            onClick={() => setActiveTab('rag-explorer')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'rag-explorer' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: activeTab === 'rag-explorer' ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              border: activeTab === 'rag-explorer' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent'
            }}
          >
            <Database size={16} /> RAG VectorDB
          </button>

          <button
            onClick={() => setActiveTab('benchmarks')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'benchmarks' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: activeTab === 'benchmarks' ? '#fff' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              border: activeTab === 'benchmarks' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent'
            }}
          >
            <BarChart3 size={16} /> LLM Benchmarks
          </button>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="btn-secondary"
            onClick={onExportSpec}
            title="Export Agent Spec (JSON/YAML)"
            style={{ fontSize: '0.85rem' }}
          >
            <Download size={14} /> Export Spec
          </button>

          <button
            className="btn-primary"
            onClick={onRunSimulation}
            disabled={isRunning}
            style={{ opacity: isRunning ? 0.7 : 1, fontSize: '0.85rem' }}
          >
            <Play size={14} fill={isRunning ? 'transparent' : '#fff'} />
            {isRunning ? 'Executing Agents...' : 'Run Simulation'}
          </button>

          <a
            href="https://github.com/gelivisasi/neuraflow-ai"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ textDecoration: 'none', padding: '10px 12px' }}
            title="View Code on GitHub"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </header>
  );
};
