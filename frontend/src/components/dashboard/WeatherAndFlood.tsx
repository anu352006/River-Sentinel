"use client";

import React, { useState, useEffect } from "react";

interface WeatherData {
    temperature: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    description: string;
    icon: string;
    wind_speed: number;
    clouds: number;
    visibility: number;
    rain: number;
    city: string;
    timestamp: number;
    fallback?: boolean;
}

interface FloodPrediction {
    prediction: string;  // "FLOOD" or "NO_FLOOD"
    flood_probability: number;
    risk_level: string;  // "LOW", "MODERATE", "HIGH"
    message: string;
    reasons: string[];
    sensor_data: {
        water_level: number;
        discharge: number;
        discharge_cumec?: number;
        rain_local: number;
        rain_local_avg_mm?: number;
        rain_upstream: number;
        rain_upstream_avg_mm?: number;
        temperature: number;
        humidity: number;
        bod?: number;
        cod?: number;
        do?: number;
    };
    prediction_time: string;
}

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

const SHELTER_LOCATIONS: { [key: string]: { name: string; info: string; distance: string } } = {
    "Kooduthurai – erode (Bhavani Sangam)": { name: "Govt Higher Sec School", info: "Marriage halls near Sangameshwar temple", distance: "0.8 km" },
    "Amma mandapam ghat – Sri Rangam (Trichy)": { name: "Govt Hospital Sri Rangam", info: "Trichy city relief camps", distance: "1.2 km" },
    "Mayiladuthurai river ghats – cauvery delta": { name: "Community Halls", info: "Near riverbanks & Government school", distance: "0.5 km" },
    "Papanasam ghat – thirunelveli (Tamarabarani river)": { name: "Forest Dept Shelter", info: "Schools in Ambasamudram town", distance: "2.1 km" },
    "Kallanai – Trichy": { name: "Govt Hospital Trichy", info: "Local community halls", distance: "1.5 km" },
    "Adayar river bank areas – Chennai": { name: "Govt Kasturba Gandhi Hospital", info: "Corporation schools shelter", distance: "1.0 km" },
    "Kumbakonam Ghat – Thanjavur": { name: "Govt Headqtrs Hospital", info: "Kumbakonam town center", distance: "0.9 km" },
    "Thiruvayaru ghat – Thanjavur": { name: "Government Hospital", info: "Relief camps Thanjavur", distance: "1.1 km" },
    "Kodumudi ghat – erode": { name: "Makudeshwar Temple", info: "Temple area relief center", distance: "0.4 km" }
};

