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

  
  }

  onChanges() {
    this.setValue.emit(this.quantityControl.value);
  }

}
