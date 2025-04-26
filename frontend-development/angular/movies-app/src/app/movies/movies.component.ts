import { Component, OnInit } from '@angular/core';
import { MoviesServiceService } from '../movies-service.service';
import { Movie } from '../movies';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-movies',
  imports: [MovieComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  movies!: Movie[];
  constructor(private moviesService: MoviesServiceService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.moviesService.getTrending().subscribe({
      next: (res) => {
        this.movies = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
