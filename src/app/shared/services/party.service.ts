import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { CommandResponseDTO } from "../dto";
import { PartyDTO } from "../dto/party.dto";
import { BaseService } from "./_base.service";

@Injectable({
    providedIn: 'root'
})
export class PartyService extends BaseService<PartyDTO> {
    constructor() {
        super('parties');
    }

    createIndividualParty(model: PartyDTO): Observable<CommandResponseDTO> {
        return this.http.post<CommandResponseDTO>(`${this.apiAddress}/IndividualParty`, model).pipe(catchError(this.errorService.handleError));
    }

    updateIndividualParty(model: PartyDTO): Observable<CommandResponseDTO> {
        return this.http.put<CommandResponseDTO>(`${this.apiAddress}/IndividualParty`, model).pipe(catchError(this.errorService.handleError));
    }
}