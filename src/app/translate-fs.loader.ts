import { TranslateLoader } from '@ngx-translate/core';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { load } from 'js-yaml';

export class TranslateFsLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    const filePath = join(process.cwd(), 'public/assets/i18n/', `${lang}.yaml`);
    try {
      const fileContent = readFileSync(filePath, 'utf8');
      return of(load(fileContent));
    } catch (error) {
      console.error(`Translation file not found: ${filePath}`);
      return of({});
    }
  }
}
