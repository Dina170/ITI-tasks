import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { CategoriesComponent } from '../categories/categories.component';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-home',
  imports: [ProductsComponent, CategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products!: Product[];

  constructor(service: ProductsService) {
    this.products = service.products;
  }
}
