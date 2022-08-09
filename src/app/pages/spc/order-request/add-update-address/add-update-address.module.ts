import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { IconModule } from '@visurel/iconify-angular';

import { AddUpdateAddressComponent } from './add-update-address.component';

@NgModule({
  declarations: [
    AddUpdateAddressComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    IconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddUpdateAddressComponent
  ],
  exports: [
    AddUpdateAddressComponent
  ]
})
export class AddUpdateAddressModule { }
