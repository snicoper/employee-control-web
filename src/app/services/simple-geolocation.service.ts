import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SimpleGeolocationService {
  private isAvailable = signal(false);

  private readonly url = 'https://www.openstreetmap.org/#map=18/{latitude}/{longitude}';

  constructor() {
    Object.hasOwn(navigator, 'geolocation') ? this.isAvailable.set(true) : this.isAvailable.set(false);
  }

  openStreetMap(): void {}
}
