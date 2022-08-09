import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { IconModule } from '@visurel/iconify-angular';

import { MyDataModule } from './my-data/my-data.module';
import { ProfileProducerComponent } from './profile-producer.component';

@NgModule({
  declarations: [ 
    ProfileProducerComponent, 
  ],
  imports: [
    CommonModule,
    IconModule,
    MatIconModule,
    MatTabsModule,
    MatRippleModule,
    MyDataModule,
    RouterModule,
  ]
})
export class ProfileProducerModule { }
