import { Component, input } from '@angular/core';
import { Person } from '../person';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-person',
  imports: [RouterLink],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
})
export class PersonComponent {
  person = input<Person>();
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
}
