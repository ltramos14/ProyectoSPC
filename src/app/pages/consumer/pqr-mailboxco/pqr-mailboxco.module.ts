import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqrMailboxcoComponent } from './pqr-mailboxco.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [PqrMailboxcoComponent],
  imports: [
    CommonModule,
    ComponentsModule,
  ]
})
export class PqrMailboxcoModule { }
