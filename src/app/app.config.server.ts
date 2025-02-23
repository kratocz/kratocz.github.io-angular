import {mergeApplicationConfig, ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {TranslateFsLoader} from './translate-fs.loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

// Dynamic loader selection based on environment
const translateLoader = {
  provide: TranslateLoader,
  useFactory: () => {
    return new TranslateFsLoader();
  }
};

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: translateLoader,
      })
    ),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
