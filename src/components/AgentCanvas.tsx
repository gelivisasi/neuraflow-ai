import React, { useState } from 'react';
import { AgentNode, ExecutionLog } from '../types';
import { 
  Plus, Play, CheckCircle2, AlertCircle, RefreshCw, Cpu, Settings, 
  Terminal, ShieldCheck, ArrowRight, Zap, Code, Search, Brain, FileCheck
} from 'lucide-react';

interface AgentCanvasProps {
  nodes: AgentNode[];
  setNodes: React.Dispatch<React.SetStateAction<AgentNode[]>>;
  logs: ExecutionLog[];
  isRunning: boolean;
  onRunSimulation: () => void;
}

const ROLE_ICONS: Record<string, React.ReactNode> = {
  planner: <Brain size={18} color="var(--accent-purple)" />,
  retriever: <Search size={18} color="var(--accent-cyan)" />,
  coder: <Code size={18} color="var(--accent-emerald)" />,
  critic: <FileCheck size={18} color="var(--accent-amber)" />,
  executor: <Zap size={18} color="var(--accent-rose)" />,
  memory: <Cpu size={18} color="var(--accent-violet)" />
};

const ROLE_COLORS: Record<string, string> = {
  planner: 'rgba(192, 132, 252, 0.2)',
  retriever: 'rgba(56, 189, 248, 0.2)',
  coder: 'rgba(52, 211, 153, 0.2)',
  critic: 'rgba(251, 191, 36, 0.2)',
  executor: 'rgba(251, 113, 133, 0.2)',
  memory: 'rgba(129, 140, 248, 0.2)'
};

