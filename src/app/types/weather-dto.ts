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

export type WeatherDto = {
    location: LocationDto;
    current: CurrentWeatherDto;
};
