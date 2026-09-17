import React, { useState } from 'react';
import { ModelBenchmark, AgentNode } from '../types';
import { BarChart3, Download, Cpu, Check, Copy, Zap, ShieldAlert, Award } from 'lucide-react';

interface BenchmarkPanelProps {
  nodes: AgentNode[];
  onExportSpec: () => void;
}

export const BenchmarkPanel: React.FC<BenchmarkPanelProps> = ({ nodes, onExportSpec }) => {
  const [copied, setCopied] = useState(false);

  const benchmarks: ModelBenchmark[] = [
    {
      id: '1',
      provider: 'PromptQL AI',
      model: 'PromptQL Multi-Agent v2',
      ttft: 140,
      tps: 115,
      costPer1k: '$0.0015',
      contextWindow: '256k tokens',
      evalScore: 92.4
    },
    {
      id: '2',
      provider: 'Anthropic',
      model: 'Claude 3.5 Sonnet',
      ttft: 210,
      tps: 85,
      costPer1k: '$0.0030',
      contextWindow: '200k tokens',
      evalScore: 90.8
    },
    {
      id: '3',
      provider: 'OpenAI',
      model: 'GPT-4o (Omni)',
      ttft: 245,
      tps: 92,
      costPer1k: '$0.0025',
      contextWindow: '128k tokens',
      evalScore: 89.6
    },
    {
      id: '4',
      provider: 'Google',
      model: 'Gemini 1.5 Pro',
      ttft: 280,
      tps: 78,
      costPer1k: '$0.00125',
      contextWindow: '2,000k tokens',
      evalScore: 88.2
    },
    {
      id: '5',
      provider: 'Meta AI (Open)',
      model: 'Llama 3 70B Instruct',
      ttft: 180,
      tps: 105,
      costPer1k: '$0.0009',
      contextWindow: '128k tokens',
      evalScore: 86.5
    }
  ];

  const agentSpecJSON = JSON.stringify(
    {
      version: "2.4.0",
      framework: "NeuraFlow-AI",
      author: "gelivisasi",
      environment: "production",
      timestamp: new Date().toISOString(),
      swarmTopology: nodes.map(n => ({
        id: n.id,
        name: n.name,
        role: n.role,
        model: n.model,
        temperature: n.temperature,
        systemPrompt: n.systemPrompt,
        outboundEdges: n.connections
      }))
    },
    null,
    2
  );

  const handleCopySpec = () => {
    navigator.clipboard.writeText(agentSpecJSON);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <BarChart3 size={20} color="var(--accent-purple)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>System Benchmarks & Agent Spec Export</h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Comparative throughput metrics and exportable multi-agent DAG specification (LangChain / AutoGen compatible).
          </p>
        </div>

        <button className="btn-primary" onClick={handleCopySpec} style={{ fontSize: '0.85rem' }}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied Spec to Clipboard!' : 'Copy Swarm Spec (JSON)'}
        </button>
      </div>

      {/* Benchmark Table */}
      <div className="glass-panel" style={{ padding: '20px', overflowX: 'auto' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={18} color="var(--accent-amber)" /> LLM Infrastructure Throughput & Latency Matrix
        </h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 16px' }}>Provider / Model</th>
              <th style={{ padding: '12px 16px' }}>Time to First Token (TTFT)</th>
              <th style={{ padding: '12px 16px' }}>Throughput (TPS)</th>
              <th style={{ padding: '12px 16px' }}>Cost / 1k Tokens</th>
              <th style={{ padding: '12px 16px' }}>Context Window</th>
              <th style={{ padding: '12px 16px' }}>Benchmark Score</th>
            </tr>
          </thead>
          <tbody>
            {benchmarks.map((item, idx) => (
              <tr 
                key={item.id} 
                style={{ 
                  borderBottom: '1px solid var(--border-subtle)',
                  background: idx === 0 ? 'rgba(99, 102, 241, 0.08)' : 'transparent' 
                }}
              >
                <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {idx === 0 && <span className="badge-glow" style={{ fontSize: '0.65rem' }}>Top SLA</span>}
                    <span>{item.model}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{item.provider}</div>
                </td>

                <td className="font-mono" style={{ padding: '14px 16px', color: 'var(--accent-cyan)' }}>
                  {item.ttft} ms
                </td>

                <td className="font-mono" style={{ padding: '14px 16px', color: 'var(--accent-emerald)' }}>
                  {item.tps} tokens/s
                </td>

                <td className="font-mono" style={{ padding: '14px 16px' }}>
                  {item.costPer1k}
                </td>

                <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                  {item.contextWindow}
                </td>

                <td style={{ padding: '14px 16px' }}>
                  <span style={{ 
                    fontWeight: 700, 
                    color: item.evalScore > 90 ? 'var(--accent-emerald)' : 'var(--accent-purple)' 
                  }}>
                    {item.evalScore} / 100
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* JSON Spec Preview Box */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={16} color="var(--accent-cyan)" /> Production Agent Spec JSON Output
          </h3>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            LangChain & CrewAI Schema Ready
          </span>
        </div>

        <pre className="font-mono" style={{
          background: 'rgba(5, 8, 15, 0.95)',
          padding: '16px',
          borderRadius: '10px',
          fontSize: '0.78rem',
          color: 'var(--accent-cyan)',
          overflowX: 'auto',
          maxHeight: '300px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          {agentSpecJSON}
        </pre>
      </div>

    </div>
  );
};
