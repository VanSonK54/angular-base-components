import { Injectable } from "@angular/core";
import { LocationDTO } from "../dto";
import { BaseService } from "./_base.service";

@Injectable({
    providedIn: 'root'
})
export class LocationService extends BaseService<LocationDTO> { 
    constructor() { 
        super('locations');
    }
}