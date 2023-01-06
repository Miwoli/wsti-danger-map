import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PrivacyPolicyComponent } from './privacy-policy.component'
import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module'
import { MaterialModule } from '../shared/material/material.module'

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [CommonModule, PrivacyPolicyRoutingModule, MaterialModule]
})
export class PrivacyPolicyModule {}
