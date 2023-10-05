import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '@core/types/local-storage-keys';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  set(key: LocalStorageKeys, value: string): void {
    localStorage.setItem(key, value);
  }

  get(key: LocalStorageKeys): string {
    return localStorage.getItem(key) as string;
  }

  setStringify<T>(key: LocalStorageKeys, values: T): string {
    const value = JSON.stringify(values);
    this.set(key, value);

    return value;
  }

  getParse<T>(key: LocalStorageKeys): T {
    const value = this.get(key);
    const valueParse = JSON.parse(value) as T;

    return valueParse;
  }

  remove(key: LocalStorageKeys): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  exists(key: LocalStorageKeys): boolean {
    return !!this.get(key);
  }
}