export const AgentCanvas: React.FC<AgentCanvasProps> = ({
  nodes,
  setNodes,
  logs,
  isRunning,
  onRunSimulation
}) => {
  const [selectedNode, setSelectedNode] = useState<AgentNode | null>(nodes[0] || null);

  const handleAddAgent = () => {
    const newId = `agent-${Date.now()}`;
    const roles: AgentNode['role'][] = ['coder', 'critic', 'retriever', 'executor'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    const lastNode = nodes[nodes.length - 1];

    const newNode: AgentNode = {
      id: newId,
      name: `Agent ${randomRole.toUpperCase()}`,
      role: randomRole,
      model: 'claude-3-5-sonnet',
      systemPrompt: `You are an expert ${randomRole} agent in an autonomous multi-agent swarm. Optimize tasks for accuracy and execution speed.`,
      status: 'idle',
      temperature: 0.2,
      x: (lastNode ? lastNode.x : 100) + 240,
      y: lastNode ? lastNode.y + (Math.random() * 60 - 30) : 150,
      connections: []
    };

    // Connect previous node to new node
    if (lastNode) {
      setNodes(prev => prev.map(n => n.id === lastNode.id ? { ...n, connections: [...n.connections, newId] } : n));
    }

    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode);
  };

  const updateSelectedNode = (field: keyof AgentNode, value: any) => {
    if (!selectedNode) return;
    const updated = { ...selectedNode, [field]: value };
    setSelectedNode(updated);
    setNodes(prev => prev.map(n => n.id === selectedNode.id ? updated : n));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', height: 'calc(100vh - 85px)', padding: '20px' }}>
      
      {/* Canvas Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
        
        {/* Canvas Toolbar */}
        <div className="glass-panel" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Topology Graph ({nodes.length} Agents Active)
            </span>
            <span className="glass-pill">Swarm Protocol v2.4</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-secondary" onClick={handleAddAgent} style={{ fontSize: '0.8rem', padding: '8px 12px' }}>
              <Plus size={14} /> Add Agent
            </button>
            <button className="btn-primary" onClick={onRunSimulation} disabled={isRunning} style={{ fontSize: '0.8rem', padding: '8px 14px' }}>
              <Play size={14} /> {isRunning ? 'Running Trace...' : 'Simulate DAG'}
            </button>
          </div>
        </div>

        {/* Visual Graph Workspace */}
        <div className="glass-panel" style={{ 
          flex: 1, 
          position: 'relative', 
          overflow: 'hidden', 
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}>

          {/* SVG Connection Lines */}
          <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            {nodes.map(node => 
              node.connections.map(targetId => {
                const target = nodes.find(n => n.id === targetId);
                if (!target) return null;
                const x1 = node.x + 100;
                const y1 = node.y + 60;
                const x2 = target.x + 100;
                const y2 = target.y + 60;
                const midX = (x1 + x2) / 2;

                return (
                  <g key={`${node.id}-${targetId}`}>
                    <path
                      d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                      fill="none"
                      stroke={isRunning ? 'var(--accent-cyan)' : 'rgba(129, 140, 248, 0.4)'}
                      strokeWidth={isRunning ? "3" : "2"}
                      className={isRunning ? "path-animated" : ""}
                    />
                  </g>
                );
              })
            )}
          </svg>

          {/* Nodes Rendering */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'auto', zIndex: 2 }}>
            {nodes.map(node => {
              const isSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="glass-panel glass-panel-hover"
                  style={{
                    position: 'absolute',
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: '200px',
                    padding: '14px',
                    cursor: 'pointer',
                    border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                    boxShadow: isSelected ? '0 0 25px rgba(56, 189, 248, 0.3)' : 'var(--shadow-subtle)',
                    background: node.status === 'running' 
                      ? 'rgba(30, 41, 70, 0.95)' 
                      : node.status === 'completed'
                      ? 'rgba(15, 35, 30, 0.9)'
                      : 'var(--bg-card)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '8px', 
                      background: ROLE_COLORS[node.role] || 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {ROLE_ICONS[node.role] || <Cpu size={16} />}
                    </div>

                    <span style={{ 
                      fontSize: '0.7rem', 
                      fontWeight: 700, 
                      textTransform: 'uppercase',
                      color: node.status === 'running' ? 'var(--accent-amber)' : node.status === 'completed' ? 'var(--accent-emerald)' : 'var(--text-dim)' 
                    }}>
                      {node.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '4px' }}>{node.name}</h3>
                  <p className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                    {node.model}
                  </p>

                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Temp: {node.temperature} • {node.connections.length} Links
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Terminal Execution Trace */}
        <div className="glass-panel" style={{ height: '220px', padding: '14px 18px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={16} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Swarm Execution Stream Trace
              </span>
            </div>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)' }}>
              ● Live Stream Ready
            </span>
          </div>

          <div className="font-mono" style={{ 
            flex: 1, 
            overflowY: 'auto', 
            background: 'rgba(5, 8, 15, 0.85)', 
            padding: '12px', 
            borderRadius: '8px', 
            fontSize: '0.78rem',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            {logs.length === 0 ? (
              <p style={{ color: 'var(--text-dim)' }}>No active execution. Click 'Simulate DAG' to trigger real-time multi-agent reasoning flow.</p>
            ) : (
              logs.map(log => (
                <div key={log.id} style={{ marginBottom: '6px', lineHeight: '1.4' }}>
                  <span style={{ color: 'var(--text-dim)' }}>[{log.timestamp}]</span>{' '}
                  <span style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>[{log.agentName}]</span>{' '}
                  <span style={{ color: log.type === 'action' ? 'var(--accent-cyan)' : log.type === 'thought' ? 'var(--accent-amber)' : log.type === 'success' ? 'var(--accent-emerald)' : 'var(--text-main)' }}>
                    {log.message}
                  </span>
                  {log.tokensUsed && (
                    <span style={{ color: 'var(--text-dim)', marginLeft: '10px', fontSize: '0.72rem' }}>
                      ({log.tokensUsed} tokens • {log.latencyMs}ms)
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Right Sidebar: Selected Agent Inspector & Inspector Panel */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
        {selectedNode ? (
          <>
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Settings size={18} color="var(--accent-cyan)" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Agent Inspector</h3>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Configure model persona, system prompt & inference hyperparameters.
              </p>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Agent Name
              </label>
              <input
                type="text"
                value={selectedNode.name}
                onChange={e => updateSelectedNode('name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                LLM Model Backbone
              </label>
              <select
                value={selectedNode.model}
                onChange={e => updateSelectedNode('model', e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              >
                <option value="gpt-4o">OpenAI GPT-4o</option>
                <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet</option>
                <option value="promptql-v2">PromptQL Multi-Agent v2</option>
                <option value="gemini-1.5-pro">Google Gemini 1.5 Pro</option>
                <option value="llama-3-70b">Meta Llama 3 70B Instruct</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Role Function
              </label>
              <select
                value={selectedNode.role}
                onChange={e => updateSelectedNode('role', e.target.value as AgentNode['role'])}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              >
                <option value="planner">Planner (Decomposes Goals)</option>
                <option value="retriever">Retriever (Vector RAG Search)</option>
                <option value="coder">Coder (Code Generation Engine)</option>
                <option value="critic">Critic (Security & Accuracy Verifier)</option>
                <option value="executor">Executor (Action Execution)</option>
                <option value="memory">Memory (Episodic Storage)</option>
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Temperature ({selectedNode.temperature})
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={selectedNode.temperature}
                onChange={e => updateSelectedNode('temperature', parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
              />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                System Prompt Persona
              </label>
              <textarea
                value={selectedNode.systemPrompt}
                onChange={e => updateSelectedNode('systemPrompt', e.target.value)}
                style={{
                  flex: 1,
                  minHeight: '140px',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  resize: 'none'
                }}
              />
            </div>
          </>
        ) : (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
            Select an agent node on the canvas to inspect and edit persona parameters.
          </div>
        )}
      </div>

    </div>
  );
};
