import React, { useState } from 'react';
import { PromptTestCase } from '../types';
import { Sparkles, Zap, DollarSign, Clock, CheckCircle2, ArrowRight, Wand2, Copy, BarChart2 } from 'lucide-react';

export const PromptLab: React.FC = () => {
  const [systemPrompt, setSystemPrompt] = useState(
    `You are an expert AI Engineer assistant specializing in designing autonomous agent swarms, vector RAG indexing, and LLM latency optimization. Provide concise, structured markdown answers.`
  );

  const [userPrompt, setUserPrompt] = useState(
    `Design an architecture for a multi-agent RAG system that processes 10,000 PDF documents per minute with sub-500ms latency.`
  );

  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [testResults, setTestResults] = useState<PromptTestCase['models']>([
    {
      name: 'Anthropic Claude 3.5 Sonnet',
      latency: 284,
      tokens: 412,
      cost: 0.0012,
      qualityScore: 98,
      response: `### High-Throughput RAG Architecture
1. **Parallel Ingestion**: Async PDF parsing via Apache Tika + PyMuPDF workers on Ray.
2. **Hierarchical Chunking**: 512-token chunks with 10% overlap using recursive token splitter.
3. **Vector Search**: Milvus HNSW index + FP16 quantization for <15ms k-NN lookup.
4. **Agentic Reranking**: FlashRank cross-encoder filtering top-20 to top-5 context passages.`
    },
    {
      name: 'OpenAI GPT-4o',
      latency: 310,
      tokens: 445,
      cost: 0.0018,
      qualityScore: 96,
      response: `### Multi-Agent RAG Pipeline
1. **Chunker Agent**: Splits documents semantically based on header hierarchy.
2. **Embedding Service**: Batch embeddings via text-embedding-3-large with dimensional reduction (1536 -> 512).
3. **Qdrant Vector Cluster**: Sharded vector collections with hybrid BM25 + Dense vector retrieval.
4. **LLM Synthesizer**: Streaming generation with early-stop speculation.`
    },
    {
      name: 'PromptQL Native Agent',
      latency: 195,
      tokens: 380,
      cost: 0.0008,
      qualityScore: 99,
      response: `### PromptQL Distributed Swarm Topology
1. **Self-Organizing Mesh**: Shared team memory cache eliminating redundant embeddings.
2. **Sub-200ms Hybrid Cache**: LRU Vector Cache hit rate @ 78%.
3. **Streaming Agent Mesh**: Direct inter-process agent pipe without LLM hop overhead.`
    }
  ]);

  const handleOptimizePrompt = () => {
    setSystemPrompt(
      `You are a Lead AI Architect. Given technical requirements, generate production-ready system architecture blueprints with: 1) System topology, 2) Ingestion pipeline, 3) Vector indexing strategy, and 4) Latency SLA guarantees. Use bullet points.`
    );
  };

  const handleRunBenchmark = () => {
    setIsBenchmarking(true);
    setTimeout(() => {
      setIsBenchmarking(false);
      // Slightly mutate latency / metrics to simulate real-time API call
      setTestResults(prev => prev.map(m => ({
        ...m,
        latency: Math.floor(m.latency * (0.95 + Math.random() * 0.1)),
        tokens: m.tokens + Math.floor(Math.random() * 15 - 7)
      })));
    }, 1200);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Hero Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <Sparkles size={20} color="var(--accent-purple)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Prompt Engineering & Multi-LLM Benchmark Lab</h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Compare system prompt efficiency, token usage, latency (TTFT), and cost per call across premier LLM providers.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={handleOptimizePrompt} style={{ fontSize: '0.82rem' }}>
            <Wand2 size={14} color="var(--accent-purple)" /> AI Prompt Auto-Refine
          </button>
          <button className="btn-primary" onClick={handleRunBenchmark} disabled={isBenchmarking} style={{ fontSize: '0.82rem' }}>
            <Zap size={14} /> {isBenchmarking ? 'Testing Models...' : 'Run Benchmark Test'}
          </button>
        </div>
      </div>

      {/* Editor & Results Split Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '450px 1fr', gap: '20px' }}>
        
        {/* Left Column: Prompt Controls */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
              System Prompt (Persona & Guardrails)
            </label>
            <textarea
              value={systemPrompt}
              onChange={e => setSystemPrompt(e.target.value)}
              className="font-mono"
              style={{
                width: '100%',
                height: '140px',
                padding: '12px',
                borderRadius: '10px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.8rem',
                lineHeight: '1.5',
                resize: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
              User Test Prompt / Input Task
            </label>
            <textarea
              value={userPrompt}
              onChange={e => setUserPrompt(e.target.value)}
              className="font-mono"
              style={{
                width: '100%',
                height: '110px',
                padding: '12px',
                borderRadius: '10px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.8rem',
                lineHeight: '1.5',
                resize: 'none'
              }}
            />
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px', color: 'var(--accent-cyan)' }}>
              Estimated Token Counter
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <span>System Prompt: ~{Math.ceil(systemPrompt.length / 4)} tokens</span>
              <span>User Prompt: ~{Math.ceil(userPrompt.length / 4)} tokens</span>
            </div>
          </div>
        </div>

        {/* Right Column: Model Comparison Matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {testResults.map((result, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
                <h3 style={{ fontSize: '0.92rem', fontWeight: 700 }}>{result.name}</h3>
                <span className="badge-glow" style={{ fontSize: '0.7rem' }}>
                  Score: {result.qualityScore}/100
                </span>
              </div>

              {/* Metrics Pills */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '6px', borderRadius: '8px' }}>
                  <Clock size={12} color="var(--accent-cyan)" style={{ margin: '0 auto 2px' }} />
                  <div className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700 }}>{result.latency}ms</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Latency</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '6px', borderRadius: '8px' }}>
                  <BarChart2 size={12} color="var(--accent-purple)" style={{ margin: '0 auto 2px' }} />
                  <div className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700 }}>{result.tokens}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Tokens</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '6px', borderRadius: '8px' }}>
                  <DollarSign size={12} color="var(--accent-emerald)" style={{ margin: '0 auto 2px' }} />
                  <div className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700 }}>${result.cost}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Est. Cost</div>
                </div>
              </div>

              {/* Response Output Box */}
              <div className="font-mono" style={{ 
                flex: 1, 
                background: 'rgba(5, 8, 15, 0.9)', 
                padding: '12px', 
                borderRadius: '8px', 
                fontSize: '0.75rem', 
                lineHeight: '1.5',
                color: 'var(--text-muted)',
                whiteSpace: 'pre-wrap',
                overflowY: 'auto',
                maxHeight: '220px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                {result.response}
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
