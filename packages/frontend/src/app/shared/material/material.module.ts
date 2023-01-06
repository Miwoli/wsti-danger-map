import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatDividerModule } from '@angular/material/divider'
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatChipsModule } from '@angular/material/chips'
import {
  NgxMatDateFormats,
  NgxMatDatetimePickerModule,
  NGX_MAT_DATE_FORMATS
} from '@angular-material-components/datetime-picker'
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MAT_DATE_FORMATS } from '@angular/material/core'

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatChipsModule,
  MatDatepickerModule,
  MatMomentDateModule,
  NgxMatDatetimePickerModule,
  NgxMatMomentModule
]

const CUSTOM_DATETIME_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS'
  },
  display: {
    dateInput: 'D.MM.YYYY HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS'
  },
  display: {
    dateInput: 'D.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@NgModule({
  declarations: [],
  providers: [
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATETIME_FORMATS },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
  imports: [CommonModule, ...materialModules],
  exports: [...materialModules]
})
export class MaterialModule {}
