import { Component } from '@angular/core';
import { LanguageService } from '../../i18n/language.service';
import {NgForOf, NgIf, NgOptimizedImage, NgSwitch, NgSwitchCase} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'locale-switch',
  templateUrl: './locale-switch.component.html',
  styleUrl: './locale-switch.component.scss',
  imports: [
    NgForOf,
    RouterLink,
    NgOptimizedImage,
    NgIf,
    NgSwitch,
    NgSwitchCase
  ],
})
export class LocaleSwitchComponent {
  constructor(
    public languageService: LanguageService,
    public translate: TranslateService,
    public router: Router,
  ) {}

  protected readonly LanguageService = LanguageService;
}
