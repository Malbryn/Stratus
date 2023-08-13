import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { RadarMap } from '../types/radar-map';

export interface RadarState {
    radarMap: RadarMap | null;
    currentTileIndex: number;
    error: string | null;
    status: 'loading' | 'success' | 'error';
}

@Injectable()
export class RadarService {
    private apiService: ApiService = inject(ApiService);

    DEFAULT_MAX_INDEX = 15;

    private state = signal<RadarState>({
        radarMap: null,
        currentTileIndex: 0,
        error: null,
        status: 'loading',
    });

    radarMap = computed(() => this.state().radarMap);
    currentTileIndex = computed(() => this.state().currentTileIndex);
    error = computed(() => this.state().error);
    status = computed(() => this.state().status);

    constructor() {
        this.apiService.getWeatherMap().subscribe({
            next: (radarMap) => {
                this.state.update((state) => ({
                    ...state,
                    radarMap,
                    status: 'success',
                }));
            },
            error: (error) =>
                this.state.update((state) => ({
                    ...state,
                    error,
                    status: 'error',
                })),
        });
    }

    setNextFrameIndex(): void {
        let currentIndex: number = this.currentTileIndex();
        const tileLength: number | undefined = this.radarMap()?.tiles.length;
        const maxIndex: number = tileLength
            ? tileLength - 1
            : this.DEFAULT_MAX_INDEX;

        if (currentIndex === maxIndex) currentIndex = 0;

        this.setFrameIndex(currentIndex + 1);
    }

    setPreviousFrameIndex(): void {
        let currentIndex: number = this.currentTileIndex();
        const tileLength: number | undefined = this.radarMap()?.tiles.length;
        const maxIndex: number = tileLength
            ? tileLength - 1
            : this.DEFAULT_MAX_INDEX;

        if (currentIndex === 0) currentIndex = maxIndex ?? 0;

        this.setFrameIndex(currentIndex - 1);
    }

    setFrameIndex(index: number): void {
        this.state.update((state) => ({
            ...state,
            currentTileIndex: index,
        }));
    }
}
