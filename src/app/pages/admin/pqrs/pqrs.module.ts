import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqrsComponent } from './pqrs.component';
import { PqrsRoutingModule } from './pqrs-routing.module';



@NgModule({
  declarations: [PqrsComponent],
  imports: [
    CommonModule,
    PqrsRoutingModule
  ]
})
export class PqrsModule { }
