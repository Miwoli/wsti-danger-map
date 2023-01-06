import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MapComponent } from './events/map/map.component'
import { EventsComponent } from './events/events.component'
import { ListComponent } from './events/list/list.component'
import { NavComponent } from './overlay/nav/nav.component'
import { FooterComponent } from './overlay/footer/footer.component'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SidenavComponent } from './overlay/sidenav/sidenav.component'
import { CreateFormComponent } from './events/create-form/create-form.component'
import { ReactiveFormsModule } from '@angular/forms';
import { EditFormComponent } from './events/edit-form/edit-form.component';
import { FiltersComponent } from './events/filters/filters.component'

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    EventsComponent,
    ListComponent,
    NavComponent,
    FooterComponent,
    SidenavComponent,
    CreateFormComponent,
    EditFormComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
