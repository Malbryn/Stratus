import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import Chart from 'chart.js/auto';
import { WeatherService } from '../../services/weather.service';
import { ForecastHour, ForecastWeather } from '../../types/forecast-weather';

@Component({
    selector: 'rainfall',
    templateUrl: './rainfall.component.html',
    styleUrls: ['./rainfall.component.css'],
})
export class RainfallComponent implements OnInit {
    private conditionsService: WeatherService = inject(WeatherService);

    forecastWeather: Signal<ForecastWeather[]> =
        this.conditionsService.forecastWeather;

    readonly FORECAST_HOUR_COUNT = 12;

    chart: Chart | undefined;

    constructor() {
        effect(() => this.refreshChartData());
    }

    ngOnInit() {
        this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        label: '',
                        backgroundColor: '#36a2eb',
                        borderRadius: 5,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                responsive: true,
            },
        });
    }

    private initChartData(): Map<number, number> | undefined {
        const precipitationPerHour: Map<number, number> = new Map<
            number,
            number
        >();
        const currentHour: number = new Date().getHours();
        const forecastWeather: ForecastWeather[] = this.forecastWeather();

        if (forecastWeather.length === 0) return;

        const currentDayHours: ForecastHour[] = forecastWeather[0].hour;

        // Iterate the hours of the current day and add the precipitation data
        for (let i = currentHour; i < currentDayHours.length; i++) {
            const precipitation: number = currentDayHours[i].precipitation ?? 0;

            precipitationPerHour.set(i, precipitation);
        }

        const elapsedHours: number = currentDayHours.length - currentHour;

        // Skip to next day and add the remaining hours
        if (elapsedHours < this.FORECAST_HOUR_COUNT) {
            const remainingHours: number =
                this.FORECAST_HOUR_COUNT - elapsedHours;
            const nextDayHours: ForecastHour[] = forecastWeather[1].hour;

            for (let i = 0; i < remainingHours; i++) {
                const precipitation: number =
                    nextDayHours[i].precipitation ?? 0;

                precipitationPerHour.set(i, precipitation);
            }
        }

        return precipitationPerHour;
    }

    private refreshChartData(): void {
        const chartData: Map<number, number> | undefined = this.initChartData();

        if (!chartData || !this.chart) return;

        const chartKeys: string[] = [...chartData.keys()].map((key) =>
            key.toString()
        );
        const chartValues: number[] = [...chartData.values()];

        this.chart.data.labels = chartKeys;
        this.chart.data.datasets[0].data = chartValues;

        this.chart.update();
    }
}
