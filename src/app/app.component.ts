import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wsti-seo';
  opened!: boolean;

  onClick(event: boolean) {
    this.opened = event;
  }
}
