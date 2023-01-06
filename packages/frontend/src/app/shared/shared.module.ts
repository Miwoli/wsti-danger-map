import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaterialModule } from './material/material.module';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component'

@NgModule({
  declarations: [
    ConfirmModalComponent
  ],
  providers: [],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule]
})
export class SharedModule {}
