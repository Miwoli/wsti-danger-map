import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { BehaviorSubject, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { LocalStorageService } from '../../services/local-storage.service'
import { AuthModalComponent } from '../auth-modal/auth-modal.component'
import { AuthResponse } from '../models/Auth'
import { AuthModalData } from '../models/ModalData'
import { AuthFormBuilder } from '../helpers/AuthFormBuilder'

@Injectable()
export class AuthService {
  constructor(
    public modal: MatDialog,
    public localStorage: LocalStorageService,
    public httpClient: HttpClient
  ) {}

  private _url = `${environment.apiUrl}/auth`

  private _modalData: AuthModalData = {
    form: AuthFormBuilder.buildForm(),
    isRegister: false
  }

  private _isLoggedIn = new BehaviorSubject(this.checkIfLoggedIn())
  public $isLoggedIn = this._isLoggedIn.asObservable()

  public handleLoginProcess() {
    this.checkIfLoggedIn() ? this._logout() : this._openAuthModal()
  }

  public checkIfLoggedIn(): boolean {
    return !!this.localStorage.getItem('token')
  }

  public getToken(): string | null {
    return this.localStorage.getItem('token')
  }

  public getUsername(): string | null {
    return this.localStorage.getItem('username')
  }

  private _openAuthModal(): void {
    const modalRef = this.modal.open(AuthModalComponent, {
      width: '400px',
      data: this._modalData
    })

    modalRef.afterClosed().subscribe(() => {
      this._modalData.form.reset()
    })
  }

  public register(
    email: string,
    username: string,
    password: string
  ): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this._url}/local/register`, {
        email,
        username,
        password
      })
      .pipe(
        tap(res => {
          this.localStorage.setItem('token', res.jwt)
          this.localStorage.setItem('username', res.user.username)
          this._isLoggedIn.next(true)
        })
      )
  }

  public login(identifier: string, password: string): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this._url}/local`, {
        identifier,
        password
      })
      .pipe(
        tap(res => {
          this.localStorage.setItem('token', res.jwt)
          this.localStorage.setItem('username', res.user.username)
          this._isLoggedIn.next(true)
        })
      )
  }

  public forgetPassword(email: string): Observable<void> {
    return this.httpClient.post<void>(`${this._url}/forget-password`, {
      email
    })
  }

  public resetPassword(
    code: string,
    password: string,
    passwordConfirmation: string
  ): Observable<void> {
    return this.httpClient.post<void>(`${this._url}/reset-password`, {
      code,
      password,
      passwordConfirmation
    })
  }

  private _logout(): void {
    this.localStorage.removeItem('token')
    this.localStorage.removeItem('username')
    this._isLoggedIn.next(false)
  }
}
