import { FormControl } from '@angular/forms'
import { Moment } from 'moment'

export interface CreateEventForm {
  Title: FormControl<string>
  Description: FormControl<string>
  Date: FormControl<Moment>
  Coordinates: FormControl<number[]>
}
