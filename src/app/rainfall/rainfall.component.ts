import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
    selector: 'rainfall',
    templateUrl: './rainfall.component.html',
    styleUrls: ['./rainfall.component.css'],
})
export class RainfallComponent implements OnInit {
    chart: Chart | undefined;

    ngOnInit() {
        this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                datasets: [
                    {
                        data: [10, 5, 0, 2, 15, 18, 12, 0, 0, 2],
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
}
