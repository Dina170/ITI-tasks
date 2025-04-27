import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesServiceService } from '../movies-service.service';
import { ActivatedRoute } from '@angular/router';

interface PersonDetails {
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  profile_path: string;
  also_known_as: string[];
}

@Component({
  selector: 'app-person-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css',
})
export class PersonDetailsComponent implements OnInit {
  person!: PersonDetails;
  personId!: number;
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  constructor(private m: MoviesServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.personId = Number(params.get('id')!);
      this.loadPerson();
    });
  }

  loadPerson() {
    this.m.getDetails('person', this.personId).subscribe({
      next: (res) => {
        this.person = res;
      },
      error: (err) => console.log(err),
    });
  }
}
