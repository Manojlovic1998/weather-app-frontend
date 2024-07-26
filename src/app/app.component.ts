import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';
import { CommonModule } from '@angular/common';
import { LocationService } from './location.service';
import { RealtimeWeatherData } from '../common/dtos/realtimeWeatherData.dto';
import { ForecastWeatherData } from '../common/dtos/forecastWeatherData.dto';
import { StorageService } from './storage.service';

interface forecastWeatherData {}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  realTimeWeatherData: RealtimeWeatherData = {
    location: {
      name: '',
      region: '',
      country: '',
      lat: 0,
      lon: 0,
      tz_id: '',
      localtime_epoch: 0,
      localtime: '',
    },
    current: {
      last_updated_epoch: 0,
      last_updated: '',
      temp_c: 0,
      is_day: 0,
      condition: {
        text: '',
        icon: '',
        code: 0,
      },
      wind_kph: 0,
      wind_degree: 0,
      wind_dir: '',
      pressure_mb: 0,
      pressure_in: 0,
      humidity: 0,
      cloud: 0,
      feelslike_c: 0,
      feelslike_f: 0,
      heatindex_c: 0,
      heatindex_f: 0,
      uv: 0,
    },
  };

  forecastWeatherData: ForecastWeatherData = {
    location: {
      name: '',
      region: '',
      country: '',
      lat: 0,
      lon: 0,
      tz_id: '',
      localtime_epoch: 0,
      localtime: '',
    },
    current: {
      last_updated_epoch: 0,
      last_updated: '',
      temp_c: 0,
      is_day: 0,
      condition: {
        text: '',
        icon: '',
        code: 0,
      },
      wind_kph: 0,
      wind_degree: 0,
      wind_dir: '',
      pressure_mb: 0,
      pressure_in: 0,
      humidity: 0,
      cloud: 0,
      feelslike_c: 0,
      feelslike_f: 0,
      heatindex_c: 0,
      heatindex_f: 0,
      uv: 0,
    },
    forecast: {
      forecastday: [
        {
          date: new Date().toISOString(),
          date_epoch: 0,
          day: {
            maxtemp_c: 0,
            maxtemp_f: 0,
            mintemp_c: 0,
            mintemp_f: 0,
            avgtemp_c: 0,
            avgtemp_f: 0,
            maxwind_mph: 0,
            maxwind_kph: 0,
            totalprecip_mm: 0,
            totalprecip_in: 0,
            totalsnow_cm: 0,
            avgvis_km: 0,
            avgvis_miles: 0,
            avghumidity: 0,
            daily_will_it_rain: 0,
            daily_chance_of_rain: 0,
            daily_will_it_snow: 0,
            daily_chance_of_snow: 0,
            condition: {
              text: '',
              icon: '',
              code: 0,
            },
            uv: 0,
          },
          hour: [
            {
              time_epoch: 0,
              time: '',
              temp_c: 0,
              temp_f: 0,
              is_day: 0,
              condition: {
                text: '',
                icon: '',
                code: 0,
              },
              wind_mph: 0,
              wind_kph: 0,
              wind_degree: 0,
              wind_dir: '',
              pressure_mb: 0,
              pressure_in: 0,
              precip_mm: 0,
              precip_in: 0,
              snow_cm: 0,
              humidity: 0,
              cloud: 0,
              feelslike_c: 0,
              feelslike_f: 0,
              windchill_c: 0,
              windchill_f: 0,
              heatindex_c: 0,
              heatindex_f: 0,
              dewpoint_c: 0,
              dewpoint_f: 0,
              will_it_rain: 0,
              chance_of_rain: 0,
              will_it_snow: 0,
              chance_of_snow: 0,
              vis_km: 0,
              vis_miles: 0,
              gust_mph: 0,
              gust_kph: 0,
              uv: 0,
              short_rad: 0,
              diff_rad: 0,
            },
          ],
        },
      ],
    },
  };
  location: string = 'New York';
  currentDay: Date = new Date();

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.locationService.getLocation();

    this.locationService.city.subscribe((city) => {
      if (city === null) {
        return;
      }
      this.location = city;
      this.fetchRealTimeWeather(this.location);
      this.fetchForecastWeather(this.location, 3);
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
      this.forecastWeatherData = data;
      const expiryDate = new Date(data.current.last_updated_epoch * 1000);
      this.storageService.setItem(data, expiryDate.getMinutes());
    });
  }

  fetchRealTimeWeather(location: string) {
    this.weatherService.getRealTimeWeather(location);
  }

  fetchForecastWeather(location: string, days: number) {
    this.weatherService.getForecastWeather(location, days);
  }
}
