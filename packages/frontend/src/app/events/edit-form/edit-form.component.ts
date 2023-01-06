import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CreateEventForm } from 'src/app/core/models/CreateEventForm'
import { EventService } from 'src/app/core/services/event.service'
import { NgxMatDatetimePicker } from '@angular-material-components/datetime-picker'
import { EditEventFormBuilder } from './EditEventFormBuilder'
import { Moment } from 'moment'
import { EventAttributes } from 'src/app/core/models/Event'

@Component({
  selector: 'jugger-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  //FIXME: Should be merged with create-form, will refactor it one day. (maybe)
  @ViewChild('picker') picker!: NgxMatDatetimePicker<Moment>

  public form!: FormGroup<CreateEventForm>
  private _id!: number

  constructor(private _eventService: EventService) {}

  ngOnInit(): void {
    this._eventService.$selectedEvent.subscribe(event => {
      if (event) {
        this.form = EditEventFormBuilder.buildForm(event)
        this._id = event.id
      }
    })

    this._eventService.$selectedLocation.subscribe(coords => {
      this.form.get('Coordinates')?.setValue(coords)
    })
  }

  public openPicker() {
    this.picker.open()
  }

  public saveEvent() {
    if (this.form.valid) {
      const payload: EventAttributes = {
        Title: this.form.controls.Title.value,
        Description: this.form.controls.Description.value,
        Date: this.form.controls.Date.value.toISOString(),
        Coordinates: this.form.controls.Coordinates.value
      }

      this._eventService.editEvent(this._id, payload).subscribe({
        next: () => {
          this._eventService.toggleEventsListMode('list')
        }
      })
    }
  }
}
