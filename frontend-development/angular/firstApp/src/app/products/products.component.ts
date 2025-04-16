import { Component, input } from '@angular/core';
import { Product } from '../product';
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
  selectedCategory: string | null = null;

  get filteredProducts() {
    if (!this.selectedCategory) return this.products();
    return this.products()?.filter(
      (product) => product.category === this.selectedCategory
    );
  }

  get categories() {
    return this.products()?.map((product) => product.category) || [];
  }

  get uniqueCategories() {
    return this.categories.filter(
      (cat, index) => this.categories.indexOf(cat) === index
    );
  }

  filterProducts(category: string) {
    this.selectedCategory =
      this.selectedCategory === category ? null : category;
  }
}
