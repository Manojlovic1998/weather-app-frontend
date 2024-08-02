import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { LocationService } from '../../shared/services/location.service';
import { RealtimeWeatherData } from '../../../common/dtos/realtimeWeatherData.dto';

@Component({
  selector: 'app-weather-side',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-side.component.html',
  styleUrl: './weather-side.component.scss',
})
export class WeatherSideComponent implements OnInit {
  currentDay: Date = new Date();
  location: string = 'New York';
  realTimeWeatherData: RealtimeWeatherData | null = null;

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.locationService.getLocation();

    this.locationService.city.subscribe((city) => {
      if (city === null) {
        return;
      }
      this.location = city;
      this.weatherService.getRealTimeWeather(this.location);
      this.weatherService.getForecastWeather(this.location, 3);
    });

    this.weatherService.realtimeWeatherData.subscribe((data) => {
      if (data === null) {
        return;
      }
      this.realTimeWeatherData = data;
    });

    this.weatherService.forecastWeatherData.subscribe((data) => {
      if (data === null) {
        return;
      }
      console.log(data);
    });
  }
}
