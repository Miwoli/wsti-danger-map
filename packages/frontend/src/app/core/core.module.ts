import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EventService } from './services/event.service'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthModule } from './auth/auth.module'
import { LocalStorageService } from './services/local-storage.service'
import { NominatimService } from './services/nominatim.service'
import { NominatimInterceptor } from './interceptors/nominatim.interceptor'

@NgModule({
  declarations: [],
  providers: [
    EventService,
    LocalStorageService,
    NominatimService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NominatimInterceptor,
      multi: true
    }
  ],
  imports: [HttpClientModule, CommonModule, AuthModule]
})
export class CoreModule {}
