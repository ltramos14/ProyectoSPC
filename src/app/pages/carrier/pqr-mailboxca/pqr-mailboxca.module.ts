import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqrMailboxcaComponent } from './pqr-mailboxca.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [PqrMailboxcaComponent],
  imports: [
    CommonModule,
    ComponentsModule,
  ]
})
export class PqrMailboxcaModule { }
