import { Component, inject, OnInit, Signal } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ForecastWeather } from '../../types/forecast-weather';
import { conditionCodes } from '../../utils/condition-codes.util';

@Component({
    selector: 'forecast',
    templateUrl: './forecast.component.html',
    styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
    private conditionsService: WeatherService = inject(WeatherService);

    readonly DAYS_OF_WEEK: string[] = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    forecastWeather: Signal<ForecastWeather[]> =
        this.conditionsService.forecastWeather;

    ngOnInit() {}

    createRoundedTemperature(temp: number): number {
        return Math.round(temp);
    }

    getConditionIcon(code: number): string {
        return conditionCodes[code].day;
    }

    getDayOfWeek(dateString: string): string {
        const date: Date = new Date(dateString);
        const dayIndex: number = date.getDay();
        const dayOfWeek: string = this.DAYS_OF_WEEK[dayIndex];

        return dayOfWeek.substring(0, 3);
    }
}
