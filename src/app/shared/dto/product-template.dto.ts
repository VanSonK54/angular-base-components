import { productType } from "../data";
import { ProductCategoryDTO } from "./product-category.dto";

export interface ProductTemplateDTO { 
    id: string;
    title: string;
    description: string;
    categoryId: string;
    isService: boolean;
    featureCategories: FeatureCategoryDTO[];
    featureDefinitions: FeatureDefinitionDTO[];
}

export interface ProductTemplateResponseDTO extends ProductTemplateDTO{ 
    type: productType;
    category: ProductCategoryDTO;
}

export interface FeatureCategoryDTO {
    order: number;
    code: string;
    title: string;
}

export interface FeatureDefinitionDTO {
    order: 0,
    featureCategory: string,
    code: string,
    title: string,
    featureType: string,
    isOptional: true,
    description: string
}
