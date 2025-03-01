import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../i18n/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <h1>{{ 'WELCOME' | translate }}</h1>
    <p>
      Language: {{ translate.currentLang }}
    </p>
    <p>
      Counter: {{ counter }}
    </p>
    <button (click)="switchLanguage('en')">English</button>
    <button (click)="switchLanguage('cs')">Čeština</button>
    <button (click)="counter = counter + 1">add 1</button>
  `
})
export class AppComponent {
  public loading: boolean = false;
  public counter: number = 0;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log('Initializing TranslateService');
    translate.setDefaultLang(LanguageService.defaultLang);

    if (isPlatformServer(this.platformId)) {
      const lang = 'en';
      console.log('Server platform detected, setting language to:', lang);
      translate.use(lang);
    } else {
      const lang = this.languageService.userLanguage;
      console.log('Client platform detected, setting language to:', lang);
      this.switchLanguage(lang);
    }
  }

  switchLanguage(lang: string) {
    console.log('Switching language to:', lang);
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    const currentUrl = this.router.url.replace(/^\/(cs|en)/, '');
    this.router.navigate([`/${lang}${currentUrl}`]);
  }
}
