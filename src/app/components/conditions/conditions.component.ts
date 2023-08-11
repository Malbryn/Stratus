import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { CurrentWeather } from '../../types/current-weather';
import { conditionCodes, IconVariant } from '../../utils/condition-codes.util';

@Component({
    selector: 'conditions',
    templateUrl: './conditions.component.html',
    styleUrls: ['./conditions.component.css'],
})
export class ConditionsComponent implements OnInit {
    private conditionsService: WeatherService = inject(WeatherService);

    currentWeather: Signal<CurrentWeather | null> =
        this.conditionsService.currentWeather;

    windString!: Signal<string>;
    roundedTemperature!: Signal<number | undefined>;
    conditionIconPath!: Signal<string>;

    ngOnInit() {
        this.windString = computed(() =>
            this.createWindString(
                this.currentWeather()?.wind,
                this.currentWeather()?.windDir
            )
        );

        this.roundedTemperature = computed(() =>
            this.createRoundedTemperature(this.currentWeather()?.temp)
        );

        this.conditionIconPath = computed(() =>
            this.getConditionIcon(
                this.currentWeather()?.condition.code,
                this.currentWeather()?.isDay
            )
        );
    }

    private createWindString(
        speed: number | undefined,
        direction: string | undefined
    ): string {
        return `${speed !== undefined ? Math.round(speed) : '-'} km/h ${
            direction ?? ''
        }`;
    }

    private createRoundedTemperature(
        temp: number | undefined
    ): number | undefined {
        return temp === undefined ? temp : Math.round(temp);
    }

    private getConditionIcon(
        code: number | undefined,
        isDay: boolean | undefined
    ): string {
        if (code === undefined || isDay === undefined) return '';

        const iconVariant: IconVariant = conditionCodes[code];

        return isDay ? iconVariant.day : iconVariant.night;
    }
}
