import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, map, tap, ReplaySubject, switchMap } from 'rxjs'
import {
  Event,
  EventAttributes,
  EventsListMode,
  EventResponse,
  EventsList
} from '../models/Event'
import { environment } from 'src/environments/environment'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { Filters } from '../models/Filters'
import moment from 'moment'
import { NominatimService } from './nominatim.service'
import { containsCoordinate } from 'ol/extent'
import { transformExtent } from 'ol/proj'
import { SearchResult } from '../models/SearchResult'

@Injectable()
export class EventService {
  apiUrl = environment.apiUrl

  constructor(
    private _httpClient: HttpClient,
    private nominatimService: NominatimService
  ) {}

  private _$cachedEvents = new ReplaySubject<Event[]>()
  public $cachedEvents: Observable<Event[]> = this._$cachedEvents.asObservable()

  private _eventsListMode = new BehaviorSubject<EventsListMode>('list')
  public $eventsListMode = this._eventsListMode.asObservable()

  private _selectedLocation = new ReplaySubject<number[]>()
  public $selectedLocation = this._selectedLocation.asObservable()

  private _selectedEvent = new BehaviorSubject<Event | null>(null)
  public $selectedEvent = this._selectedEvent.asObservable()

  private _events!: Event[]
  private _$events = new BehaviorSubject(this._events)
  public $events = this._$events.asObservable()

  public fetchEvents(query?: Filters): void {
    let params: HttpParams

    if (query?.Location) {
      this.nominatimService
        .search(query.Location)
        .pipe(
          map(result => this._buildParams(query, result)),
          switchMap(result => this._fetch(result.params))
        )
        .subscribe()
    } else {
      params = new HttpParams({
        fromObject: {
          Title: query?.Title ?? '',
          Description: query?.Description ?? '',
          DateFrom: query?.Date ? moment(query?.Date?.start).toISOString() : '',
          DateTo: query?.Date ? moment(query?.Date?.end).toISOString() : ''
        }
      })

      this._fetch(params).subscribe()
    }
  }

  public getEvent(id: number): Observable<Event> {
    return this._httpClient.get<Event>(`${this.apiUrl}/event/${id}`)
  }

  public createEvent(eventAttrs: EventAttributes): Observable<Event> {
    return this._httpClient
      .post<EventResponse>(`${this.apiUrl}/events`, { data: { ...eventAttrs } })
      .pipe(map(res => res.data))
  }

  public editEvent(id: number, eventAttrs: EventAttributes): Observable<Event> {
    return this._httpClient
      .put<EventResponse>(`${this.apiUrl}/events/${id}`, {
        data: { ...eventAttrs }
      })
      .pipe(map(res => res.data))
  }

  public removeEvent(id: number): Observable<void> {
    return this._httpClient
      .delete<void>(`${this.apiUrl}/events/${id}`)
      .pipe(tap(() => {}))
  }

  public toggleEventsListMode(val: EventsListMode): void {
    this._eventsListMode.next(val)
  }

  public selectCoordinates(coords: number[]): void {
    this._selectedLocation.next(coords)
  }

  public selectEvent(event: Event | null): void {
    this._selectedEvent.next(event)
  }

  private _fetch(params: HttpParams): Observable<Event[]> {
    return this._httpClient
      .get<EventsList>(`${this.apiUrl}/events`, { params })
      .pipe(
        map(response => response.data),
        map(events => this._filterByParamsCoordinates(events, params)),
        tap(data => this._$cachedEvents.next(data))
      )
  }

  private _buildParams(query: Filters, result: SearchResult[]) {
    return {
      params: new HttpParams({
        fromObject: {
          Title: query?.Title ?? '',
          Description: query?.Description ?? '',
          Coordinates: result[0].boundingbox.join(',') ?? '',
          DateFrom: query?.Date ? moment(query?.Date?.start).toISOString() : '',
          DateTo: query?.Date ? moment(query?.Date?.end).toISOString() : ''
        }
      }),
      bbox: result[0].boundingbox ?? ''
    }
  }

  private _filterByParamsCoordinates(
    events: Event[],
    params: HttpParams
  ): Event[] {
    return events.filter(event => {
      if (params.get('Coordinates')) {
        const bbox = params
          .get('Coordinates')
          ?.split(',')
          .map(coord => Number(coord))

        let transformedBbox = [0]

        if (bbox) {
          transformedBbox = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857')
        }

        return containsCoordinate(transformedBbox, event.attributes.Coordinates)
      }
      return true
    })
  }
}
