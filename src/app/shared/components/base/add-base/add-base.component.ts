import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/client-services';
import { COMMON_MESSAGES } from 'src/app/shared/data';
import { CommandResponseDTO } from 'src/app/shared/dto';
import { BaseService } from 'src/app/shared/services/_base.service';
import { AppInjector } from 'src/app/shared/utilities/injector.utilities';

@Component({
  selector: 'app-add-base',
  template: ``,
})
export abstract class AddBaseComponent<T> implements OnInit, OnDestroy {
  subscriptions$: Subscription = new Subscription();
  injector: Injector;
  notificationService: NotificationService;
  formBuilder: FormBuilder;
  loading: boolean = false;
  
  constructor(public baseService: BaseService<T>,
    public dialogRef: MatDialogRef<any>) {
      
      this.injector = AppInjector.getInjector();
      this.notificationService = this.injector.get(NotificationService);
      this.formBuilder = this.injector.get(FormBuilder);
    }
    
    abstract form: FormGroup | FormBuilder;
    abstract buildForm(): void;
    abstract prepareModel(): T;
  
  /**
   * @description Inherited classes must call this function (super.ngOnInit)
   */
  ngOnInit() {
    this.buildForm();
  }

  save() {
    this.loading = true;
    const subResult = this.baseService.create(this.prepareModel()).subscribe((result: CommandResponseDTO) => {
      this.closeDialog();
    }, error => {
      this.loading = false;
      this.notificationService.showError(COMMON_MESSAGES.savingWasNotSuccessful)
    });

    this.subscriptions$.add(subResult);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe();
  }
}

