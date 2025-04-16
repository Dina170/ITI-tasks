import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products!: Product[];

  constructor(service: ProductsService) {
    this.products = service.products;
  }
}
