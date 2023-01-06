import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { CreateEventForm } from 'src/app/core/models/CreateEventForm'
import { AngularEditorConfig } from '@kolkov/angular-editor'
import { Moment } from 'moment'
import { NgxMatDatetimePicker } from '@angular-material-components/datetime-picker'
import { CreateEventFormBuilder } from './CreateEventFormBuilder'
import { EventService } from 'src/app/core/services/event.service'
import { EventAttributes } from 'src/app/core/models/Event'

@Component({
  selector: 'jugger-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  @ViewChild('picker') picker!: NgxMatDatetimePicker<Moment>

  public form: FormGroup<CreateEventForm> = CreateEventFormBuilder.buildForm()

  constructor(private _eventService: EventService) {}

  ngOnInit() {
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

      this._eventService.createEvent(payload).subscribe({
        next: () => {
          this._eventService.toggleEventsListMode('list')
        }
      })
    }
  }
}
