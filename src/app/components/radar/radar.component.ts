import { Component, inject, OnInit } from '@angular/core';
import * as MapboxGL from 'mapbox-gl';
import { LngLatLike } from 'mapbox-gl';
import * as MapboxSearchBox from '@mapbox/mapbox-gl-geocoder';
import { environment } from '../../../environments/environment';
import { LocationService } from '../../services/location.service';
import { Location } from '../../types/location';

@Component({
    selector: 'radar',
    templateUrl: './radar.component.html',
    styleUrls: ['./radar.component.css'],
})
export class RadarComponent implements OnInit {
    private locationService: LocationService = inject(LocationService);

    ngOnInit() {
        // Create map
        const defaultCoordinates: LngLatLike = [
            this.locationService.currentLocation().latitude,
            this.locationService.currentLocation().longitude,
        ];

        const map: MapboxGL.Map = new MapboxGL.Map({
            container: 'mapbox',
            style: 'mapbox://styles/mapbox/dark-v11',
            center: defaultCoordinates,
            zoom: 10,
            maxZoom: 11,
            accessToken: environment.mapboxApiKey,
        });

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

        map.addControl(search);
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
}
