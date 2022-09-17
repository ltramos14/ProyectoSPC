import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { IconModule } from '@visurel/iconify-angular';
import { ReplyPqrComponent } from './reply-pqr.component';


@NgModule({
  declarations: [ReplyPqrComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    IconModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ReplyPqrComponent],
  exports: [ReplyPqrComponent]
})
export class ReplyPqrModule { }
