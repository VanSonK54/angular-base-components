import { DocumentTypeDTO } from "./document-type.dto";

export interface DocumentDTO {
    id: string;
    type: string;
    file: File;
}

export interface DocumentDTOResponse{
    id: string;
    typeId: string;
    type: DocumentTypeDTO;
    fileName: string;
    fileContent: string;
}