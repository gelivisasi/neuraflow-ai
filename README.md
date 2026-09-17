# 🧠 NeuraFlow AI | Distributed Multi-Agent & Prompt Intelligence Engine

[![Live Demo](https://img.shields.io/badge/Live_Product-Surge_Cloud-38bdf8?style=for-the-badge&logo=surge)](https://neuraflow-ai.surge.sh)
[![Author](https://img.shields.io/badge/Engineer-@gelivisasi-c084fc?style=for-the-badge&logo=github)](https://github.com/gelivisasi)
[![License](https://img.shields.io/badge/License-MIT-34d399?style=for-the-badge)](LICENSE)

> **NeuraFlow AI** is a state-of-the-art visual multi-agent workflow orchestrator, vector RAG index inspector, and real-time LLM prompt intelligence platform built for enterprise AI engineering teams.

---

## 🚀 Live Product Demo & Repository
- **Live Hosted Product URL**: [https://neuraflow-ai.surge.sh](https://neuraflow-ai.surge.sh)
- **GitHub Profile**: [@gelivisasi](https://github.com/gelivisasi)
- **Source Code Repository**: [https://github.com/gelivisasi/neuraflow-ai](https://github.com/gelivisasi/neuraflow-ai)

---

## 🏛️ System Architecture

```mermaid
graph TD
    User([User Request / Task Spec]) --> Planner[🧠 Swarm Orchestration Planner - GPT-4o]
    
    subgraph Autonomous Swarm Mesh
        Planner -->|Parallel Dispatch| Retriever[🔍 Vector Index Retriever - PromptQL]
        Planner -->|Sub-task DAG| Coder[💻 Autonomous Code Architect - Claude 3.5 Sonnet]
        
        Retriever -->|Top-5 Context Passages| Coder
        Coder -->|Raw Code Artifact| Critic[🛡️ Security & Quality Inspector - Claude 3.5 Sonnet]
        Critic -->|Verified Build & Consensus| Executor[⚡ Deployment Executor - Gemini 1.5 Pro]
    end

    subgraph Evaluation & Storage
        Executor --> LiveEndpoint[🌐 Production Endpoint / Surge Cloud]
        Retriever <--> Milvus[(HNSW VectorDB / BM25 Index)]
    end
```

---

## Key Features

1. **Visual Multi-Agent DAG Topology Canvas**:
   - Drag, configure, and connect specialized agent personas (Planner, Retriever, Coder, Critic, Executor).
   - Real-time simulation of inter-agent message passing, token usage tracking, and latency measurements.

2. **Real-time Swarm Execution Stream Trace**:
   - Step-by-step reasoning log terminal showing token consumption, model response times, and consensus verification.

3. **Multi-LLM Prompt Intelligence Lab**:
   - Side-by-side prompt testing across **OpenAI GPT-4o**, **Anthropic Claude 3.5 Sonnet**, **PromptQL**, **Google Gemini 1.5 Pro**, and **Llama 3 70B**.
   - AI-powered prompt auto-refiner and token counter.

4. **Vector RAG & Embeddings Inspector**:
   - Interactive document chunking visualizer (Recursive Character Splitter, Fixed Window, Semantic Markdown).
   - Real-time cosine similarity search query inspector.

5. **LLM SLA Benchmarks & Production Spec Exporter**:
   - Export full agent DAG topologies into standard JSON/YAML specifications compatible with **LangChain**, **AutoGen**, **CrewAI**, and **PromptQL SDK**.

---

## 🛠️ Quickstart & Local Setup

```bash
# Clone the repository
git clone https://github.com/gelivisasi/neuraflow-ai.git

# Navigate to project directory
cd neuraflow-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📜 License
Licensed under the [MIT License](LICENSE).
