import { Component } from '@angular/core';
import { WeatherSideComponent } from './weather-side/weather-side.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [WeatherSideComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {}
