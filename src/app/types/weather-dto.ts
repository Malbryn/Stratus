export type WeatherDto = {
    location: LocationDto;
    current: CurrentWeatherDto;
    forecast: { forecastday: ForecastDto[] };
};

export type LocationDto = {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
};

export type CurrentWeatherDto = {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    is_day: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    wind_kph: number;
    wind_degree: number;
    wind_dir: 'N';
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    vis_km: number;
    uv: number;
    gust_kph: number;
};

export type ForecastDto = {
    date: string;
    date_epoch: number;
    day: ForecastDayDto;
    astro: ForecastAstroDto;
    hour: ForecastHourDto[];
};

export type ForecastDayDto = {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    uv: number;
};

export type ForecastAstroDto = {
    sunrise: string;
    sunset: string;
};

export type ForecastHourDto = {
    time_epoch: number;
    time: string;
    temp_c: number;
    is_day: number;
    condition: {
        text: string;
        icon: string;
        code: number;
    };
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    precip_mm: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    windchill_c: number;
    heatindex_c: number;
    dewpoint_c: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    vis_km: number;
    gust_kph: number;
    uv: number;
};
