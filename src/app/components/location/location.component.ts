import { Component, inject, OnInit, Signal } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Location } from '../../types/location';

@Component({
    selector: 'location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
    private locationService: LocationService = inject(LocationService);

    currentLocation: Signal<Location> = this.locationService.currentLocation;

    ngOnInit() {}
}
