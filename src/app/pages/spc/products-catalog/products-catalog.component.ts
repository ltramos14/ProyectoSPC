import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from 'src/app/service/producer/products.service';
import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/service/consumer/cart.service';
import { scaleIn400ms } from '../../../../@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '../../../../@vex/animations/fade-in-right.animation';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from '../../../../@vex/animations/scale-fade-in.animation';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss'],
  animations: [
    scaleIn400ms,
    fadeInRight400ms,
    stagger40ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class ProductsCatalogComponent implements OnInit {

  subject$: ReplaySubject<Product[]> = new ReplaySubject<Product[]>(1);

  data$: Observable<Product[]> = this.subject$.asObservable();

  products: Product[];

  productCart: Cart;

  constructor(
    private productsService: ProductsService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe( data => {
      this.productsService.getProductsByType(data.tipo).subscribe( products => {
        this.products = products;
      })
    })
  }

}
