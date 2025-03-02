import { Component } from '@angular/core';
import { LanguageService } from '../../i18n/language.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'locale-switch',
  templateUrl: './locale-switch.component.html',
  styleUrl: './locale-switch.component.scss',
  imports: [
    NgForOf
  ],
})
export class LocaleSwitchComponent {
  constructor(public languageService: LanguageService) {}

  protected readonly LanguageService = LanguageService;
}
