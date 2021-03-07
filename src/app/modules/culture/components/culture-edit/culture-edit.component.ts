import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditBaseComponent } from 'src/app/shared/components/base';
import { CultureDTO, CultureResponseDTO, DocumentDTOResponse } from 'src/app/shared/dto';
import { FileUploaderComponent } from 'src/app/shared/modules/file-uploader/file-uploader.component';
import { CultureService } from 'src/app/shared/services/culture.service';

@Component({
  selector: 'app-culture-edit',
  templateUrl: './culture-edit.component.html',
  styleUrls: ['./culture-edit.component.scss']
})
export class CultureEditComponent extends EditBaseComponent<CultureDTO> implements OnInit, OnDestroy {
  constructor(public cultureService: CultureService,
    public dialogRef: MatDialogRef<CultureEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CultureResponseDTO) {
    super(cultureService, dialogRef);
  }

  @ViewChild(FileUploaderComponent) uploader: FileUploaderComponent;

  ngOnInit() {
    super.ngOnInit();
    this.getCulture();
  }

  getCulture() {
    this.cultureService.get<CultureResponseDTO>(this.data.id, 'translationFile').subscribe(result => {
      this.culture = result;
      this.files.push(this.culture.translationFile as DocumentDTOResponse);
      this.patchFormValue();
    })
  }

  culture: CultureResponseDTO;
  files: DocumentDTOResponse[] = [];
  loading = false;
  form: FormGroup;

  buildForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      translationFile: [null, Validators.required]
    })
  }

  patchFormValue(): void {
    this.form.controls.id.setValue(this.culture.id);
    this.form.controls.name.setValue(this.culture.name);
    this.form.controls.name.disable();
    this.form.controls.translationFile.setValue(this.culture.translationFile?.id);
  }

  updateWithPut(): boolean {
    return false;
  }

  prepareModel(): CultureDTO {
    return this.form.value;
  }

  onFilesSelected(files: File[]) {
    /**
     * @description To enable save button temporary
     */
    const file: File = files[0];
    this.form.controls.translationFile.setValue(file?.name);
  }

  save() {
    this.uploader.upload().subscribe((result: DocumentDTOResponse[]) => {
      this.form.controls.translationFile.setValue(result[0].id);
      super.save();
    });
  }

  ngOnDestroy() { 
    super.ngOnDestroy();
  }
}
