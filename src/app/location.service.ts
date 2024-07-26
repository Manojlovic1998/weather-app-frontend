import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  public lat: number = 0;
  public lng: number = 0;
  public city: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private storageService: StorageService) {}

  getLocation() {
    if (this.storageService.getItem() !== null) {
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.getCity();
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  getCity() {
    fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${this.lat}&longitude=${this.lng}&localityLanguage=en`
    )
      .then((response) => response.json())
      .then((data) => {
        this.city.next(data.city);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
