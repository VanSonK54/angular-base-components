import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[validationMessageContainer]'
})
export class ValidationMessageContainerDirective {
    constructor(public vcr: ViewContainerRef) { }
}