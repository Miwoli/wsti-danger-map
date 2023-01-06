import { FormGroup } from '@angular/forms'
import { AuthForm } from './AuthForm'

export interface AuthModalData {
  form: FormGroup<AuthForm>
  isRegister: boolean
}
