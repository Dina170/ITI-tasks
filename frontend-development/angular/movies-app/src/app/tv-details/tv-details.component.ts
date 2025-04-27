import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesServiceService } from '../movies-service.service';
import { ActivatedRoute } from '@angular/router';
import { TvDetails } from '../interfaces/tv.interface';

@Component({
  selector: 'app-tv-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tv-details.component.html',
  styleUrl: './tv-details.component.css',
})
export class TvDetailsComponent implements OnInit {
  tv!: TvDetails;
  tvId!: number;
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private m: MoviesServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.tvId = Number(params.get('id')!);
      this.loadTv();
    });
  }

  loadTv() {
    this.m.getDetails('tv', this.tvId).subscribe({
      next: (res) => {
        this.tv = res;
      },
      error: (err) => console.log(err),
    });
  }
}
