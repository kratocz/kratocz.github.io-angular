import { TranslateLoader } from '@ngx-translate/core';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Observable, of } from 'rxjs';

export class TranslateFsLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    const filePath = join(process.cwd(), 'src/assets/i18n/', `${lang}.json`);
    try {
      const fileContent = readFileSync(filePath, 'utf8');
      return of(JSON.parse(fileContent));
    } catch (error) {
      console.error(`Translation file not found: ${filePath}`);
      return of({});
    }
  }
}
