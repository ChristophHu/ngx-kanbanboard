import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'backdrawer',
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './backdrawer.component.html',
  styleUrl: './backdrawer.component.sass'
})
export class BackdrawerComponent {
  open: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    if (!this.open) {
      this.open = true
      // this.matDrawer.open()
    } else {
      this.open = false
      // this.matDrawer.close()
    }
  }
}
