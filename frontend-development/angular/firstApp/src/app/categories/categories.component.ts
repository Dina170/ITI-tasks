import { Component } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categories: Category[] = [
    {
      id: 1,
      name: 'Fresh Produce',
      image:
        'https://cdn-icons-png.freepik.com/256/11926/11926690.png?uid=R115828094&ga=GA1.1.1966791131.1739704477&semt=ais_hybrid',
      price: 2.5,
    },
    {
      id: 2,
      name: 'Dairy & Eggs',
      image:
        'https://cdn-icons-png.freepik.com/256/2674/2674486.png?uid=R115828094&ga=GA1.1.1966791131.1739704477&semt=ais_hybrid',
      price: 3.0,
    },
    {
      id: 3,
      name: 'Bakery',
      image:
        'https://cdn-icons-png.freepik.com/256/7334/7334085.png?uid=R115828094&ga=GA1.1.1966791131.1739704477&semt=ais_hybrid',
      price: 2.75,
    },
    {
      id: 4,
      name: 'Beverages',
      image:
        'https://cdn-icons-png.freepik.com/256/7438/7438598.png?uid=R115828094&ga=GA1.1.1966791131.1739704477&semt=ais_hybrid',
      price: 1.99,
    },
  ];
}
