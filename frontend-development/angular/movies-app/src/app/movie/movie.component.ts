import { Component, input } from '@angular/core';
import { Movie } from '../movies';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent {
  movie = input<Movie>();
}
