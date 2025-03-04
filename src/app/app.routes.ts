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

export const routes: Routes = [
  { path: '', component: IntroComponent, pathMatch: 'full' },
  {
    path: ':lang',
    canActivate: [LanguageGuard],
    children: [
      { path: '', component: IntroComponent, data: {  } },
      { path: 'ai', component: AiComponent, data: {  } },
      { path: 'contact', component: ContactComponent, data: {  } },
      { path: 'kontakt', component: ContactComponent, data: {  } },
      { path: 'cv', component: CvComponent, data: {  } },
      { path: 'dev-ops', component: DevOpsComponent, data: {  } },
      { path: 'it-development', component: ItDevelopmentComponent, data: {  } },
      { path: 'it-vyvoj', component: ItDevelopmentComponent, data: {  } },
      { path: 'linux', component: LinuxComponent, data: {  } },
      { path: 'public-it-projects', component: PublicItProjectsComponent, data: {  } },
      { path: 'verejne-it-projekty', component: PublicItProjectsComponent, data: {  } },
      //{ path: '**', component: Error404Component, data: {  } },
    ],
  },
  //{ path: '**', component: Error404Component, title: 'Page not found', data: { } },
];
