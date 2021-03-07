import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/client-services';
import { COMMON_MESSAGES } from 'src/app/shared/data';
import { CommandResponseDTO } from 'src/app/shared/dto';
import { BaseService } from 'src/app/shared/services/_base.service';
import { AppInjector } from 'src/app/shared/utilities/injector.utilities';

@Component({
  selector: 'app-edit-base',
  template: ``,
})
export abstract class EditBaseComponent<T> implements OnInit, OnDestroy {
  subscriptions$: Subscription = new Subscription();
  injector: Injector;
  notificationService: NotificationService;
  formBuilder: FormBuilder;
  loading = false;
  abstract form: any;

  constructor(public baseService: BaseService<T>,
    public dialogRef: MatDialogRef<any>) {

    this.injector = AppInjector.getInjector();
    this.notificationService = this.injector.get(NotificationService);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  abstract buildForm(): void;
  abstract patchFormValue(): void;
  abstract prepareModel(): T;
  abstract updateWithPut(): boolean;

  /**
 * @description Inherited classes must call this function (super.ngOnInit)
 */
  ngOnInit() {
    this.buildForm();
  }

  save() {
    let subResult;
    if (this.updateWithPut()) {
      subResult = this.baseService.update(this.prepareModel()).subscribe((result: CommandResponseDTO) => {
        this.closeDialog();
      }, error => {
        this.notificationService.showError(COMMON_MESSAGES.UpdateWasNotSuccessful)
      });
    } else {
      subResult = this.baseService.updatePatch(this.prepareModel()).subscribe((result: CommandResponseDTO) => {
        this.closeDialog();
      }, error => {
        this.notificationService.showError(COMMON_MESSAGES.UpdateWasNotSuccessful)
      });
    }
    this.subscriptions$.add(subResult);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}
