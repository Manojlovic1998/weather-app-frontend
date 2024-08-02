import { Component, OnInit } from '@angular/core';
import { RealtimeWeatherData } from '../../../common/dtos/realtimeWeatherData.dto';
import { WeatherService } from '../services/weather.service';
import { ForecastWeatherData } from '../../../common/dtos/forecastWeatherData.dto';
import { StorageService } from '../../shared/services/storage.service';
import { CommonModule } from '@angular/common';
import { ModalTogglerBtnComponent } from '../../modal/modal-toggler-btn/modal-toggler-btn.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [CommonModule, ModalTogglerBtnComponent, ModalComponent],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.scss',
})
export class WeatherDetailsComponent implements OnInit {
  realTimeWeatherData: RealtimeWeatherData | null = null;
  forecastWeatherData: ForecastWeatherData | null = null;
  showFormModal: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
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
      this.storageService.setItem(data);
    });
  }

  toggleModal(event: boolean) {
    this.showFormModal = event;
  }
}
