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

export const routes: Routes = [
  { path: '', component: IntroComponent },
  {
    path: 'cs',
    children: [
      { path: '', component: IntroComponent, title: 'Vítejte!', data: { linkTitle: 'Úvod', } },
      { path: 'ai', component: AiComponent, title: 'AI', data:{ linkTitle: 'AI', } },
      { path: 'kontakt', component: ContactComponent, title: 'Kontakt', data:{ linkTitle: 'Kontakt', } },
      { path: 'cv', component: CvComponent, title: 'Životopis (CV)', data:{ linkTitle: 'CV', } },
      { path: 'dev-ops', component: DevOpsComponent, title: 'DevOps', data:{ linkTitle: 'DevOps', } },
      { path: 'it-vyvoj', component: ItDevelopmentComponent, title: 'IT vývoj', data:{ linkTitle: 'IT vývoj', } },
      { path: 'linux', component: LinuxComponent, title: 'Linux', data:{ linkTitle: 'Linux', } },
      { path: 'verejne-it-projekty', component: PublicItProjectsComponent, title: 'Veřejné IT projekty', data:{ linkTitle: 'Veřejné projekty', } },
      { path: '**', component: Error404Component, title: 'Stránka nenalezena' },
    ],
  },
  {
    path: 'en',
    children: [
      { path: '', component: IntroComponent, title: 'Welcome!', data:{ linkTitle: 'Intro', } },
      { path: 'ai', component: AiComponent, title: 'AI', data:{ linkTitle: 'AI', } },
      { path: 'contact', component: ContactComponent, title: 'Contact', data:{ linkTitle: 'Contact', } },
      { path: 'cv', component: CvComponent, title: 'Curriculum Vitae (CV)', data:{ linkTitle: 'CV', } },
      { path: 'dev-ops', component: DevOpsComponent, title: 'DevOps', data:{ linkTitle: 'DevOps', } },
      { path: 'it-development', component: ItDevelopmentComponent, title: 'IT Development', data:{ linkTitle: 'IT Development', } },
      { path: 'linux', component: LinuxComponent, title: 'Linux', data:{ linkTitle: 'Linux', } },
      { path: 'public-it-projects', component: PublicItProjectsComponent, title: 'Public IT Projects', data:{ linkTitle: 'Public IT Projects', } },
      { path: '**', component: Error404Component, title: 'Page not found' },
    ],
  },
  { path: '**', component: Error404Component, title: 'Page not found' },
];
