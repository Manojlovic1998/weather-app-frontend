import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

import { StorageService } from './storage.service';
import { WeatherService } from './weather.service';
import { LocationService } from './location.service';

export const weatherResolver: ResolveFn<any> = (route, state) => {
  const storageService = inject(StorageService);
  const weatherService = inject(WeatherService);

  const data = storageService.getItem();
  if (data) {
    weatherService.realtimeWeatherData.next(data);
    weatherService.forecastWeatherData.next(data);
  }
};
