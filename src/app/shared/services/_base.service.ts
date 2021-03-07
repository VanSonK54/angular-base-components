import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../client-services';
import { CommandResponseDTO } from '../dto';
import { ListResponseDTO } from '../dto/_list-response.dto';
import { AppInjector } from '../utilities';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  injector: Injector;
  http: HttpClient;
  errorService: ErrorService;

  apiAddress: string;
  constructor(@Inject(String) private _apiAddress: string) {
    this.apiAddress = `${environment.apiEndPoint}/${this._apiAddress}`;

    this.injector = AppInjector.getInjector();
    this.http = this.injector.get(HttpClient);
    this.errorService = this.injector.get(ErrorService);
  }

  getAll<returnType>(filters: string): Observable<ListResponseDTO<returnType>> {
    return this.http.get<ListResponseDTO<returnType>>(`${this.apiAddress}/${filters}`).pipe(catchError(this.errorService.handleError));
  }

  get<returnType>(id: string, expands?: string): Observable<returnType> {
    const url = `${this.apiAddress}/${id}` + (expands ? `?Expands=${expands}` : '');
    return this.http.get<returnType>(url).pipe(catchError(this.errorService.handleError));
  }

  create(model: T): Observable<CommandResponseDTO> {
    return this.http.post<CommandResponseDTO>(`${this.apiAddress}`, model).pipe(catchError(this.errorService.handleError));
  }

  update(model: T): Observable<CommandResponseDTO> {
    return this.http.put<CommandResponseDTO>(`${this.apiAddress}`, model).pipe(catchError(this.errorService.handleError));
  }

  updatePatch(model: T): Observable<CommandResponseDTO> {
    return this.http.patch<CommandResponseDTO>(`${this.apiAddress}/${(model as any).id}`, model).pipe(catchError(this.errorService.handleError));
  }

  delete(id: string): Observable<CommandResponseDTO> {
    return this.http.delete<CommandResponseDTO>(`${this.apiAddress}/${id}`).pipe(catchError(this.errorService.handleError));
  }
}
