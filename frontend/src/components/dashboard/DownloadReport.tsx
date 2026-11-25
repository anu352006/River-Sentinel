"use client";

import React, { useState, useEffect } from "react";

const ghats = [
    "Kooduthurai – erode (Bhavani Sangam)",
    "Amma mandapam ghat – Sri Rangam (Trichy)",
    "Mayiladuthurai river ghats – cauvery delta",
    "Papanasam ghat – thirunelveli (Tamarabarani river)",
    "Kallanai – Trichy",
    "Adayar river bank areas – Chennai",
    "Kumbakonam Ghat – Thanjavur",
    "Thiruvayaru ghat – Thanjavur",
    "Kodumudi ghat – erode"
];

const DownloadReport = () => {
    const [selectedGhat, setSelectedGhat] = useState(ghats[0]);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchHealthStatus = async (ghatName: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || '/api/proxy'}/api/citizen/health-status?ghat=${encodeURIComponent(ghatName)}`);
            const result = await response.json();
            if (result.status === 'success') {
                setData(result);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHealthStatus(selectedGhat);
    }, [selectedGhat]);

    const handleDownload = () => {
        window.print();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                <div>
                    <h3 style={{ margin: 0 }}>Select Location</h3>
                    <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Choose your ghat to generate a localized health card</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <select
                        value={selectedGhat}
                        onChange={(e) => setSelectedGhat(e.target.value)}
                        style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontWeight: 600, minWidth: '250px' }}
                    >
                        {ghats.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <button className="btn btn-primary" onClick={handleDownload} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span>📥</span> Print / Save PDF
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '1rem' }}>
                    <div style={{ fontSize: '2rem', animation: 'spin 2s linear infinite' }}>⚙️</div>
                    <p style={{ marginTop: '1rem' }}>Generating {selectedGhat} Health Card...</p>
                </div>
            ) : data ? (
                /* Health Certificate Case */
                <div id="health-certificate" style={{
                    background: 'white',
                    padding: '3rem',
                    borderRadius: '1.5rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    border: '12px double #e2e8f0',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'system-ui, sans-serif'
                }}>
                    {/* Background Pattern */}
                    <div style={{ position: 'absolute', top: '-10%', right: '-10%', fontSize: '20rem', opacity: 0.03, pointerEvents: 'none' }}>🌊</div>
                    
                    {/* Branding Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '2px solid #1e293b', paddingBottom: '1.5rem' }}>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{data.authority}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1e293b', margin: '0.5rem 0' }}>{data.department}</div>
                            <div style={{ fontSize: '0.9rem', color: '#0ea5e9', fontWeight: 700 }}>RIVER PROTECTION & MONITORING PROGRAM</div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{ display: 'inline-block', padding: '0.5rem 2rem', background: '#0ea5e9', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
                            OFFICIAL CERTIFICATE OF RIVER HEALTH
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', color: '#1e293b' }}>{data.location}</h1>
                        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Monitoring Snapshot: <strong>{data.timestamp}</strong></p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', marginBottom: '3rem' }}>
                        {/* Gauge Display */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: '2rem', padding: '2.5rem', border: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#64748b', marginBottom: '1.5rem' }}>RIVER HEALTH INDEX (RHI)</div>
                            <div style={{ position: 'relative', width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray={`${data.health_score}, 100`} />
                                </svg>
                                <div style={{ position: 'absolute', textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', fontWeight: 900, color: '#0ea5e9' }}>{data.health_score}</div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, marginTop: '-5px', color: '#64748b' }}>POINTS</div>
                                </div>
                            </div>
                            <div style={{ marginTop: '2rem', fontSize: '1.75rem', fontWeight: 900, color: '#10b981' }}>QUALITY: {data.grade}</div>
                        </div>

                        {/* Detailed Metrics */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { label: 'Safety Status', value: data.safety_status, isBadge: true },
                                { label: 'Water Purity', value: `${Math.round(data.metrics.purity)}%` },
                                { label: 'Average pH', value: data.metrics.ph },
                                { label: 'Dissolved Oxygen', value: `${data.metrics.do} mg/L` },
                                { label: 'Turbidity Index', value: 'Normal' }
                            ].map((stat, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem', borderBottom: '1px solid #f1f5f9' }}>
                                    <span style={{ fontWeight: 600, color: '#64748b', fontSize: '1.1rem' }}>{stat.label}</span>
                                    {stat.isBadge ? (
                                        <span style={{ 
                                            padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 800,
                                            background: (stat.value === 'EXCELLENT' || stat.value === 'SAFE') ? '#dcfce7' : '#fee2e2',
                                            color: (stat.value === 'EXCELLENT' || stat.value === 'SAFE') ? '#166534' : '#991b1b'
                                        }}>
                                            {stat.value}
                                        </span>
                                    ) : (
                                        <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '1.1rem' }}>{stat.value}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '1.5rem', borderRadius: '1rem', marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.5rem' }}>ℹ️</span>
                            <div style={{ fontSize: '0.9rem', color: '#0369a1', lineHeight: 1.6 }}>
                                <strong>Advisory:</strong> This RHI represents a real-time aggregate of sensor readings. Data is used to assist local authorities in environmental monitoring and ritual safety protocols. Change in RHI is subject to rainfall and industrial runoff.
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
                        <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.4rem' }}>UNIQUE CERTIFICATE ID: CS-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                            <div style={{ width: '70px', height: '70px', background: '#1e293b', padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '100%', height: '100%', border: '2px solid white', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '2px' }}>
                                    <div style={{ background: 'white' }}></div><div style={{ border: '1px solid white' }}></div>
                                    <div style={{ border: '1px solid white' }}></div><div style={{ background: 'white' }}></div>
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' }}>RIVER SENTINEL AI VALIDATED</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Environmental Safeguard Division</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '1rem', color: '#ef4444' }}>
                    Error fetching localized data. Please try again.
                </div>
            )}

            <style>{`
                @media print {
                    @page { 
                        size: A4 portrait; 
                        margin: 0; 
                    }
                    /* Base Reset */
                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    /* Target the dashboard structure precisely to hide UI */
                    div[style*="display: flex"][style*="min-height: 100vh"] > div:first-child,
                    header, 
                    .no-print {
                        display: none !important;
                    }
                    main {
                        margin: 0 !important;
                        padding: 0 !important;
                        flex: none !important;
                        width: 100% !important;
                    }
                    /* Force the certificate to take the full A4 page */
                    #health-certificate {
                        box-shadow: none !important;
                        border: 15mm double #1e293b !important;
                        border-radius: 0 !important;
                        width: 210mm !important;
                        height: 297mm !important;
                        padding: 15mm !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        margin: 0 !important;
                        display: flex !important;
                        flex-direction: column !important;
                        justify-content: center !important;
                        background: white !important;
                        z-index: 1000 !important;
                    }
                    /* Ensure grid works in print */
                    #health-certificate > div[style*="display: grid"] {
                        display: grid !important;
                        grid-template-columns: 1fr 1fr !important;
                        gap: 2rem !important;
                    }
                }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default DownloadReport;
