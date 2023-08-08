import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RootComponent } from './root/root.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RadarComponent } from './radar/radar.component';
import { LocationComponent } from './location/location.component';

@NgModule({
    declarations: [RootComponent, SidebarComponent, RadarComponent],
        RootComponent,
        SidebarComponent,
        RadarComponent,
    providers: [],
    bootstrap: [RootComponent],
})
export class AppModule {}
