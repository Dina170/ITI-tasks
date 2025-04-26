import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesServiceService } from '../movies-service.service';
import { Person } from '../person';
import { PersonComponent } from '../person/person.component';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CommonModule, PersonComponent],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css',
})
export class PeopleComponent implements OnInit {
  people!: Person[];

  constructor(private moviesService: MoviesServiceService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.moviesService.getTrending('person').subscribe({
      next: (res) => {
        this.people = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
