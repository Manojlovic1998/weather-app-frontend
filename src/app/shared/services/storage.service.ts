import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storageKey = 'weather';

  constructor() {}

  setItem(data: any) {
    // Expiry time should be midnight of the same day

    const expiryTime = new Date().setHours(24, 0, 0, 0);

    const dataToStore = {
      data,
      expiryTime,
    };

    localStorage.setItem(this.storageKey, JSON.stringify(dataToStore));
  }

  getItem() {
    const storedData = localStorage.getItem(this.storageKey);

    if (!storedData) {
      return null;
    }

    try {
      const { data, expiryTime } = JSON.parse(storedData);
      if (new Date().getTime() < expiryTime) {
        return data;
      } else {
        this.removeItem();
      }
    } catch (e) {
      console.error('Error parsing stored data:', e);
    }

    return null;
  }

  removeItem() {
    localStorage.removeItem(this.storageKey);
  }
}
