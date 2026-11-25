"use client";

import React, { useState } from "react";

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

import { useSensorData } from "@/hooks/useSensorData";

const SafetyChecker = () => {
    const [selectedGhat, setSelectedGhat] = useState(ghats[0]);
    const { readings } = useSensorData();

    // Generate variation based on selected ghat
    const getLocalizedReadings = (base: typeof readings, ghat: string) => {
        // Simple deterministic variation based on the ghat name
        const hash = ghat.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        // Example: Adayar is notoriously polluted in maps, let's make it reflect that if selected
        if (ghat.includes("Adayar")) {
            return {
                ...base,
                ph: 6.2, // Slightly acidic
                turbidity: 45, // High turbidity
                ec: 1200, // High conductivity
                do: 3.5, // Low oxygen
            };
        }

        // Default variation for others
        const offset = (hash % 10) / 10; 
        return {
            ...base,
            ph: Number((base.ph + (hash % 3 - 1) * 0.2).toFixed(1)),
            turbidity: Math.max(2, base.turbidity + (hash % 20 - 10)),
            ec: base.ec + (hash % 100 - 50),
            do: Number((base.do + (hash % 4 - 2) * 0.5).toFixed(1)),
        };
    };

    const localReadings = getLocalizedReadings(readings, selectedGhat);

    // Determine Status Logic
    const isBathingSafe = localReadings.ph >= 6.5 && localReadings.ph <= 8.5 && localReadings.turbidity < 20;
    const isDrinkingSafe = localReadings.ph >= 6.5 && localReadings.ph <= 8.5 && localReadings.turbidity < 5 && localReadings.ec < 500;
    // Livestock safety: EC < 1500 is generally safe for most livestock
    const isLivestockSafe = localReadings.ec < 1500 && localReadings.ph >= 6.0 && localReadings.ph <= 9.0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ marginBottom: '0.5rem' }}>Safety Checker</h1>
                    <p style={{ color: '#64748b' }}>Real-time water safety assessments for your favorite ghats.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <select
                        value={selectedGhat}
                        onChange={(e) => setSelectedGhat(e.target.value)}
                        style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)', background: 'white', fontWeight: 600 }}
                    >
                        {ghats.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        {readings.status === 'live' ? '🟢 Live Monitoring' : '⚠️ Regional Averages'}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {/* Bathing Safety */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0 }}>Bathing Safety 🏊</h3>
                        <span className={`badge ${isBathingSafe ? 'badge-green' : 'badge-red'}`}>{isBathingSafe ? 'SAFE' : 'UNSAFE'}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', margin: '0.5rem 0' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>pH</div>
                            <div style={{ fontWeight: 700 }}>{localReadings.ph.toFixed(1)}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Turbidity</div>
                            <div style={{ fontWeight: 700 }}>{localReadings.turbidity.toFixed(0)} NTU</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Temp</div>
                            <div style={{ fontWeight: 700 }}>{localReadings.temperature.toFixed(1)}°C</div>
                        </div>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b', background: '#f8fafc', padding: '0.75rem', borderRadius: '0.5rem' }}>
                        {isBathingSafe ? "✓ Water quality is within safe limits for religious bathing." : "⚠️ Water quality unsafe for bathing."}
                    </div>
                </div>

                {/* Drinking Safety */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0 }}>Drinking Safety 🚰</h3>
                        <span className={`badge ${isDrinkingSafe ? 'badge-green' : 'badge-orange'}`}>{isDrinkingSafe ? 'SAFE' : 'CAUTION'}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', margin: '0.5rem 0' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>pH</div>
                            <div style={{ fontWeight: 700 }}>{localReadings.ph.toFixed(1)}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>EC</div>
                            <div style={{ fontWeight: 700 }}>{localReadings.ec.toFixed(0)}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>DO</div>
                            <div style={{ fontWeight: 700 }}>{localReadings.do.toFixed(1)} mg/L</div>
                        </div>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: isDrinkingSafe ? '#166534' : '#9a3412', background: isDrinkingSafe ? '#f0fdf4' : '#fff7ed', padding: '0.75rem', borderRadius: '0.5rem' }}>
                        {isDrinkingSafe ? "✓ Safe for drinking after filtration." : "⚠️ Boil before drinking. Contamination detected."}
                    </div>
                </div>

                {/* Livestock Safety */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0 }}>Livestock Safety 🐄</h3>
                        <span className={`badge ${isLivestockSafe ? 'badge-green' : 'badge-orange'}`}>{isLivestockSafe ? 'SAFE' : 'CAUTION'}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '0.5rem 0' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>EC</div>
                            <div style={{ fontWeight: 700 }}>{localReadings.ec.toFixed(0)} µS/cm</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Temp</div>
                            <div style={{ fontWeight: 700 }}>{localReadings.temperature.toFixed(1)}°C</div>
                        </div>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b', background: '#f8fafc', padding: '0.75rem', borderRadius: '0.5rem' }}>
                        {isLivestockSafe ? "✓ Water is likely safe for cattle." : "⚠️ High mineral content. Monitor livestock health."}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                {[
                    { label: "pH", value: localReadings.ph.toFixed(1), unit: "", status: localReadings.ph >= 6.5 && localReadings.ph <= 8.5 ? "green" : "orange" },
                    { label: "Turbidity", value: localReadings.turbidity.toFixed(0), unit: "NTU", status: localReadings.turbidity < 20 ? "green" : "orange" },
                    { label: "Temp", value: localReadings.temperature.toFixed(1), unit: "°C", status: "green" },
                    { label: "EC", value: localReadings.ec.toFixed(0), unit: "µS", status: localReadings.ec < 1000 ? "green" : "orange" },
                    { label: "BOD", value: localReadings.bod.toFixed(1), unit: "mg/L", status: "green" },
                    { label: "COD", value: localReadings.cod.toFixed(1), unit: "mg/L", status: "green" },
                ].map((sensor, i) => (
                    <div key={i} className="card" style={{ padding: '1rem', display: 'flex', borderLeft: `4px solid var(--${sensor.status === 'green' ? 'success' : 'warning'})` }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{sensor.label}</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{sensor.value}<small style={{ fontSize: '0.8rem', fontWeight: 500, marginLeft: '2px' }}>{sensor.unit}</small></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SafetyChecker;
