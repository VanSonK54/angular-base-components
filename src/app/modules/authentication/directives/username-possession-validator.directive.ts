import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services';

export function usernamePossessionValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.checkUsernamePossession(control.value).pipe(
      map(result => {
        return result ? { isTaken: true } : null
      })
    );
  }
}

@Directive({
  selector: '[appUsernamePossessionValidator]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: UsernamePossessionValidatorDirective,
    multi: true,
  }]
})
export class UsernamePossessionValidatorDirective implements AsyncValidator {
  validator;
  constructor(private userService: UserService) {
    this.validator = usernamePossessionValidator(this.userService);
  }

  validate = (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return this.validator(control);
  }
}
