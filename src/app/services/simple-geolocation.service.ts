import { Injectable } from '@angular/core';
import { urlReplaceParams } from '@aw/core/utils/common-utils';
import { GeolocationCords } from '@aw/models/_index';

@Injectable({ providedIn: 'root' })
export class SimpleGeolocationService {
  private readonly urlOpenStreetMap = 'https://www.openstreetmap.org/#map=18/{latitude}/{longitude}';

  get isAvailable(): boolean {
    return Object.hasOwn(navigator, 'geolocation');
  }

  getCurrentPosition(): GeolocationCords | null {
    if (!this.isAvailable) {
      return null;
    }

    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude } as GeolocationCords;

      if (!coords.latitude || !coords.longitude) {
        return null;
      }

      return coords;
    });

    return null;
  }

  getOpenStreetMapLink(latitude: number, longitude: number): string {
    const url = urlReplaceParams(this.urlOpenStreetMap, { latitude: String(latitude), longitude: String(longitude) });

    return url;
  }
}
