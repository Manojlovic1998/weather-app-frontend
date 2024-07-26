import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storageKey = 'weather';

  constructor() {}

  setItem(data: any, expiryMinutes: number) {
    const expiryTime = new Date().getTime() + expiryMinutes * 60 * 1000;

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
