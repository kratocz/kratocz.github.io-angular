import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateService, TranslateModule} from '@ngx-translate/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {LanguageService} from '../i18n/language.service';
import {filter, map, Subscription} from 'rxjs';
import {LocaleSwitchComponent} from './locale-switch/locale-switch.component';
import {MenuItemComponent} from './menu-item/menu-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, LocaleSwitchComponent, RouterOutlet, MenuItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  pageTitle?: string;
  currentLang?: string;
  private langChangeSubscription?: Subscription;

  private getRouteTitle(route: ActivatedRoute): string | undefined {
    let child = route.firstChild;
    while (child) {
      if (child.snapshot.routeConfig?.title) {
        return child.snapshot.routeConfig.title.toString();
      }
      child = child.firstChild;
    }
    return route.snapshot.routeConfig?.title?.toString();
  }

  constructor(
    public translate: TranslateService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event) => {
        return event.url;
      })
    ).subscribe(url => {
      console.log('Navigated to:', url);
      this.languageService.switchLanguage(this.languageService.getDetectedLanguage(url), url);
      this.pageTitle = this.getRouteTitle(this.activatedRoute);
    });

    translate.onLangChange.subscribe(event=>{
      //console.log('Language changed to:', event.lang);
      this.currentLang = event.lang;
    });
  }
}
