import { FormControl, FormGroup, Validators } from '@angular/forms'
import moment from 'moment'
import { CreateEventForm } from 'src/app/core/models/CreateEventForm'

export const CreateEventFormBuilder = {
  buildForm: (): FormGroup<CreateEventForm> => {
    return new FormGroup({
      Title: new FormControl('', {
        nonNullable: true,
        validators: Validators.required
      }),
      Description: new FormControl('', {
        nonNullable: true,
        validators: Validators.required
      }),
      Date: new FormControl(
        { value: moment(), disabled: true },
        {
          nonNullable: true,
          validators: Validators.required
        }
      ),
      Coordinates: new FormControl(
        { value: [0, 0], disabled: true },
        { nonNullable: true, validators: Validators.required }
      )
    })
  }
}
