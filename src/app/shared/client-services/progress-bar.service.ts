import { Injectable } from '@angular/core';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  progressBarRef: NgProgressRef;
  constructor(private progress: NgProgress) {
    this.progressBarRef = this.progress.ref('main-progressbar');
  }

  start(): void {
    this.progressBarRef.start();
  }

  complete(): void {
    this.progressBarRef.complete();
  }
}
