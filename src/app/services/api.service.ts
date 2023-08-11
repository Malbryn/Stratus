import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CurrentWeather } from '../types/current-weather';

@Injectable()
export class ApiService {
    private httpClient: HttpClient = inject(HttpClient);

    private readonly CURRENT_WEATHER_PATH = 'current.json';

    getCurrentWeather(location: string): Observable<CurrentWeather> {
        const url: string = `${environment.weatherApiUrl}${this.CURRENT_WEATHER_PATH}?key=${environment.weatherApiKey}&q=${location}`;

        return this.httpClient
            .get(url)
            .pipe(map((data) => this.parseCurrentWeatherData(data)));
    }

    private parseCurrentWeatherData(obj: any): CurrentWeather {
        const current = obj['current'];

        return {
            lastUpdatedEpoch: current['last_updated_epoch'],
            lastUpdated: current['last_updated'],
            isDay: current['is_day'] === 1,
            temp: current['temp_c'],
            feelsLike: current['feelslike_c'],
            wind: current['wind_kph'],
            windGust: current['gust_kph'],
            windDir: current['wind_dir'],
            windDegree: current['wind_degree'],
            pressure: current['pressure_mb'],
            precipitation: current['precip_mm'],
            humidity: current['humidity'],
            cloud: current['cloud'],
            visibility: current['vis_km'],
            uv: current['uv'],
            condition: {
                text: current['condition']['text'],
                icon: current['condition']['icon'],
                code: current['condition']['code'],
            },
        } as CurrentWeather;
    }
}
