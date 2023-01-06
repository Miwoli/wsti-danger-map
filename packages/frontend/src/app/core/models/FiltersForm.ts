import { FormControl, FormGroup } from '@angular/forms'
import { Moment } from 'moment'

export interface FiltersForm {
  Title?: FormControl<string | null>
  Description?: FormControl<string | null>
  Date?: FormGroup<FiltersDateRange>
  Location?: FormControl<string | null>
}

export interface FiltersDateRange {
  start: FormControl<Moment | null>
  end: FormControl<Moment | null>
}
