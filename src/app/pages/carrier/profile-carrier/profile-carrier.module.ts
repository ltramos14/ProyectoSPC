import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileCarrierComponent } from './profile-carrier.component';
import { RouterModule } from '@angular/router';
import { MyDataModule } from './my-data/my-data.module';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { IconModule } from '@visurel/iconify-angular';
@NgModule({
  declarations: [ProfileCarrierComponent],
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
export class ProfileCarrierModule { }
