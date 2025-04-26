import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesServiceService } from '../movies-service.service';
import { Movie } from '../movies';
import { MovieComponent } from '../movie/movie.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MovieComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  movies!: Movie[];
  mediaType: string = 'all';

  constructor(
    private moviesService: MoviesServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.mediaType = params.get('mediaType') || 'all';
      this.loadMovies();
    });
  }

  loadMovies() {
    this.moviesService.getTrending(this.mediaType).subscribe({
      next: (res) => {
        this.movies = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
