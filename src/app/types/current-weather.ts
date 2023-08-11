export type CurrentWeather = {
    lastUpdatedEpoch: number;
    lastUpdated: string;
    isDay: boolean;
    temp: number;
    feelsLike: number;
    wind: number;
    windGust: number;
    windDir: string;
    windDegree: number;
    pressure: number;
    precipitation: number;
    humidity: number;
    cloud: number;
    visibility: number;
    uv: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
};
