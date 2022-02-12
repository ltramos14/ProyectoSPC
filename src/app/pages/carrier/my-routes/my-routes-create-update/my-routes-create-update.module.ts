import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRoutesCreateUpdateComponent } from './my-routes-create-update.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@NgModule({
  declarations: [
    MyRoutesCreateUpdateComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    MatDividerModule,
    MatDatepickerModule,
    MatProgressBarModule,
    NgxMaterialTimepickerModule,
    FormsModule
  ],
  entryComponents: [
    MyRoutesCreateUpdateComponent
  ],
  exports: [
    MyRoutesCreateUpdateComponent
  ]
})
export class MyRoutesCreateUpdateModule { }
