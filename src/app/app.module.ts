import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RootComponent } from './components/root/root.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RadarComponent } from './components/radar/radar.component';
import { LocationComponent } from './components/location/location.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { NgOptimizedImage } from '@angular/common';
import { ForecastComponent } from './components/forecast/forecast.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { RainfallComponent } from './components/rainfall/rainfall.component';
import { MetadataComponent } from './components/metadata/metadata.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from '../environments/environment.development';

@NgModule({
    declarations: [
        RootComponent,
        SidebarComponent,
        RadarComponent,
        LocationComponent,
        ConditionsComponent,
        ForecastComponent,
        AlertsComponent,
        RainfallComponent,
        MetadataComponent,
    ],
    imports: [
        BrowserModule,
        NgOptimizedImage,
        NgxMapboxGLModule.withConfig({
            accessToken: environment.mapboxApiKey,
        }),
    ],
    providers: [],
    bootstrap: [RootComponent],
})
export class AppModule {}
