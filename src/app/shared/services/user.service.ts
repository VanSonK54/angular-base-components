import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordByPhoneDTO, RegisterDTO } from 'src/app/modules/authentication/dto';
import { environment } from 'src/environments/environment';
import { ChangePasswordByEmailDTO } from '../../modules/authentication/dto';
import { CommandResponseDTO } from '../dto/_simple-response.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiAddress = '';
  constructor(private http: HttpClient) {
    this.apiAddress = environment.apiEndPoint + '/users';
   }

  register(model: RegisterDTO) : Observable<CommandResponseDTO>{
    return this.http.post<CommandResponseDTO>(this.apiAddress, model)
  }

  changePasswordByEmail(model : ChangePasswordByEmailDTO) { 
    return this.http.patch(this.apiAddress + '/changepasswordbyemail', model);
  }
  
  changePasswordByPhone(model : ChangePasswordByPhoneDTO) { 
    return this.http.patch(this.apiAddress + '/changepasswordbycellphone', model);
  }

  checkUsernamePossession(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiAddress}/checkusername/${username}`);
  }
}
