import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { CustomErrorStateMatcher } from '../../validators/CustomErrorStateMatcher'
import { CustomValidators } from '../../validators/customValidator'
import { ResetPasswordForm } from '../models/AuthForm'
import { AuthService } from '../services/auth.service'

@Component({
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  customErrorStateMatcher = new CustomErrorStateMatcher()

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _snackbar: MatSnackBar,
    private _authService: AuthService
  ) {}

  private _code!: string
  public form: FormGroup<ResetPasswordForm> = new FormGroup(
    {
      newPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmNewPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)]
      })
    },
    {
      validators: [CustomValidators.match('newPassword', 'confirmNewPassword')]
    }
  )

  ngOnInit(): void {
    this._getTokenFromURL()
  }

  public submit(): void {
    if (this.form.valid) {
      this._authService
        .resetPassword(
          this._code,
          this.form.controls.newPassword.value,
          this.form.controls.confirmNewPassword.value
        )
        .subscribe({
          next: () => {
            this._snackbar.open('New password succesfully set')
            this._router.navigate([''])
          }
        })
    }
  }

  private _getTokenFromURL() {
    return this._activatedRoute.params.subscribe(params => {
      this._code = params['token']
    })
  }
}
