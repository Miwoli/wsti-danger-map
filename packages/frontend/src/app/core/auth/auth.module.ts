import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthModalComponent } from './auth-modal/auth-modal.component'
import { AuthService } from './services/auth.service'
import { SharedModule } from 'src/app/shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './interceptors/auth.interceptor'
import { ResetPasswordComponent } from './reset-password/reset-password.component'

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  declarations: [AuthModalComponent, ResetPasswordComponent],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {}
