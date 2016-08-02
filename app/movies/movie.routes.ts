import { RouterConfig } from '@angular/router';

import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieEditComponent } from './movie-edit.component';
import { MovieEditReactiveComponent } from './movie-edit-reactive.component';

export const MovieRoutes: RouterConfig = [
  { path: 'movies', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'movieEdit/:id', component: MovieEditComponent },
  { path: 'movieEditReactive/:id', component: MovieEditReactiveComponent }
];
