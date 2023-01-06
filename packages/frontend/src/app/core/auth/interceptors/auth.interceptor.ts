import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { environment } from 'src/environments/environment'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  apiUrl = environment.apiUrl

  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this._authService.checkIfLoggedIn() &&
      request.url.includes(this.apiUrl)
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this._authService.getToken()}`
        }
      })
    }
    return next.handle(request)
  }
}
