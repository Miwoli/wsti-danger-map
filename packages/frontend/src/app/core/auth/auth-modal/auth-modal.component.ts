import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AuthModalData } from '../models/ModalData'
import { AuthFormBuilder } from '../helpers/AuthFormBuilder'
import { CustomErrorStateMatcher } from '../../validators/CustomErrorStateMatcher'
import { AuthService } from '../services/auth.service'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'jugger-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
  customErrorStateMatcher = new CustomErrorStateMatcher()
  formError!: string
  isForgotPassword!: boolean

  constructor(
    public dialogRef: MatDialogRef<AuthModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthModalData,
    private _authService: AuthService
  ) {}

  public toggleRegister() {
    this.data.isRegister = !this.data.isRegister
    this.data.isRegister
      ? AuthFormBuilder.addRegisterFields(this.data.form)
      : AuthFormBuilder.removeRegisterFields(this.data.form)
  }

  public handleSubmit() {
    if (this.data.form.valid) {
      this.isForgotPassword
        ? this._forgetPassword()
        : this.data.isRegister
        ? this._register()
        : this._login()
    }
  }

  public toggleForgotPass() {
    this.isForgotPassword = !this.isForgotPassword
    this.isForgotPassword
      ? AuthFormBuilder.removePasswordField(this.data.form)
      : AuthFormBuilder.addPasswordField(this.data.form)
  }

  private _forgetPassword() {
    this._authService
      .forgetPassword(this.data.form.controls.email.value)
      .subscribe({
        next: () => this.dialogRef.close(),
        error: (err: HttpErrorResponse) =>
          (this.formError = err.error.error.message)
      })
  }

  private _register() {
    if (this.data.form.controls.username && this.data.form.controls.password) {
      this._authService
        .register(
          this.data.form.controls.email.value,
          this.data.form.controls.username.value,
          this.data.form.controls.password.value
        )
        .subscribe({
          next: () => this.dialogRef.close(),
          error: (err: HttpErrorResponse) =>
            (this.formError = err.error.error.message)
        })
    }
  }

  private _login() {
    if (this.data.form.controls.password) {
      this._authService
        .login(
          this.data.form.controls.email.value,
          this.data.form.controls.password.value
        )
        .subscribe({
          next: () => this.dialogRef.close(),
          error: (err: HttpErrorResponse) =>
            (this.formError = err.error.error.message)
        })
    }
  }
}
