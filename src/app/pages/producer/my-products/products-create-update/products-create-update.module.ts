import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsCreateUpdateComponent } from './products-create-update.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';


@NgModule({
  declarations: [ProductsCreateUpdateComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    MatDividerModule,
    MatDatepickerModule,
    MatProgressBarModule
  ],
  entryComponents: [ProductsCreateUpdateComponent],
  exports: [ProductsCreateUpdateComponent]
})
export class ProductsCreateUpdateModule { }
