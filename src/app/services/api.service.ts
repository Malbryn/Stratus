import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CurrentWeather } from '../types/current-weather';
import { WeatherMapDto } from '../types/weather-map-dto';
import { RadarMap } from '../types/radar-map';
import { CurrentWeatherDto, WeatherDto } from '../types/weather-dto';

@Injectable()
export class ApiService {
    private httpClient: HttpClient = inject(HttpClient);

    private readonly CURRENT_WEATHER_PATH = 'current.json';

    getCurrentWeather(location: {
        latitude: number;
        longitude: number;
    }): Observable<CurrentWeather> {
        const baseUrl: string = `${environment.weatherApiUrl}${this.CURRENT_WEATHER_PATH}`;
        const url: string = `${baseUrl}?key=${environment.weatherApiKey}&q=${location.latitude},${location.longitude}`;

        return this.httpClient
            .get<WeatherDto>(url)
            .pipe(map((data) => this.parseCurrentWeatherData(data)));
    }

    getWeatherMap(): Observable<RadarMap> {
        return this.httpClient
            .get<WeatherMapDto>(environment.rainViewerApiUrl)
            .pipe(map((weatherMap) => this.parseWeatherMapData(weatherMap)));
    }

    private parseCurrentWeatherData(weather: WeatherDto): CurrentWeather {
        const current: CurrentWeatherDto = weather.current;

        return {
            lastUpdatedEpoch: current.last_updated_epoch,
            lastUpdated: current.last_updated,
            isDay: current.is_day === 1,
            temp: current.temp_c,
            feelsLike: current.feelslike_c,
            wind: current.wind_kph,
            windGust: current.gust_kph,
            windDir: current.wind_dir,
            windDegree: current.wind_degree,
            pressure: current.pressure_mb,
            precipitation: current.precip_mm,
            humidity: current.humidity,
            cloud: current.cloud,
            visibility: current.vis_km,
            uv: current.uv,
            condition: {
                text: current.condition.text,
                icon: current.condition.icon,
                code: current.condition.code,
            },
        } as CurrentWeather;
    }

    private parseWeatherMapData(weatherMap: WeatherMapDto): RadarMap {
        return {
            generated: weatherMap.generated,
            host: weatherMap.host,
            currentTileIndex: 0,
            tiles: [...weatherMap.radar.past, ...weatherMap.radar.nowcast],
        } as RadarMap;
    }
}
