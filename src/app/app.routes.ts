import { Routes } from '@angular/router';
import {IntroComponent} from './pages/intro/intro.component';
import {AiComponent} from './pages/ai/ai.component';
import {ContactComponent} from './pages/contact/contact.component';
import {CvComponent} from './pages/cv/cv.component';
import {DevOpsComponent} from './pages/dev-ops/dev-ops.component';
import {ItDevelopmentComponent} from './pages/it-development/it-development.component';
import {LinuxComponent} from './pages/linux/linux.component';
import {PublicItProjectsComponent} from './pages/public-it-projects/public-it-projects.component';
import {Error404Component} from './pages/error404/error404.component';
import {LanguageGuard} from '../i18n/language.guard';

export const languageBrothersList: string[][] = [
  [ 'en/public-it-projects', 'cs/verejne-it-projekty', ],
  [ 'en/contact', 'cs/kontakt', ],
  [ 'en/it-development', 'cs/it-vyvoj', ],
];

export const routes: Routes = [
  { path: '', component: IntroComponent, pathMatch: 'full' },
  {
    path: 'cs',
    children: [
      {path: '', component: IntroComponent, title: 'Vítejte!', data: {}},
      {path: 'ai', component: AiComponent, title: 'AI', data: {}},
      {path: 'kontakt', component: ContactComponent, title: 'Kontakt', data: {}},
      {path: 'cv', component: CvComponent, title: 'Životopis (CV)', data: {}},
      {path: 'dev-ops', component: DevOpsComponent, title: 'DevOps', data: {}},
      {path: 'it-vyvoj', component: ItDevelopmentComponent, title: 'IT vývoj', data: {}},
      {path: 'linux', component: LinuxComponent, title: 'Linux', data: {}},
      {path: 'verejne-it-projekty', component: PublicItProjectsComponent, title: 'Veřejné IT projekty', data: {}},
      //{ path: '**', component: Error404Component, title: 'Stránka nenalezena', data: {  } },
    ],
  },
  {
    path: 'en',
    children: [
      { path: '', component: IntroComponent, title: 'Welcome!', data: {  } },
      { path: 'ai', component: AiComponent, title: 'AI', data: {  } },
      { path: 'contact', component: ContactComponent, title: 'Contact', data: {  } },
      { path: 'cv', component: CvComponent, title: 'Curriculum Vitae (CV)', data: {  } },
      { path: 'dev-ops', component: DevOpsComponent, title: 'DevOps', data: {  } },
      { path: 'it-development', component: ItDevelopmentComponent, title: 'IT Development', data: {  } },
      { path: 'linux', component: LinuxComponent, title: 'Linux', data: {  } },
      { path: 'public-it-projects', component: PublicItProjectsComponent, title: 'Public IT Projects', data: {  } },
      //{ path: '**', component: Error404Component, title: 'Page not found', data: {  } },
    ],
  },
  //{ path: '**', component: Error404Component, title: 'Page not found', data: { } },
];
