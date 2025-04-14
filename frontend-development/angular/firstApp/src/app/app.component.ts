import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    ProductsComponent,
    CategoriesComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'firstApp';
}
