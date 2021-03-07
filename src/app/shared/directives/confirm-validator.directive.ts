import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/**
 * @description to use validator comperatively in Reactive Forms
 * @param controlToBeComfirmedName {string} Name of the control that will be confirmed - i.e : password
 */
export function confirmValidator(controlToBeComfirmedName: string): ValidatorFn {
  /**
   * @param controlToBeCompared {AbstractControl} The instance of control that will be compared - i.e : confirmPassword
   */
  return (controlToBeCompared: AbstractControl): ValidationErrors | null => {
    let controlToBeConfirmed: AbstractControl | null = controlToBeCompared.root.get(controlToBeComfirmedName);

    /**
     * @description check thier value with each other
     */
    if (controlToBeConfirmed?.value !== controlToBeCompared.value) {
      return { mustMatch: true };
    } else {
      return null;
    }
  }
}

/**
 * @description to use validator as a directive on HTML DOM - Template Driven Forms
 */
@Directive({
  selector: '[appConfirmValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmValidatorDirective,
    multi: true
  }]
})
export class ConfirmValidatorDirective implements Validator {
  constructor() { }

  @Input() appConfirmValidator: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return confirmValidator(this.appConfirmValidator)(control);
  }

  registerOnValidatorChange(fn: () => void): void {
    // throw new Error("Method not implemented");
  }
}
