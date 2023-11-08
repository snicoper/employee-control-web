import { Injectable } from '@angular/core';
import { urlReplaceParams } from '@aw/core/utils/common-utils';
import { GeolocationCords } from '@aw/models/_index';

@Injectable({ providedIn: 'root' })
export class SimpleGeolocationService {
  private readonly urlOpenStreetMap = 'https://www.openstreetmap.org/#map=18/{latitude}/{longitude}';

  get isAvailable(): boolean {
    return Object.hasOwn(navigator, 'geolocation');
  }

  getCurrentPosition(): GeolocationCords {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude } as GeolocationCords;

      return coords;
    });

    return {} as GeolocationCords;
  }

  getOpenStreetMapLink(latitude: number, longitude: number): string {
    const url = urlReplaceParams(this.urlOpenStreetMap, { latitude: String(latitude), longitude: String(longitude) });

    return url;
  }
}
