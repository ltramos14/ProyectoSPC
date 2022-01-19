import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrls: ['./incrementer.component.scss']
})
export class IncrementerComponent implements OnInit {

  @Input('value') quantity: number;
  @Input('stock') stock: number;

  @Output() setValue: EventEmitter<number> = new EventEmitter();

  quantityList: number[] = [];

  quantityControl: FormControl;

  constructor() {}

  ngOnInit(): void {

    this.quantityControl = new FormControl(this.quantity, Validators.required);

    for (let i = 1; i <= this.stock; i++) {
      this.quantityList.push(i);
    }
  }

  onChanges() {
    this.setValue.emit(this.quantityControl.value);
  }

}
