import { MapRoutingModule } from './../map-routing.module';
import { MapComponent } from './../map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    MapRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiKey
    }),
  ]
})
export class MapModule { }
