import { DocumentDTOResponse } from "./document.dto";

export interface CultureDTO {
    id: string;
    name: string;
    translationFile: string;
}

export interface CultureResponseDTO{
    id: string;
    name: string;
    translationFileId: string;
    translationFile?: DocumentDTOResponse;
}
