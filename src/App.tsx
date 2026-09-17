import React, { useState } from 'react';
import { TabType, AgentNode, ExecutionLog } from './types';
import { Header } from './components/Header';
import { AgentCanvas } from './components/AgentCanvas';
import { PromptLab } from './components/PromptLab';
import { RagExplorer } from './components/RagExplorer';
import { BenchmarkPanel } from './components/BenchmarkPanel';
import confetti from 'canvas-confetti';

const INITIAL_NODES: AgentNode[] = [
  {
    id: 'agent-1',
    name: 'Swarm Orchestration Planner',
    role: 'planner',
    model: 'gpt-4o',
    systemPrompt: 'You analyze incoming requests, decompose complex problems into sub-tasks, and route work to specialized agents.',
    status: 'idle',
    temperature: 0.1,
    x: 60,
    y: 140,
    connections: ['agent-2', 'agent-3']
  },
  {
    id: 'agent-2',
    name: 'Vector Index Retriever',
    role: 'retriever',
    model: 'promptql-v2',
    systemPrompt: 'Perform hybrid dense vector & BM25 search over enterprise knowledge bases and return top-5 context passages.',
    status: 'idle',
    temperature: 0.0,
    x: 320,
    y: 60,
    connections: ['agent-3']
  },
  {
    id: 'agent-3',
    name: 'Autonomous Code Architect',
    role: 'coder',
    model: 'claude-3-5-sonnet',
    systemPrompt: 'Write clean, modular, production-ready TypeScript code and system architecture designs.',
    status: 'idle',
    temperature: 0.2,
    x: 580,
    y: 140,
    connections: ['agent-4']
  },
  {
    id: 'agent-4',
    name: 'Security & Quality Inspector',
    role: 'critic',
    model: 'claude-3-5-sonnet',
    systemPrompt: 'Audit code for vulnerability vectors, performance bottlenecks, and adherence to security SLAs.',
    status: 'idle',
    temperature: 0.1,
    x: 840,
    y: 140,
    connections: ['agent-5']
  },
  {
    id: 'agent-5',
    name: 'Deployment Executor',
    role: 'executor',
    model: 'gemini-1.5-pro',
    systemPrompt: 'Deploy verified build artifacts to cloud clusters and publish live status endpoints.',
    status: 'idle',
    temperature: 0.1,
    x: 1080,
    y: 140,
    connections: []
  }
];

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('canvas');
  const [nodes, setNodes] = useState<AgentNode[]>(INITIAL_NODES);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addLog = (agentId: string, agentName: string, message: string, type: ExecutionLog['type'], tokensUsed?: number, latencyMs?: number) => {
    const newLog: ExecutionLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString(),
      agentId,
      agentName,
      message,
      type,
      tokensUsed,
      latencyMs
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);

    // Reset all nodes
    setNodes(prev => prev.map(n => ({ ...n, status: 'idle' })));

    // Step 1: Planner
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === 'agent-1' ? { ...n, status: 'running' } : n));
      addLog('agent-1', 'Swarm Orchestration Planner', 'Decomposing user request: "Build high-throughput RAG pipeline with multi-agent consensus"', 'thought');
    }, 400);

    setTimeout(() => {
      addLog('agent-1', 'Swarm Orchestration Planner', 'Routing vector retrieval task to Retriever Agent & code synthesis task to Coder Agent', 'action', 184, 120);
      setNodes(prev => prev.map(n => n.id === 'agent-1' ? { ...n, status: 'completed' } : n));
    }, 1200);

    // Step 2: Retriever
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === 'agent-2' ? { ...n, status: 'running' } : n));
      addLog('agent-2', 'Vector Index Retriever', 'Executing HNSW similarity search on Milvus collection @ 14ms latency', 'action', 320, 140);
    }, 1800);

    setTimeout(() => {
      addLog('agent-2', 'Vector Index Retriever', 'Retrieved 5 passages with 0.96 cosine similarity match. Forwarding context to Coder', 'success');
      setNodes(prev => prev.map(n => n.id === 'agent-2' ? { ...n, status: 'completed' } : n));
    }, 2600);

    // Step 3: Coder
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === 'agent-3' ? { ...n, status: 'running' } : n));
      addLog('agent-3', 'Autonomous Code Architect', 'Synthesizing TypeScript RAG pipeline module with streaming response handler...', 'thought');
    }, 3200);

    setTimeout(() => {
      addLog('agent-3', 'Autonomous Code Architect', 'Code generation complete (412 lines). Passing artifact to Security Inspector', 'action', 512, 280);
      setNodes(prev => prev.map(n => n.id === 'agent-3' ? { ...n, status: 'completed' } : n));
    }, 4200);

    // Step 4: Critic
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === 'agent-4' ? { ...n, status: 'running' } : n));
      addLog('agent-4', 'Security & Quality Inspector', 'Auditing code for OWASP Top 10 vulnerabilities & memory leaks... 0 issues found', 'action', 190, 160);
      setNodes(prev => prev.map(n => n.id === 'agent-4' ? { ...n, status: 'completed' } : n));
    }, 5000);

    // Step 5: Executor
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === 'agent-5' ? { ...n, status: 'running' } : n));
      addLog('agent-5', 'Deployment Executor', 'Publishing build artifact to GitHub Pages & updating live SLA endpoint', 'action', 140, 110);
    }, 5800);

    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === 'agent-5' ? { ...n, status: 'completed' } : n));
      addLog('agent-5', 'Deployment Executor', 'Swarm execution completed successfully with 100% consensus!', 'success');
      setIsRunning(false);

      // Trigger Confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 6600);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRunSimulation={runSimulation}
        isRunning={isRunning}
        onExportSpec={() => setActiveTab('benchmarks')}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'canvas' && (
          <AgentCanvas
            nodes={nodes}
            setNodes={setNodes}
            logs={logs}
            isRunning={isRunning}
            onRunSimulation={runSimulation}
          />
        )}

        {activeTab === 'prompt-lab' && <PromptLab />}

        {activeTab === 'rag-explorer' && <RagExplorer />}

        {activeTab === 'benchmarks' && (
          <BenchmarkPanel
            nodes={nodes}
            onExportSpec={() => {}}
          />
        )}
      </main>
    </div>
  );
};
export default App;
