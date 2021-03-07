import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCategoryResponseDTO } from 'src/app/shared/dto';
import { ProductCategoryService } from 'src/app/shared/services';
import { ProductCategoryAddComponent } from '../product-category-add/product-category-add.component';

@Component({
  selector: 'app-product-category-edit',
  templateUrl: './product-category-edit.component.html',
  styleUrls: ['./product-category-edit.component.scss']
})
export class ProductCategoryEditComponent implements OnInit {


  constructor(private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService,
    private dialogRef : MatDialogRef<ProductCategoryAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductCategoryResponseDTO
  ) { }

  form: FormGroup = this.formBuilder.group({
    id: [null, Validators.required],
    title: [null, Validators.required],
    parentId: [null]
  });
  loading = false;

  ngOnInit(): void {
    this.form.patchValue(this.data);
    // this.form.controls.parentId.setValue(this.data.parentId);
  }

  save() {
    this.loading = true;

    this.productCategoryService.update(this.form.value).subscribe(result => { 
      this.dialogRef.close(result);
      this.loading = false;
    }, error => { 
        this.loading = false;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
