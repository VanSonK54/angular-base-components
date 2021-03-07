import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, Optional, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { merge } from 'rxjs';
import { ValidationMessageComponent } from '../components/validation-message.component';
import { ValidationMessageService } from '../services/validation-message.service';
import { ValidationMessageContainerDirective } from './validation-message-container.directive';

@UntilDestroy()
@Directive({
    selector: '[formControl], [formControlName]',
})
export class ValidationMessageDirective {
    factory: ComponentFactory<ValidationMessageComponent>;
    ref: ComponentRef<ValidationMessageComponent>;
    container: ViewContainerRef;

    constructor(private control: NgControl,
        private validationMessageService: ValidationMessageService,
        private vcr: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        @Optional() validationMessageContainerDirective: ValidationMessageContainerDirective,
    ) {
        this.container = validationMessageContainerDirective ? validationMessageContainerDirective.vcr : this.vcr;
        this.factory = this.resolver.resolveComponentFactory(ValidationMessageComponent);
        this.ref = this.container.createComponent(this.factory);
    }

    ngOnInit() {
        merge(...[
            <any>this.control.statusChanges,
            <any>this.control.valueChanges]
        )?.pipe(untilDestroyed(this)).subscribe((v) => {
            let errorMessage = this.validationMessageService.getError(this.control);
            this.setError(errorMessage);
        });
    }

    setError(text: string) {
        this.ref.instance.text = text;
    }

    ngOnDestroy() { }
}
