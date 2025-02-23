import {ApplicationConfig, importProvidersFrom, PLATFORM_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {isPlatformServer} from '@angular/common';
import {TranslateFsLoader} from './translate-fs.loader';

// Function for HTTP loader (for client-side)
function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

// Dynamic loader selection based on environment
const translateLoader = {
  provide: TranslateLoader,
  useFactory: (httpClient: HttpClient, platformId: Object) => {
    return isPlatformServer(platformId) ? new TranslateFsLoader() : HttpLoaderFactory(httpClient);
  },
  deps: [HttpClient, PLATFORM_ID]
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    TranslateService,
    TranslateStore,
    provideHttpClient(),
    provideRouter([]),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: translateLoader,
      })
    ),
    importProvidersFrom(
      TranslateModule.forChild({
        loader: translateLoader,
      })
    ),
  ],
};
