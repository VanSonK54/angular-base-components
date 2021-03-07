import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TreeModule } from '@circlon/angular-tree-component';
import { ToolbarModule, ValidationMessageModule } from 'src/app/shared/modules';
import { ProductCategoryAddComponent } from './components/product-category-add/product-category-add.component';
import { ProductCategoryEditComponent } from './components/product-category-edit/product-category-edit.component';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { ProductCategoryRoutingModule } from './product-category-routing.module';

@NgModule({
  declarations: [ProductCategoryListComponent, ProductCategoryAddComponent, ProductCategoryEditComponent],
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    TreeModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ToolbarModule,
    ValidationMessageModule
  ]
})
export class ProductCategoryModule { }