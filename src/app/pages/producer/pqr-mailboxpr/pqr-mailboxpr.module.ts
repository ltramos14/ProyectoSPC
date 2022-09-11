import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqrMailboxprComponent } from './pqr-mailboxpr.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [PqrMailboxprComponent],
  imports: [
    CommonModule,
    ComponentsModule,
  ]
})
export class PqrMailboxprModule { }
