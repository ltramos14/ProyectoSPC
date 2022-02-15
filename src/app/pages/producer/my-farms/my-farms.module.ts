import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '@visurel/iconify-angular';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { MyFarmsComponent } from './my-farms.component';
import { MyFarmsCreateUpdateModule } from './my-farms-create-update/my-farms-create-update.module';

@NgModule({
  declarations: [ MyFarmsComponent ],
  imports: [
    CommonModule,
    ContainerModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MyFarmsCreateUpdateModule,
  ]
})
export class MyFarmsModule { }
