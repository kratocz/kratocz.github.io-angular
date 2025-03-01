import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { LanguageService } from '../i18n/language.service';
import { filter, map } from 'rxjs';
import { LocaleSwitchComponent } from './locale-switch/locale-switch.component';
import { routes } from './app.routes';
import { getFullRoutes } from './route-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, LocaleSwitchComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  pageTitle?: string;
  fullRoutes: any[];

  constructor(
    public translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log('Initializing TranslateService');
    translate.setDefaultLang(LanguageService.defaultLang);

    // Get full routes
    this.fullRoutes = getFullRoutes(routes);
    console.log('Full routes:', this.fullRoutes);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((): string | undefined => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot.title;
      })
    ).subscribe(title => {
      this.pageTitle = title;
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
      this.router.navigate([`/${userLang}`]);
    }
  }
}
