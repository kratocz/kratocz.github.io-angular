import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <h1>{{ 'WELCOME' | translate }}</h1>
    <p>
      Language: {{ translate.currentLang }}
    </p>
    <button (click)="switchLanguage('en')">English</button>
    <button (click)="switchLanguage('cs')">Čeština</button>
  `
})
export class AppComponent {
  public loading: boolean = false;

  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log('Initializing TranslateService');
    translate.setDefaultLang('en');

    if (isPlatformServer(this.platformId)) {
      const lang = 'en';
      console.log('Server platform detected, setting language to:', lang);
      translate.use(lang);
    } else {
      const browserLang = localStorage.getItem('lang') || 'en';
      console.log('Client platform detected, setting language to:', browserLang);
      translate.use(browserLang);
    }
  }

  switchLanguage(lang: string) {
    console.log('Switching language to:', lang);
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
