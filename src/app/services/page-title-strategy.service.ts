import {Injectable} from '@angular/core';
import {RouterStateSnapshot, TitleStrategy} from '@angular/router';
import {Title} from '@angular/platform-browser';

export const defaultPageTitle = 'Ing. Petr Kratochvíl';

@Injectable()
export class PageTitleStrategyService extends TitleStrategy {
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
