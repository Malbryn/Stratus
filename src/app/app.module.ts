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

@NgModule({
    declarations: [RootComponent, SidebarComponent, RadarComponent],
        RootComponent,
        SidebarComponent,
        RadarComponent,
        LocationComponent,
        ConditionsComponent,
        AlertsComponent,
        RainfallComponent,
    imports: [BrowserModule, NgOptimizedImage],
    providers: [],
    bootstrap: [RootComponent],
})
export class AppModule {}
