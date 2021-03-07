import { Injectable } from '@angular/core';
import { ProductCategoryDTO } from '../dto/product-category.dto';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService extends BaseService<ProductCategoryDTO>{

  constructor() {
    super('productCategories');
   }
}