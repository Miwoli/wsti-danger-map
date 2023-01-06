import Style from 'ol/style/Style'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'

export const defaultEvent = new Style({
  image: new Circle({
    fill: new Fill({
      color: '#ffcdbd' // $mat-primary.lighter
    }),
    stroke: new Stroke({
      color: '#ff5722' // $mat-primary.main
    }),
    radius: 8
  })
})

export const selectedEvent = new Style({
  image: new Circle({
    fill: new Fill({
      color: '#3eba82' // $mat-accent.main
    }),
    stroke: new Stroke({
      color: '#c5eada' // $mat-accent.lighter
    }),
    radius: 8
  })
})

export const selectedCoordinates = new Style({
  image: new Circle({
    fill: new Fill({
      color: '#ff0000' // $mat-warn.main
    }),
    stroke: new Stroke({
      color: '#ffb3b3' // $mat-warn.darker
    }),
    radius: 8
  })
})
