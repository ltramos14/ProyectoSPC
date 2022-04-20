import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { OrderRequestComponent } from './order-request.component';
import { AddUpdateAddressModule } from './add-update-address/add-update-address.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrderRequestComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    IconModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatRadioModule,
    MatStepperModule,
    AddUpdateAddressModule
  ]
})
export class OrderRequestModule { }
