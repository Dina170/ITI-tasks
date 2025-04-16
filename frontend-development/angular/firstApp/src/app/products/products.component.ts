import { Component, input } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products',
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products = input<Product[]>();
  title = input<string>('All Products');
}
