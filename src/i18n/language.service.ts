import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  static defaultLang = 'en';
  static supportedLangs = ['cs', 'en'];
  static storageKey = 'app_language';

  constructor() {}

  get userLanguage(): string {
    const savedLang = localStorage.getItem(LanguageService.storageKey);
    if (savedLang && LanguageService.supportedLangs.includes(savedLang)) {
      return savedLang; // Jazyk z localStorage
    }

    const browserLang = navigator.language.split('-')[0];
    if (LanguageService.supportedLangs.includes(browserLang)) {
      return browserLang;
    }

    return LanguageService.defaultLang; // Výchozí jazyk
  }

  set userLanguage(lang: string) {
    if (LanguageService.supportedLangs.includes(lang)) {
      localStorage.setItem(LanguageService.storageKey, lang);
    }
  }
}
