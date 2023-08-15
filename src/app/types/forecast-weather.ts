export type ForecastWeather = {
    date: string;
    dateEpoch: number;
    day: ForecastDay;
    astro: ForecastAstro;
    hour: ForecastHour[];
};

export type ForecastDay = {
    maxTemp: number;
    minTemp: number;
    avgTemp: number;
    maxWind: number;
    totalPrecipitation: number;
    totalSnow: number;
    avgVisibility: number;
    avgHumidity: number;
    willItRain: boolean;
    chanceOfRain: number;
    willItSnow: boolean;
    chanceOfSnow: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    uv: number;
};

export type ForecastAstro = {
    sunrise: string;
    sunset: string;
};

export type ForecastHour = {
    timeEpoch: number;
    time: string;
    temperature: number;
    isDay: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    wind: number;
    windGust: number;
    windDegree: number;
    windDirection: string;
    pressure: number;
    precipitation: number;
    humidity: number;
    cloudCover: number;
    feelsLike: number;
    windChill: number;
    heatIndex: number;
    dewPoint: number;
    willItRain: boolean;
    chanceOfRain: number;
    willItSnow: boolean;
    chanceOfSnow: number;
    visibility: number;
    uv: number;
};
