import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import * as MapboxGL from 'mapbox-gl';
import { LngLatLike } from 'mapbox-gl';
import * as MapboxSearchBox from '@mapbox/mapbox-gl-geocoder';
import { environment } from '../../../environments/environment';
import { LocationService } from '../../services/location.service';
import { Location } from '../../types/location';
import { RadarService } from '../../services/radar.service';
import { RadarMap } from '../../types/radar-map';

@Component({
    selector: 'radar',
    templateUrl: './radar.component.html',
    styleUrls: ['./radar.component.css'],
})
export class RadarComponent implements OnInit {
    private locationService: LocationService = inject(LocationService);
    private radarService: RadarService = inject(RadarService);

    DEFAULT_LAYER_INDEX = 12;

    mapbox!: MapboxGL.Map;
    radarMap: Signal<RadarMap | null> = this.radarService.radarMap;
    currentTileIndex: Signal<number> = this.radarService.currentTileIndex;

    previousTileIndex: number = 0;

    constructor() {
        effect(() => this.refreshRadarOverlay(this.currentTileIndex()));
    }

    ngOnInit() {
        // Create map
        const defaultCoordinates: LngLatLike = [
            this.locationService.currentLocation().latitude,
            this.locationService.currentLocation().longitude,
        ];

        this.mapbox = new MapboxGL.Map({
            container: 'mapbox',
            style: 'mapbox://styles/mapbox/dark-v11',
            center: defaultCoordinates,
            zoom: 10,
            maxZoom: 11,
            accessToken: environment.mapboxApiKey,
        });

        this.mapbox.on('load', () => this.addRadarLayer());

        // Create search box
        const search: MapboxSearchBox = new MapboxSearchBox({
            accessToken: environment.mapboxApiKey,
            types: 'place',
            marker: false,
        });

        search.on('result', (event) => {
            const location: Location =
                this.createLocationFromSearchEvent(event);

            this.locationService.setNewLocation(location);
        });

        this.mapbox.addControl(search);
    }

    private createLocationFromSearchEvent(event: any): Location {
        const result = event['result'];

        return {
            shortName: result['text'],
            longName: result['place_name'],
            latitude: result['center'][0],
            longitude: result['center'][1],
        };
    }

    private addRadarLayer(): void {
        this.radarMap()?.tiles.forEach((tile, index) => {
            this.mapbox.addLayer({
                id: `radar_${index}`,
                type: 'raster',
                source: {
                    type: 'raster',
                    tiles: [
                        `${this.radarMap()?.host}${tile.path}/256/{z}/{x}/{y}/${
                            environment.radarColour
                        }/1_1.png`,
                    ],
                    tileSize: 256,
                },
                layout: { visibility: index === 0 ? 'visible' : 'none' },
                minzoom: 0,
                maxzoom: 12,
            });

            this.mapbox.setPaintProperty(
                `radar_${index}`,
                'raster-opacity',
                0.66
            );
        });

        this.radarService.setFrameIndex(this.DEFAULT_LAYER_INDEX);
    }

    private refreshRadarOverlay(newIndex: number): void {
        this.mapbox.setLayoutProperty(
            `radar_${newIndex}`,
            'visibility',
            'visible'
        );

        this.mapbox.setLayoutProperty(
            `radar_${this.previousTileIndex}`,
            'visibility',
            'none'
        );

        this.previousTileIndex = newIndex;
    }
}
