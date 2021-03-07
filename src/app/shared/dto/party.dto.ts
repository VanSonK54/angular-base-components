import { partyType } from "../data";

export interface PartyDTO {
    id: string;
    type: partyType;
    gender: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    nationality: string;
    description: string;
    contacts: ContactDTO[];
}

export interface ContactDTO {
    type: string;
    description: string;
    value: string | object;
}