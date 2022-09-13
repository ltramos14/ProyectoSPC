import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/service/users/order.service';
import { municipalities } from 'src/static/municipalities-data';

import icClose from "@iconify/icons-ic/twotone-close";
import icShipping from "@iconify/icons-ic/twotone-local-shipping";

@Component({
  selector: 'spc-available-carriers',
  templateUrl: './available-carriers.component.html',
  styles: [
  ]
})
export class AvailableCarriersComponent {

  municipalities = municipalities;

  municipality = new FormControl('');

  carriers: Array<any> = [];
  loading: boolean = false;

  icClose = icClose;
  icShipping = icShipping;

  selectedValue: string;

  constructor(
    private orderService: OrderService,
    private dialogRef: MatDialogRef<AvailableCarriersComponent>
  ) {

  }

  getAvailableCarriers(municipalities: string[]) {
    if (municipalities.length <= 9) {
      this.loading = true;
      this.orderService.searchCarriersByMunicipality(municipalities)
        .subscribe(carriers => {
          this.carriers = carriers;
          this.loading = false;
        })
    }
  }

  filterCarriers() {
    this.getAvailableCarriers(this.municipality.value);
    this.selectedValue = '';
  }

  onChange(radio: MatRadioChange) {
    this.selectedValue = radio.value;    
  }

  onSelectCarrier() {
    this.dialogRef.close(this.selectedValue);
  }

}
