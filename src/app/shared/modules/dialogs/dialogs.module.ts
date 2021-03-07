import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';



@NgModule({
  declarations: [DeleteDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ]
})
export class DialogsModule { }
