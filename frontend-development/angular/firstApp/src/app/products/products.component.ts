import { Component } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      image:
        'https://img.freepik.com/free-photo/apples-red-fresh-mellow-juicy-perfect-whole-white-desk_179666-271.jpg?t=st=1744634784~exp=1744638384~hmac=7d0cb6f4f14e050029eb7842f4dc884c4398ac7c967c9feb3773a29498cc423d&w=740',
      name: 'Apples',
      price: 3.99,
      onSale: true,
    },
    {
      id: 2,
      image:
        'https://img.freepik.com/free-vector/milk-bottle-realistic_1284-6148.jpg?uid=R115828094&ga=GA1.1.1966791131.1739704477&semt=ais_hybrid&w=740',
      name: 'Milk',
      price: 1.49,
      onSale: false,
    },
    {
      id: 3,
      image:
        'https://img.freepik.com/premium-photo/delicious-bun-with-sesame-seeds-isolated_272787-1336.jpg?uid=R115828094&ga=GA1.1.1966791131.1739704477&semt=ais_hybrid&w=740',
      name: 'Bread',
      price: 2.29,
      onSale: true,
    },
    {
      id: 4,
      image:
        'https://img.freepik.com/free-photo/three-fresh-organic-raw-eggs-isolated-white-surface_114579-43677.jpg?uid=R115828094&ga=GA1.1.1966791131.1739704477&semt=ais_hybrid&w=740',
      name: 'Eggs (12 count)',
      price: 2.99,
      onSale: false,
    },
    {
      id: 5,
      image:
        'https://img.freepik.com/premium-photo/ripe-bananas-white-background_269543-575.jpg?uid=R115828094&ga=GA1.1.1966791131.1739704477&semt=ais_hybrid&w=740',
      name: 'Bananas',
      price: 0.59,
      onSale: true,
    },
    {
      id: 6,
      image:
        'https://img.freepik.com/premium-photo/rice-burlap-sack_1004890-5846.jpg?uid=R115828094&ga=GA1.1.1966791131.1739704477&semt=ais_hybrid&w=740',
      name: 'White Rice (1kg)',
      price: 1.99,
      onSale: false,
    },
    {
      id: 7,
      image:
        'https://img.freepik.com/free-photo/raw-board-breast-cutting-fresh_1203-5517.jpg?uid=R115828094&ga=GA1.1.1966791131.1739704477&semt=ais_hybrid&w=740',
      name: 'Chicken Breast (1kg)',
      price: 6.99,
      onSale: true,
    },
    {
      id: 8,
      image:
        'https://img.freepik.com/premium-photo/isolated-drink-glass-orange-juice_105428-857.jpg?uid=R115828094&ga=GA1.1.1966791131.1739704477&semt=ais_hybrid&w=740',
      name: 'Orange Juice',
      price: 2.49,
      onSale: false,
    },
  ];
}
