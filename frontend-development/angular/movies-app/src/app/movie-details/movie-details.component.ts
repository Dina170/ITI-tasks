import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesServiceService } from '../movies-service.service';
import { ActivatedRoute } from '@angular/router';

interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  movie!: MovieDetails;
  movieId!: number;
  mediaType!: string;
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private m: MoviesServiceService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.movieId = Number(params.get('id')!);
      this.mediaType = params.get('mediaType')!;
      this.loadMovie();
    });
  }

  loadMovie() {
    this.m.getDetails(this.mediaType, this.movieId).subscribe({
      next: (res) => {
        this.movie = res;
      },
      error: (err) => console.log(err),
    });
  }
}
