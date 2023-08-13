import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RadarMap } from '../../types/radar-map';
import { RadarService } from '../../services/radar.service';

@Component({
    selector: 'radar-control',
    templateUrl: './radar-control.component.html',
    styleUrls: ['./radar-control.component.css'],
})
export class RadarControlComponent implements OnInit {
    private radarService: RadarService = inject(RadarService);

    radarMap: Signal<RadarMap | null> = this.radarService.radarMap;
    currentTileIndex: Signal<number> = this.radarService.currentTileIndex;
    currentTime: Signal<string> = computed(() => this.getFormattedTime());

    isPlaying: boolean = false;
    timeoutId: number | undefined;

    ngOnInit() {}

    play(): void {
        this.forward();

        this.timeoutId = window.setTimeout(() => {
            if (this.isPlaying) this.play();
        }, 1000);

        this.isPlaying = true;
    }

    pause(): void {
        clearTimeout(this.timeoutId);

        this.isPlaying = false;
    }

    forward(): void {
        this.radarService.setNextFrameIndex();
    }

    backward(): void {
        this.radarService.setPreviousFrameIndex();
    }

    private getFormattedTime(): string {
        const tileIndex: number = this.currentTileIndex();
        const unixTime: number = this.radarMap()?.tiles[tileIndex].time ?? 0;
        const date: Date = new Date(unixTime * 1000);

        const hours: number = date.getHours();
        const minutes: number = date.getMinutes();

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}`;
    }
}
