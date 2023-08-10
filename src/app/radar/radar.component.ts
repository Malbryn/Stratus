import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

@Component({
    selector: 'radar',
    templateUrl: './radar.component.html',
    styleUrls: ['./radar.component.css'],
})
export class RadarComponent implements OnInit {
    map!: mapboxgl.Map;

    ngOnInit() {
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [19.04, 47.49],
            zoom: 10,
            maxZoom: 12,
            accessToken: environment.mapboxApiKey,
        });
    }
}
