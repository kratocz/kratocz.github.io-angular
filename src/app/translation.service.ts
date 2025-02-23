import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  use(lang: string): void {
    this.translate.use(lang);
  }
}
