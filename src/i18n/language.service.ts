import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  static readonly supportedLangs = ['en', 'cs'];
  static readonly defaultLang = 'en';
  private static readonly storageKey = 'lang';

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {}

  get userLanguage(): string {
    const savedLang = localStorage?.getItem(LanguageService.storageKey);
    if (savedLang && LanguageService.supportedLangs.includes(savedLang)) {
      return savedLang; // Jazyk z localStorage
    }

    const browserLang = navigator.language.split('-')[0];
    if (LanguageService.supportedLangs.includes(browserLang)) {
      return browserLang;
    }

    return LanguageService.defaultLang;
  }

  set userLanguage(lang: string) {
    if (LanguageService.supportedLangs.includes(lang)) {
      localStorage.setItem(LanguageService.storageKey, lang);
    }
  }

  switchLanguage(lang: string) {
    console.log('Switching language to:', lang);
    if (LanguageService.supportedLangs.includes(lang)) {
      this.translate.use(lang);
      if (localStorage) {
        localStorage.setItem(LanguageService.storageKey, lang);
      }
      const currentUrl = this.router.url.replace(/^\/(cs|en)/, '');
      this.router.navigate([`/${lang}${currentUrl}`]);
    }
  }
}
