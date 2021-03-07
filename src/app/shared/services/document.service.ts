import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  apiAddress = '';
  constructor(public http: HttpClient) {
    this.apiAddress = environment.apiEndPoint + '/documents';
  }

  create(model: FormData): Observable<any> {
  const headers = new HttpHeaders()
    .set("Content-Type", `multipart/form-data;boundary=${moment().format('l')}`)
    return this.http.post(this.apiAddress, model);
  }
}