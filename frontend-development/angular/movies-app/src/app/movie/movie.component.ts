import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../movies';

@Component({
  selector: 'app-movie',
  imports: [RouterLink],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent {
  movie = input<Movie>();
}
