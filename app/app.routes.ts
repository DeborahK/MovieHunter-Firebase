import { provideRouter, RouterConfig }  from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { MovieRoutes } from './movies/movie.routes';

export const routes: RouterConfig = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent },
  ...MovieRoutes,
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' } // Not found
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
