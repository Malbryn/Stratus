import { Location } from '../types/location';
import { computed, effect, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

export interface LocationState {
    currentLocation: Location;
    error: string | null;
    status: 'loading' | 'success' | 'error';
}

@Injectable()
export class LocationService {
    private state = signal<LocationState>({
        currentLocation: this.getDefaultLocation(),
        error: null,
        status: 'loading',
    });

    currentLocation = computed(() => this.state().currentLocation);
    error = computed(() => this.state().error);
    status = computed(() => this.state().status);

    constructor() {
        effect(() => this.saveDefaultLocation(this.currentLocation()));
    }

    setNewLocation(location: Location): void {
        this.state.update((state) => ({
            ...state,
            currentLocation: location,
            status: 'success',
        }));
    }

    private getDefaultLocation(): Location {
        const defaultLocation: string | null =
            localStorage.getItem('defaultLocation');

        return defaultLocation
            ? JSON.parse(defaultLocation)
            : environment.defaultLocation;
    }

    private saveDefaultLocation(location: Location): void {
        localStorage.setItem('defaultLocation', JSON.stringify(location));
    }
}
