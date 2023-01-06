import { Injectable } from '@angular/core'

@Injectable()
export class LocalStorageService {
  constructor() {}

  public getItem(key: string): string | null {
    return window.localStorage.getItem(key)
  }

  public setItem(key: string, value: string): void {
    return window.localStorage.setItem(key, value)
  }

  public removeItem(key: string): void {
    return window.localStorage.removeItem(key)
  }
}
