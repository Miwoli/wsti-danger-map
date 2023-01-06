import { Component, EventEmitter, Output, OnInit } from '@angular/core'
import { AuthService } from 'src/app/core/auth/services/auth.service'
import { EventsListMode } from 'src/app/core/models/Event'
import { EventService } from 'src/app/core/services/event.service'
import packageJson from '../../../../package.json'

@Component({
  selector: 'jugger-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() menuClicked = new EventEmitter<void>()

  public version: string = packageJson.version
  public isLoggedIn: boolean = false
  public eventsListMode!: EventsListMode

  constructor(
    private _authService: AuthService,
    private _eventService: EventService
  ) {}

  public ngOnInit(): void {
    this._authService.$isLoggedIn.subscribe(
      isLoggedIn => (this.isLoggedIn = isLoggedIn)
    )

    this._eventService.$eventsListMode.subscribe(
      mode => (this.eventsListMode = mode)
    )
  }

  public handleMenuClick(): void {
    this.menuClicked.emit()
  }

  public handleLogin(): void {
    this._authService.handleLoginProcess()
    this._eventService.toggleEventsListMode('list')
  }

  public toggleEditMode(): void {
    this._eventService.toggleEventsListMode(
      this.eventsListMode === 'list' ? 'create' : 'list'
    )
  }
}
