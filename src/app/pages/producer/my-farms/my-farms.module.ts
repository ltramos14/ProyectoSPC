import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@visurel/iconify-angular';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { MyFarmsComponent } from './my-farms.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MyFarmsCreateUpdateModule } from './my-farms-create-update/my-farms-create-update.module';

@NgModule({
  declarations: [ MyFarmsComponent ],
  imports: [
    CommonModule,
    MyFarmsCreateUpdateModule,
    FlexLayoutModule,
    MatIconModule,
    IconModule,
    ContainerModule,
    MatButtonModule,
    MatRippleModule,
    MatTooltipModule,
  ]
})
export class MyFarmsModule { }
