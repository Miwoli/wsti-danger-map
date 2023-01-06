import { Component, OnInit } from '@angular/core'
import { EventsListMode } from '../core/models/Event'
import { EventService } from '../core/services/event.service'

@Component({
  selector: 'jugger-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  constructor(private _eventService: EventService) {}

  public eventsListMode!: EventsListMode

  ngOnInit(): void {
    this._eventService.$eventsListMode.subscribe(
      mode => (this.eventsListMode = mode)
    )
  }
}
