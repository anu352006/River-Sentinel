import { useState, useEffect } from 'react';

export interface SensorReadings {
    ph: number;
    turbidity: number;
    temperature: number;
    humidity: number;
    ec: number;
    water_level: number;
    bod: number;
    cod: number;
    do: number;
    timestamp?: number;
    status?: string;
    temperature_error?: boolean;
    water_level_error?: boolean;
}

const defaultReadings: SensorReadings = {
    ph: 7.5,
    turbidity: 100,
    temperature: 28,
    humidity: 65,
    ec: 500,
    water_level: 68.5,
    bod: 30,
    cod: 150,
    do: 7.0,
    status: 'loading'
};

export const useSensorData = () => {
    const [readings, setReadings] = useState<SensorReadings>(defaultReadings);
    const [loading, setLoading] = useState(true);

    const fetchSensorData = async () => {
        try {
            const response = await fetch('/api/proxy/api/sensors/latest');
            if (response.ok) {
                const data = await response.json();
                setReadings(data);
            } else {
                console.error('Failed to fetch sensor data');
            }
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch immediately
        fetchSensorData();

        // Set up polling every 5 seconds for real-time updates
        const interval = setInterval(fetchSensorData, 5000);

        return () => clearInterval(interval);
    }, []);

    return { readings, loading, refresh: fetchSensorData };
};
