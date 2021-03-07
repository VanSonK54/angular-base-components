import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddBaseComponent } from 'src/app/shared/components/base';
import { CultureDTO, DocumentDTOResponse } from 'src/app/shared/dto';
import { FileUploaderComponent } from 'src/app/shared/modules/file-uploader/file-uploader.component';
import { CultureService } from 'src/app/shared/services/culture.service';

@Component({
  selector: 'app-culture-add',
  templateUrl: './culture-add.component.html',
  styleUrls: ['./culture-add.component.scss']
})
export class CultureAddComponent extends AddBaseComponent<CultureDTO> implements OnInit, OnDestroy {

  constructor(public cultureService: CultureService,
    public dialogRef: MatDialogRef<CultureAddComponent>) {
    super(cultureService, dialogRef);
  }

  @ViewChild(FileUploaderComponent) uploader: FileUploaderComponent;

  ngOnInit(): void {
    super.ngOnInit();
  }

  form: FormGroup;
  buildForm(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      translationFile: [null, Validators.required]
    })
  }

  onFilesSelected(files: File[]) {
    /**
     * @description To enable save button temporary
     */
    const file: File = files[0];
    this.form.controls.translationFile.setValue(file?.name);
  }

  prepareModel(): CultureDTO {
    return this.form.value;
  }

  save() {
    this.uploader.upload().subscribe((result: DocumentDTOResponse[]) => {
      this.form.controls.translationFile.setValue(result[0].id);
      super.save();
    });
  }

  ngOnDestroy() { 
    super.ngOnDestroy()
  }
}
