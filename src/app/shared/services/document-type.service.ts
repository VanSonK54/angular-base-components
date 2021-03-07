import { Injectable } from '@angular/core';
import { DocumentTypeDTO } from '../dto/document-type.dto';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService extends BaseService<DocumentTypeDTO>{

  constructor() {
    super('documenttypes');
   }
}
