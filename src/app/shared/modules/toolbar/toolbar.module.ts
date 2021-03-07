import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActionsComponent } from './components/actions/actions.component';
import { AddFooterComponent } from './components/add-footer/add-footer.component';
import { EditFooterComponent } from './components/edit-footer/edit-footer.component';
import { ListToolbarComponent } from './components/list-toolbar/list-toolbar.component';

@NgModule({
  declarations: [
    ListToolbarComponent,
    AddFooterComponent,
    EditFooterComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  exports: [
    ListToolbarComponent,
    AddFooterComponent,
    EditFooterComponent,
    ActionsComponent
  ]
})
export class ToolbarModule { }
