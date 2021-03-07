import { Injectable } from '@angular/core';
import { CultureDTO } from '../dto';
import { BaseService } from './_base.service';

@Injectable({
  providedIn: 'root'
})
export class CultureService extends BaseService<CultureDTO> {

  constructor() {
    super('cultures');
   }
}
