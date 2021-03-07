import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { remove as _remove } from 'lodash-es';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentDTOResponse } from '../../dto';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
  }

  @Input() multiple: boolean = false;
  @Input() files: DocumentDTOResponse[] = [];
  @Output() onUpload: EventEmitter<boolean> = new EventEmitter();
  @Output() onFilesSelected: EventEmitter<File[]> = new EventEmitter();
  @ViewChild('singleInput') singleInput: ElementRef;
  selectedFiles: File[] = [];

  filesSelected(event: Event) {
    this.selectedFiles = Array.from((event.target as any).files);
    this.onFilesSelected.emit(this.selectedFiles as File[]);

    if (!this.multiple) {
      this.files = [];
    }
  }

  remove(index: number) {
    if (!this.multiple) {
      this.selectedFiles = [];
    } else {
      _remove(this.selectedFiles, (file: File) => this.selectedFiles.indexOf(file) === index);
    }
    if (this.selectedFiles.length === 0) {
      this.resetInput();
      this.onFilesSelected.emit([]);
    }
  }

  removeFile(id: string) {
    if (!this.multiple) {
      this.files = [];
    } else {
      _remove(this.files, (file: DocumentDTOResponse) => file.id === id);
    }
    if (this.files.length === 0) {
      this.resetInput();
      this.onFilesSelected.emit([]);
    }
  }

  resetInput() {
    this.singleInput.nativeElement.value = '';
  }

  observableList: Observable<DocumentDTOResponse>[] = [];
  upload(): Observable<any> {
    if (this.selectedFiles.length) {
      this.selectedFiles.forEach(item => {
        let formData = new FormData();
        formData.append('command', JSON.stringify({ type: "4be40058-5d17-40e0-b258-7ca97ba17c23" }));
        formData.append('file', item);
        this.observableList.push(this.documentService.create(formData));
      })

      return forkJoin(this.observableList).pipe(
        map((result: DocumentDTOResponse[]) => result)
      );
    } else {
      return of(this.files)
    }
  }
}
