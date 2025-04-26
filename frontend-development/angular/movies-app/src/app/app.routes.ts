import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { AllComponent } from './all/all.component';
import { PeopleComponent } from './people/people.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full',
  },
  // {
  //   path: 'all',
  //   component: AllComponent,
  // },
  // {
  //   path: 'movie',
  //   component: MoviesComponent,
  // },

  {
    path: 'people',
    component: PeopleComponent,
  },
  {
    path: 'tv',
    component: MoviesComponent,
    data: { mediaType: 'tv' },
  },
  {
    path: ':mediaType',
    component: MoviesComponent,
  },
];
