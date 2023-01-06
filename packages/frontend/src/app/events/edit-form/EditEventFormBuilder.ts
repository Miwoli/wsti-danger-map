import { FormControl, FormGroup, Validators } from '@angular/forms'
import moment from 'moment'
import { CreateEventForm } from 'src/app/core/models/CreateEventForm'
import { Event } from 'src/app/core/models/Event'

// FIXME: Should be merged with create-form
export const EditEventFormBuilder = {
  buildForm: (event: Event): FormGroup<CreateEventForm> => {
    return new FormGroup({
      Title: new FormControl(event.attributes.Title, {
        nonNullable: true,
        validators: Validators.required
      }),
      Description: new FormControl(event.attributes.Description, {
        nonNullable: true,
        validators: Validators.required
      }),
      Date: new FormControl(
        { value: moment(event.attributes.Date), disabled: true },
        { nonNullable: true, validators: Validators.required }
      ),
      Coordinates: new FormControl(
        { value: event.attributes.Coordinates, disabled: true },
        { nonNullable: true, validators: Validators.required }
      )
    })
  }
}
