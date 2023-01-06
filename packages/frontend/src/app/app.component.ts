import { Component } from '@angular/core'
@Component({
  selector: 'jugger-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isMenuOpened: boolean = false

  public onMenuClicked(): void {
    this.isMenuOpened = !this.isMenuOpened
  }
}
