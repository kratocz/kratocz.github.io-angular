import {ApplicationConfig, importProvidersFrom, Injectable, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, RouterStateSnapshot, TitleStrategy} from '@angular/router';
import { routes } from './app.routes';
import {provideClientHydration, Title, withEventReplay} from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as yaml from 'js-yaml';

const defaultPageTitle = 'Ing. Petr Kratochvíl';

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    let pageTitle = this.buildTitle(routerState);
    let title = defaultPageTitle;
    if (pageTitle) {
      pageTitle = pageTitle.replace('!', '');
      title = `${pageTitle} - ${defaultPageTitle}`;
    }
    this.title.setTitle(title);
  }
}

// Function for YAML loader (for client-side)
export class TranslateYamlLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private prefix: string = './assets/i18n/',
    private suffix: string = '.yaml'
  ) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`, {responseType: 'text'})
      .pipe(
        map((yamlContent: string) => yaml.load(yamlContent))
      );
  }
}

function YamlLoaderFactory(httpClient: HttpClient) {
  return new TranslateYamlLoader(httpClient, './assets/i18n/', '.yaml');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    TranslateService,
    TranslateStore,
    provideHttpClient(),
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy
    },
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: YamlLoaderFactory,
          deps: [HttpClient]
        },
      })
    ),
  ],
};
