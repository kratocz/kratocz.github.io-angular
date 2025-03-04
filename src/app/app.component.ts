import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformServer} from '@angular/common';
import {TranslateService, TranslateModule} from '@ngx-translate/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet, Routes} from '@angular/router';
import {LanguageService} from '../i18n/language.service';
import {filter, map} from 'rxjs';
import {LocaleSwitchComponent} from './locale-switch/locale-switch.component';
import {routes} from './app.routes';
import {Title} from '@angular/platform-browser';
import {MenuItemComponent} from './menu-item/menu-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, LocaleSwitchComponent, RouterOutlet, MenuItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public static defaultPageTitle = 'Ing. Petr Kratochvíl';
  private _pageTitle?: string;
  currentLang?: string;

  get pageTitle(): string | undefined {
    return this._pageTitle;
  }

  set pageTitle(title: string | undefined) {
    this._pageTitle = title;
    let pageTitle = AppComponent.defaultPageTitle;
    if (title) {
      pageTitle = `${title.replace('!', '')} - ${AppComponent.defaultPageTitle}`;
    }
    console.log('Setting page title:', pageTitle);
    this.titleService.setTitle(pageTitle);
  }

  constructor(
    public translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log('Initializing TranslateService');
    translate.setDefaultLang(LanguageService.defaultLang);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot;
      })
    ).subscribe(activatedRoute => {
      console.log({activatedRoute}, activatedRoute.url.map(urlSegment => urlSegment.path));
      const lang = activatedRoute.params['lang'];
      languageService.switchLanguage(lang);
      const pageId = activatedRoute.routeConfig?.path as string;
      console.log({currentLang: translate.currentLang, key: `page.${pageId}.title`, translation: translate.instant(`page.${pageId}.title`) });
      this.pageTitle = pageId ? translate.instant(`page.${pageId}.title`) : undefined;
      this.currentLang = translate.currentLang ?? LanguageService.defaultLang;
    });

    if (isPlatformServer(this.platformId)) {
      const lang = 'en';
      console.log('Server platform detected, setting language to:', lang);
      translate.use(lang);
    } else {
      const lang = this.languageService.userLanguage;
      console.log('Client platform detected, setting language to:', lang);
      this.languageService.switchLanguage(lang);
    }
  }

  ngOnInit() {
    if (!isPlatformServer(this.platformId)) {
      const userLang = this.languageService.userLanguage;
      this.languageService.switchLanguage('en');
      //this.router.navigate([`/${userLang}`]);
    }
  }

  protected readonly JSON = JSON;
}
