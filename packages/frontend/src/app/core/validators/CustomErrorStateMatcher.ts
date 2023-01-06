import { FormControl } from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core'

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    if (control && control.parent) {
      return control.parent.hasError('mismatch') && control.touched
    }

    return true
  }
}
