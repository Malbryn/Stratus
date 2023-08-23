import {
    Component,
    inject,
    signal,
    Signal,
    WritableSignal,
} from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherAlert } from '../../types/weather-alert';

@Component({
    selector: 'alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.css'],
})
export class AlertsComponent {
    private conditionsService: WeatherService = inject(WeatherService);

    alerts: Signal<WeatherAlert[]> = this.conditionsService.alerts;
    currentItemIndex: WritableSignal<number> = signal<number>(0);

    previousPage(): void {
        const maxIndex: number = this.alerts().length - 1;
        const nextIndex: number = this.currentItemIndex() - 1;

        this.currentItemIndex.update(() =>
            nextIndex < 0 ? maxIndex : nextIndex
        );
    }

    nextPage(): void {
        const maxIndex: number = this.alerts().length - 1;
        const nextIndex: number = this.currentItemIndex() + 1;

        this.currentItemIndex.update(() =>
            maxIndex < nextIndex ? 0 : nextIndex
        );
    }
}
