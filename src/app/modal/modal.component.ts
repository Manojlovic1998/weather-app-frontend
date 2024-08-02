import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StorageService } from '../shared/services/storage.service';
import { WeatherService } from '../weather/services/weather.service';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapSearch } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIconComponent],
  providers: [provideIcons({ bootstrapSearch })],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  public location: string = '';
  @Input() show: boolean = false;
  @Output() hideModal = new EventEmitter<boolean>();

  constructor(
    private storageService: StorageService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    const { location } = this.storageService.getItem();
    if (location) {
      this.location = location;
    }
  }

  onHideModal() {
    this.hideModal.emit(false);
  }

  onSubmit(form: NgForm) {
    const { location } = form.value;
    console.log(location);
    if (location) {
      this.location = location;
      this.weatherService.getRealTimeWeather(location);
      this.weatherService.getForecastWeather(this.location, 3);
    }
  }
}
