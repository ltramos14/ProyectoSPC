import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { IconModule } from '@visurel/iconify-angular';

import { ComponentsModule } from 'src/app/components/components.module';
import { AddUpdateAddressModule } from './add-update-address/add-update-address.module';
import { OrderRequestComponent } from './order-request.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [OrderRequestComponent],
  imports: [
    AddUpdateAddressModule,
    CommonModule,
    ComponentsModule,
    FlexLayoutModule,
    FormsModule,
    IconModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatRadioModule,
    MatStepperModule,
    PipesModule,
  ]
})
export class OrderRequestModule { }
