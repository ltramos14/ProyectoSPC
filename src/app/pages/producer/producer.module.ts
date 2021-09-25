import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProducerComponent } from './producer.component';
import { ToolbarModule } from './shared/toolbar/toolbar.module';


@NgModule({
  declarations: [ProducerComponent],
  imports: [
    CommonModule,
    ToolbarModule,
  ]
})
export class ProducerModule { }
