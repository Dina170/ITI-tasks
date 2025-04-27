import { Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { AllComponent } from './all/all.component';
import { PeopleComponent } from './people/people.component';
import { TvComponent } from './tv/tv.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TvDetailsComponent } from './tv-details/tv-details.component';
import { PersonDetailsComponent } from './person-details/person-details.component';

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
    component: TvComponent,
    data: { mediaType: 'tv' },
  },
  {
    path: 'tv/:id',
    component: TvDetailsComponent,
  },
  {
    path: 'people/:id',
    component: PersonDetailsComponent,
  },
  {
    path: ':mediaType',
    component: MoviesComponent,
  },
  {
    path: ':mediaType/:id',
    component: MovieDetailsComponent,
  },
];
