import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LanguageGuard } from '../i18n/language.guard';
import {LanguageService} from '../i18n/language.service';
import {AppComponent} from '../app/app.component';

export const routes: Routes = [
  //{ path: '', redirectTo: '/' + LanguageService.defaultLang, pathMatch: 'full' },
  { path: '', component: AppComponent },
  {
    path: ':lang',
    canActivate: [LanguageGuard],
    children: [
      { path: '', component: AppComponent },
    ],
  },
  //{ path: '**', redirectTo: '/en' }, // 404 fallback
];
