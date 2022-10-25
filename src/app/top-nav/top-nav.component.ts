import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  @Output() clicked: EventEmitter<boolean> = new EventEmitter();
  opened: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  handleClick(): void {
    this.opened = !this.opened;
    this.clicked.emit(this.opened);
  }
}
