import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { CurrentWeather } from '../types/current-weather';
import { LocationService } from './location.service';
import { ForecastWeather } from '../types/forecast-weather';

export interface CurrentWeatherState {
    currentWeather: CurrentWeather | null;
    forecastWeather: ForecastWeather[];
    error: string | null;
    status: 'loading' | 'success' | 'error';
}

@Injectable()
export class WeatherService {
    private apiService: ApiService = inject(ApiService);
    private locationService: LocationService = inject(LocationService);

    private state = signal<CurrentWeatherState>({
        currentWeather: null,
        forecastWeather: [],
        error: null,
        status: 'loading',
    });

    currentWeather = computed(() => this.state().currentWeather);
    forecastWeather = computed(() => this.state().forecastWeather);
    error = computed(() => this.state().error);
    status = computed(() => this.state().status);

    constructor() {
        effect(async () =>
            this.apiService
                .getCurrentWeather({
                    latitude: this.locationService.currentLocation().latitude,
                    longitude: this.locationService.currentLocation().longitude,
                })
                .subscribe({
                    next: (weather) =>
                        this.state.update((state) => ({
                            ...state,
                            currentWeather: weather.current,
                            forecastWeather: weather.forecast,
                            status: 'success',
                        })),
                    error: (error) =>
                        this.state.update((state) => ({ ...state, error })),
                })
        );
    }
}
