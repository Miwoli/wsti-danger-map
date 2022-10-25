import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OSM } from 'ol/source';
import { View, Map } from 'ol';
import TileLayer from 'ol/layer/Tile';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  public map!: Map;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        center: [2137892.5950993, 6824785.106882159], // Coords of somewhere in the center of Poland
        zoom: 6,
        maxZoom: 18,
      }),
    });
  }
}
