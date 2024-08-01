import { Component } from '@angular/core';
import { WeatherSideComponent } from './weather-side/weather-side.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [WeatherSideComponent, WeatherDetailsComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {}
