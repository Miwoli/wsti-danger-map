import { FormControl, FormGroup } from '@angular/forms'
import { FiltersForm } from 'src/app/core/models/FiltersForm'

export const FiltersFormBuilder = {
  buildForm: (): FormGroup<FiltersForm> => {
    return new FormGroup<FiltersForm>({
      Title: new FormControl(''),
      Description: new FormControl(''),
      Date: new FormGroup({
        start: new FormControl(),
        end: new FormControl()
      }),
      Location: new FormControl('')
    })
  }
}
