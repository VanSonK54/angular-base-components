import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploaderModule } from 'src/app/shared/modules';
import { BaseImportsModule } from 'src/app/shared/modules/base-imports/base-imports.module';
import { CultureAddComponent } from './components/culture-add/culture-add.component';
import { CultureEditComponent } from './components/culture-edit/culture-edit.component';
import { CultureListComponent } from './components/culture-list/culture-list.component';
import { CultureRoutingModule } from './culture-routing.module';



@NgModule({
  declarations: [CultureListComponent, CultureAddComponent, CultureEditComponent],
  imports: [
    CommonModule,
    CultureRoutingModule,
    BaseImportsModule,
    FileUploaderModule
  ],
})
export class CultureModule { }
