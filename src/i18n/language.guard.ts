import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LanguageGuard implements CanActivate {
  allowedLanguages = ['cs', 'en']; // Seznam povolených jazyků

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const lang = route.params['lang'];
    if (!this.allowedLanguages.includes(lang)) {
      this.router.navigate(['/en']);
      return false;
    }
    return true;
  }
}
