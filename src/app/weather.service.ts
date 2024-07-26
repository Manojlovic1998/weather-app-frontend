import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = environment.apiUrl;
  public realtimeWeatherData: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public forecastWeatherData: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getRealTimeWeather(location: string) {
    const storageData = this.storageService.getItem();

    if (
      storageData &&
      storageData.location.name.toLowerCase() === location.toLowerCase()
    ) {
      this.realtimeWeatherData.next(storageData);
      return;
    }
    const params = new HttpParams().set('location', location);

    this.http.get(`${this.apiUrl}/weather/realtime`, { params }).subscribe({
      next: (data) => {
        this.realtimeWeatherData.next(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  setRealTimeWeatherData(data: any) {
    this.realtimeWeatherData = data;
  }

  getForecastWeather(location: string, days: number) {
    const params = new HttpParams().set('location', location).set('days', days);

    this.http.get(`${this.apiUrl}/weather/forecast`, { params }).subscribe({
      next: (data) => {
        this.forecastWeatherData.next(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  setForecastWeatherData(data: any) {
    this.forecastWeatherData = data;
  }
}
