import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-menu-item',
  imports: [
    RouterLink
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() title?: string;
  @Input() routerLink?: string;

  constructor(
    public translate: TranslateService,
  ) { }
}
