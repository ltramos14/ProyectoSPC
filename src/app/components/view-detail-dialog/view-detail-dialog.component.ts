import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'spc-view-detail-dialog',
  templateUrl: './view-detail-dialog.component.html',
  styleUrls: [ './view-detail-dialog.component.scss' ]
})
export class ViewDetailDialogComponent {

  consumer: string = '';
  elements: string[] = [];
  address: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.consumer = data.consumer || this.consumer;
      this.elements = data.elements || this.elements;
      this.address = data.address || this.address;
    }
    
  }

}
