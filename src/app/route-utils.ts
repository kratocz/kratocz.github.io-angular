import {Route, Routes} from '@angular/router';

export function getFullRoutes(routes: Routes, parentPath: string = ''): Route[] {
  let fullRoutes: Route[] = [];

  routes.forEach(route => {
    const fullPath = parentPath ? `${parentPath}/${route.path}` : route.path;

    if (route.component && typeof fullPath === 'string') {
      fullRoutes.push({ ...route, path: fullPath });
    }

    if (route.children) {
      fullRoutes = fullRoutes.concat(getFullRoutes(route.children, fullPath));
    }
  });

  return fullRoutes;
}
