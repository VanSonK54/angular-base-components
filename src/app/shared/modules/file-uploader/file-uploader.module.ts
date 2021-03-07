import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadModule } from 'ng2-file-upload';
import { DocumentService } from '../../services';
import { FileUploaderComponent } from './file-uploader.component';

@NgModule({
  declarations: [FileUploaderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FileUploadModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  exports: [
    FileUploaderComponent
  ],
  providers: [
    DocumentService
  ]
})
export class FileUploaderModule { }
