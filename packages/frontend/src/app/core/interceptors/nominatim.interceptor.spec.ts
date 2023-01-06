import { TestBed } from '@angular/core/testing';

import { NominatimInterceptor } from './nominatim.interceptor';

describe('NominatimInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NominatimInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: NominatimInterceptor = TestBed.inject(NominatimInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
