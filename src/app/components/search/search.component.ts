import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ProductsService } from 'src/app/service/producer/products.service';
import { Product } from './../../models/product.model';

import icSearch from '@iconify/icons-ic/twotone-search';
import icArrow from '@iconify/icons-ic/twotone-arrow-right-alt';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  icSearch = icSearch;
  icArrow = icArrow;

  productsList: Product[] = [];

  productCtrl = new FormControl();

  filteredProducts: Observable<Product[]>;

  constructor(
    private productService: ProductsService,
  ) {
    this.filteredProducts = this.productCtrl.valueChanges.pipe(
      startWith(''),
      map(product => (product ? this._filterProducts(product) : this.productsList.slice())),
    );
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    return this.productService.products.subscribe(data => this.productsList = data);
  }

  private _filterProducts(value: string): Product[] {
    const filterValue = value.toLowerCase();

    return this.productsList.filter(product => product.name.toLowerCase().includes(filterValue));
  }

}
