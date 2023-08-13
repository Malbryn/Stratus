import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { CurrentWeather } from '../types/current-weather';
import { LocationService } from './location.service';

export interface CurrentWeatherState {
    currentWeather: CurrentWeather | null;
    error: string | null;
    status: 'loading' | 'success' | 'error';
}

@Injectable()
export class WeatherService {
    private apiService: ApiService = inject(ApiService);
    private locationService: LocationService = inject(LocationService);

    private state = signal<CurrentWeatherState>({
        currentWeather: null,
        error: null,
        status: 'loading',
    });

    currentWeather = computed(() => this.state().currentWeather);
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
                    next: (currentWeather) =>
                        this.state.update((state) => ({
                            ...state,
                            currentWeather,
                            status: 'success',
                        })),
                    error: (error) =>
                        this.state.update((state) => ({ ...state, error })),
                })
        );
    }
}
