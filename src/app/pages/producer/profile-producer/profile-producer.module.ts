import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileProducerComponent } from './profile-producer.component';
import { MyDataModule } from './my-data/my-data.module';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
  declarations: [ 
    ProfileProducerComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule,
    MyDataModule,
    MatIconModule,
    IconModule,
    MatTabsModule,
    MatRippleModule,
  ]
})
export class ProfileProducerModule { }
