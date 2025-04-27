import { Component, OnInit } from '@angular/core';
import { Tv } from '../tv';
import { MoviesServiceService } from '../movies-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tv',
  imports: [RouterLink],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.css',
})
export class TvComponent implements OnInit {
  tvs!: Tv[];

  constructor(private moviesService: MoviesServiceService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.moviesService.getTrending('tv').subscribe({
      next: (res) => {
        this.tvs = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
