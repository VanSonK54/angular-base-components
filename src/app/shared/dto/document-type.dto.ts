export interface DocumentTypeDTO {
    id: string;
    name: string;
    code: string;
    fileLimitations: FileLimitation[]
}

export interface FileLimitation {
    extension: string;
    maxSizeInByte: number;
}
