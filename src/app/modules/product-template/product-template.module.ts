import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BaseImportsModule } from 'src/app/shared/modules/base-imports/base-imports.module';
import { ProductTemplateRoutingModule } from './product-template-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductTemplateRoutingModule,
    BaseImportsModule,
    MatAutocompleteModule
  ]
})
export class ProductTemplateModule { }
