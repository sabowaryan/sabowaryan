import { useEffect, useState } from 'react';
import { useTheme } from './use-theme';

interface WeatherData {
    isDayTime: boolean;
    description: string;
    temp: number;
}

export function useWeather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const { setTheme } = useTheme();

    useEffect(() => {
        async function getLocation() {
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude, longitude } = position.coords;
                
                // Get current weather data from Open-Meteo API
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code`
                );
                const data = await response.json();

                // Convert weather code to description
                // Based on WMO Weather interpretation codes (WW)
                // https://open-meteo.com/en/docs
                const getWeatherDescription = (code: number): string => {
                    if (code <= 3) return 'clear';
                    if (code <= 49) return 'foggy';
                    if (code <= 69) return 'rainy';
                    if (code <= 79) return 'snowy';
                    if (code <= 99) return 'stormy';
                    return 'clear';
                };

                setWeather({
                    isDayTime: data.current.is_day === 1,
                    description: getWeatherDescription(data.current.weather_code),
                    temp: Math.round(data.current.temperature_2m)
                });

                // Auto switch theme based on time of day
                setTheme(data.current.is_day === 1 ? 'light' : 'dark');
            } catch (error) {
                console.error('Error fetching weather:', error);
            }
        }

        getLocation();
    }, [setTheme]);

    return { weather };
}