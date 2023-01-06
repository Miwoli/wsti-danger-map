import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable()
export class NominatimInterceptor implements HttpInterceptor {
  nominatim = environment.nominatim

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes(this.nominatim)) {
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    return next.handle(request)
  }
}