const WeatherAndFlood = () => {
    const [selectedGhat, setSelectedGhat] = useState(ghats[0]);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [floodPrediction, setFloodPrediction] = useState<FloodPrediction | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Localized weather simulation
    const getLocalizedWeather = (base: WeatherData, ghatName: string): WeatherData => {
        const hash = ghatName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        // Slightly vary temperature and rain based on location
        const tempVariation = (hash % 5) - 2; // -2 to +2
        const humVariation = (hash % 10) - 5; // -5 to +5
        
        return {
            ...base,
            temperature: base.temperature + tempVariation,
            feels_like: base.feels_like + tempVariation,
            humidity: Math.min(100, Math.max(0, base.humidity + humVariation)),
            description: base.rain > 0 ? "Potential rainfall" : base.humidity > 70 ? "Cloudy" : "Partial sunshine",
            city: ghatName
        };
    };

    // Fetch weather data
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || '/api/proxy'}/api/weather`);
                const data = await response.json();
                setWeather(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching weather:', error);
                setLoading(false);
            }
        };

        fetchWeather();
        // Refresh weather every 10 minutes
        const weatherInterval = setInterval(fetchWeather, 600000);

        return () => clearInterval(weatherInterval);
    }, []);

    // Fetch flood prediction
    useEffect(() => {
        const fetchFloodPrediction = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || '/api/proxy'}/api/flood/predict`);
                const data = await response.json();
                setFloodPrediction(data);
                console.log('Flood prediction:', data);
            } catch (error) {
                console.error('Error fetching flood prediction:', error);
            }
        };

        fetchFloodPrediction();
        // Refresh flood prediction every 5 minutes
        const floodInterval = setInterval(fetchFloodPrediction, 300000);

        return () => clearInterval(floodInterval);
    }, []);

    // Update time every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Get risk color based on risk level
    const getRiskColor = (riskLevel: string) => {
        switch (riskLevel) {
            case 'HIGH': return '#ef4444';      // Red
            case 'MODERATE': return '#f59e0b';  // Orange
            case 'LOW': return '#10b981';       // Green
            default: return '#6b7280';          // Gray
        }
    };

    const riskColor = floodPrediction ? getRiskColor(floodPrediction.risk_level) : '#10b981';


    // Get weather icon emoji
    const getWeatherIcon = (iconCode: string) => {
        const iconMap: { [key: string]: string } = {
            '01d': '☀️', '01n': '🌙',
            '02d': '⛅', '02n': '☁️',
            '03d': '☁️', '03n': '☁️',
            '04d': '☁️', '04n': '☁️',
            '09d': '🌧️', '09n': '🌧️',
            '10d': '🌦️', '10n': '🌧️',
            '11d': '⛈️', '11n': '⛈️',
            '13d': '❄️', '13n': '❄️',
            '50d': '🌫️', '50n': '🌫️'
        };
        return iconMap[iconCode] || '⛅';
    };

    // Calculate rain probability based on humidity and clouds
    const rainProbability = weather ? Math.min(95, Math.round((weather.humidity * 0.4) + (weather.clouds * 0.4))) : 15;

    const localWeather = weather ? getLocalizedWeather(weather, selectedGhat) : null;
    const currentShelter = SHELTER_LOCATIONS[selectedGhat];

    if (loading || !localWeather) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌦️</div>
                <div>Loading weather data...</div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ marginBottom: '0.4rem' }}>Weather & Flood Report</h1>
                    <p style={{ color: '#64748b' }}>Environmental safety and emergency protocols.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <select
                        value={selectedGhat}
                        onChange={(e) => setSelectedGhat(e.target.value)}
                        style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: '1px solid var(--border)', background: 'white', fontWeight: 600 }}
                    >
                        {ghats.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                </div>
            </div>

            {weather?.fallback && (
                <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem', color: '#92400e' }}>
                    ⚠️ Using fallback weather data. Live data temporarily unavailable.
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                {/* Main Weather Card */}
                <div className="card" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', color: 'white', display: 'flex', justifyContent: 'space-between', padding: '2.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '4rem', margin: 0 }}>{Math.round(localWeather.temperature)}°C</h1>
                        <h2 style={{ fontSize: '1.5rem', opacity: 0.9, marginBottom: '1rem', textTransform: 'capitalize' }}>{localWeather.description}</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                            <div>Humidity: {localWeather.humidity}%</div>
                            <div>Wind: {localWeather.wind_speed} km/h</div>
                            <div>Rainfall: {localWeather.rain > 0 ? `${localWeather.rain.toFixed(1)} mm/h` : 'No rain'}</div>
                            <div>Visibility: {localWeather.visibility} km</div>
                            <div>Pressure: {localWeather.pressure} hPa</div>
                            <div>Rain Prob: {rainProbability}%</div>
                        </div>
                        <div style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.8 }}>
                            Location: {localWeather.city} • Updated: {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                    <div style={{ fontSize: '6rem', display: 'flex', alignItems: 'center' }}>{getWeatherIcon(localWeather.icon)}</div>
                </div>

                {/* Flood Risk Card - ML Predicted */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: `8px solid ${riskColor}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>FLOOD RISK STATUS</div>
                        <div style={{ fontSize: '0.7rem', background: '#3b82f6', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontWeight: 600 }}>
                            🤖 AI-PREDICTED
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 800, color: riskColor }}>
                            {floodPrediction?.risk_level || 'LOADING'}
                        </span>
                        <span style={{ fontSize: '1.1rem', color: '#64748b' }}>
                            {floodPrediction?.flood_probability || 0}%
                        </span>
                    </div>

                    {/* Prediction Message */}
                    {floodPrediction?.message && (
                        <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic' }}>
                            {floodPrediction.message}
                        </div>
                    )}

                    {/* Prediction Reasons */}
                    {floodPrediction && floodPrediction.reasons && floodPrediction.reasons.length > 0 && (
                        <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Key Factors:</div>
                            <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                                {floodPrediction.reasons.slice(0, 3).map((reason, idx) => (
                                    <li key={idx}>{reason}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Real-Time Sensor Data Comparison */}
                    {floodPrediction?.sensor_data && (
                        <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#94a3b8', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem' }}>
                            <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#64748b' }}>📊 Real-Time Sensor Data:</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                <div>💧 Water: {floodPrediction.sensor_data.water_level.toFixed(2)}m</div>
                                <div>🌊 Discharge: {floodPrediction.sensor_data.discharge.toFixed(0)} cumec</div>
                                <div>🌧️ Rain (Local): {floodPrediction.sensor_data.rain_local.toFixed(1)}mm/h</div>
                                <div>☔ Rain (Upstream): {floodPrediction.sensor_data.rain_upstream.toFixed(1)}mm/h</div>
                                <div>🌡️ Temp: {floodPrediction.sensor_data.temperature.toFixed(1)}°C</div>
                                <div>💨 Humidity: {floodPrediction.sensor_data.humidity.toFixed(0)}%</div>
                                {floodPrediction.sensor_data.bod !== undefined && <div>🧪 BOD: {floodPrediction.sensor_data.bod.toFixed(1)} mg/L</div>}
                                {floodPrediction.sensor_data.cod !== undefined && <div>🧪 COD: {floodPrediction.sensor_data.cod.toFixed(1)} mg/L</div>}
                                {floodPrediction.sensor_data.do !== undefined && <div>🫧 DO: {floodPrediction.sensor_data.do.toFixed(1)} mg/L</div>}
                            </div>
                        </div>
                    )}

                    {/* Prediction Time */}
                    {floodPrediction?.prediction_time && (
                        <div style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: '#94a3b8', textAlign: 'right' }}>
                            Updated: {new Date(floodPrediction.prediction_time).toLocaleTimeString('en-IN')}
                        </div>
                    )}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {/* Rain Forecast */}
                <div className="card">
                    <h3 style={{ fontSize: '1.2rem' }}>24h Rain Forecast</h3>
                    <div style={{ margin: '1.5rem 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            <span>Probability</span>
                            <span style={{ fontWeight: 700 }}>{rainProbability}%</span>
                        </div>
                        <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${rainProbability}%`, height: '100%', background: 'var(--primary)' }}></div>
                        </div>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                        Current: {localWeather.rain > 0 ? `${localWeather.rain}mm/h` : 'No rain'}
                    </div>
                </div>

                {/* Monsoon Status */}
                <div className="card">
                    <h3 style={{ fontSize: '1.2rem' }}>Monsoon Status</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1rem' }}>
                        <span style={{ fontSize: '3rem' }}>
                            {new Date().getMonth() >= 5 && new Date().getMonth() <= 8 ? '🌧️' : '☀️'}
                        </span>
                        <div>
                            <div style={{ fontWeight: 700, color: 'var(--primary)' }}>
                                {new Date().getMonth() >= 5 && new Date().getMonth() <= 8 ? 'Active Monsoon' : 'Pre-Monsoon'}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                {localWeather.rain > 5 ? 'Heavy rainfall detected' : localWeather.rain > 0 ? 'Light rainfall' : 'Clear skies'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nearby Shelters */}
                <div className="card">
                    <h3 style={{ fontSize: '1.2rem' }}>Nearest Shelter</h3>
                    <div style={{ marginTop: '1rem' }}>
                        <div style={{ fontWeight: 700 }}>{currentShelter.name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', margin: '0.25rem 0' }}>{currentShelter.info}</div>
                        <div style={{ fontSize: '0.85rem', color: '#0ea5e9', fontWeight: 600 }}>{currentShelter.distance} away • Ready for occupancy</div>
                        <button 
                            className="btn btn-secondary" 
                            style={{ marginTop: '1rem', width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}
                            onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(currentShelter.name + " " + selectedGhat)}`, '_blank')}
                        >
                            📍 Directions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherAndFlood;
