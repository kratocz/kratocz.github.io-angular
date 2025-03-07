import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {languageBrothersList} from '../app/app.routes';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  static readonly supportedLangs = ['en', 'cs'];
  static readonly defaultLang = 'en';
  private static readonly storageKey = 'lang';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  public getLangFromUrl(url: string): string | undefined {
    let langInUrl;
    //console.log('getLangFromUrl:', url);
    langInUrl = url.split('/')[1];
    if (langInUrl && !LanguageService.supportedLangs.includes(langInUrl)) {
      langInUrl = undefined;
    }
    //console.log('getLangFromUrl: langInUrl:', langInUrl);
    return langInUrl;
  }

  public getDetectedLanguage(url?: string) {
    if (!url) {
      url = this.router.url;
      //console.log('getDetectedLanguage: this.router.url:', url);
    }
    const langInUrl = this.getLangFromUrl(url);
    const lang = langInUrl ?? LanguageService.defaultLang;
    if (lang) {
      return lang;
    }
    const browserLang = navigator.language.split('-')[0];
    if (LanguageService.supportedLangs.includes(browserLang)) {
      return browserLang;
    }

    return LanguageService.defaultLang;
  }

  getUrlWithoutLanguage(url?: string): string {
    if (!url) {
      url = this.activatedRoute.snapshot.url.toString();
    }
    //console.log('getUrlWithoutLanguage from:', url);
    let urlParts = url.split('/');
    if (urlParts[0] === '') {
      urlParts.shift();
    }
    urlParts.shift();
    return (urlParts.length ? '/' : '') + urlParts.join('/');
  }

  changeLanguageInUrl(lang: string, url: string): string {
    let targetUrl = '/' + lang + this.getUrlWithoutLanguage(url);
    const languageBrothers = languageBrothersList.find(brothers => brothers.some(brother => `${url}/`.startsWith(`/${brother}/`)));
    if (languageBrothers) {
      const targetLanguageBrother = languageBrothers.find(brother => brother.startsWith(lang + '/'));
      if (targetLanguageBrother) {
        targetUrl = targetLanguageBrother;
      }
    }
    return targetUrl;
  }

  switchLanguage(lang: string, url?: string): Promise<boolean> {
    let currentUrl = url ?? this.activatedRoute.snapshot.url.toString();
    this.translate.use(lang);
    const targetUrl = this.changeLanguageInUrl(lang, currentUrl);
    console.log('switchLanguage:', {currentUrl, targetUrl, lang});
    if (currentUrl === '/' + targetUrl) {
      return Promise.resolve(true);
    }
    return this.router.navigateByUrl(targetUrl)
      .then((result) => {
        console.log('switchLanguage:', {currentUrl, targetUrl, lang, result});
        return result;
    });
  }
}
