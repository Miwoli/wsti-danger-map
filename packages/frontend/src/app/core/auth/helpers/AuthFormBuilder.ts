import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CustomValidators } from '../../validators/customValidator'
import { AuthForm } from '../models/AuthForm'

export const AuthFormBuilder = {
  buildForm: (): FormGroup<AuthForm> => {
    return new FormGroup<AuthForm>({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    })
  },

  addRegisterFields: (form: FormGroup<AuthForm>): void => {
    form.addControl(
      'username',
      new FormControl('', {
        nonNullable: true,
        validators: Validators.required
      })
    )

    form.addControl(
      'confirmPassword',
      new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)]
      })
    )

    form.controls.password?.addValidators(Validators.minLength(6))
    form.addValidators(CustomValidators.match('password', 'confirmPassword'))
  },

  removeRegisterFields: (form: FormGroup<AuthForm>): void => {
    form.removeControl('username')
    form.removeControl('confirmPassword')
    form.controls.password?.removeValidators(Validators.minLength(6))
    form.removeValidators(CustomValidators.match('password', 'confirmPassword'))
  },

  removePasswordField: (form: FormGroup<AuthForm>): void => {
    form.removeControl('password')
    form.removeValidators(CustomValidators.match('password', 'confirmPassword'))
  },

  addPasswordField: (form: FormGroup<AuthForm>): void => {
    form.addControl(
      'password',
      new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)]
      })
    )
    form.addValidators(CustomValidators.match('password', 'confirmPassword'))
  }
}
