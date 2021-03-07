import { productType } from "../data";

export interface ProductDTO{
    id: string;
    title: string;
    description: string;
    parentId: string;
    features: ProductFeatureDTO[];
}

export interface ProductNotExpandedResponseDTO extends ProductDTO{ 
    type: productType;
}

export interface ProductResponseDTO extends ProductNotExpandedResponseDTO{ 
    parent: ProductNotExpandedResponseDTO;
}

export interface ProductFeatureDTO {
    code: string;
    value: any;
}
