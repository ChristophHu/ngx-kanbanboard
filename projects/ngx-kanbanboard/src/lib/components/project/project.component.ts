import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BackdrawerComponent } from '../../../../../ngx-drawer/src/lib/components/backdrawer/backdrawer.component';

@Component({
  selector: 'lib-project',
  imports: [
    RouterLink,
    RouterOutlet,
    BackdrawerComponent
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.sass'
})
export class ProjectComponent {

}
