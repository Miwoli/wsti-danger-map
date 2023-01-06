import { FormControl } from '@angular/forms'

export interface AuthForm {
  username?: FormControl<string>
  email: FormControl<string>
  password?: FormControl<string>
  confirmPassword?: FormControl<string>
}

export interface ResetPasswordForm {
  newPassword: FormControl<string>
  confirmNewPassword: FormControl<string>
}
