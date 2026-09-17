import React, { useState } from 'react';
import { VectorChunk } from '../types';
import { Database, Search, FileText, Layers, Hash, Sparkles, Filter, CheckCircle } from 'lucide-react';

export const RagExplorer: React.FC = () => {
  const [inputText, setInputText] = useState(
    `Grayscale Ventures and PromptQL are organizing the Unicorn AI Summit in Bengaluru. The summit features 500+ AI founders, engineers, and decision-makers. Leading companies like Razorpay, Swiggy, DevRev, Slice, and DevRev present technical architecture breakdowns. PromptQL is a multiplayer AI engine for high-performance engineering teams.`
  );

  const [searchQuery, setSearchQuery] = useState('Who is organizing the Unicorn AI Summit?');
  const [chunkStrategy, setChunkStrategy] = useState<'fixed' | 'recursive' | 'semantic'>('recursive');
  const [chunkSize, setChunkSize] = useState<number>(64);

  const generateChunks = (): VectorChunk[] => {
    const sentences = inputText.split(/(?<=[.?!])\s+/);
    return sentences.map((sentence, idx) => {
      // Mock vector preview
      const vectorPreview = Array.from({ length: 5 }, () => parseFloat((Math.random() * 2 - 1).toFixed(2)));
      
      // Calculate mock similarity to query
      const isMatch = searchQuery.toLowerCase().includes('unicorn') || searchQuery.toLowerCase().includes('summit') || searchQuery.toLowerCase().includes('organizing');
      const similarityScore = isMatch && idx === 0 ? 0.94 : parseFloat((0.4 + Math.random() * 0.4).toFixed(2));

      return {
        id: `chunk-${idx}`,
        index: idx + 1,
        text: sentence,
        vectorPreview,
        similarityScore,
        tokenCount: Math.ceil(sentence.length / 4)
      };
    });
  };

  const chunks = generateChunks();

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <Database size={20} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Vector RAG & Document Indexing Engine</h2>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Inspect document chunking strategies, dense vector embeddings generation, and cosine similarity query matching.
          </p>
        </div>

        <div className="glass-pill" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Layers size={14} color="var(--accent-cyan)" />
          <span>HNSW Vector Index • Cosine Distance</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '450px 1fr', gap: '20px' }}>
        
        {/* Document Ingestion Panel */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={16} color="var(--accent-cyan)" /> Raw Document Source
          </h3>

          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            style={{
              width: '100%',
              height: '140px',
              padding: '12px',
              borderRadius: '10px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              fontSize: '0.82rem',
              lineHeight: '1.5',
              resize: 'none'
            }}
          />

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Chunking Strategy
            </label>
            <select
              value={chunkStrategy}
              onChange={e => setChunkStrategy(e.target.value as any)}
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
              <option value="recursive">Recursive Character Token Splitter</option>
              <option value="fixed">Fixed-Size Window (Overlapping)</option>
              <option value="semantic">Semantic Markdown Header Splitter</option>
            </select>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-purple)', display: 'block', marginBottom: '8px' }}>
              Vector Query Search Simulator
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Enter search query..."
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              />
              <button className="btn-primary" style={{ padding: '8px 12px' }}>
                <Search size={14} />
              </button>
            </div>
          </div>

        </div>

        {/* Vector Chunks & Similarity Explorer */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>
              Vector Index Chunks ({chunks.length} Generated)
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Top K Retrieval = 3
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '520px' }}>
            {chunks.map((chunk) => {
              const isTopResult = (chunk.similarityScore || 0) > 0.85;

              return (
                <div
                  key={chunk.id}
                  style={{
                    background: isTopResult ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: isTopResult ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: 700 }}>
                        #Chunk_{chunk.index}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        {chunk.tokenCount} Tokens
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="font-mono" style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        color: isTopResult ? 'var(--accent-emerald)' : 'var(--text-muted)' 
                      }}>
                        Similarity: {(chunk.similarityScore! * 100).toFixed(1)}%
                      </span>
                      {isTopResult && <CheckCircle size={14} color="var(--accent-emerald)" />}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '8px', lineHeight: '1.4' }}>
                    "{chunk.text}"
                  </p>

                  <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '4px' }}>
                    Vector Preview: [{chunk.vectorPreview.join(', ')}]
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
