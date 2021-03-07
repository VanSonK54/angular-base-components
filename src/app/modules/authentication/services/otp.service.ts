
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommandResponseDTO } from 'src/app/shared/dto/_simple-response.dto';
import { environment } from 'src/environments/environment';
import { OtpDTO } from '../dto';

@Injectable()
export class OtpService {
  apiAddress: string;
  constructor(private http: HttpClient) {
    this.apiAddress = environment.apiEndPoint + '/otp';
   }

  otp(model: OtpDTO): Observable<CommandResponseDTO> {
    return this.http.post<CommandResponseDTO>(this.apiAddress, model);
  }

}

