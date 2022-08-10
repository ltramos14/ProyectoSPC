import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from './../../../service/producer/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  randProducts: Product[] = [];
  products: Product[] = [];

  responsiveOptions;

  loading: boolean = false;

  constructor(
    private productsService: ProductsService,
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.loading = true;
    this.productsService.getProductsWithQuery(16).subscribe((products) => {
      this.products = products;
      this.loading = false;
    })
  }
}
