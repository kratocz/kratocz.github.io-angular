import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-menu-item',
  imports: [
    RouterLink
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  constructor(
    @Input() title: string,
    @Input() menuLink: string,
  ) {
  }
}
