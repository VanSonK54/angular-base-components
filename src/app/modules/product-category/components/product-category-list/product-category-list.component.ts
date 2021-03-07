import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITreeOptions, TreeComponent } from '@circlon/angular-tree-component';
import { matDialogConfig } from 'src/app/shared/configs';
import { SearchParams } from 'src/app/shared/dto';
import { ProductCategoryDTO, ProductCategoryResponseDTO } from 'src/app/shared/dto/product-category.dto';
import { TreeNodeModel } from 'src/app/shared/models';
import { ProductCategoryService } from 'src/app/shared/services/product-category.service';
import { TreeUtilities } from 'src/app/shared/utilities/tree.utilities';
import { ProductCategoryAddComponent } from '../product-category-add/product-category-add.component';
import { ProductCategoryEditComponent } from '../product-category-edit/product-category-edit.component';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {
  constructor(private productCategoryService: ProductCategoryService,
    private dialog: MatDialog) { }

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  ngOnInit(): void {
    this.getData();
  }

  productCategories: ProductCategoryResponseDTO[] = [];
  nodes: TreeNodeModel[] = [];
  options: ITreeOptions = {
    allowDrag: true,
    allowDrop: true,
  };
  getData() {
    this.productCategoryService.getAll<ProductCategoryResponseDTO>(this.getSearchParams()).subscribe(result => {
      this.productCategories = result.items;
      this.nodes = TreeUtilities.makeTree(this.productCategories);
    });
  }

  searchParams: SearchParams;
  getSearchParams(): string {
    return this.searchParams ? this.searchParams.stringify() : this.initialSearchParams().stringify();
  }

  initialSearchParams(): SearchParams {
    const params = new SearchParams();
    params.pageSize = 100;
    return params;
  }

  openAdd(id: string | null) {
    const dialogRef = this.dialog.open(ProductCategoryAddComponent, { ...matDialogConfig, data: { parentId: id } });
    const sub = dialogRef.afterClosed().subscribe((result: ProductCategoryResponseDTO | null) => {
      if (result) {
        this.addProductCategoryLocal(result);
        this.addNode(TreeUtilities.mapToTreeNode(result), id);
      }
    });
  }

  addProductCategoryLocal(productCategory: ProductCategoryResponseDTO) {
    this.productCategories.push(productCategory);
  }

  addNode(node: TreeNodeModel, parentId: string | null) {
    if (parentId) {
      const parentNode: TreeNodeModel = TreeUtilities.findNode(this.nodes, parentId);
      parentNode.children.push(node);
    } else {
      this.nodes.push(node);
    }
    this.tree.treeModel.update();

    this.tree.treeModel.getFocusedNode().expand();
  }

  openEdit(node: TreeNodeModel) {
    let productCategory = this.productCategories.find(i => i.id === node.id);
    const dialogRef = this.dialog.open(ProductCategoryEditComponent, { ...matDialogConfig, data: productCategory });
    const sub = dialogRef.afterClosed().subscribe((result: ProductCategoryResponseDTO) => {
      if (result) {
        this.editProductCategoryLocal(result);
        this.editNode(result);
      }
    });
  }

  editProductCategoryLocal(productCategory: ProductCategoryResponseDTO) {
    let editedProductCategory = this.productCategories.find(pc => pc.id === productCategory.id) as ProductCategoryResponseDTO;

    editedProductCategory.title = productCategory.title;
    editedProductCategory.parentId = productCategory.parentId;
  }

  editNode(productCategory: ProductCategoryResponseDTO) {
    let node = TreeUtilities.findNode(this.nodes, productCategory.id);
    node.name = productCategory.title;
    this.tree.treeModel.update();
  }

  deleteNode(node: TreeNodeModel) {
    this.productCategoryService.delete(node.id).subscribe(result => {
      this.nodes = TreeUtilities.removeNode(this.nodes, node);
      this.tree.treeModel.update();
    });
  }

  nodeMoved(event: any) {
    const productCategory: ProductCategoryDTO = {
      id: event.node.id,
      title: event.node.name,
      parentId: event.to.parent.virtual ? null : event.to.parent.id
    }

    this.productCategoryService.update(productCategory).subscribe(result => {
      let editedProductCategory = this.productCategories.find(pc => pc.id === result.id) as ProductCategoryResponseDTO;
      editedProductCategory.parentId = productCategory.parentId;
    });
  }
}
