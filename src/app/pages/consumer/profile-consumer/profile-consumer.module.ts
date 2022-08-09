import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { IconModule } from '@visurel/iconify-angular';

import { MyDataModule } from './my-data/my-data.module';
import { ProfileConsumerComponent } from './profile-consumer.component';

@NgModule({
  declarations: [ProfileConsumerComponent],
  imports: [
    CommonModule,
    IconModule,
    MyDataModule,
    MatIconModule,
    MatRippleModule,
    MatTabsModule,
    RouterModule,
  ]
})
export class ProfileConsumerModule { }
