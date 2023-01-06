import { AfterViewInit, Component, OnInit } from '@angular/core'
import { View, Map, Feature, MapBrowserEvent } from 'ol'
import { Point } from 'ol/geom'
import { OSM } from 'ol/source'
import { easeOut } from 'ol/easing'
import Select, { SelectEvent } from 'ol/interaction/Select'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { EventService } from 'src/app/core/services/event.service'
import { Event, EventsListMode } from '../../core/models/Event'
import { defaultEvent, selectedCoordinates, selectedEvent } from './mapStyles'

@Component({
  selector: 'jugger-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  public map!: Map
  public status!: Pick<Event, 'attributes'>

  public pointsLayer!: VectorLayer<VectorSource>
  public newEventLayer!: VectorLayer<VectorSource>

  private _events: Feature[] = []
  private _eventsListMode!: EventsListMode
  private _select: Select = new Select({ style: selectedEvent })

  constructor(private _eventService: EventService) {}

  ngOnInit(): void {
    this._getEvents()
    this.pointsLayer = new VectorLayer({
      source: new VectorSource({
        features: this._events
      }),
      style: defaultEvent
    })
    this.newEventLayer = new VectorLayer({
      source: new VectorSource({}),
      style: selectedCoordinates
    })

    this._eventService.$eventsListMode.subscribe(mode => {
      this._eventsListMode = mode
      if (this._eventsListMode === 'list')
        this.newEventLayer.getSource()?.clear()
    })

    this._eventService.$selectedEvent.subscribe(event => {
      this._select.getFeatures().clear()
      if (event) {
        const foundEvent = this._events.find(e => e.get('id') === event.id)

        if (foundEvent) {
          this._moveToFeature(foundEvent)
        }
      }
    })
  }

  ngAfterViewInit(): void {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.pointsLayer,
        this.newEventLayer
      ],
      target: 'map',
      view: new View({
        center: [2137892.5950993, 6824785.106882159], // Coords of somewhere in the center of Poland
        zoom: 6,
        maxZoom: 18
      })
    })

    this.map.addInteraction(this._select)

    this.map.on('singleclick', event => {
      if (
        this._eventsListMode === 'edit' ||
        this._eventsListMode === 'create'
      ) {
        this._addTempFeature(event)
      }
    })

    this._select.on('select', (e: SelectEvent) => {
      if (e.selected.length !== 0) {
        this._eventService.selectEvent(e.selected[0].get('attributes'))
      } else {
        this._eventService.selectEvent(null)
      }
    })
  }

  private _getEvents(): void {
    this._eventService.$cachedEvents.subscribe(events => {
      this._events = events.map(
        event =>
          new Feature({
            geometry: new Point(event.attributes.Coordinates),
            id: event.id,
            attributes: event
          })
      )

      this.pointsLayer.getSource()?.clear()
      this.pointsLayer.getSource()?.addFeatures(this._events)
    })
  }

  private _addTempFeature(event: MapBrowserEvent<MouseEvent>): void {
    this._eventService.selectCoordinates(event.coordinate)
    this.newEventLayer.getSource()?.clear()

    const tempFeature = new Feature({
      geometry: new Point(event.coordinate),
      style: selectedCoordinates
    })

    this.newEventLayer.getSource()?.addFeature(tempFeature)
  }

  private _moveToFeature(feature: Feature): void {
    this._select.getFeatures().push(feature)

    const point = feature.getGeometry() as unknown as Point

    this.map.getView().animate({
      center: point.getCoordinates(),
      zoom: 8,
      easing: easeOut,
      duration: 1000
    })
  }
}
