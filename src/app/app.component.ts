import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalTogglerBtnComponent } from './modal/modal-toggler-btn/modal-toggler-btn.component';
import { ModalComponent } from './modal/modal.component';
import { WeatherComponent } from './weather/weather.component';

interface forecastWeatherData {}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ModalTogglerBtnComponent,
    ModalComponent,
    WeatherComponent,
  ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
