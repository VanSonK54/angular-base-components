import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { COMMON_MESSAGES } from '../data';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  getErrorMessage(error: HttpErrorResponse): string { 
    return error.error ? error.error.message : COMMON_MESSAGES.unknownError;
  }

  handleError(error: ErrorEvent | HttpErrorResponse) { 
    
    
    return throwError(error);
  }
}
