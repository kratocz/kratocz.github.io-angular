import { Component } from '@angular/core';
import { LanguageService } from '../../i18n/language.service';
import {NgForOf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'locale-switch',
  templateUrl: './locale-switch.component.html',
  styleUrl: './locale-switch.component.scss',
  imports: [
    NgForOf,
    RouterLink
  ],
})
export class LocaleSwitchComponent {
  constructor(
    public languageService: LanguageService,
    public router: Router,
              ) {}

  protected readonly LanguageService = LanguageService;
}
