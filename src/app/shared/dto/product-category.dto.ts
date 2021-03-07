export interface ProductCategoryDTO {
  id: string;
  title: string;
  parentId: string;
}

export interface ProductCategoryResponseDTO extends ProductCategoryDTO {
  parent: ProductCategoryDTO;
}