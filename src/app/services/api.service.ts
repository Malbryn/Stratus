import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { WeatherMapDto } from '../types/weather-map-dto';
import { RadarMap } from '../types/radar-map';
import { WeatherMapParserUtil } from '../utils/weather-map-parser.util';
import { WeatherParserUtil } from '../utils/weather-parser.util';
import { WeatherDto } from '../types/weather-dto';
import { Weather } from '../types/weather';

@Injectable()
export class ApiService {
    private httpClient: HttpClient = inject(HttpClient);

    getCurrentWeather(location: {
        latitude: number;
        longitude: number;
    }): Observable<Weather> {
        const baseUrl: string = `${environment.weatherApiUrl}/forecast.json`;
        const url: string = `${baseUrl}?key=${environment.weatherApiKey}&q=${location.latitude},${location.longitude}&days=3&aqi=no&alerts=yes`;

        return this.httpClient
            .get<WeatherDto>(url)
            .pipe(
                map((data: WeatherDto) =>
                    WeatherParserUtil.parseWeatherData(data)
                )
            );
    }

    getWeatherMap(): Observable<RadarMap> {
        return this.httpClient
            .get<WeatherMapDto>(environment.rainViewerApiUrl)
            .pipe(
                map((weatherMap: WeatherMapDto) =>
                    WeatherMapParserUtil.parseWeatherMapData(weatherMap)
                )
            );
    }
}
