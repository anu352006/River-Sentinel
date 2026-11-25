"use client";

import React, { useState } from "react";

const DatasetUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [datasetType, setDatasetType] = useState("Water Quality CSV");
    const [recentUploads, setRecentUploads] = useState([
        { d: "2026-04-01", f: "erode_borewell_check.csv", t: "Water Quality", s: "PROCESSED" },
        { d: "2026-03-28", f: "trichy_factory_outlets.xlsx", t: "Industrial", s: "PROCESSED" },
        { d: "2026-03-15", f: "cauvery_delta_rainfall.csv", t: "Rainfall Data", s: "PROCESSED" },
    ]);

    const handleUpload = () => {
        if (!file) return;
        setUploading(true);
        
        // Simulated upload and processing pipeline
        setTimeout(() => {
            const newUpload = {
                d: new Date().toISOString().split('T')[0],
                f: file.name,
                t: datasetType.split(' ')[0], // Simplify type name
                s: "PROCESSED"
            };
            
            setRecentUploads([newUpload, ...recentUploads]);
            setUploading(false);
            setFile(null);
            
            // Visual feedback
            alert(`Success: ${file.name} uploaded and 2,490 rows merged into regional model.`);
        }, 2000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="card">
                <h3>Upload Regional Data (Tamil Nadu)</h3>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>Merge external water quality or industrial datasets into the RiverSentinel AI engine for the Southern India Ghats region.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Dataset Type</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            {["Water Quality CSV", "Industrial Registry", "Flood History", "Rainfall Data"].map((type) => (
                                <label key={type} className="card" style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '0.75rem', 
                                    padding: '1rem', 
                                    cursor: 'pointer',
                                    border: datasetType === type ? '1px solid var(--primary)' : '1px solid var(--border)',
                                    background: datasetType === type ? '#f0f9ff' : 'white'
                                }}>
                                    <input 
                                        type="radio" 
                                        name="dataset" 
                                        checked={datasetType === type} 
                                        onChange={() => setDatasetType(type)}
                                    />
                                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div
                        style={{
                            height: '200px',
                            border: '2px dashed var(--border)',
                            borderRadius: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#f8fafc',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                        onClick={() => document.getElementById('dataset-file')?.click()}
                    >
                        <span style={{ fontSize: '3rem' }}>{file ? "✅" : "📁"}</span>
                        <p style={{ color: file ? 'var(--primary)' : '#64748b', marginTop: '0.5rem', fontWeight: file ? 600 : 400 }}>
                            {file ? file.name : "Drag & drop CSV or click to browse"}
                        </p>
                        <input type="file" id="dataset-file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    </div>

                    <button
                        className="btn btn-primary"
                        style={{ padding: '1rem', opacity: file ? 1 : 0.5, transform: uploading ? 'scale(0.98)' : 'none' }}
                        disabled={!file || uploading}
                        onClick={handleUpload}
                    >
                        {uploading ? "💾 Processing & Validating..." : "Start Upload"}
                    </button>
                </div>
            </div>

            <div className="card">
                <h3>Recent Uploads (Regional Registry)</h3>
                <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)', color: '#64748b', fontSize: '0.85rem' }}>
                                <th style={{ padding: '0.75rem' }}>Date</th>
                                <th style={{ padding: '0.75rem' }}>Filename</th>
                                <th style={{ padding: '0.75rem' }}>Type</th>
                                <th style={{ padding: '0.75rem' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUploads.map((u, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', animation: i === 0 && datasetType ? 'fadeIn 0.5s ease-out' : 'none' }}>
                                    <td style={{ padding: '0.75rem' }}>{u.d}</td>
                                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>{u.f}</td>
                                    <td style={{ padding: '0.75rem' }}>{u.t}</td>
                                    <td style={{ padding: '0.75rem' }}>
                                        <span className="badge badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <span style={{ fontSize: '0.6rem' }}>●</span> {u.s}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default DatasetUpload;
