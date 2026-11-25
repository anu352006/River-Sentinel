"use client";

import React from "react";

export const Notifications = () => (
    <div className="card">
        <h3>Recent Alerts</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {[
                { title: "Flood Alert", msg: "Moderate risk detected at Kooduthurai (Erode). Expected peak at 04:00 AM.", type: "red", time: "2h ago" },
                { title: "Report Verified", msg: "Your pollution report at Amma Mandapam (Trichy) has been verified. +35 pts earned!", type: "green", time: "5h ago" },
                { title: "Water Quality Update", msg: "Cauvery water quality in the Delta region has improved by 12% this week.", type: "blue", time: "1d ago" },
            ].map((n, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', borderRadius: '0.75rem', border: `1px solid var(--border)`, borderLeft: `5px solid var(--${n.type === 'red' ? 'danger' : n.type === 'green' ? 'success' : 'primary'})` }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <div style={{ fontWeight: 700 }}>{n.title}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{n.time}</div>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#475569' }}>{n.msg}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export const Profile = () => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [profile, setProfile] = React.useState({
        name: "Anirudh K.",
        role: "RIVER GUARDIAN",
        joined: "Dec 2025",
        region: "Tamil Nadu, Cauvery Basin"
    });
    const [formData, setFormData] = React.useState({ ...profile });

    const handleSave = () => {
        setProfile({ ...formData });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({ ...profile });
        setIsEditing(false);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            <div className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary)', color: 'white', fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontWeight: 800 }}>
                    {profile.name.charAt(0)}
                </div>
                
                {isEditing ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        <input 
                            type="text" 
                            value={formData.name} 
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Your Name"
                            style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', textAlign: 'center', fontWeight: 700 }}
                        />
                         <input 
                            type="text" 
                            value={formData.role} 
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                            placeholder="Your Title"
                            style={{ padding: '0.4rem', borderRadius: '0.4rem', border: '1px solid var(--border)', textAlign: 'center', fontSize: '0.8rem' }}
                        />
                    </div>
                ) : (
                    <>
                        <h2 style={{ marginBottom: '0.25rem' }}>{profile.name}</h2>
                        <p style={{ color: '#64748b' }}>Member since {profile.joined}</p>
                        <div className="badge badge-blue" style={{ marginTop: '1rem' }}>{profile.role}</div>
                    </>
                )}

                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {isEditing ? (
                        <>
                            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleSave}>Save Changes</button>
                            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={handleCancel}>Cancel</button>
                        </>
                    ) : (
                        <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )}
                </div>
            </div>
            
            <div className="card">
                <h3>Account Statistics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                    <div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Reports Submitted</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800 }}>25</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Lives Impacted</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800 }}>1.2k</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Sensors Verified</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800 }}>12</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Rewards Claimed</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800 }}>3</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
