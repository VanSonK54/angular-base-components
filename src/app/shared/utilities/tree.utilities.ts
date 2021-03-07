import { remove } from 'lodash-es';
import { ProductCategoryResponseDTO } from "../dto/product-category.dto";
import { TreeNodeModel } from "../models";

export class TreeUtilities {
    static nodes: TreeNodeModel[] = [];
    static makeTree(productCategories: ProductCategoryResponseDTO[]): TreeNodeModel[] {
        this.nodes = [];
        this.createRoots(productCategories);
        return this.nodes;
    }

    private static createRoots(productCategories: ProductCategoryResponseDTO[]) {
        productCategories.filter(pc => !pc.parentId).forEach((productCategory: ProductCategoryResponseDTO) => {
            this.nodes.push(this.mapToTreeNode(productCategory));
            this.createBranches(productCategories, productCategory.id as string);
        });
    }

    private static createBranches(productCategories: ProductCategoryResponseDTO[], parentId: string) {
        const branches = productCategories.filter(pc => pc.parentId === parentId);
        const node = this.findNode(this.nodes, parentId);

        branches.forEach(productCategory => {
            node?.children.push(this.mapToTreeNode(productCategory));

            if (productCategories.find(pc => pc.parentId === productCategory.id)) {
                this.createBranches(productCategories, productCategory.id as string);
            }
        })
    }

    static mapToTreeNode(productCategory: ProductCategoryResponseDTO): TreeNodeModel {
        return { id: productCategory.id as string, name: productCategory.title, children: [], editable: false };
    }

    static findNode(nodes: TreeNodeModel[], id: string): TreeNodeModel {
        let node: any = nodes.find(n => n.id === id);

        if (!node) {
            const nodesHavechildren = nodes.filter(n => n.children.length > 0);
            for (let index = 0; index < nodesHavechildren.length; index++) {
                node = this.findNode(nodesHavechildren[index].children, id);
                if (node) {
                    break;
                }
            }
        }

        return node;
    }

    static removeNode(nodes: TreeNodeModel[], node: TreeNodeModel): TreeNodeModel[] {
        for (let index = 0; index < nodes.length; index++) {
            if (nodes[index].id === node.id) {
                remove(nodes, (node) => node.id === nodes[index].id);
                break;
            } else if (nodes[index].children.length > 0) {
                this.removeNode(nodes[index].children, node);
            }
        }
        return nodes;
    }
}