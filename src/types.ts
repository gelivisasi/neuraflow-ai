export type TabType = 'canvas' | 'prompt-lab' | 'rag-explorer' | 'benchmarks';

export interface AgentNode {
  id: string;
  name: string;
  role: 'planner' | 'coder' | 'critic' | 'memory' | 'retriever' | 'executor';
  model: string;
  systemPrompt: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  temperature: number;
  output?: string;
  x: number;
  y: number;
  connections: string[]; // target node IDs
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  message: string;
  type: 'info' | 'action' | 'thought' | 'success' | 'warning';
  tokensUsed?: number;
  latencyMs?: number;
}

export interface PromptTestCase {
  id: string;
  name: string;
  systemPrompt: string;
  userPrompt: string;
  models: {
    name: string;
    latency: number;
    tokens: number;
    cost: number;
    qualityScore: number;
    response: string;
  }[];
}

export interface VectorChunk {
  id: string;
  index: number;
  text: string;
  vectorPreview: number[];
  similarityScore?: number;
  tokenCount: number;
}

export interface ModelBenchmark {
  id: string;
  provider: string;
  model: string;
  ttft: number; // Time to First Token (ms)
  tps: number; // Tokens Per Second
  costPer1k: string; // $ / 1k tokens
  contextWindow: string; // e.g. 128k
  evalScore: number; // MMLU / HumanEval aggregate
}
