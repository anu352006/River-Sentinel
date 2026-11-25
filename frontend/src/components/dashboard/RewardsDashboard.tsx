"use client";

import React, { useState } from "react";

const RewardsDashboard = () => {
    const [points, setPoints] = useState(1250);
    const [claimedIds, setClaimedIds] = useState<number[]>([]);
    const [notification, setNotification] = useState<string | null>(null);

    const rewards = [
        { id: 1, title: "Certificate of Honor", pts: 200, icon: "📜" },
        { id: 2, title: "₹250 Amazon Voucher", pts: 500, icon: "🎫" },
        { id: 3, title: "₹500 Clean River Kit", pts: 1000, icon: "🧰" },
    ];

    const handleClaim = (rewardId: number, title: string, cost: number) => {
        if (claimedIds.includes(rewardId)) {
            setNotification(`You have already claimed: ${title}`);
            return;
        }

        if (points >= cost) {
            setPoints(prev => prev - cost);
            setClaimedIds(prev => [...prev, rewardId]);
            setNotification(`Successfully claimed: ${title}! Check your email for details.`);
            
            // Auto hide notification
            setTimeout(() => setNotification(null), 5000);
        } else {
            setNotification(`Insufficient points for ${title}. You need ${cost - points} more.`);
            setTimeout(() => setNotification(null), 3000);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Notification Toast */}
            {notification && (
                <div style={{ 
                    position: 'fixed', top: '2rem', right: '2rem', zIndex: 1000,
                    background: 'white', padding: '1rem 1.5rem', borderRadius: '1rem',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    borderLeft: '4px solid var(--accent)', display: 'flex', alignItems: 'center', gap: '1rem',
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <style>{`@keyframes slideIn { from { transform: translateX(120%); } to { transform: translateX(0); } }`}</style>
                    <span style={{ fontSize: '1.2rem' }}>{notification.includes('Successfully') ? '🎉' : '⚠️'}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{notification}</span>
                    <button onClick={() => setNotification(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', opacity: 0.5 }}>✕</button>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {/* Total Points */}
                <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #14b8a6, #06b6d4)', color: 'white' }}>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9, fontWeight: 600 }}>TOTAL IMPACT POINTS</div>
                    <div style={{ fontSize: '4rem', fontWeight: 800, margin: '0.5rem 0' }}>{points.toLocaleString()}</div>
                    <div className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>Ranked #4 in Cauvery Delta Area</div>
                </div>

                {/* Current Tier */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '3rem' }}>🏆</span>
                        <div>
                            <h3 style={{ margin: 0 }}>River Guardian</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Top 1% of contributors</p>
                        </div>
                    </div>
                    <div style={{ marginTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>
                            <span>NEXT TIER: ECO LEGEND</span>
                            <span>{points >= 1500 ? '0' : 1500 - points} pts left</span>
                        </div>
                        <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${Math.min(100, (points / 1500) * 100)}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.5s ease-in-out' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '2rem' }}>
                {/* Available Rewards */}
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Claim Rewards</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {rewards.map((r) => {
                            const isClaimed = claimedIds.includes(r.id);
                            return (
                                <div key={r.id} style={{ 
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                                    padding: '1rem', border: '1px solid var(--border)', borderRadius: '0.75rem',
                                    opacity: isClaimed ? 0.7 : 1, background: isClaimed ? '#f8fafc' : 'transparent'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>{r.icon}</span>
                                        <div>
                                            <div style={{ fontWeight: 600 }}>{r.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{r.pts} Points Required</div>
                                        </div>
                                    </div>
                                    <button 
                                        className={isClaimed ? "btn btn-secondary" : "btn btn-primary"}
                                        style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                                        onClick={() => handleClaim(r.id, r.title, r.pts)}
                                        disabled={isClaimed}
                                    >
                                        {isClaimed ? "Claimed ✓" : "Claim"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Leaderboard */}
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Local Leaderboard (Cauvery Basin)</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)', fontSize: '0.85rem', color: '#64748b' }}>
                                    <th style={{ padding: '0.75rem' }}>Rank</th>
                                    <th style={{ padding: '0.75rem' }}>Contributor</th>
                                    <th style={{ padding: '0.75rem' }}>Impact</th>
                                    <th style={{ padding: '0.75rem' }}>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { rank: 1, name: "Selvam M.", impact: "45 Reports", score: 2450, me: false },
                                    { rank: 2, name: "Kavitha R.", impact: "42 Reports", score: 2310, me: false },
                                    { rank: 3, name: "Arun K.", impact: "38 Reports", score: 2180, me: false },
                                    { rank: 4, name: "Aviral (You)", impact: "25 Reports", score: points, me: true },
                                ].map((u, i) => (
                                    <tr key={i} style={{ background: u.me ? '#f0f9ff' : 'transparent', borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '0.75rem', fontWeight: 700 }}>{u.rank}</td>
                                        <td style={{ padding: '0.75rem', fontWeight: 600 }}>{u.name}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: '#64748b' }}>{u.impact}</td>
                                        <td style={{ padding: '0.75rem', fontWeight: 800, color: 'var(--primary)' }}>{u.score.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardsDashboard;
