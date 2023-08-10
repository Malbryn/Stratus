import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RootComponent } from './root/root.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RadarComponent } from './radar/radar.component';
import { LocationComponent } from './location/location.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { NgOptimizedImage } from '@angular/common';
import { ForecastComponent } from './forecast/forecast.component';
import { AlertsComponent } from './alerts/alerts.component';
import { RainfallComponent } from './rainfall/rainfall.component';
import { MetadataComponent } from './metadata/metadata.component';
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
