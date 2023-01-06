import { Component, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { DateRange, MatDateRangePicker } from '@angular/material/datepicker'
import { Moment } from 'moment'
import { FiltersForm } from 'src/app/core/models/FiltersForm'
import { FiltersFormBuilder } from './FiltersFormBuilder'
import {
  Filters,
  FiltersNames,
  SelectedDateRange
} from '../../core/models/Filters'
import { EventService } from 'src/app/core/services/event.service'

@Component({
  selector: 'jugger-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @ViewChild('picker') picker!: MatDateRangePicker<Moment>

  public form: FormGroup<FiltersForm> = FiltersFormBuilder.buildForm()

  public selectedDate: SelectedDateRange = {
    start: null,
    end: null
  }

  public activeFilters: Filters = {
    Title: null,
    Description: null,
    Location: null,
    Date: null
  }

  public filtersIcons = {
    Title: 'title',
    Description: 'subtitles',
    Location: 'pin_drop',
    Date: 'date_range'
  }

  constructor(private _eventService: EventService) {}

  public openPicker() {
    this.picker.open()
  }

  public clear() {
    this.form.reset()
    Object.keys(this.activeFilters).forEach(
      (key: string) => (this.activeFilters[key as FiltersNames] = null)
    )
  }

  public search() {
    Object.keys(this.form.controls).forEach((key: string) => {
      if (key === 'Date') {
        const start = this.form.get(key)?.get('start')?.value
        const end = this.form.get(key)?.get('end')?.value

        if (start || end) {
          this.activeFilters.Date = new DateRange<Moment>(start, end)
          this.selectedDate.start = start
          this.selectedDate.end = end
        } else {
          this.activeFilters.Date = null
        }
      } else {
        this.activeFilters[key as FiltersNames] = this.form.get(key)?.value
      }
    })

    this._eventService.fetchEvents(this.activeFilters)
  }

  public remove(key: FiltersNames) {
    this.activeFilters[key] = null
    this.form.get(key)?.setValue(null)
    this.search()
  }
}
