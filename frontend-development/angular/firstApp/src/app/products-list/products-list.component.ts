import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-products-list',
  imports: [ProductsComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  // products!: Product[];
  // filteredProducts!: Product[];

  // constructor(service: ProductsService) {
  //   this.products = service.products;
  //   this.filteredProducts = service.products.filter(
  //     (product) => product.category === 'jewelery'
  //   );
  // }
  products!: Product[];
  filteredProducts!: Product[];

  constructor(service: ProductsService) {
    this.products = service.products;
    this.filteredProducts = service.products.filter(
      (product) => product.category === 'jewelery'
    );
  }
}
