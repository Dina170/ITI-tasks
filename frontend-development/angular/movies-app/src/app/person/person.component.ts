import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../person';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
})
export class PersonComponent {
  person = input<Person>();
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
}
