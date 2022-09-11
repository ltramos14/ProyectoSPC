import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersCommunityComponent } from './users-community.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UsersCommunityComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FlexLayoutModule,
    IconModule,
    MatIconModule,
  ]
})
export class UsersCommunityModule { }
