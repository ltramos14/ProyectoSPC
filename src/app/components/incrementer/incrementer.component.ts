import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import faPlus from '@iconify/icons-fa-solid/plus';
import faMinus from '@iconify/icons-fa-solid/minus';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrls: ['./incrementer.component.scss']
})
export class IncrementerComponent implements OnInit {

  faPlus = faPlus;
  faMinus = faMinus;

  @Input('value') quantity: number;
  @Input('stock') stock: number;

  @Output() setValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  changeQuantity(value: number) {
    
    // Validar de que la cantidad no sea menor de cero
    if (this.quantity <= 1 && value < 1) {
      this.setValue.emit(1);
      return this.quantity = 1;
    }

    // Validar de que la cantidad no sea mayor a la cantidad que hay en stock
    if (this.quantity >= this.stock && value >= 0) {
      this.setValue.emit(this.stock);
      return this.quantity = this.stock;
    }

    this.quantity = this.quantity + value;
    this.setValue.emit(this.quantity);

  }

  onChanges(newValue: number) {

    if (newValue <= 1)
      this.quantity = 1;
    else if (newValue >= this.stock)
      this.quantity = this.stock;
    else
      this.quantity = newValue;

    this.setValue.emit(this.quantity);

  }

}
