import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'spc-view-detail-dialog',
  templateUrl: './view-detail-dialog.component.html',
  styles: [
  ]
})
export class ViewDetailDialogComponent {

  title: string = 'Detalles';
  elements: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.title = data.title || this.title;
      this.elements = data.elements || this.elements;
    }
    
  }

}
