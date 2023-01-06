import { DateRange } from '@angular/material/datepicker'
import { Moment } from 'moment'

export interface Filters {
  Title: string | null
  Description: string | null
  Date: DateRange<Moment> | null
  Location: string | null
}

export type FiltersNames = 'Title' | 'Description' | 'Location' | 'Date'

export interface SelectedDateRange {
  start: Moment | null
  end: Moment | null
}
