import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandResponseDTO, ProductTemplateDTO } from '../dto';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<any>{ // todo: ProductDTO | ProductTemplateDTO

  constructor() {
    super('products');
  }

  createTemplate(model: ProductTemplateDTO): Observable<CommandResponseDTO> {
    return this.http.post<CommandResponseDTO>(`${this.apiAddress}/template/`, model);
  }

  updateTemplate(model: ProductTemplateDTO): Observable<CommandResponseDTO> {
    return this.http.put<CommandResponseDTO>(`${this.apiAddress}/template`, model)
  }
}