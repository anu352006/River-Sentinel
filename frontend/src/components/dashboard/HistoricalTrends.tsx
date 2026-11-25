"use client";

import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const datasets: { [key: string]: any[] } = {
    "24h": [
        { time: "06:00", ph: 7.2, turbidity: 4.5, temp: 22 },
        { time: "09:00", ph: 7.5, turbidity: 5.2, temp: 24 },
        { time: "12:00", ph: 7.8, turbidity: 6.1, temp: 26 },
        { time: "15:00", ph: 7.4, turbidity: 4.8, temp: 25 },
        { time: "18:00", ph: 7.1, turbidity: 4.2, temp: 23 },
        { time: "21:00", ph: 7.0, turbidity: 3.9, temp: 22 },
        { time: "00:00", ph: 7.1, turbidity: 3.8, temp: 21 },
    ],
    "7d": [
        { time: "Mon", ph: 7.5, turbidity: 4.1, temp: 24 },
        { time: "Tue", ph: 7.3, turbidity: 4.5, temp: 23 },
        { time: "Wed", ph: 7.6, turbidity: 5.2, temp: 25 },
        { time: "Thu", ph: 7.4, turbidity: 4.8, temp: 24 },
        { time: "Fri", ph: 7.2, turbidity: 8.5, temp: 26 }, // High turbidity day
        { time: "Sat", ph: 7.3, turbidity: 6.2, temp: 25 },
        { time: "Sun", ph: 7.5, turbidity: 4.8, temp: 24 },
    ],
    "30d": [
        { time: "Day 1", ph: 7.4, turbidity: 4.2, temp: 22 },
        { time: "Day 5", ph: 7.6, turbidity: 5.1, temp: 23 },
        { time: "Day 10", ph: 7.3, turbidity: 6.5, temp: 25 },
        { time: "Day 15", ph: 7.1, turbidity: 4.8, temp: 24 },
        { time: "Day 20", ph: 7.5, turbidity: 5.2, temp: 26 },
        { time: "Day 25", ph: 7.8, turbidity: 4.1, temp: 25 },
        { time: "Day 30", ph: 7.4, turbidity: 4.3, temp: 24 },
    ]
};

const STATS_MAP: { [key: string]: any[] } = {
    "24h": [
        { label: "Avg pH", value: "7.3", trend: "+0.2" },
        { label: "Avg Turbidity", value: "4.6", trend: "-1.2", suffix: " NTU" },
        { label: "Avg Temp", value: "23", trend: "-2", suffix: "°C" },
        { label: "Peak Pollution", value: "12:15", trend: "PM" },
    ],
    "7d": [
        { label: "Weekly pH", value: "7.4", trend: "-0.1" },
        { label: "Weekly Turbidity", value: "5.4", trend: "+2.1", suffix: " NTU" },
        { label: "Avg Temp", value: "24", trend: "+1", suffix: "°C" },
        { label: "Worst Day", value: "Friday", trend: "High Rain" },
    ],
    "30d": [
        { label: "Monthly pH", value: "7.4", trend: "Stable" },
        { label: "Monthly Turb", value: "4.9", trend: "-3.2", suffix: " NTU" },
        { label: "Avg Temp", value: "24", trend: "+0.5", suffix: "°C" },
        { label: "Overall Rating", value: "GOOD", trend: "B+ Class" },
    ]
};

const HistoricalTrends = () => {
    const [range, setRange] = useState("24h");
    const currentData = datasets[range] || datasets["24h"];
    const currentStats = STATS_MAP[range] || STATS_MAP["24h"];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>River Water Quality Trends (Last {range === '24h' ? '24h' : range === '7d' ? '7 days' : '30 days'})</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select 
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--border)', background: 'white', fontWeight: 600 }}
                    >
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                    </select>
                </div>
            </div>

            <div className="card" style={{ height: '400px', width: '100%', padding: '2rem 1rem 1rem 0' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentData}>
                        <defs>
                            <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorTurb" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--secondary)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--secondary)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        />
                        <Legend verticalAlign="top" height={36} iconType="circle" />
                        <Area name="pH Level" type="monotone" dataKey="ph" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorPh)" />
                        <Area name="Turbidity (NTU)" type="monotone" dataKey="turbidity" stroke="var(--secondary)" strokeWidth={3} fillOpacity={1} fill="url(#colorTurb)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {currentStats.map((stat, i) => (
                    <div key={i} className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{stat.label}</div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.25rem 0' }}>{stat.value}{stat.suffix}</div>
                        <div style={{ fontSize: '0.8rem', color: stat.trend.includes('-') || stat.trend === 'Stable' ? '#10b981' : '#f59e0b', fontWeight: 700 }}>
                            {stat.trend} {stat.trend.length > 3 && range === '24h' ? 'vs yesterday' : ''}
                        </div>
                    </div>
                ))}
            </div>

            <div className="card" style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                <h4 style={{ color: '#0369a1', marginBottom: '0.5rem' }}>💡 Historical Insights</h4>
                <p style={{ color: '#0369a1', fontSize: '0.9rem' }}>
                    Water quality remains consistently 15% better during early morning hours (05:00 - 07:00).
                    Turbidity peaks typically follow ritual bathing hours between 12:00 PM and 02:00 PM.
                </p>
            </div>
        </div>
    );
};

export default HistoricalTrends;
